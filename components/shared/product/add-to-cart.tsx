'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { CartItem } from "@/types";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";
import { addItemToCart } from "@/lib/actions/card.actions";
import { use } from "react";



//sfc
const AddToCart = ({ item }: { item: CartItem }) => {

    const router = useRouter();
    // const {toast} = Toaster();

    const handleAddToCart = async () => {
        const res = await addItemToCart(item);

        if (!res.success) {
            toast.error(res.message, {
                className: '!bg-red-500 !text-white !border !border-red-600 !shadow-sm'
            });
            return;
            //router.refresh();
        }
        // Handle success add to cart
        toast(`${item.name} added to cart ${res.message}`, {
            action: {
                label: 'Go To Cart',
                onClick: () => router.push('/cart')
            }, className: 'bg-primary text-white hover:bg-gray-800'
        });

    };

    return <Button className="w-full" type="button" onClick={handleAddToCart}>
        <Plus /> Add To Cart
    </Button>;
}

export default AddToCart;