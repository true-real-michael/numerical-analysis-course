import { table } from "table";
import { FuncValuesTable } from "../task3.1/Interpolation";
import { Derivative, defineNodes } from "./NumericalDifferentiation";

const task3_2Solver = (
    startPoint: number,
    step: number,
    nodesAmount: number
) => {
    const k = 1.5;

    const func = (x: number) => Math.exp(k * x);
    const dfunc = (x: number) => k * Math.exp(k * x);
    const ddfunc = (x: number) => k ** 2 * Math.exp(k * x);
    const nodes = defineNodes(startPoint, step, nodesAmount);
    const funcValuesTable = new FuncValuesTable(func, nodes);
    const derivative = new Derivative(funcValuesTable, step);
    funcValuesTable.print();
   

    let tableArray: (number | null | string)[][] = [[
        "x",
        "f(x)",
        "f'(x)",
        "Abs Error (f')",
        "f''(x)",
        "Abs Error (f'')",
    ]]
    // Iterate over nodes and populate the table
    for (const node of nodes) {
        const x = node;
        const f = func(x);
        const df = derivative.first(x);
        const absErrorD = Math.abs(dfunc(x) - df);
        // const relErrorD = df !== null ? absErrorD / Math.abs(df) : null;
        const ddf = derivative.second(x);
        const absErrorDD = ddf !== null ? Math.abs(ddfunc(x) - ddf) : null;
        // const relErrorDD =
        //     ddf !== null ? (absErrorDD ?? 0) / Math.abs(ddf) : null;
        tableArray.push([x , f , df , absErrorD , ddf , absErrorDD ])
        
    }
    console.log(table(tableArray))
    return { valuesTable: funcValuesTable, resultTable: tableArray };
};

export class Table {
    headers: string[];
    rows: any[];

    constructor(headers: string[]) {
        this.headers = headers;
        this.rows = [];
    }

    addRow(rowData: any[]) {
        if (rowData.length === this.headers.length) {
            this.rows.push(rowData);
        } else {
            console.error(
                "Row data length does not match the number of headers."
            );
        }
    }
}

// Create a function to format floats or return 'None' for null values
function formatFloatOrNone(value: number | null, floatDigits: number): string | void{
    if (value === null) {
        return
    } else {
        return value.toFixed(floatDigits);
    }
}

export default task3_2Solver;
