import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { makeStore } from "../app/store";
import { render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import {
    test_page_info,
    test_product_info,
} from "../features/test-utils/test_data";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../features/test-utils/createMockRouter";
import ListItems from "../features/store/ItemsList/ListItems";
import { fetchPageAction } from "../features/store/storeSlice";

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
];

global.fetch = jest.fn();

const server = setupServer(...handlers);

jest.mock("next/link", () => {
    return ({ children }: any) => {
        return children;
    };
});

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("Items Page", () => {
    it("check fetch products", () => {
        const store = makeStore();
        store.dispatch(fetchPageAction(1)).then(() => {
            expect(store.getState().store.items.length).toBe(8);
        });
    });
    it("renders list items", async () => {
        const store = makeStore();
        await store.dispatch(fetchPageAction(1));
        await act(async () => {
            render(
                <Provider store={store}>
                    <RouterContext.Provider
                        value={createMockRouter({ query: { page: "" } })}
                    >
                        <ListItems />
                    </RouterContext.Provider>
                </Provider>
            );
        });

        expect(
            screen.getByText("Iridescent Sequin Bodycon Dress in Pink")
        ).toBeInTheDocument();
    });
});
