import React from "react";
import styles from "./Output.module.scss";

type Props = {
    output: Task4_2Answer | undefined | { error: string };
    isLoading?: boolean;
};
const Output: React.FC<Props> = ({ output, isLoading }) => {
    console.log(output);
    return (
        <div>
            {isLoading && <h4 className={styles.loading}>Loading</h4>}
            {!isLoading && output && !("error" in output) && (
                <>
                    <div className={styles.info}>
                        <span>Настоящие значение: {output.true_value}</span>
                        <div className={styles.head}>
                            <span>Метод:</span>
                            <span>Значение:</span>
                            <span>Погрешность:</span>
                        </div>
                        <div className={styles.body}>
                            {output?.approximation_by_method.map((method) => (
                                <div key={method.name} className={styles.row}>
                                    <span>{method.name}</span>
                                    <span>{method.value}</span>
                                    <span>{method.error}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Output;
