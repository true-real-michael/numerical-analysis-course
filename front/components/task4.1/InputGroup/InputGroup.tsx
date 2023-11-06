import React from "react";
import styles from "./Input.module.scss";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

type Props = {
    rightBound: string | undefined;
    leftBound: string | undefined;
    func: string | undefined;
    setRightBound: (val: string) => void;
    setLeftBound: (val: string) => void;
    calculate: () => void;
    setFunc: (val: string) => void;
};
const InputGroup: React.FC<Props> = ({
    rightBound,
    leftBound,
    func,
    setFunc,
    setLeftBound,
    setRightBound,
    calculate,
}) => {
    return (
        <div className={styles.content}>
            <Input
                className={styles.small_input}
                label="Функция:"
                placeholder="2*sin(x)+cos(x)"
                value={func}
                onChange={(e) => setFunc(e.target.value)}
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
            <Button type="button" onClick={calculate}>
                Интегрировать
            </Button>
        </div>
    );
};

export default InputGroup;
