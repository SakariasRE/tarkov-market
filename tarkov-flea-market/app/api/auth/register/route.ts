import { prisma } from '@/lib/prisma'
import { hashPassword, setSessionCookie } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const username = String(body.username ?? '').trim()
        const email = String(body.email ?? '').trim().toLowerCase()
        const password = String(body.password ?? '')

        if (!username || !email || !password) {
            return NextResponse.json(
                { error: 'Användarnamn, e-post och lösenord krävs' },
                { status: 400 }
            )
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: 'Lösenordet måste vara minst 8 tecken' },
                { status: 400 }
            )
        }

        const existing = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }]
            }
        })

        if (existing) {
            return NextResponse.json(
                { error: 'E-postadressen eller användarnamnet är upptaget' },
                { status: 409 }
            )
        }

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: await hashPassword(password)
            },
            select: {
                id: true,
                username: true,
                email: true,
                avatar: true,
                balance: true
            }
        })

        await setSessionCookie(user.id)

        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        console.error('Failed to register user:', error)

        return NextResponse.json(
            { error: 'Kunde inte skapa kontot' },
            { status: 500 }
        )
    }
}
