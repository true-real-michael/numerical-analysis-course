import { useState } from "react";
import getConfig from "next/config";
import Layout from "../components/common/Layout/Layout";
import Title from "../components/common/Title/Title";
import { toast } from "react-toastify";
import InputGroup from "../components/task4.1/InputGroup/InputGroup";
import Output from "../components/task4.1/Output/Output";

export default function Home() {
    const [inputFunction, setInputFunction] = useState<string>("");
    const [leftBound, setLeftBound] = useState<string>();
    const [rightBound, setRightBound] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [calculationResult, setCalculationResult] = useState<
        Task4_1Answer | { error: string }
    >();
    const { publicRuntimeConfig } = getConfig();

    const calculate = async () => {
        if (inputFunction && leftBound && rightBound) {
            const url = `${
                publicRuntimeConfig.BASE_API_URL
            }/task4.1_endpoint/${inputFunction.replace(
                /\//g,
                "\\/"
            )}&${leftBound}&${rightBound}`;
            console.log(url);
            try {
                setIsLoading(true);
                const response = await fetch(url, {
                    method: "GET",
                });
                console.log(url);
                if (!response.ok) {
                    toast.error("Ошибка!", { icon: true });
                }
                const calculatedData: Task4_1Answer = await response.json();
                console.log(calculatedData);
                setCalculationResult(calculatedData);
                setIsLoading(false);
            } catch (err) {
                toast.error("Ошибка! " + err, { icon: true });
                setIsLoading(false);
            }
        }
    };
    return (
        <Layout title="Практические задания Киселева Михаила и Калинина Михаила">
            <Title
                small={true}
                title="Задача численного интегрирования"
            />
            <InputGroup
                func={inputFunction}
                leftBound={leftBound}
                rightBound={rightBound}
                setFunc={(val) => setInputFunction(val)}
                setLeftBound={(val) => setLeftBound(val)}
                setRightBound={(val) => setRightBound(val)}
                calculate={() => calculate()}
            />
            <Output output={calculationResult} isLoading={isLoading} />
        </Layout>
    );
}
