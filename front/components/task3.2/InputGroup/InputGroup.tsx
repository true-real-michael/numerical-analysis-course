import React from "react";
import styles from "./InputGroup.module.scss";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

type Props = {
    startPoint: string | undefined;
    step: string | undefined;
    nodesAmmount: string | undefined;
    setStartPoint: (val: string) => void;
    setStep: (val: string) => void;
    setNodesAmmount: (val: string) => void;
    calculate: () => void;
};
const InputGroup: React.FC<Props> = ({
    startPoint,
    step,
    nodesAmmount,
    setNodesAmmount,
    setStartPoint,
    setStep,
    calculate,
}) => {
    return (
        <div className={styles.content}>
            <Input
                className={styles.small_input}
                label="Функция:"
                placeholder="e^(1.5 * x)"
                value={"e^(1.5 * x)"}
                disabled={true}
            />
            <Input
                className={styles.small_input}
                label="Начальная точка"
                placeholder="-2"
                type="number"
                value={startPoint}
                onChange={(e) => setStartPoint(e.target.value)}
            />
            <Input
                className={styles.small_input}
                label="Шаг"
                placeholder="3"
                type="number"
                value={step}
                onChange={(e) => setStep(e.target.value)}
            />
            <Input
                className={styles.small_input}
                label="Число узлов"
                placeholder="-2"
                type="number"
                value={nodesAmmount}
                onChange={(e) => setNodesAmmount(e.target.value)}
            />
            <Button type="button" onClick={calculate}>
                Найти
            </Button>
        </div>
    );
};

export default InputGroup;
