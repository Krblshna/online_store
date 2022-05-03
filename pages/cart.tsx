import { useRouter } from "next/router";
import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import CartItems from "../features/store/cart/CartItems";
import Layout from "../features/store/common/Layout";
import { makeOrder, selectStore } from "../features/store/storeSlice";

const Cart = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const store = useAppSelector(selectStore);
    const sumCost = store.cart.reduce(
        (prevValue, orderItem) => prevValue + orderItem.item.specialInCents,
        0
    );
    function onClick() {
        dispatch(makeOrder(store.cart)).then((num) => {
            router.push(`/order-success?order_num=${num.payload}`, undefined, {
                shallow: true,
            });
        });
    }
    if (store.cart.length === 0)
        return (
            <Layout>
                <div className="back empty-cart-container">
                    <div className="empty-cart">
                        <p className="thanks-label">Your cart is empty</p>
                    </div>
                </div>
            </Layout>
        );
    return (
        <Layout>
            <div className="back">
                <div className="cart-page">
                    <div className="left-side">
                        <div className="container">
                            <p className="cart-name">Cart</p>
                        </div>
                        <CartItems />
                    </div>
                    <div className="right-side">
                        <div className="sum-container">
                            <p className="total-sum-holder">
                                <span className="total-string">Total:</span>
                                <span className="total-price">{`${
                                    sumCost / 100
                                }$`}</span>
                            </p>
                            <button className="btn-check-out" onClick={onClick}>
                                Check out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
