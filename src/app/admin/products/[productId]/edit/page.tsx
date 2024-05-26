import { getProductById } from "../../actions"
import { PageHeader, ProductForm } from "../../components"

export default async function EditProductPage({
    params: { id },
}: {
    params: { id: string }
}) {
    const product = await getProductById(id)

    return (
        <>
            <PageHeader>Edit Product</PageHeader>
            <ProductForm product={product} />
        </>
    )
}