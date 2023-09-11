import React from "react";
import styles from "./Output.module.scss";
import { Task1Type } from "../../../types/task1Type";

type Props = {
    output: Task1Type | undefined;
    isLoading?: boolean;
};
const Output: React.FC<Props> = ({ output, isLoading }) => {
    return (
        <div className={styles.frame}>
            {isLoading && <span className={styles.loading}>Loading...</span>}
            {!isLoading && output && (
                <div className={styles.frame}>
                    <div className={styles.base_data_row}>
                        <span>Epsilon: {output?.eps}</span>
                        <span>N: {output?.n_divisions}</span>
                    </div>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Левая граница</th>
                                <th>Правая граница</th>
                                <th>Настоящий корень</th>
                                <th>Список приближений для каждого метода:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {output.selected_divisions.map(
                                (division, index) => (
                                    <tr key={index}>
                                        <td>{division.left_bound}</td>
                                        <td>{division.right_bound}</td>
                                        <td>{division.true_value}</td>
                                        <td>
                                            <ul className={styles.methods}>
                                                {division.approximations_by_method.map(
                                                    (method, methodIndex) => (
                                                        <li key={methodIndex}>
                                                            <span
                                                                className={
                                                                    styles.method_name
                                                                }
                                                            >
                                                                {
                                                                    method.method_name
                                                                }
                                                            </span>
                                                            <br />
                                                            <span
                                                                className={
                                                                    styles.steps
                                                                }
                                                            >
                                                                За сколько шагов
                                                                сошлись:{" "}
                                                                {
                                                                    method.n_of_steps
                                                                }
                                                            </span>
                                                            <br />
                                                            <span>
                                                                f(x):{" "}
                                                                {
                                                                    method.residual
                                                                }
                                                            </span>
                                                            <table>
                                                                <thead>
                                                                    <th>k</th>
                                                                    <th>
                                                                        x
                                                                        <sub>
                                                                            k
                                                                        </sub>
                                                                    </th>
                                                                    <th>
                                                                        x
                                                                        <sub>
                                                                            k
                                                                        </sub>{" "}
                                                                        - x
                                                                        <sub>
                                                                            k-1
                                                                        </sub>
                                                                    </th>
                                                                    <th>
                                                                        x
                                                                        <sub>
                                                                            k
                                                                        </sub>
                                                                        -x
                                                                        <sup>
                                                                            *
                                                                        </sup>
                                                                    </th>
                                                                    <th>
                                                                        f(x
                                                                        <sub>
                                                                            k
                                                                        </sub>
                                                                        )
                                                                    </th>
                                                                </thead>
                                                                <tbody>
                                                                    {method.approximations.map(
                                                                        (
                                                                            approx,
                                                                            index
                                                                        ) => (
                                                                            <tr
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                <td>
                                                                                    {
                                                                                        approx.index
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    {
                                                                                        approx.value
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    {
                                                                                        approx.diff
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    {
                                                                                        approx.error
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    {
                                                                                        approx.residual
                                                                                    }
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Output;
