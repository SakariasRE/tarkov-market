import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { NextResponse } from 'next/server'

type RouteContext = {
    params: Promise<{
        id: string
    }>
}

export async function PATCH(request: Request, context: RouteContext) {
    try {
        const user = await getCurrentUser()

        if (!user) {
            return NextResponse.json(
                { error: 'Inte inloggad' },
                { status: 401 }
            )
        }

        const { id } = await context.params
        const itemId = Number(id)

        if (Number.isNaN(itemId)) {
            return NextResponse.json(
                { error: 'Ogiltigt id' },
                { status: 400 }
            )
        }

        const body = await request.json()

        const quantity = Number(body.quantity)
        const earned = Number(body.earned ?? 0)

        if (!Number.isInteger(quantity) || quantity < 1) {
            return NextResponse.json(
                { error: 'Antalet måste vara minst 1' },
                { status: 400 }
            )
        }

        const existing = await prisma.inventoryItem.findUnique({
            where: { id: itemId }
        })

        if (!existing) {
            return NextResponse.json(
                { error: 'Föremålet finns inte' },
                { status: 404 }
            )
        }

        if (existing.userId !== user.id) {
            return NextResponse.json(
                { error: 'Du kan bara ändra ditt eget inventory' },
                { status: 403 }
            )
        }

        if (existing.quantity < quantity) {
            return NextResponse.json(
                { error: 'Du äger inte så många av det föremålet' },
                { status: 400 }
            )
        }

        const remaining = existing.quantity - quantity

        const [, updatedUser] = await prisma.$transaction([
            remaining === 0
                ? prisma.inventoryItem.delete({ where: { id: itemId } })
                : prisma.inventoryItem.update({
                      where: { id: itemId },
                      data: { quantity: remaining }
                  }),

            prisma.user.update({
                where: { id: user.id },
                data: { balance: { increment: Math.max(0, earned) } },
                select: { balance: true }
            })
        ])

        return NextResponse.json({
            id: itemId,
            quantity: remaining,
            balance: updatedUser.balance
        })
    } catch (error) {
        console.error('Failed to update inventory item:', error)

        return NextResponse.json(
            { error: 'Kunde inte uppdatera inventory' },
            { status: 500 }
        )
    }
}
