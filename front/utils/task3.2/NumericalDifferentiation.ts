export class Derivative {
    funcValuesTable: { nodes: number[], values: number[] };
    stepBetweenNodes: number;

    constructor(funcValuesTable: { nodes: number[], values: number[] }, stepBetweenNodes: number) {
        this.funcValuesTable = funcValuesTable;
        this.stepBetweenNodes = stepBetweenNodes;
    }

    first(a: number): number {
        const index = this.funcValuesTable.nodes.indexOf(a);

        if (index === 0) {
            return this.firstFromBeginning(a);
        }

        if (index === this.funcValuesTable.nodes.length - 1) {
            return this.firstFromEnd(a);
        }

        const index1 = index + 1;
        const index2 = index - 1;

        const value1 = this.funcValuesTable.values[index1];
        const value2 = this.funcValuesTable.values[index2];

        return (value1 - value2) / (2 * this.stepBetweenNodes);
    }

    firstFromBeginning(a: number): number {
        const index1 = this.funcValuesTable.nodes.indexOf(a);
        const index2 = index1 + 1;
        const index3 = index1 + 2;

        const value1 = this.funcValuesTable.values[index1];
        const value2 = this.funcValuesTable.values[index2];
        const value3 = this.funcValuesTable.values[index3];

        return (-3 * value1 + 4 * value2 - value3) / (2 * this.stepBetweenNodes);
    }

    firstFromEnd(a: number): number {
        const index1 = this.funcValuesTable.nodes.indexOf(a);
        const index2 = index1 - 1;
        const index3 = index1 - 2;

        const value1 = this.funcValuesTable.values[index1];
        const value2 = this.funcValuesTable.values[index2];
        const value3 = this.funcValuesTable.values[index3];

        return (3 * value1 - 4 * value2 + value3) / (2 * this.stepBetweenNodes);
    }

    second(a: number): number | null {
        const index = this.funcValuesTable.nodes.indexOf(a);

        if (index === 0 || index === this.funcValuesTable.nodes.length - 1) {
            return null;
        }

        const index1 = this.funcValuesTable.nodes.indexOf(a);
        const index2 = index1 + 1;
        const index3 = index1 - 1;

        const value1 = this.funcValuesTable.values[index1];
        const value2 = this.funcValuesTable.values[index2];
        const value3 = this.funcValuesTable.values[index3];

        return (value3 - 2 * value1 + value2) / (this.stepBetweenNodes ** 2);
    }
}

export function defineNodes(start: number, step: number, count: number): number[] {
    const nodes: number[] = [];

    for (let i = 0; i < count; i++) {
        const node = start + i * step;
        nodes.push(node);
    }

    return nodes;
}
