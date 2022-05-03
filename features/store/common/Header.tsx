import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "../../../app/hooks";
import { selectStore } from "../storeSlice";

const Header = () => {
    const store = useAppSelector(selectStore);
    const productAmount = store.cart.length;
    const cartLabel = productAmount > 0 ? productAmount : "";
    return (
        <div className="header-wrapper">
            <Link href="/">
                <a className="logo">Zavrin Store</a>
            </Link>
            <Link href="/cart">
                <a>
                    <ul>
                        <li>
                            <Image
                                className="cart-img"
                                src="/shopping-cart.png"
                                alt="cart"
                                width="32"
                                height="32"
                            />
                        </li>
                        <li>
                            <span className="cart-items">{cartLabel}</span>
                        </li>
                    </ul>
                </a>
            </Link>
        </div>
    );
};
export default Header;
