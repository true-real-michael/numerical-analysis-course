import React from "react";
import { FuncValuesTable } from "../../../utils/task3.1/Interpolation";
import styles from "./Output.module.scss";

type Props = {
    result:
        | {
              table: FuncValuesTable | null;
              reversedTabel: FuncValuesTable | null;
              methods: { value: number; error: number }[] | null;
              additionalInfo: string | null;
          }
        | undefined;
    isLoading: boolean;
    f: number;
};
const Output: React.FC<Props> = ({ result, isLoading, f }) => {
    return (
        <div className={styles.container}>
            {isLoading && <p>Рассчитываем...</p>}
            {!isLoading && result && (
                <>
                    <div className={styles.row}>
                        <div className={styles.table_and_title}>
                            <h4>Таблица значений</h4>
                            <div className={styles.table}>
                                <div>
                                    <span>x</span>
                                    {result?.table?.nodes.map((node) => (
                                        <span key={node}>{node}</span>
                                    ))}
                                </div>
                                <div>
                                    <span>f(x)</span>
                                    {result?.table?.values.map((value) => (
                                        <span key={value}>{value}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={styles.table_and_title}>
                            <h4>Таблицы отраженных значений</h4>
                            <div className={styles.table}>
                                <div>
                                    <span>x</span>
                                    {result?.reversedTabel?.nodes.map(
                                        (node) => (
                                            <span key={node}>{node}</span>
                                        )
                                    )}
                                </div>
                                <div>
                                    <span>f(x)</span>
                                    {result?.reversedTabel?.values.map(
                                        (value) => (
                                            <span key={value}>{value}</span>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.methods}>
                        {result?.methods?.map((method, index) => (
                            <div key={index}>
                                <span className={styles.index}>
                                    Метод №{index + 1}
                                </span>
                                <span>
                                    Q({f}): {method.value}
                                </span>
                                <span>|f(x)-F|: {method.error}</span>
                            </div>
                        ))}
                    </div>
                    {result?.additionalInfo &&
                        result?.additionalInfo?.length > 0 && (
                            <p>{result?.additionalInfo}</p>
                        )}
                </>
            )}
        </div>
    );
};

export default Output;
