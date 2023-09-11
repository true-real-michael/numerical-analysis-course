import React from "react";
import styles from "./Output.module.scss";

type Props = {
    output: string;
    isLoading?: boolean;
};
const Output: React.FC<Props> = ({ output, isLoading }) => {
    return (
        <div className={styles.frame}>
            {isLoading ? <span>Loading...</span> : <p>{output}</p>}
        </div>
    );
};

export default Output;
