import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import Link from "next/link";
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";


//sfc
const Menu = () => {
    return (
        <div className='flex justify-end gap-3'>
            <nav className='hidden md:flex w-full max-w-xs gap-1'>
                <ModeToggle />
                <Button asChild variant='ghost'>
                    <Link href='/cart'>
                        <ShoppingCart /> Cart
                    </Link>
                </Button>
                <Button asChild variant='ghost'>
                    <Link href='/sign-in'>
                        <UserIcon /> Sign In
                    </Link>
                </Button>
            </nav>
            <nav className='md:hidden'>
                <Sheet>
                    <SheetTrigger className='align-middle'>
                        <EllipsisVertical />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader className='flex flex-col items-start ml-2' >
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <div className='flex flex-col items-start ml-2'>
                            <ModeToggle />
                            <Button asChild variant='ghost'>
                                <Link href='/cart'>
                                    <ShoppingCart />
                                </Link>
                            </Button>
                            <Button asChild variant='ghost'>
                                <Link href='/sign-in'>
                                    <UserIcon /> Sign In
                                </Link>
                            </Button>
                        </div>
                        <SheetDescription></SheetDescription>
                    </SheetContent>
                </Sheet>
            </nav>
        </div >

    );
}



export default Menu;