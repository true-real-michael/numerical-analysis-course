import React from "react";
import styles from "./InputGroup.module.scss";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

type Props = {
    rightBound: string | undefined;
    leftBound: string | undefined;
    nodesAmmount: string | undefined;
    n: string | undefined;
    f: string | undefined;
    eps: string | undefined;
    setRightBound: (val: string) => void;
    setLeftBound: (val: string) => void;
    setNodesAmmount: (val: string) => void;
    calculate: () => void;
    setN: (val: string) => void;
    setF: (val: string) => void;
    setEps: (val: string) => void;
};
const InputGroup: React.FC<Props> = ({
    rightBound,
    leftBound,
    nodesAmmount,
    setLeftBound,
    setNodesAmmount,
    setRightBound,
    calculate,
    n,
    f,
    eps,
    setEps,
    setF,
    setN,
}) => {
    return (
        <div className={styles.content}>
            <Input
                className={styles.small_input}
                label="Функция:"
                placeholder="2*sin(x)+cos(x)"
                value={"sin(x) - (x * x) / 2"}
                disabled={true}
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
                label="Количество узлов:"
                placeholder="3"
                type="number"
                value={nodesAmmount}
                onChange={(e) => setNodesAmmount(e.target.value)}
            />
            <Input
                className={styles.small_input}
                label="N:"
                placeholder="3"
                type="number"
                value={n}
                onChange={(e) => setN(e.target.value)}
            />
            <Input
                className={styles.small_input}
                label="F:"
                placeholder="3"
                type="number"
                value={f}
                onChange={(e) => setF(e.target.value)}
            />
            <Input
                className={styles.small_input}
                label="Eps:"
                placeholder="3"
                type="number"
                value={eps}
                onChange={(e) => setEps(e.target.value)}
            />
            <Button type="button" onClick={calculate}>
                Найти корни
            </Button>
        </div>
    );
};

export default InputGroup;
