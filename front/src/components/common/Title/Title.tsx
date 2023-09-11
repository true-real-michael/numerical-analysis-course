import React from "react";
import styles from "./Title.module.scss";

type Props = {
    title: string;
    small?: boolean;
};
const Title: React.FC<Props> = ({ title, small }) => {
    return <>{small ? <h3>{title}</h3> : <h1>{title}</h1>}</>;
};

export default Title;
