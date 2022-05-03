import { ShopItem } from "../intefaces";
import Link from "next/link";

type Props = { item: ShopItem };

const ListItem = ({ item }: Props) => {
    return (
        <Link href={`/product/${item.id}`}>
            <a>
                <div className="item">
                    <div className="dress-img-wrapper">
                        <img className="dress-img" src={item.image} />
                    </div>

                    <p>{item.name}</p>
                </div>
            </a>
        </Link>
    );
};

export default ListItem;
