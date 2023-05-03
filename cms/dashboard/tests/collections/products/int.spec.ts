import { describe, it, test, expect } from "vitest";
import {
    type Product,
    ProductInfo,
    ProductImage,
    ProductTag
} from "../../../src/types/product/";
import { create } from "../../api";

describe("Auth", () => {
    test("should authenticate user", async () => {
        const payload = {
            email: "kurtismcalpine@gmail.com",
            password: "password"
        };
        try {
            const createArgs = {
                data: { ...payload },
                slug: "auth/login"
            };
            await create(createArgs).then((res) => {
                expect(res.status).toEqual(200);
            });
        } catch (error) {
            console.log(error);
        }
    });
});

describe("Products", () => {
    test("should create a new product", async () => {
        const productInfo: ProductInfo = {
            name: "Product 1",
            description: "Desc 1",
            price: 13.13
        };

        const productImages: ProductImage[] = [
            {
                url: "url",
                tag: "Image tag"
            }
        ];

        const productTags: ProductTag[] = [
            {
                tag: "Tag"
            }
        ];

        const product = {
            name: "name",
            description: "desc",
            price: 13,
            images: [],
            tags: []
        };

        try {
            const createArgs = {
                data: { ...product },
                slug: "products/"
            };
            await create(createArgs).then((res) => {
                expect(res.status).toEqual(200);
            });
        } catch (error) {
            console.log(error);
        }
    });
});
