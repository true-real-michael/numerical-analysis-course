import React from "react";
import styles from "./InputGroup.module.scss";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

type Props = {
    inputFunction: string | undefined;
    rightBound: string | undefined;
    leftBound: string | undefined;
    N: string | undefined;
    epsilon: string | undefined;
    setInputFunction: (val: string) => void;
    setRightBoundn: (val: string) => void;
    setLeftBound: (val: string) => void;
    calculate: () => void;
    setN: (val: string) => void;
    setEpsilon: (val: string) => void;
};
const InputGroup: React.FC<Props> = ({
    inputFunction,
    setInputFunction,
    leftBound,
    setLeftBound,
    rightBound,
    setRightBoundn,
    calculate,
    N,
    setN,
    epsilon,
    setEpsilon,
}) => {
    return (
        <div className={styles.content}>
            <Input
                className={styles.big_input}
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
                onChange={(e) => setRightBoundn(e.target.value)}
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
                className={styles.small_input}
                label="Epsilon:"
                placeholder="0.00001"
                type="number"
                value={epsilon}
                onChange={(e) => setEpsilon(e.target.value)}
            />
            <Button type="button" onClick={calculate}>
                Найти корни
            </Button>
        </div>
    );
};

export default InputGroup;
