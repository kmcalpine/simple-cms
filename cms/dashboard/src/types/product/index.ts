export interface Product {
    info: ProductInfo;
    images: ProductImage[];
    tags: ProductTag[];
}

export interface ProductInfo {
    name: string;
    description: string;
    price: number;
}

export interface ProductImage {
    tag: string;
    url: string;
}

export interface ProductTag {
    tag: string;
}

export type ProductCreate = Required<Product>;
export type ProductUpdate = Partial<Product>;
