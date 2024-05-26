import { Navigation, NavigationLink } from "@/components/Navigation"

export const dynamic = "force-dynamic"

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Navigation>
                <NavigationLink href="/">Home</NavigationLink>
                <NavigationLink href="/products">Products</NavigationLink>
                <NavigationLink href="/orders">My Orders</NavigationLink>
            </Navigation>
            <div className="container my-6">{children}</div>
        </>
    )
}