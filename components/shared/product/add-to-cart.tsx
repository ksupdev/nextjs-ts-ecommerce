'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { Cart, CartItem } from "@/types";
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/card.actions";
import { useTransition } from "react";




//sfc
const AddToCart = ({ cart, item }: { cart?: Cart, item: CartItem }) => {

    const router = useRouter();
    // const {toast} = Toaster();

    const [isPending, startTransition] = useTransition();


    const handleAddToCart = async () => {
        startTransition(async () => {
            const res = await addItemToCart(item);
            console.log('-- response ', res);
            if (!res.success) {
                toast.error(res.message, {
                    className: '!bg-red-500 !text-white !border !border-red-600 !shadow-sm'
                });
                return;
                //router.refresh();
            }
            // Handle success add to cart
            toast(`${res.message}`, {
                action: {
                    label: 'Go To Cart',
                    onClick: () => router.push('/cart')
                }, className: 'bg-primary text-white hover:bg-gray-800'
            });
        });

    };

    //Handle remove from cart
    const handleRemoveFromCart = async () => {
        startTransition(async () => {
            const res = await removeItemFromCart(item.productId);

            if (!res.success) {
                toast.error(res.message, {
                    className: '!bg-red-500 !text-white !border !border-red-600 !shadow-sm'
                });
                return;
            } else {
                toast(res.message, {
                    action: {
                        label: 'Go To Cart',
                        onClick: () => router.push('/cart')
                    }, className: 'bg-primary text-white hover:bg-gray-800'
                });
                return;
            }
        });
    };

    // Check if item is in cart
    const existItem = cart && cart.items.find((x) => x.productId === item.productId);


    return existItem ? (
        <div>
            <Button type='button' variant='outline' onClick={handleRemoveFromCart}>
                {isPending ? <Loader className='h-4 w-4 animate-spin' /> : (
                    <Minus className='h-4 w-4' />
                )}
            </Button>
            <span className="px-2">
                {existItem.qty}
            </span>
            <Button type='button' variant='outline' onClick={handleAddToCart}>
                {isPending ? <Loader className='h-4 w-4 animate-spin' /> : (
                    <Plus className='h-4 w-4' />
                )}
            </Button>
        </div>
    ) : (
        <Button className="w-full" type="button" onClick={handleAddToCart}>
            {isPending ? <Loader className='h-4 w-4 animate-spin' /> : (
                <Plus />
            )}
            {' '}Add To Cart
        </Button >
    );
}

export default AddToCart;