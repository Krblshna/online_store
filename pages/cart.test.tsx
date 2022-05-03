import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import user from "@testing-library/user-event";
import { makeStore } from "../app/store";
import { render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { test_page_info } from "../features/test-utils/test_data";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../features/test-utils/createMockRouter";
import {
    addToCart,
    fetchPageAction,
    makeOrder,
    setSize,
} from "../features/store/storeSlice";
import Cart from "./cart";
import { SizeType } from "../features/store/intefaces";

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
    rest.get("http://localhost:3000/product", (req, res, ctx) => {
        return res(ctx.json(test_page_info), ctx.delay(150));
    }),
    rest.post("http://localhost:3000/checkout/placeOrder/", (req, res, ctx) => {
        return res(ctx.json({ orderId: 50522 }), ctx.delay(150));
    }),
];

global.fetch = jest.fn();

const server = setupServer(...handlers);

jest.mock("next/link", () => {
    return ({ children }: any) => {
        return children;
    };
});

// Enable API mocking before tests.
beforeAll(() => {
    server.listen();
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("Cart page", () => {
    it("remove from cart", async () => {
        const store = makeStore();
        await store.dispatch(fetchPageAction(1));
        await store.dispatch(setSize(SizeType.Small));
        const firstItem = store.getState().store.items[0];
        await store.dispatch(addToCart([firstItem, SizeType.Small]));
        expect(store.getState().store.cart.length).toBe(1);
        await act(async () => {
            render(
                <Provider store={store}>
                    <RouterContext.Provider value={createMockRouter({})}>
                        <Cart />
                    </RouterContext.Provider>
                </Provider>
            );
        });
        expect(
            screen.getByText("Iridescent Sequin Bodycon Dress in Pink")
        ).toBeInTheDocument();
        await user.click(screen.getByRole("close-button"));
        expect(store.getState().store.cart.length).toBe(0);
        expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    });

    it("make checkout", async () => {
        const store = makeStore();
        await store.dispatch(fetchPageAction(1));
        await store.dispatch(setSize(SizeType.Small));
        const firstItem = store.getState().store.items[0];
        await store.dispatch(addToCart([firstItem, SizeType.Small]));
        expect(store.getState().store.cart.length).toBe(1);
        await act(async () => {
            render(
                <Provider store={store}>
                    <RouterContext.Provider value={createMockRouter({})}>
                        <Cart />
                    </RouterContext.Provider>
                </Provider>
            );
        });
        expect(screen.getByText("Check out")).toBeInTheDocument();
        await act(async () => {
            await store.dispatch(makeOrder(store.getState().store.cart));
        });
        expect(store.getState().store.cart.length).toBe(0);
        expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    });
});
