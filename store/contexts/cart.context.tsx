




import { createContext, useContext, useMemo, useState } from 'react';


const CartContext = createContext<any>(null);



export default function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);

    const addToCart = (item: any) => {
        setCart((prevCart: any) => [...prevCart, item]);
        setTotal((prevTotal: number) => prevTotal + item.price);
    };

    const removeFromCart = (itemId: string) => {
        const itemToRemove = cart.find((item: any) => item.id === itemId);

        if (!itemToRemove) return;

        setCart((prevCart: any) => prevCart.filter((item: any) => item.id !== itemId));
        setTotal((prevTotal: number) => prevTotal - itemToRemove.price);
    };

    // Test
    const totalPrice = useMemo(() => {
        const subtotal = cart.reduce((acc: number, item: any) => acc + item.price, 0);
        return subtotal;
    }, [cart, tax])

    const totalTax = useMemo(() => {
        const subtotal = cart.reduce((acc: number, item: any) => acc + item.price, 0);
        return subtotal * tax;
    }, [cart, tax])

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalPrice, totalTax, setTax }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCartContext() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
}