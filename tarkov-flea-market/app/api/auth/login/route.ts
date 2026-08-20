import { prisma } from '@/lib/prisma'
import { verifyPassword, setSessionCookie } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const email = String(body.email ?? '').trim().toLowerCase()
        const password = String(body.password ?? '')

        if (!email || !password) {
            return NextResponse.json(
                { error: 'E-post och lösenord krävs' },
                { status: 400 }
            )
        }

        const user = await prisma.user.findUnique({
            where: { email }
        })

        
        const isValid =
            user !== null && (await verifyPassword(password, user.password))

        if (!user || !isValid) {
            return NextResponse.json(
                { error: 'Fel e-post eller lösenord' },
                { status: 401 }
            )
        }

        await setSessionCookie(user.id)

        return NextResponse.json({
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            balance: user.balance
        })
    } catch (error) {
        console.error('Failed to log in:', error)

        return NextResponse.json(
            { error: 'Kunde inte logga in' },
            { status: 500 }
        )
    }
}
