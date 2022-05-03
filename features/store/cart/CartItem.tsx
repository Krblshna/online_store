import Link from "next/link";
import { useAppDispatch } from "../../../app/hooks";
import { CheckoutItem } from "../intefaces";
import { removeFromCart } from "../storeSlice";
import { getSizeLabel } from "../utils";

type Props = {
    checkoutItem: CheckoutItem;
    idx: number;
};

const CartItem = ({ checkoutItem, idx }: Props) => {
    const { item, size } = checkoutItem;
    const sizeLabel = getSizeLabel(size);
    const dispatch = useAppDispatch();

    return (
        <div className="container item-container">
            <Link href={`/product/${item.id}`}>
                <a className="product-image">
                    <img src={item.image}></img>
                </a>
            </Link>
            <div className="product-details">
                <Link href={`/product/${item.id}`}>
                    <a className="product-image">
                        <p>{item.name}</p>
                    </a>
                </Link>
                <p>{`size: ${sizeLabel}`}</p>
                <div className="price-holder">
                    <span className="price-sale">{item.special}</span>
                    <span className="price">{item.price}</span>
                </div>
                <button
                    role="close-button"
                    className="close-button"
                    onClick={() => {
                        dispatch(removeFromCart(idx));
                    }}
                ></button>
            </div>
        </div>
    );
};
export default CartItem;
