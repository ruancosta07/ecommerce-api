import { IsArray, IsNumber, IsString } from "class-validator";
import { OrderDto } from "../orders/orders.dto";
import { ProductsDto } from "../products/products.dto";
import { ReviewDto } from "../reviews/reviews.dto";

class ProductsUserDto {
    @IsString()
    id: string
    @IsString()
    name: string
    @IsNumber()
    price: number
    @IsArray()
    images: string[]
    quantity?:number
}

export class UserDto {
    id: string;
    name: string;
    email: string;
    password?: string;
    avatar?: string;
    twoStepsAuth: boolean;
    twoStepsAuthCode?: number;
    adress?: {
        zipCode: number;
        street: string;
        complement: string;
        state: string;
        city: string;
        neighborhood: string
        number:string
    };
    reviews?: ReviewDto[];
    orders?: OrderDto[];
    favorites: ProductsUserDto[];
    cart: ProductsUserDto[];
    products?: ProductsDto[];
    role: 'client' | 'seller';
    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
    }
}
