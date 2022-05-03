import usePage from "../features/hooks/usePage";
import ListItems from "../features/store/ItemsList/ListItems";
import NavigationButtons from "../features/store/ItemsList/NavigationButtons";
import Layout from "../features/store/common/Layout";

const Home = () => {
    const page_num = usePage();
    return (
        <Layout>
            <ListItems page_num={page_num} />
            <NavigationButtons page_num={page_num} />
        </Layout>
    );
};

export default Home;
