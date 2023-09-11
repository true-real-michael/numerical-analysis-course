import React from "react";
import styles from "./InputGroup.module.scss";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";

type Props = {
    inputFunction: string | undefined;
    rightBound: string | undefined;
    leftBound: string | undefined;
    setInputFunction: (val: string) => void;
    setRightBoundn: (val: string) => void;
    setLeftBound: (val: string) => void;
    calculate: () => void;
};
const InputGroup: React.FC<Props> = ({
    inputFunction,
    setInputFunction,
    leftBound,
    setLeftBound,
    rightBound,
    setRightBoundn,
    calculate,
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
            <Button type="button" onClick={calculate}>
                Найти корни
            </Button>
        </div>
    );
};

export default InputGroup;
