import Segment from "./Segment";

export class FuncValuesTable {
    nodes: any[]
    values: any[]
    constructor(func: any, nodes: any) {
      this.nodes = nodes;
      this.values = [];
  
      for (const node of nodes) {
        this.values.push(func(node));
      }
    }
  
    reverse() {
      for (let i = 0; i < this.nodes.length; i++) {
        [this.nodes[i], this.values[i]] = [this.values[i], this.nodes[i]];
      }
    }
  
    copy() {
      const func = (x: any) => 1;
      const values = [...this.values];
      const tableCopy = new FuncValuesTable(func, [...this.nodes]);
      tableCopy.values = values;
      return tableCopy;
    }
  
    cutByNodes(nodes: any) {
      const func = (x: any) => 1;
      const values = this.getValues(nodes);
      const tableCopy = new FuncValuesTable(func, [...nodes]);
      tableCopy.values = values;
      return tableCopy;
    }
  
    sort() {
      const sortedData = this.nodes.map((value: any, index: string | number) => [value, this.values[index]]);
      sortedData.sort((a: number[], b: number[]) => a[0] - b[0]);
      [this.nodes, this.values] = sortedData[0].map((_: any, col: string | number) => sortedData.map((row: { [x: string]: any; }) => row[col]));
    }
  
    getNearestNodes(x: any, count: any) {
      const nearestNodes = [...this.nodes].sort((a, b) => Math.abs(x - a) - Math.abs(x - b));
      return nearestNodes.slice(0, count);
    }
  
    getValue(node: any) {
      const nodeIndex = this.nodes.indexOf(node);
      return this.values[nodeIndex];
    }
  
    getValues(nodes: any) {
      const values = nodes.map((node: any) => this.getValue(node));
      return values;
    }
    print(): void {
        const tableHeader = ['x', 'f(x)'];
        const tableRows: Array<Array<number>> = [];
    
        for (let i = 0; i < this.nodes.length; i++) {
          const x = this.nodes[i];
          const y = this.values[i];
          tableRows.push([x, y]);
        }
    
        console.log(this.formatTable(tableHeader, tableRows));
      }
    
      private formatTable(header: string[], rows: Array<Array<number>>): string {
        const columnWidths: number[] = header.map((_, i) => {
          const maxHeaderLength = Math.max(...header.map((h) => h.length));
          const maxRowLength = Math.max(...rows.map((row) => String(row[i]).length));
          return Math.max(maxHeaderLength, maxRowLength);
        });
    
        const formattedHeader = header.map((header, i) =>
          header.padEnd(columnWidths[i])
        );
    
        const formattedRows = rows.map((row) =>
          row.map((cell, i) => String(cell).padEnd(columnWidths[i]))
        );
    
        const formattedTable = [formattedHeader, ...formattedRows].map((row) =>
          row.join(' ')
        );
    
        return formattedTable.join('\n');
      }
  }
  
  export class Interpolation {
    funcValuesTable: FuncValuesTable;
    nodesCount: number;

    constructor(funcValuesTable: FuncValuesTable) {
        this.funcValuesTable = funcValuesTable;
        this.nodesCount = funcValuesTable.nodes.length;
    }

    multiplyWithout(x: number, excludingArgs: number[]): number {
        let result = 1;

        for (let i = 0; i < this.nodesCount; i++) {
        if (!excludingArgs.includes(i)) {
            result *= x - this.funcValuesTable.nodes[i];
        }
        }

        return result;
    }

    getFuncOfMultiplyWithout(varName: string, excludingArgs: number[]): string {
        let result = '1';

        for (let i = 0; i < this.nodesCount; i++) {
        if (!excludingArgs.includes(i)) {
            result = `${result} * (${varName} - ${this.funcValuesTable.nodes[i]})`;
        }
        }

        return result;
    }
}
  
export class LagrangeInterpolation extends Interpolation {
    constructor(funcValuesTable: FuncValuesTable) {
        super(funcValuesTable);
    }
  
    l(x: number, k: number): number {
        const xk = this.funcValuesTable.nodes[k];
        return this.multiplyWithout(x, [k]) / this.multiplyWithout(xk, [k]);
    }
  
    L(x: number): number {
        let sum = 0;
  
        for (let k = 0; k < this.nodesCount; k++) {
        const xk = this.funcValuesTable.nodes[k];
        const value = this.funcValuesTable.values[k];
        sum += this.l(x, k) * value;
      }
  
      return sum;
    }
  
    getFuncOfl(varName: string, k: number): string {
        const xk = this.funcValuesTable.nodes[k];
        const numerator = this.getFuncOfMultiplyWithout('x', [k]);
        const denominator = this.getFuncOfMultiplyWithout(xk, [k]);
    
        return `(${numerator})/(${denominator})`;
    }
  
    getPolynom(varName: string): string {
        let sum = '0';
    
        for (let k = 0; k < this.nodesCount; k++) {
            const xk = this.funcValuesTable.nodes[k];
            const value = this.funcValuesTable.values[k];
            const lFunc = this.getFuncOfl('x', k);
            sum = `${sum}+${lFunc}*${value}`;
        }
    
        return sum;
    }
  }

  export class NewtonInterpolation extends Interpolation {
    diffs: Record<string, number>;
  
    constructor(funcValuesTable: FuncValuesTable) {
      super(funcValuesTable);
      this.diffs = { t: 0 };
    }
  
    N(x: number): number {
      let sum = 0;
  
      for (let i = 0; i < this.nodesCount; i++) {
        const diffArgs = this.funcValuesTable.nodes.slice(0, i + 1);
        const indexes = Array.from({ length: this.nodesCount }, (_, index) => index);
        const lastIndexes = indexes.slice(-(this.nodesCount - i));
        sum += this.dividedDifference(diffArgs) * this.multiplyWithout(x, lastIndexes);
      }
  
      return sum;
    }
  
    dividedDifference(args: number[]): number {
      const argsStr = args.join(' ');
  
      if (argsStr in this.diffs) {
        return this.diffs[argsStr];
      }
  
      this.diffs[argsStr] = 0;
      const argsCount = args.length;
  
      if (argsCount === 1) {
        const res1 = this.funcValuesTable.getValue(args[0]);
        this.diffs[argsStr] = res1;
        return res1;
      }
  
      const lastArgs = args.slice(-(argsCount - 1));
      const firstArgs = args.slice(0, argsCount - 1);
      const diff = this.dividedDifference(lastArgs) - this.dividedDifference(firstArgs);
      const res2 = diff / (args[argsCount - 1] - args[0]);
      this.diffs[argsStr] = res2;
  
      return res2;
    }
  }
  
  export function defineNodes(segment: Segment, count: number): number[] {
    const step = segment.length() / count;
    let node = segment.start + step;
    const nodes: number[] = [];
  
    while (node < segment.end) {
      nodes.push(node);
      node += step;
    }
  
    if (count > 0 && nodes.length < count) {
      nodes.push(segment.end);
    }
  
    return nodes;
  }
  
  export function printNearestNodes(nodes: number[]): void {
    console.log('Ближайшие узлы:');
  
    for (const node of nodes) {
      console.log(node);
    }
  }
  