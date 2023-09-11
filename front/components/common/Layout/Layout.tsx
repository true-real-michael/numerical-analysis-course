import React, { ReactNode } from "react";
import styles from "./Layout.module.scss";
import Title from "../Title/Title";
import Navbar from "../Navbar/Navbar";

type Props = {
    children: ReactNode;
    title: string;
};
const Layout: React.FC<Props> = ({ children, title }) => {
    return (
        <div className={styles.wrapper}>
            <Title title={title} />
            <Navbar />
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default Layout;
