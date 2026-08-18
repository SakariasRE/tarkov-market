import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

type RouteContext = {
    params: Promise<{
        id: string
    }>
}

export async function GET(request: Request, context: RouteContext) {
    try {
        const { id } = await context.params
        const itemId = Number(id)

        if (Number.isNaN(itemId)) {
            return NextResponse.json(
                { error: 'Invalid item id' },
                { status: 400 }
            )
        }

        const item = await prisma.item.findUnique({
            where: {
                id: itemId
            },
            include: {
                category: true,
                creator: true
            }
        })

        if (!item) {
            return NextResponse.json(
                { error: 'Item not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(item)
    } catch (error) {
        console.error('Failed to fetch item:', error)

        return NextResponse.json(
            { error: 'Failed to fetch item' },
            { status: 500 }
        )
    }
}

export async function PUT(request: Request, context: RouteContext) {
    try {
        const { id } = await context.params
        const itemId = Number(id)

        if (Number.isNaN(itemId)) {
            return NextResponse.json(
                { error: 'Invalid item id' },
                { status: 400 }
            )
        }

        const existingItem = await prisma.item.findUnique({
            where: {
                id: itemId
            }
        })

        if (!existingItem) {
            return NextResponse.json(
                { error: 'Item not found' },
                { status: 404 }
            )
        }

        const body = await request.json()

        const {
            name,
            description,
            price,
            quantity,
            condition,
            image,
            categoryId
        } = body

        const updatedItem = await prisma.item.update({
            where: {
                id: itemId
            },
            data: {
                ...(name !== undefined && { name }),
                ...(description !== undefined && { description }),
                ...(price !== undefined && { price: Number(price) }),
                ...(quantity !== undefined && { quantity: Number(quantity) }),
                ...(condition !== undefined && { condition }),
                ...(image !== undefined && { image }),
                ...(categoryId !== undefined && {
                    categoryId: Number(categoryId)
                })
            },
            include: {
                category: true,
                creator: true
            }
        })

        return NextResponse.json(updatedItem)
    } catch (error) {
        console.error('Failed to update item:', error)

        return NextResponse.json(
            { error: 'Failed to update item' },
            { status: 500 }
        )
    }
}

export async function DELETE(request: Request, context: RouteContext) {
    try {
        const { id } = await context.params
        const itemId = Number(id)

        if (Number.isNaN(itemId)) {
            return NextResponse.json(
                { error: 'Invalid item id' },
                { status: 400 }
            )
        }

        const existingItem = await prisma.item.findUnique({
            where: {
                id: itemId
            }
        })

        if (!existingItem) {
            return NextResponse.json(
                { error: 'Item not found' },
                { status: 404 }
            )
        }

        await prisma.item.delete({
            where: {
                id: itemId
            }
        })

        return NextResponse.json({
            message: 'Item deleted successfully'
        })
    } catch (error) {
        console.error('Failed to delete item:', error)

        return NextResponse.json(
            { error: 'Failed to delete item' },
            { status: 500 }
        )
    }
}
