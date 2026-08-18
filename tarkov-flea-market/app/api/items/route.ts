import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)

        const search = searchParams.get('search')
        const category = searchParams.get('category')
        const sort = searchParams.get('sort') ?? 'createdAt'
        const order = searchParams.get('order') === 'asc' ? 'asc' : 'desc'

        const allowedSortFields = ['name', 'price', 'quantity', 'createdAt']

        const sortField = allowedSortFields.includes(sort) ? sort : 'createdAt'

        const items = await prisma.item.findMany({
            where: {
                ...(search && {
                    name: {
                        contains: search
                    }
                }),

                ...(category && {
                    categoryId: Number(category)
                })
            },

            include: {
                category: true,
                creator: true
            },

            orderBy: {
                [sortField]: order
            }
        })

        return NextResponse.json(items)
    } catch (error) {
        console.error('Failed to fetch items:', error)

        return NextResponse.json(
            { error: 'Failed to fetch items' },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
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

        if (!name || !price || !condition || !categoryId) {
            return NextResponse.json(
                { error: 'Name, price, condition and categoryId are required' },
                { status: 400 }
            )
        }

        const item = await prisma.item.create({
            data: {
                name,
                description,
                price: Number(price),
                quantity: Number(quantity ?? 1),
                condition,
                image,
                categoryId: Number(categoryId),

                // Tillfällig användare tills login är kopplat
                createdById: 1
            },
            include: {
                category: true,
                creator: true
            }
        })

        return NextResponse.json(item, { status: 201 })
    } catch (error) {
        console.error('Failed to create item:', error)

        return NextResponse.json(
            { error: 'Failed to create item' },
            { status: 500 }
        )
    }
}
