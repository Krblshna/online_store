import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import user from "@testing-library/user-event";
import { makeStore } from "../../app/store";
import { render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import {
    test_page_info,
    test_product_info,
    test_product_info2,
} from "../../features/test-utils/test_data";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../features/test-utils/createMockRouter";
import { fetchPageAction } from "../../features/store/storeSlice";
import ProductPage from "./[product_id]";
import { fetchProductInfo } from "../../features/store/storeAPI";

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
    rest.get("http://localhost:3000/product", (req, res, ctx) => {
        return res(ctx.json(test_page_info), ctx.delay(150));
    }),
    rest.get("http://localhost:3000/product/51080", (req, res, ctx) => {
        return res(ctx.json(test_product_info), ctx.delay(150));
    }),
    rest.get("http://localhost:3000/product/49130", (req, res, ctx) => {
        return res(ctx.json(test_product_info2), ctx.delay(150));
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

describe("Product page", () => {
    it("api product info", async () => {
        fetchProductInfo(51080).then((data) => {
            return expect(data).toStrictEqual(test_product_info);
        });
    });

    it("test selector", async () => {
        const store = makeStore();
        await store.dispatch(fetchPageAction(1));
        await act(async () => {
            render(
                <Provider store={store}>
                    <RouterContext.Provider
                        value={createMockRouter({
                            query: { product_id: "51080" },
                        })}
                    >
                        <ProductPage />
                    </RouterContext.Provider>
                </Provider>
            );
        });
        await user.selectOptions(screen.getByRole("listbox"), ["Small"]);
        expect(
            await screen.getByRole<HTMLOptionElement>("option", {
                name: "S - Small Size",
            }).selected
        ).toBe(true);
        expect(store.getState().store.currentSize).toBe("Small");
    });

    it("add product to cart", async () => {
        const store = makeStore();
        await store.dispatch(fetchPageAction(1));
        await act(async () => {
            render(
                <Provider store={store}>
                    <RouterContext.Provider
                        value={createMockRouter({
                            query: { product_id: "49130" },
                        })}
                    >
                        <ProductPage />
                    </RouterContext.Provider>
                </Provider>
            );
        });
        expect(store.getState().store.cart.length).toBe(0);
        await user.click(screen.getByRole("button", { name: /Add to Bag/i }));
        expect(store.getState().store.cart.length).toBe(0);
        await user.selectOptions(screen.getByRole("listbox"), ["Small"]);
        await user.click(screen.getByRole("button", { name: /Add to Bag/i }));
        expect(
            screen.getByRole<HTMLOptionElement>("option", {
                name: "S - Small Size",
            }).selected
        ).toBe(true);
        expect(store.getState().store.cart.length).toBe(1);
    });
});
