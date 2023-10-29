import { useState } from "react";
import getConfig from "next/config";
import { Task1Type } from "../types/task1Type";
import Output from "../components/task3.2/Output/Output";
import InputGroup from "../components/task3.2/InputGroup/InputGroup";
import Layout from "../components/common/Layout/Layout";
import Title from "../components/common/Title/Title";
import task3_1Solver from "../utils/task3.1/solver";
import { FuncValuesTable } from "../utils/task3.1/Interpolation";
import task3_2Solver from "../utils/task3.2/solver";

export default function Home() {
    const [startPoint, setStartPoint] = useState("-6");
    const [step, setStep] = useState("1");
    const [nodesAmmount, setNodesAmmount] = useState("10");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [calculationResult, setCalculationResult] = useState<any>();

    const calculate = async () => {
        setCalculationResult(null);
        setIsLoading(true);
        setCalculationResult(
            task3_2Solver(
                parseFloat(startPoint),
                parseFloat(step),
                parseFloat(nodesAmmount)
            )
        );
        setIsLoading(false);
    };
    return (
        <Layout title="Практические задания Киселева Михаила и Калинина Михаила">
            <Title small={true} title="Нахождение производных" />
            <InputGroup
                startPoint={startPoint}
                setStartPoint={(val) => setStartPoint(val)}
                step={step}
                setStep={(val) => setStep(val)}
                calculate={calculate}
                nodesAmmount={nodesAmmount}
                setNodesAmmount={(val) => setNodesAmmount(val)}
            />
            <Output result={calculationResult} isLoading={isLoading} />
        </Layout>
    );
}
