import { useEffect, useContext, useState } from "react";
import { AxiosContext } from "../../../context/Axios";
import { ProductItem } from "../../../components/Product";
import { Product } from "../../../types/product";
import {
    Layout,
    Title,
    TitleRow,
    Create,
    CreateWrapper,
    ProductListContainer
} from "./styles";

export const Products = () => {
    const { get } = useContext(AxiosContext);
    const [products, setProducts] = useState<Product[]>([
        {
            info: {
                name: "Product",
                description: "description",
                price: 99.99
            },
            images: [],
            tags: []
        }
    ]);

    useEffect(() => {
        const fetchProducts = async () => {
            const args = {
                slug: "products/"
            };
            await get(args).then((res) => {
                if (res.status === 200) {
                    if (!ignore) setProducts(products);
                }
            });
        };
        let ignore = false;
        fetchProducts();

        return () => {
            ignore = true;
        };
    });
    return (
        <Layout>
            <TitleRow>
                <Title>Products</Title>
                <CreateWrapper>
                    <Create href="/products/create">Create</Create>
                </CreateWrapper>
            </TitleRow>
            <ProductListContainer>
                {products.map((product) => (
                    <ProductItem product={product} />
                ))}
            </ProductListContainer>
        </Layout>
    );
};
