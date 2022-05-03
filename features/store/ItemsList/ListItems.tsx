import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchPageAction, selectStore } from "../storeSlice";
import ListItem from "./ListItem";

type Props = {
    page_num?: number;
};

const ListItems = ({ page_num = 1 }: Props) => {
    const dispatch = useAppDispatch();
    const store = useAppSelector(selectStore);
    useEffect(() => {
        dispatch(fetchPageAction(page_num));
    }, [page_num]);
    if (store.items.length === 0) return <div></div>;
    const items = store.items.map((item) => {
        return <ListItem item={item} key={item.id} />;
    });

    return <div className="items-list">{items}</div>;
};

export default ListItems;
