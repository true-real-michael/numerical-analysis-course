import React from "react";
import styles from "./Output.module.scss";
import FunctionGraph from "../FunctionGraph/FunctionGraph";

type Props = {
    output: Task2Answer | undefined | { error: string };
    isLoading?: boolean;
    defaultFunc: string;
};
const Output: React.FC<Props> = ({ output, isLoading, defaultFunc }) => {
    console.log(defaultFunc);
    return (
        <div>
            {isLoading && <h4 className={styles.loading}>Loading</h4>}
            {!isLoading && output && !("error" in output) && (
                <>
                    <div className={styles.info}>
                        <div className={styles.head}>
                            <span>Метод:</span>
                            <span>Полином:</span>
                            <span>Погрешность:</span>
                        </div>
                        <div className={styles.body}>
                            {output?.approximation_by_method.map((method) => (
                                <div key={method.name} className={styles.row}>
                                    <span>{method.name}</span>
                                    <span>{method.polynomial}</span>
                                    <span>{method.error}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <FunctionGraph output={output} defaultFunc={defaultFunc} />
                    <div className={styles.dots}>
                        <span>Точки:</span>
                        {output?.points.map((point, index) => (
                            <span className={styles.point} key={index}>
                                (x: {point[0]}, y: {point[1]})
                                {index !== output.points.length - 1 && ","}
                            </span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Output;
