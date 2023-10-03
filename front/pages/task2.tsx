import { useState } from "react";
import getConfig from "next/config";
import Layout from "../components/common/Layout/Layout";
import Title from "../components/common/Title/Title";
import InputGroup from "../components/task2/InputGroup/INputGroup";
import Output from "../components/task2/Output/Output";

export default function Home() {
    const [inputFunction, setInputFunction] = useState<string>();
    const [leftBound, setLeftBound] = useState<string>();
    const [rightBound, setRightBound] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [calculationResult, setCalculationResult] = useState<Task2Answer[]>();
    const [N, setN] = useState<string>();
    const [xValues, setXValues] = useState<string>();
    const [x, setX] = useState<string>();
    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

    const calculate = async () => {
        const url = `${publicRuntimeConfig.BASE_API_URL}/task2_endpoint/${inputFunction}&${leftBound}&${rightBound}&${N}&\[${xValues}\]&${x}`;
        console.log(url);
        try {
            setIsLoading(true);
            const response = await fetch(url, {
                method: "GET",
            });
            console.log(url);
            // if (!response.ok) {
            //     alert("Ошибка!");
            // }
            const calculatedData: Task2Answer[] = await response.json();
            console.log(calculatedData);
            setCalculationResult(calculatedData);
            setIsLoading(false);
        } catch (err) {
            alert("Ошибка!");
            alert(err);
            setIsLoading(false);
        }
    };
    return (
        <Layout title="Практические задания Киселева Михаила и Калинина Михаила">
            <Title
                small={true}
                title="Задача алгебраического интерполирования"
            />
            <InputGroup
                inputFunction={inputFunction}
                rightBound={rightBound}
                leftBound={leftBound}
                N={N}
                xValues={xValues}
                setInputFunction={(val: string) => {
                    setInputFunction(val);
                }}
                setRightBound={(val: string) => {
                    setRightBound(val);
                }}
                setLeftBound={(val: string) => {
                    setLeftBound(val);
                }}
                setN={(val: string) => {
                    setN(val);
                }}
                calculate={calculate}
                setXValues={(val: string) => {
                    setXValues(val);
                }}
                x={x}
                setX={(val: string) => {
                    setX(val);
                }}
            />
            <Output output={calculationResult} isLoading={isLoading} />
        </Layout>
    );
}
