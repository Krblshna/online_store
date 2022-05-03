import { IOrder, OrderResponse, PageResponse, ShopItem } from "./intefaces";
import axios from "axios";

const SITE_URL = "http://localhost:3000";

export async function fetchPage(page: number): Promise<PageResponse> {
    const response = await axios.get(`${SITE_URL}/product?page=${page}`);
    return response.data;
}

export async function fetchProductInfo(productId: number): Promise<ShopItem> {
    const response = await axios.get(`${SITE_URL}/product/${productId}`);
    return response.data;
}

export async function callMakeOrder(
    products: IOrder[]
): Promise<OrderResponse> {
    const data = { products };
    const response = await axios.post<OrderResponse>(
        `${SITE_URL}/checkout/placeOrder/`,
        data,
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
}
