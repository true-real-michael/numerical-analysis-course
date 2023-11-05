import { toast } from "react-toastify";
import { FuncValuesTable, defineNodes } from "./Interpolation";
import { InverseFuncReverseInterpolation, RootSearchReverseInterpolation } from "./ReverseInterpolation";
import Segment from "./Segment";

const task3_1Solver = (leftBound: number, rightBound: number, nodesAmount: number, n: number, F: number, EPS:number) => {
  
  
    const segment = new Segment(leftBound, rightBound);

  const func = (x: number) => Math.sin(x) - (x * x) / 2;
  const valuesInTable = nodesAmount; // Adjust this to your logic

  let closeProgram = false;


    if (n > valuesInTable - 1) {
      toast.error(`Ошибка: некорректное значение n (n > ${valuesInTable - 1}).`, {icon: true})
      return
    }

    if (n <= 0) {
      toast.error('Ошибка: некорректное значение n (n <= 0).', {icon: true})
      return
    }

    const nodes = defineNodes(segment, valuesInTable);
    const funcValuesTable = new FuncValuesTable(func, nodes);

    console.log();
    console.log('Таблица:');
    funcValuesTable.print();
    console.log();

    const reverseValuesTable = funcValuesTable.copy();
    reverseValuesTable.reverse();
    reverseValuesTable.sort();

    console.log();
    console.log('Отраженная таблица:');
    reverseValuesTable.print();
    console.log();

    const firstNode = funcValuesTable.nodes[0];
    const lastNode = funcValuesTable.nodes[funcValuesTable.nodes.length - 1];
    const rootSearchInterpolationSegment = new Segment(firstNode, lastNode);

    const inverseFuncInterpolation = new InverseFuncReverseInterpolation(funcValuesTable);
    const inverseFuncInterpolationInfo = inverseFuncInterpolation.interpolate(F, n, func);

    const rootSearchInterpolation = new RootSearchReverseInterpolation(funcValuesTable);
    const rootSearchInterpolationInfoList = rootSearchInterpolation.interpolate(F, EPS, rootSearchInterpolationSegment, n, func);

    console.log();
    console.log('Метод 1:');
    console.log(`Q(${F}): ${inverseFuncInterpolationInfo.value}`);
    console.log(`|f(x)-F|: ${inverseFuncInterpolationInfo.error}`);
    console.log();
    let methods = [{value: inverseFuncInterpolationInfo.value, error: inverseFuncInterpolationInfo.error}]
    console.log('Метод 2:');
    for (const info of rootSearchInterpolationInfoList) {
      console.log(`Q(${F}): ${info.value}`);
      console.log(`|f(x)-F|: ${info.error}`);
      methods.push({value: info.value, error: info.error})
    }
   let additionalInfo = ''
    if (rootSearchInterpolationInfoList.length === 0) {
      console.log(`На отрезке ${segment} корни не найдены`);
      additionalInfo = `На отрезке [${segment.start}, ${segment.end}] функция не принимает значение F`
    }
    return { table:funcValuesTable,
      reversedTabel: reverseValuesTable,
      methods: methods,
      additionalInfo: additionalInfo}
};

export default task3_1Solver;
