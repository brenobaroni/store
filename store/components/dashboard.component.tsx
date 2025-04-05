
"use server"

import Navbar from "./navbar";

export default async function Dashboard({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col w-full h-full">
            <Navbar></Navbar>
            {children}
        </div>
    )
}