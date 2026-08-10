import type { Item } from '../types/item';

export const items: Item[] = [
    {
        id: 1,
        name: "Graphics Card",
        category: "Electronics",
        price: 465000,
        listings: 12,
        change: 5.2,
        image: "/items/graphics-card.png",
    },
    {
        id: 2,
        name: "LEDX",
        category: "Medical",
        price: 700000,
        listings: 8,
        change: -2.1,
        image: "/items/ledx.png",
    },
    {
        id: 3,
        name: "7.62x51 M80",
        category: "Ammo",
        price: 1500,
        listings: 25,
        change: 1.6,
        image:  "/items/m80.png",
    },
    {
        id: 4,
        name: "Moonshine",
        category: "Consumables",
        price: 120000,
        listings: 15,
        change: 3.4,
        image: "/items/moonshine.png",
    },
];
