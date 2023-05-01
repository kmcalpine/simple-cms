import { Product } from "../../types/product";
import { ProductWrapper, ProductImage, ProductTitle, Options } from "./styles";

export const ProductItem = ({ product }: { product: Product }) => {
    return (
        <ProductWrapper>
            <ProductImage src={product.images[0].url} />
            <ProductTitle>{product.info.name}</ProductTitle>
            <Options>Buttons</Options>
        </ProductWrapper>
    );
};
