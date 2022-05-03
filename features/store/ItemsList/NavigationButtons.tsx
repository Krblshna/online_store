import Link from "next/link";
import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectStore } from "../storeSlice";

type Props = {
    page_num: number;
};

const NavigationButtons = ({ page_num }: Props) => {
    const store = useAppSelector(selectStore);
    if (store.loading) return <div></div>;
    const pageCount = store.pageCount;
    const prevActive = page_num > 1;
    const nextActive = page_num < pageCount;
    return (
        <div className="nav-buttons-wrapper">
            {prevActive && (
                <Link href={`/?page=${page_num - 1}`}>
                    <button className="nav-button">
                        <span>Prev Page</span>{" "}
                    </button>
                </Link>
            )}
            {nextActive && (
                <Link href={`/?page=${page_num + 1}`}>
                    <button className="nav-button">
                        <span>Next Page</span>
                    </button>
                </Link>
            )}
        </div>
    );
};
export default NavigationButtons;
