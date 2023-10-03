import React, { useEffect, useRef } from "react";
import functionPlot from "function-plot";
import styles from "./FuctionGraph.module.scss";

type Props = {
    output: Task2Answer | undefined;
};

const FunctionGraph: React.FC<Props> = ({ output }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (output && containerRef.current) {
            let width = containerRef.current.offsetWidth;
            let height = 400;
            const getFunctions = () => {
                // return output?.approximation_by_method.map((method, index) => {
                //     console.log(index);
                //     return {
                //         fn: method.polynomial.replaceAll("**", "^"),
                //         color: "#34aadc",
                //     };
                // });
                return [
                    {
                        fn: output?.approximation_by_method[0].polynomial.replaceAll(
                            "**",
                            "^"
                        ),
                        color: "#34aadc",
                    },
                ];
            };
            functionPlot({
                target: "#graph",
                width,
                height,
                yAxis: { domain: [-1, 9] },
                grid: true,
                data: [
                    ...getFunctions(),

                    {
                        points: output.points,
                        fnType: "points",
                        graphType: "scatter",
                        color: "red",
                    },
                ],
            });
        }
    }, []); // Empty dependency array to run the effect once when the component mounts

    return <div id="graph" className={styles.graph} ref={containerRef}></div>;
};

export default FunctionGraph;
