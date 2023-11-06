import React from "react";
import { FuncValuesTable } from "../../../utils/task3.1/Interpolation";
import styles from "./Output.module.scss";

type Props = {
    result:
        | {
              table: FuncValuesTable | null;
              reversedTabel: FuncValuesTable | null;
              selectedNodes: any[];
              method1: {
                  text: string;
                  value: string;
                  diff: string;
              };
              otherMethods:
                  | string[]
                  | { value: string; abs: string; diff: string }[];
              segments: any;
          }
        | undefined;
    isLoading: boolean;
    f: number;
};
const Output: React.FC<Props> = ({ result, isLoading, f }) => {
    console.log(result?.segments);
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
                    {/* <div className={styles.nodes}>
                        <h4> Отсортированные узлы</h4>

                        {result.selectedNodes.map((node) => (
                            <div key={node}>
                                <span>{node}</span>
                                <span>
                                    {
                                        result.reversedTabel.values[
                                            result.reversedTabel?.nodes.indexOf(
                                                node
                                            )
                                        ]
                                    }
                                </span>
                            </div>
                        ))}
                    </div> */}
                    {/* <div className={styles.sorted_nodes}>
                        <span className={styles.index}>
                            Отсортированные узлы
                        </span>
                        {result.selectedNodes.map((node) => (
                            <span key={node}>{node}</span>
                        ))}
                    </div> */}
                    {/* <div className={styles.table_and_title}>
                        <h4>Колличество сегментов: {result.segments.length}</h4>
                        <div className={styles.table_segments}>
                            <div>
                                {result?.segments.map(
                                    (segment: any, index: any) => (
                                        <span key={index}>{index + 1}</span>
                                    )
                                )}
                            </div>
                            <div>
                                {result?.segments.map(
                                    (segment: any, index: any) => (
                                        <span key={index}>
                                            [{segment[0]}, {segment[1]}]
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                    </div> */}
                    <div className={styles.methods}>
                        <div>
                            <span className={styles.index}>Метод №1</span>
                            <span>{result.method1.text}</span>
                            <span>{result.method1.value}</span>
                            <span>{result.method1.diff}</span>
                        </div>
                    </div>
                    {result.otherMethods.map((method, index) => {
                        if (typeof method !== "string") {
                            return (
                                <div
                                    key={method.abs}
                                    className={styles.segment_method}
                                >
                                    <span className={styles.index}>
                                        Сегмент [{result.segments[index][0]},{" "}
                                        {result.segments[index][1]}]
                                    </span>
                                    <span>{method.value}</span>
                                    <span>{method.abs}</span>
                                    <span>{method.diff}</span>
                                </div>
                            );
                        } else {
                            return (
                                <div key={method}>
                                    <span>{method}</span>
                                </div>
                            );
                        }
                    })}
                </>
            )}
        </div>
    );
};

export default Output;
