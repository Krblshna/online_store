import { useRouter } from "next/router";
import { useAppSelector } from "../../app/hooks";
import { selectStore } from "../store/storeSlice";

const initPage = 1;

const usePage = () => {
    const router = useRouter();
    const store = useAppSelector(selectStore);
    const pageCount = store.pageCount;
    let { page } = router.query;
    if (typeof page !== "string") {
        page = initPage.toString();
    }
    let page_num = parseInt(page) || initPage;
    page_num = page_num <= pageCount ? page_num : pageCount;
    return page_num;
};

export default usePage;
