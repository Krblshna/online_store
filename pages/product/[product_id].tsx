import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ShopItem } from "../../features/store/intefaces";
import Layout from "../../features/store/common/Layout";
import SizeSelector from "../../features/store/product/SizeSelector";
import { fetchProductInfo } from "../../features/store/storeAPI";
import Image from "next/image";

import { addToCart, selectStore } from "../../features/store/storeSlice";
import { decodeEntities } from "../../features/store/utils";

function WrongId() {
    return <div></div>;
}

const ProductPage = () => {
    const dispatch = useAppDispatch();
    const store = useAppSelector(selectStore);
    const router = useRouter();
    const { product_id } = router.query;

    const [fetchedItem, setFetchedItem] = useState<ShopItem>();
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
    const [sizeNotSelectedError, setSizeNotSelectedError] =
        useState<boolean>(false);
    const currentSize = store.currentSize;
    useEffect(() => {
        setSizeNotSelectedError(false);
        return () => {
            setSizeNotSelectedError(false);
        };
    }, [currentSize]);

    useEffect(() => {
        (async () => {
            if (typeof product_id !== "string") return WrongId();
            const result = await fetchProductInfo(parseInt(product_id));
            setFetchedItem(result);
        })();
    }, [product_id]);

    if (typeof product_id !== "string") return WrongId();
    const cachedItem = store.items.find(
        (item) => item.id === parseInt(product_id)
    );
    let item = fetchedItem || cachedItem;

    if (typeof item === "undefined") {
        return WrongId();
    }

    function clearButtonTimeout() {
        clearTimeout(timeoutId as NodeJS.Timeout);
        setTimeoutId(undefined);
    }

    function TryAddItem() {
        if (typeof item === "undefined") return;
        if (!currentSize) {
            return setSizeNotSelectedError(true);
        }
        const id = setTimeout(clearButtonTimeout, 3000);
        setTimeoutId(id);
        dispatch(addToCart([item, currentSize]));
    }
    return (
        <Layout>
            <div className="product-page">
                <img
                    className="product-image"
                    src={item.image}
                    alt="dress image"
                />
                <div className="details-container">
                    <h1 className="product-name">{item.name}</h1>
                    <p className="price-holder">
                        <span className="price-sale">{item.special}</span>
                        <span className="price">{item.price}</span>
                    </p>
                    <div className="size-container">
                        <p>size:</p>
                        <SizeSelector item={item} />
                    </div>
                    {timeoutId ? (
                        <button className="add-to-bag-button added">
                            Added
                        </button>
                    ) : (
                        <button
                            role="button"
                            className="add-to-bag-button"
                            onClick={() => TryAddItem()}
                        >
                            Add to Bag
                        </button>
                    )}
                    {sizeNotSelectedError && (
                        <div className="size-validation-error">
                            Please select size
                        </div>
                    )}
                    <div
                        className="product-description"
                        dangerouslySetInnerHTML={{
                            __html: decodeEntities(item.description),
                        }}
                    ></div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductPage;
