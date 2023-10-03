import { useState } from "react";
import getConfig from "next/config";
import { Task1Type } from "../types/task1Type";
import Output from "../components/task1/Output/Output";
import InputGroup from "../components/task1/InputGruop/InputGroup";
import Layout from "../components/common/Layout/Layout";
import Title from "../components/common/Title/Title";
import { toast } from "react-toastify";

export default function Home() {
    const [inputFunction, setInputFunction] = useState<string>();
    const [leftBound, setLeftBound] = useState<string>();
    const [rightBound, setRightBound] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [calculationResult, setCalculationResult] = useState<Task1Type>();
    const [N, setN] = useState<string>();
    const [epsilon, setEpsilon] = useState<string>();
    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

    const calculate = async () => {
        const url = `${publicRuntimeConfig.BASE_API_URL}/task1_endpoint/${inputFunction}&${leftBound}&${rightBound}&${N}&${epsilon}`;
        try {
            setIsLoading(true);
            const response = await fetch(url, {
                method: "GET",
            });
            console.log(url);
            if (!response.ok) {
                toast.error("Ошибка!", { icon: true });
            }
            const calculatedData: Task1Type = await response.json();
            console.log(calculatedData);
            setCalculationResult(calculatedData);
            setIsLoading(false);
        } catch {
            toast.error("Ошибка!", { icon: true });
            setIsLoading(false);
        }
    };
    return (
        <Layout title="Практические задания Киселева Михаила и Калинина Михаила">
            <Title
                small={true}
                title="Численные методы решения нелиненйных уравнений"
            />
            <InputGroup
                inputFunction={inputFunction}
                leftBound={leftBound}
                rightBound={rightBound}
                setInputFunction={(val) => setInputFunction(val)}
                setLeftBound={(val) => setLeftBound(val)}
                setRightBoundn={(val) => setRightBound(val)}
                calculate={() => calculate()}
                epsilon={epsilon}
                setEpsilon={(val) => setEpsilon(val)}
                N={N}
                setN={(val) => setN(val)}
            />
            <Output output={calculationResult} isLoading={isLoading} />
        </Layout>
    );
}
