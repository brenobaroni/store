
"use server"

import { get } from "http"
import { getProducstList } from "../actions/storeActions"
import Products from "@/components/products.component";


// Server Components needs be async
export default async function HomePage() {
    const productsHeader = await getProducstList("jewelery");


    return (
        <div className="flex flex-col w-full h-svh p-20 bg-content1">
            <div className="flex w-full h-svh items-center justify-start bg-content2">
                <Products list={productsHeader} />
            </div>
        </div>
    )


}