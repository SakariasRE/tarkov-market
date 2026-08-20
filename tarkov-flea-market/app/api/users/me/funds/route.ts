import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const user = await getCurrentUser()

        if (!user) {
            return NextResponse.json(
                { error: 'Inte inloggad' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const amount = Number(body.amount)

        if (!Number.isFinite(amount) || amount <= 0) {
            return NextResponse.json(
                { error: 'Beloppet måste vara större än noll' },
                { status: 400 }
            )
        }

        const updated = await prisma.user.update({
            where: { id: user.id },
            data: { balance: { increment: Math.round(amount) } },
            select: { balance: true }
        })

        return NextResponse.json(updated)
    } catch (error) {
        console.error('Failed to add funds:', error)

        return NextResponse.json(
            { error: 'Kunde inte lägga till pengar' },
            { status: 500 }
        )
    }
}
