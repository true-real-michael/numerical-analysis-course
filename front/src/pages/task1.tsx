import Layout from "@/components/common/Layout/Layout";
import Title from "@/components/common/Title/Title";
import InputGroup from "@/components/task1/InputGruop/InputGroup";
import { useState } from "react";
import getConfig from "next/config";
import Output from "@/components/task1/Output/Output";

export default function Home() {
    const [inputFunction, setInputFunction] = useState<string>();
    const [leftBound, setLeftBound] = useState<string>();
    const [rightBound, setRightBound] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [calculationResult, setCalculationResult] = useState("");

    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

    const calculate = async () => {
        const url = `${publicRuntimeConfig.BASE_API_URL}/task1_endpoint/${inputFunction}&${leftBound}&${rightBound}`;
        try {
            setIsLoading(true);
            const response = await fetch(url, {
                method: "GET",
            });
            console.log(url);
            if (!response.ok) {
                alert("Ошибка!");
            }
            const calculatedData = await response.json();
            setCalculationResult(calculatedData);
            setIsLoading(false);
        } catch {
            alert("Ошибка!");
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
            />
            <Output isLoading={isLoading} output={calculationResult} />
        </Layout>
    );
}
