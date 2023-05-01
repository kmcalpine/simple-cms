import { Product } from "../../types/product";

export const ProductItem = ({ product }: { product: Product }) => {
    return <>{product.info.name}</>;
};
