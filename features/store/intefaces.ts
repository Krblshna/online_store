export enum HttpMethod {
    GET = "GET",
    POST = "POST",
}

export enum SizeType {
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
}

export enum SizeLabel {
    Small = "S",
    Medium = "M",
    Large = "L",
}

export interface IOrder {
    id: number;
    size: string;
}

export interface OrderResponse {
    orderId: number;
}

export type CheckoutItem = {
    item: ShopItem;
    size: SizeType;
};

export type PageResponse = {
    data: ShopItem[];
    pageCount: number;
    count: number;
    total: number;
    page: number;
};

export type ShopItem = {
    id: number;
    model: string;
    name: string;
    image: string;
    description: string;
    sizes: SizeType[];
    price: string;
    special: string;
    priceInCents: number;
    specialInCents: number;
};

export type StoreState = {
    pageCount: number;
    loading: boolean;
    cart: CheckoutItem[];
    items: ShopItem[];
    currentProduct?: ShopItem;
    currentSize?: SizeType;
};
