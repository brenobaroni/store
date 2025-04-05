
"use client"

import { useCartContext } from "@/contexts/cart.context";
import { states } from "@/data/states";
import { CreditCardIcon } from "@heroicons/react/16/solid";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, Select, SelectItem, useDisclosure } from "@heroui/react"

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { totalPrice, totalTax, setTax, cart, removeFromCart } = useCartContext();

    const onSelectStateHandler = (value: string) => {
        const tax = states.find((state) => state.sigla === value)?.imposto || 0;
        setTax(tax);
    }

    return (
        <div className="flex w-full top-0 h-16 justify-between bg-amber-400 text-foreground-500">
            {/* Init Content */}
            <div className="flex w-4/12 h-full items-center justify-start">

            </div>

            {/* mid Content */}
            <div className="flex w-4/12 h-full items-center justify-start">

            </div>

            {/* End Content */}
            <div className="flex w-4/12 h-full items-center justify-end px-5 gap-5">
                <Select
                    className="max-w-xs"
                    size="sm"
                    defaultSelectedKeys={["NY"]}
                    label="Select your State"
                    placeholder="Select your State"
                    onSelectionChange={(value) => onSelectStateHandler(Array.from(value)[0].toString())}
                >
                    {states.map((state) => (
                        <SelectItem key={state.sigla}>{state.nome}</SelectItem>
                    ))}
                </Select>
                <Button onPress={onOpen} variant="solid" color="primary" className="flex items-center justify-center gap-2">
                    <ShoppingCartIcon width={20}></ShoppingCartIcon> Cart
                </Button>
            </div>

            <Drawer isOpen={isOpen} size={"xs"} onClose={onClose} className="!text-foreground-500">
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-row gap-1"><ShoppingCartIcon width={30}></ShoppingCartIcon>Your Cart</DrawerHeader>
                            <DrawerBody>
                                <div className="flex flex-col p-1 gap-2">
                                    {cart?.map((item: any) => (
                                        <div key={item.id} className="flex w-full h-16 items-center bg-content2 p-3 rounded-md">
                                            <div className="text-xs font-bold">{item.title}</div>
                                            <Button isIconOnly variant="light" color="danger" className="ml-auto" onPress={() => removeFromCart(item.id)} >
                                                <TrashIcon width={20}></TrashIcon>
                                            </Button>
                                        </div>

                                    ))}
                                </div>
                            </DrawerBody>
                            <DrawerFooter>
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col w-full justify-end text-end">
                                        <p className="text-xl font-bold">Total: ${totalPrice}</p>
                                        <p className="text-xl font-bold">Taxes: ${totalTax}</p>
                                    </div>

                                    <div className="flex w-full justify-end">
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button className="flex w-[200px]" endContent={<CreditCardIcon width={24}></CreditCardIcon>} color="primary" onPress={onClose}>
                                            Go to Payment
                                        </Button>

                                    </div>

                                </div>

                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </div>
    )
}