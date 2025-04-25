'use server';
import { PrismaClient } from "@prisma/client";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

// Get latest products
export async function getLatestProducts() {
    const prisma = new PrismaClient();

    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy: {
            createdAt: 'desc'
        }
    });

    return convertToPlainObject(data).map((product) => ({
        ...product,
        price: product.price.toString(),
        rating: product.rating.toString()
    }));

}

// Get single product by it's slug
export async function getProductBySlug(slug: string) {
    const prisma = new PrismaClient();
    const data = await prisma.product.findFirst({
        where: { slug: slug },
    });

    // const dataResult = {
    //     ...data,
    //     price: data?.price.toString(),
    //     rating: data?.rating.toString()
    // }

    return convertToPlainObject({
        ...data,
        stock: data?.stock ?? 0,
        price: data?.price.toString() ?? '0',
        rating: data?.rating.toString() ?? '0',
    });
}