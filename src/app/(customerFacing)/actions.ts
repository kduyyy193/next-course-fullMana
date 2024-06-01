import db from "@/database/db"
import { cache } from "@/lib/cache"

export const getMostPopularProducts = cache(
    () => {
        return db.product.findMany({
            where: { isAvailableForPurchase: true },
            orderBy: { orders: { _count: "desc" } },
            take: 6,
        })
    },
    ["/", "getMostPopularProducts"],
    { revalidate: 60 * 60 * 24 }
)

export const getNewestProducts = cache(() => {
    return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { createdAt: "desc" },
        take: 6,
    })
}, ["/", "getNewestProducts"])

export const getProducts = cache(() => {
    return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { name: "asc" },
    })
}, ["/products", "getProducts"])
