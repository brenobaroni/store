
"use client";

import { useCartContext } from "@/contexts/cart.context";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { Button, Card, CardBody, CardFooter, CardHeader, Image } from "@heroui/react";
import { useMemo } from "react";

type ProductsProps = {
    list: any[]
}

export default function Products({ list }: ProductsProps) {
    const { addToCart } = useCartContext();
    const listItems = useMemo(() => {
        return list;
    }, [list]);

    return (
        <div className="flex h-[500px] max-w-[1680px] overflow-x-auto p-5 bg-content2 text-foreground-600 gap-5">
            {listItems?.map((item, index): any => (
                <Card key={`product__${item.id}`} className="w-[300px]">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold">{item.title}</p>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src={`${item.image}`}
                            width={270} height={270} />
                    </CardBody>
                    <CardFooter>
                        <Button onPress={() => addToCart(item)} className="flex w-[140px]" startContent={<ShoppingBagIcon className="flex text-foreground-700"></ShoppingBagIcon>} size="lg">Add</Button>
                        <div className="flex w-full h-10 items-center justify-end text-[24px]">
                            Price: ${item.price}
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )

}