import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ShopItem, SizeType } from "../intefaces";
import { selectStore, setSize } from "../storeSlice";
import { getSizeLabel } from "../utils";

type Props = { item: ShopItem };

const SizeSelector = ({ item }: Props) => {
    const dispatch = useAppDispatch();
    const store = useAppSelector(selectStore);
    function onChange(selectedSize: SizeType) {
        dispatch(setSize(selectedSize));
    }

    const sizes = item.sizes.map((size) => {
        const sizeLabel = getSizeLabel(size);
        return (
            <option
                value={size}
                role="option"
                key={size}
            >{`${sizeLabel} - ${size} Size`}</option>
        );
    });
    return (
        <select
            value={store.currentSize}
            role="listbox"
            onChange={(e) => onChange(e.target.value as SizeType)}
        >
            <option value="">Please select:</option>
            {sizes}
        </select>
    );
};
export default SizeSelector;
