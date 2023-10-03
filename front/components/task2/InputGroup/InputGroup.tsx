import React from "react";
import styles from "./InputGroup.module.scss";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

type Props = {
    inputFunction: string | undefined;
    rightBound: string | undefined;
    leftBound: string | undefined;
    N: string | undefined;
    xValues: string | undefined;
    x: string | undefined;
    setInputFunction: (val: string) => void;
    setRightBound: (val: string) => void;
    setLeftBound: (val: string) => void;
    setN: (val: string) => void;
    setXValues: (val: string) => void;
    setX: (val: string) => void;
    calculate: () => void;
};
const InputGroup: React.FC<Props> = ({
    inputFunction,
    setInputFunction,
    leftBound,
    setLeftBound,
    rightBound,
    setRightBound,
    calculate,
    N,
    setN,
    xValues,
    setXValues,
    x,
    setX,
}) => {
    return (
        <div className={styles.content}>
            <Input
                className={styles.small_input}
                label="Функция:"
                placeholder="2*sin(x)+cos(x)"
                value={inputFunction}
                onChange={(e) => setInputFunction(e.target.value)}
            />
            <Input
                className={styles.small_input}
                label="Левая граница:"
                placeholder="-2"
                type="number"
                value={leftBound}
                onChange={(e) => setLeftBound(e.target.value)}
            />
            <Input
                className={styles.small_input}
                label="Правая граница:"
                placeholder="3"
                type="number"
                value={rightBound}
                onChange={(e) => setRightBound(e.target.value)}
            />
            <Input
                className={styles.small_input}
                label="N:"
                placeholder="3"
                type="number"
                value={N}
                onChange={(e) => setN(e.target.value)}
            />
            <Input
                className={styles.big_input}
                label="Значения:"
                placeholder="1, 2, 3, 4, 5"
                value={xValues}
                onChange={(e) => setXValues(e.target.value)}
            />
            <Input
                className={styles.small_input}
                label="X:"
                placeholder="3"
                type="number"
                value={x}
                onChange={(e) => setX(e.target.value)}
            />
            <Button type="button" onClick={calculate}>
                Найти корни
            </Button>
        </div>
    );
};

export default InputGroup;
