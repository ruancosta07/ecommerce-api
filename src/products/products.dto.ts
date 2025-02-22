import { ReviewDto } from "../reviews/reviews.dto";

export class ProductsDto {
    id: string;
    name: string;
    price: number;
    description: string;
    images?: string[];
    tags: string[];
    order: string[];
    userId: string;
    reviews:ReviewDto[]
    stripeProductId?:string
    constructor(partial: Partial<ProductsDto>) {
        Object.assign(this, partial);
    }
}
