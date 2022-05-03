import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../features/store/common/Layout";

const WrongId = () => {
    return <div>Oops, something goes wrong</div>;
};

const OrderSuccess = () => {
    const router = useRouter();
    const { order_num } = router.query;
    if (typeof order_num !== "string") return WrongId();
    const intNum = parseInt(order_num);
    if (isNaN(intNum)) return WrongId();
    return (
        <Layout>
            <div className="back order-success-container">
                <div className="order-container">
                    <p className="thanks-label">Thanks for your order!</p>
                    <p className="order-label">Order number:</p>
                    <p className="order-num">{intNum}</p>
                    <Link href="/" passHref>
                        <button className="button-back">
                            Back to shopping
                        </button>
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default OrderSuccess;
