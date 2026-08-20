import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
    const user = await getCurrentUser()

    if (!user) {
        return NextResponse.json({ error: 'Inte inloggad' }, { status: 401 })
    }

    const items = await prisma.inventoryItem.findMany({
        where: { userId: user.id },
        orderBy: { name: 'asc' }
    })

    return NextResponse.json(items)
}

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

        const name = String(body.name ?? '').trim()
        const category = String(body.category ?? '').trim()
        const price = Number(body.price)
        const quantity = Number(body.quantity ?? 1)
        const image = body.image ?? null

        if (!name || !category || !Number.isFinite(price) || price < 0) {
            return NextResponse.json(
                { error: 'Ogiltiga uppgifter för föremålet' },
                { status: 400 }
            )
        }

        if (!Number.isInteger(quantity) || quantity < 1) {
            return NextResponse.json(
                { error: 'Antalet måste vara minst 1' },
                { status: 400 }
            )
        }

        const cost = price * quantity

        const owner = await prisma.user.findUnique({
            where: { id: user.id },
            select: { balance: true }
        })

        if (!owner || owner.balance < cost) {
            return NextResponse.json(
                { error: 'Du har inte råd med det här köpet' },
                { status: 400 }
            )
        }

        const [item, updatedUser] = await prisma.$transaction([
            prisma.inventoryItem.upsert({
                where: {
                    userId_name: { userId: user.id, name }
                },
                update: {
                    quantity: { increment: quantity }
                },
                create: {
                    userId: user.id,
                    name,
                    category,
                    price,
                    image,
                    quantity
                }
            }),

            prisma.user.update({
                where: { id: user.id },
                data: { balance: { decrement: cost } },
                select: { balance: true }
            })
        ])

        return NextResponse.json(
            { item, balance: updatedUser.balance },
            { status: 201 }
        )
    } catch (error) {
        console.error('Failed to add inventory item:', error)

        return NextResponse.json(
            { error: 'Kunde inte lägga till föremålet' },
            { status: 500 }
        )
    }
}
