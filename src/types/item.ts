export type Item = {
    id: number;
    name: string;
    category: string;
    price: number;
    listings: number;
    image: string;
};

export type InventoryItem = Item & {
    quantity: number;
};
