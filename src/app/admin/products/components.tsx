"use client"

import { ReactNode, useTransition, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { Product } from "@prisma/client"

import {
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductAvailability,
} from "./actions"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/formatters"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export function ActiveToggleDropdownItem({
    id,
    isAvailableForPurchase,
}: {
    id: string
    isAvailableForPurchase: boolean
}) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <DropdownMenuItem
            disabled={isPending}
            onClick={() => {
                startTransition(async () => {
                    await toggleProductAvailability(id, !isAvailableForPurchase)
                    router.refresh()
                })
            }}
        >
            {isAvailableForPurchase ? "Deactivate" : "Activate"}
        </DropdownMenuItem>
    )
}

export function DeleteDropdownItem({
    id,
    disabled,
}: {
    id: string
    disabled: boolean
}) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <DropdownMenuItem
            disabled={disabled || isPending}
            onClick={() => {
                startTransition(async () => {
                    await deleteProduct(id)
                    router.refresh()
                })
            }}
        >
            Delete
        </DropdownMenuItem>
    )
}

export function PageHeader({ children }: { children: ReactNode }) {
    return <h1 className="text-4xl mb-4">{children}</h1>
}

export function ProductForm({ product }: { product?: Product | null }) {
    const [error, action] = useFormState(
        product == null ? addProduct : updateProduct.bind(null, product.id),
        {}
    )
    const [priceInCents, setPriceInCents] = useState<number | undefined>(
        product?.priceInCents
    )

    return (
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    required
                    defaultValue={product?.name || ""}
                />
                {error.name && <div className="text-destructive">{error.name}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="priceInCents">Price In Cents</Label>
                <Input
                    type="number"
                    id="priceInCents"
                    name="priceInCents"
                    required
                    value={priceInCents}
                    onChange={e => setPriceInCents(Number(e.target.value) || undefined)}
                />
                <div className="text-muted-foreground">
                    {formatCurrency((priceInCents || 0) / 100)}
                </div>
                {error.priceInCents && (
                    <div className="text-destructive">{error.priceInCents}</div>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    required
                    defaultValue={product?.description}
                />
                {error.description && (
                    <div className="text-destructive">{error.description}</div>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input type="file" id="file" name="file" required={product == null} />
                {product != null && (
                    <div className="text-muted-foreground">{product.filePath}</div>
                )}
                {error.file && <div className="text-destructive">{error.file}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input type="file" id="image" name="image" required={product == null} />
                {product != null && (
                    <Image
                        src={product.imagePath}
                        height="400"
                        width="400"
                        alt="Product Image"
                    />
                )}
                {error.image && <div className="text-destructive">{error.image}</div>}
            </div>
            <SubmitButton />
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Saving..." : "Save"}
        </Button>
    )
}