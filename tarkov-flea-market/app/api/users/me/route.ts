import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
    const user = await getCurrentUser()

    if (!user) {
        return NextResponse.json({ error: 'Inte inloggad' }, { status: 401 })
    }

    return NextResponse.json(user)
}

export async function PUT(request: Request) {
    try {
        const user = await getCurrentUser()

        if (!user) {
            return NextResponse.json(
                { error: 'Inte inloggad' },
                { status: 401 }
            )
        }

        const body = await request.json()

        const username =
            body.username === undefined
                ? undefined
                : String(body.username).trim()

        const email =
            body.email === undefined
                ? undefined
                : String(body.email).trim().toLowerCase()

        const avatar = body.avatar === undefined ? undefined : body.avatar

        if (username !== undefined && username.length === 0) {
            return NextResponse.json(
                { error: 'Användarnamnet får inte vara tomt' },
                { status: 400 }
            )
        }

        if (email !== undefined && !email.includes('@')) {
            return NextResponse.json(
                { error: 'Ange en giltig e-postadress' },
                { status: 400 }
            )
        }

        if (username !== undefined || email !== undefined) {
            const taken = await prisma.user.findFirst({
                where: {
                    id: { not: user.id },
                    OR: [
                        ...(username !== undefined ? [{ username }] : []),
                        ...(email !== undefined ? [{ email }] : [])
                    ]
                }
            })

            if (taken) {
                return NextResponse.json(
                    { error: 'E-postadressen eller användarnamnet är upptaget' },
                    { status: 409 }
                )
            }
        }

        const updated = await prisma.user.update({
            where: { id: user.id },
            data: {
                ...(username !== undefined && { username }),
                ...(email !== undefined && { email }),
                ...(avatar !== undefined && { avatar })
            },
            select: {
                id: true,
                username: true,
                email: true,
                avatar: true,
      balance: true,
                createdAt: true
            }
        })

        return NextResponse.json(updated)
    } catch (error) {
        console.error('Failed to update profile:', error)

        return NextResponse.json(
            { error: 'Kunde inte spara profilen' },
            { status: 500 }
        )
    }
}
