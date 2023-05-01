import { useEffect, useContext, useState } from "react";
import { AxiosContext } from "../../../context/Axios";
import { Layout, Title } from "./styles";

export const Products = () => {
    const { get } = useContext(AxiosContext);
    const [products, setProducts] = useState([]);

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
            <Title>Products</Title>
        </Layout>
    );
};
