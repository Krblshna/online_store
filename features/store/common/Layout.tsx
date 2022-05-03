import { ReactNode } from "react";
import Header from "./Header";
import Head from "next/head";

type Props = {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div>
            <div>
                <Head>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:Inter:wght@400;500;700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
            </div>
            <div>
                <Header />
                {children}
            </div>
        </div>
    );
};
export default Layout;
