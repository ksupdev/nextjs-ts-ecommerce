//sfc

'use server';

import { CartItem } from "@/types";

export async function addItemToCart(data: CartItem) {
    // Logic to add item to cart
    return {
        success: true,
        message: "Item added to cart",
    };
}