//@ts-ignore
import { toast } from "react-toastify";
import { FuncValuesTable, defineNodes } from "./Interpolation";
// import {
//     InverseFuncReverseInterpolation,
//     RootSearchReverseInterpolation,
// } from "./ReverseInterpolation";
import Segment from "./Segment";

const task3_1Solver = (
    leftBound: number,
    rightBound: number,
    nodesAmount: number,
    n: number,
    F: number,
    EPS: number
) => {
  if (n > nodesAmount) {
    toast.error(
        `Ошибка: некорректное значение n (n > ${nodesAmount}).`,
        { icon: true }
    );
    return;
}

if (n <= 0) {
    toast.error("Ошибка: некорректное значение n (n <= 0).", {
        icon: true,
    });
    return;
}
    const nodes = Array.from(
        { length: nodesAmount + 1 },
        (_, i) => leftBound + i * ((rightBound - leftBound) / nodesAmount)
    );

    let allNodesTableDict: any = [];
    nodes.forEach((x) => {
        allNodesTableDict[x] = f(x);
    });

    console.log(allNodesTableDict);
    console.log(nodes);

    const reversedNodes = Object.values(allNodesTableDict);
    const reversedNodesTableDict: any = {};

    for (const key in allNodesTableDict) {
        reversedNodesTableDict[allNodesTableDict[key]] = parseFloat(key);
    }
    const selectedNodes = getNodesWeNeed(F, n, reversedNodes);
    console.log(selectedNodes);
    const LF = lagrangePolynom(n, F, selectedNodes, reversedNodesTableDict);
    const method1 = {
      text: "С помощью метода Лагранжа приблизим обратную к f функцию ",
      value: `Значение F = ${F} в точке х = ${LF}`,
      diff: `Модуль невязки |f(x)-F| = ${Math.abs(f(LF) - F)}`
    }

    const segments: any = [];
    let otherMethods: string[] | {value: string, abs: string, diff: string}[] = []
    const calculatedPolynomValues = {};
    rootsDivide(leftBound, rightBound, 1000);
    if (segments.length === 0) {
      otherMethods.push(`На отрезке [${leftBound},${rightBound}] функция не принимает значение F = ${F}`)
    } else {
        segments.forEach((s) => {
            const [segmentStart, segmentEnd] = s;
            const [root, stepsDifference] = secant(segmentStart, segmentEnd);
            otherMethods.push({
              value: `F = ${F} в точке х = ${root}`,
              abs: `|x_k - x_{k-1}| = ${stepsDifference}`,
              diff:   ` |f(x)-F| = ${Math.abs(f(root) - F)}`
            })
            // console.log(`Значение F = ${F} в точке х = ${root}`);
            // console.log(`|x_k - x_{k-1}| = ${stepsDifference}`);
            // console.log(
            //     `Модуль невязки |f(x)-F| = ${Math.abs(f(root) - F)}`
            // );
        });
    }

    const segment = new Segment(leftBound, rightBound);

    const func = (x: number) => Math.sin(x) - (x * x) / 2;
    const valuesInTable = nodesAmount; // Adjust this to your logic

   

    const nodes2 = defineNodes(segment, valuesInTable);
    const funcValuesTable = new FuncValuesTable(func, nodes2);

   
    funcValuesTable.print();
    console.log();

    const reverseValuesTable = funcValuesTable.copy();
    reverseValuesTable.reverse();
    reverseValuesTable.sort();
      return {
        table: funcValuesTable,
        reversedTabel: reverseValuesTable,
        selectedNodes: selectedNodes.sort((a, b) => Math.abs(a - F) - Math.abs(b - F)),
        method1: method1,
        otherMethods: otherMethods,
//@ts-ignore
        segments: segments,

    };
    function f(x) {
        return Math.sin(x) - x ** 2 / 2;
    }
    function getNodesWeNeed(x, n, nodesOrRevers) {
        const nodesWeNeed = [];
        const raznTemp = new Set();
        const tempDict = {};

        for (const node of nodesOrRevers) {
            const razn = Math.abs(x - node);
            raznTemp.add(razn);

            if (tempDict[razn]) {
                tempDict[razn].push(node);
            } else {
                tempDict[razn] = [node];
            }
        }

        const raznArray = Array.from(raznTemp).sort((a, b) => a - b);

        for (const t of raznArray) {
            for (const node of tempDict[t]) {
                nodesWeNeed.push(node);
            }
        }

        return nodesWeNeed.slice(0, n + 1);
    }

    function w_dw(k, x, x_j, nodes) {
        let ans = 1;

        for (const x_i of nodes.slice(0, k)) {
            if (x_i !== x_j) {
                ans *= x - x_i;
            }
        }

        return ans;
    }

    function l_kn(x_k, x, nodes) {
        const w = w_dw(n + 1, x, x_k, nodes);
        const dw = w_dw(n + 1, x_k, x_k, nodes);
        return w / dw;
    }

    function lagrangePolynom(n_, x, nodesList, nodesDict) {
        let ans = 0;

        for (const x_k of nodesList.slice(0, n_ + 1)) {
            ans += l_kn(x_k, x, nodesList) * nodesDict[x_k];
        }

        return ans;
    }

    // const calculatedPolynomValues = {};

    // Initialize calculatedPolynomValues as an empty object

    function equation(x) {
        return polynom(x) - F;
    }

    function polynom(x) {
        if (calculatedPolynomValues[x]) {
            return calculatedPolynomValues[x];
        }

        if (allNodesTableDict[x]) {
            return allNodesTableDict[x];
        }

        const nodes_ = getNodesWeNeed(x, n, nodes);
        const f_x = lagrangePolynom(n, x, nodes_, allNodesTableDict);
        calculatedPolynomValues[x] = f_x;
        return f_x;
    }

    function rootsDivide(A, B, N) {
        let segmsCounter = 0;
        let segmStart = A;
        const h = (B - A) / N;
        let segmEnd = segmStart + h;
        let fSegmStart = equation(segmStart);

        while (segmEnd <= B) {
            const fSegmEnd = equation(segmEnd);

            if (fSegmStart * fSegmEnd <= 0) {
                segmsCounter++;
                console.log(`Segment with root: [${segmStart}, ${segmEnd}]`);

                if (fSegmStart === 0 || fSegmEnd === 0) {
                    if (fSegmStart === 0) {
                        console.log("Found root: ", segmStart);
                    }

                    if (fSegmEnd === 0) {
                        console.log("Found root: ", segmEnd);
                    }
                    continue;
                }

                segments.push([segmStart, segmEnd]);
            }

            segmStart = segmEnd;
            segmEnd += h;
            fSegmStart = fSegmEnd;
        }

        console.log("Total segments containing roots: ", segmsCounter);
        console.log();
    }

    function secant(xPrev, xCur) {
        const fXCur = equation(xCur);
        const fXPrev = equation(xPrev);

        let xNext = xCur - (fXCur * (xCur - xPrev)) / (fXCur - fXPrev);

        if (Math.abs(xNext - xCur) < EPS) {
            return [xNext, Math.abs(xNext - xCur)];
        }

        return secant(xCur, xNext);
    }

};

export default task3_1Solver;
