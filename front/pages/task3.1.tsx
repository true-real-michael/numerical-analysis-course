import { useState } from "react";
import getConfig from "next/config";
import { Task1Type } from "../types/task1Type";
import Output from "../components/task3.1/Output/Output";
import InputGroup from "../components/task3.1/InputGroup/InputGroup";
import Layout from "../components/common/Layout/Layout";
import Title from "../components/common/Title/Title";
import task3_1Solver from "../utils/task3.1/solver";
import { FuncValuesTable } from "../utils/task3.1/Interpolation";

export default function Home() {
    const [leftBound, setLeftBound] = useState<string>("-6");
    const [rightBound, setRightBound] = useState<string>("6");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [nodesAmmout, setNodesAmmount] = useState<string>("12");
    const [calculationResult, setCalculationResult] = useState<
        | {
              table: FuncValuesTable | null;
              reversedTabel: FuncValuesTable | null;
              selectedNodes: any[];
              method1: {
                  text: string;
                  value: string;
                  diff: string;
              };
              otherMethods: string[];
          }
        | undefined
    >();
    const [n, setN] = useState<string>("5");
    const [f, setF] = useState<string>("4");
    const [eps, setEps] = useState<string>("0.1");

    const calculate = async () => {
        setIsLoading(true);
        setCalculationResult(
            task3_1Solver(
                parseFloat(leftBound),
                parseFloat(rightBound),
                parseFloat(nodesAmmout),
                parseFloat(n),
                parseFloat(f),
                parseFloat(eps)
            )
        );
        setIsLoading(false);

        // task3Solver(-6, 6, 12, 5, 4, 0.1);
    };
    return (
        <Layout title="Практические задания Киселева Михаила и Калинина Михаила">
            <Title small={true} title="Обратное интерполирование" />
            <InputGroup
                leftBound={leftBound}
                rightBound={rightBound}
                nodesAmmount={nodesAmmout}
                n={n}
                f={f}
                eps={eps}
                setLeftBound={(val) => setLeftBound(val)}
                setNodesAmmount={(val) => setNodesAmmount(val)}
                setRightBound={(val) => setRightBound(val)}
                calculate={() => calculate()}
                setEps={(val) => setEps(val)}
                setF={(val) => setF(val)}
                setN={(val) => setN(val)}
            />
            <Output
                result={calculationResult}
                isLoading={isLoading}
                f={parseFloat(f)}
            />
        </Layout>
    );
}
