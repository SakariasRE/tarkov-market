import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import 'dotenv/config'

const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME ?? 'tarkov_market',
    connectionLimit: 5
})

const prisma = new PrismaClient({ adapter })

const CATEGORIES = [
    'Ammo',
    'Armor',
    'Barter',
    'Electronics',
    'Food',
    'Gear',
    'Keys',
    'Medical',
    'Miscellaneous',
    'Weapons'
]

type SeedItem = {
    name: string
    description: string | null
    price: number
    quantity: number
    condition: string
    image: string | null
    category: string
}

const ITEMS: SeedItem[] = [
    {
        name: 'Military Cable',
        description: 'Electronic component',
        price: 85000,
        quantity: 2,
        condition: 'Used',
        image: '/items/Military-cable.png',
        category: 'Electronics'
    },
    {
        name: 'Dorm Room 314 Marked Room Key',
        description: 'Key for a dorm room',
        price: 45000,
        quantity: 1,
        condition: 'Used',
        image: '/items/314%20Marked.png',
        category: 'Keys'
    },
    {
        name: 'LEDX Skin Transilluminator',
        description: 'Rare medical device, always in demand.',
        price: 700000,
        quantity: 8,
        condition: 'New',
        image: '/items/ledx.png',
        category: 'Medical'
    },
    {
        name: '7.62x51 M80',
        description: 'Standard issue rifle ammunition.',
        price: 1500,
        quantity: 245,
        condition: 'New',
        image: '/items/m80.png',
        category: 'Ammo'
    },
    {
        name: 'Moonshine',
        description: 'Homemade spirits. Valuable barter item.',
        price: 420000,
        quantity: 15,
        condition: 'New',
        image: '/items/moonshine.png',
        category: 'Barter'
    },
    {
        name: 'Tetriz Portable Game',
        description: 'Nostalgic handheld console, collectors pay well.',
        price: 180000,
        quantity: 8,
        condition: 'Used',
        image: '/items/tetriz.png',
        category: 'Electronics'
    },
    {
        name: 'Salewa First Aid Kit',
        description: 'Reliable field medical kit.',
        price: 42000,
        quantity: 28,
        condition: 'Used',
        image: '/items/Salewa.png',
        category: 'Medical'
    },
    {
        name: '5.45x39 BS',
        description: 'Armour piercing rounds.',
        price: 980,
        quantity: 393,
        condition: 'New',
        image: '/items/BS.png',
        category: 'Ammo'
    },
    {
        name: 'Gen4 Assault Armour',
        description: 'Heavy body armour, moderate durability left.',
        price: 315000,
        quantity: 4,
        condition: 'Damaged',
        image: '/items/gen4.png',
        category: 'Gear'
    },
    {
        name: 'DS Arms SA58',
        description: 'Hard hitting 7.62 platform.',
        price: 275000,
        quantity: 3,
        condition: 'Used',
        image: '/items/SA58.png',
        category: 'Weapons'
    },
    {
        name: 'Ophthalmoscope',
        description: 'Medical tool needed for advanced treatment.',
        price: 155000,
        quantity: 11,
        condition: 'New',
        image: '/items/Ophtolmoscope.png',
        category: 'Medical'
    },
    {
        name: 'Graphics Card',
        description:
            'High-end graphics card used for various hideout upgrades.',
        price: 465000,
        quantity: 12,
        condition: 'Used',
        image: '/items/graphics-card.png',
        category: 'Electronics'
    },
    {
        name: 'M4A1 Assault Rifle',
        description: 'Modular 5.56 platform, the workhorse of any raid.',
        price: 320000,
        quantity: 4,
        condition: 'Used',
        image: '/items/M4A1.png',
        category: 'Weapons'
    },
    {
        name: 'Slick Plate Carrier',
        description: 'Class 6 plate carrier with almost no storage.',
        price: 850000,
        quantity: 2,
        condition: 'New',
        image: '/items/Slick.png',
        category: 'Armor'
    },
    {
        name: 'PACA Soft Armor',
        description: 'Budget class 2 vest for early wipe runs.',
        price: 48000,
        quantity: 7,
        condition: 'Used',
        image: '/items/PACA.png',
        category: 'Armor'
    },
    {
        name: '5.56x45 M995',
        description: 'Armour piercing rifle rounds.',
        price: 2800,
        quantity: 180,
        condition: 'New',
        image: '/items/995.png',
        category: 'Ammo'
    },
    {
        name: 'IFAK Personal Tactical First Aid Kit',
        description: 'Compact kit that stops bleeding fast.',
        price: 38000,
        quantity: 25,
        condition: 'New',
        image: '/items/IFAK.png',
        category: 'Medical'
    },
    {
        name: 'Tushonka Beef Stew',
        description: 'Canned stew, restores energy and hydration.',
        price: 22000,
        quantity: 40,
        condition: 'New',
        image: '/items/Tushonka.png',
        category: 'Food'
    },
    {
        name: 'Propane Tank',
        description: 'Bulky barter item needed for hideout upgrades.',
        price: 95000,
        quantity: 12,
        condition: 'Used',
        image: '/items/Propane%20tank.png',
        category: 'Barter'
    },
    {
        name: 'Labs Access Keycard',
        description: 'Single use keycard for the Terra Group laboratory.',
        price: 1250000,
        quantity: 1,
        condition: 'Used',
        image: '/items/Labs%20Access%20Keycard.png',
        category: 'Keys'
    },
    {
        name: 'Red Rebel Ice Pick',
        description: 'Melee weapon required for climbing extracts.',
        price: 3100000,
        quantity: 2,
        condition: 'New',
        image: '/items/Red-rebel.png',
        category: 'Miscellaneous'
    }
]

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'test@example.com' },
        update: {},
        create: {
            username: 'testuser',
            email: 'test@example.com',
            avatar: null
        }
    })

    for (const name of CATEGORIES) {
        await prisma.category.upsert({
            where: { name },
            update: {},
            create: { name }
        })
    }

    const categories = await prisma.category.findMany()

    const categoryIdByName = new Map(
        categories.map((category) => [category.name, category.id])
    )

    let created = 0
    let skipped = 0

    for (const item of ITEMS) {
        const categoryId = categoryIdByName.get(item.category)

        if (!categoryId) {
            console.warn(
                `Hoppar over ${item.name}: kategorin ${item.category} saknas`
            )
            continue
        }

        const existing = await prisma.item.findFirst({
            where: { name: item.name }
        })

        if (existing) {
            skipped++
            continue
        }

        await prisma.item.create({
            data: {
                name: item.name,
                description: item.description,
                price: item.price,
                quantity: item.quantity,
                condition: item.condition,
                image: item.image,
                categoryId,
                createdById: user.id
            }
        })

        created++
    }

    console.log(
        `Seed klar: anvandare "${user.username}", ` +
            `${categories.length} kategorier, ` +
            `${created} nya varor, ${skipped} fanns redan.`
    )
}

main()
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
