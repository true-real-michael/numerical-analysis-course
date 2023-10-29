import React from "react";
import { FuncValuesTable } from "../../../utils/task3.1/Interpolation";
import styles from "./Output.module.scss";
import { Table } from "../../../utils/task3.2/solver";

type Props = {
    result:
        | {
              valuesTable: FuncValuesTable;
              resultTable: (string | number | null)[][];
          }
        | undefined;
    isLoading: boolean;
};
const Output: React.FC<Props> = ({ result, isLoading }) => {
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
                                    {result?.valuesTable?.nodes.map((node) => (
                                        <span key={node}>{node}</span>
                                    ))}
                                </div>
                                <div>
                                    <span>f(x)</span>
                                    {result?.valuesTable?.values.map(
                                        (value) => (
                                            <span key={value}>{value}</span>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.main_table}>
                        {result.resultTable.map(
                            (row: (string | number | null)[]) => {
                                console.log(row);
                                return (
                                    <div key={row[0]}>
                                        {row.map((elem) => (
                                            <span key={elem}>{elem}</span>
                                        ))}
                                    </div>
                                );
                            }
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Output;
