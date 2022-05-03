import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectStore } from "../storeSlice";
import CartItem from "./CartItem";

const CartItems = () => {
    const store = useAppSelector(selectStore);
    const items = store.cart.map((checkoutItem, idx) => (
        <CartItem key={idx} idx={idx} checkoutItem={checkoutItem} />
    ));
    return <React.Fragment>{items}</React.Fragment>;
};

export default CartItems;
