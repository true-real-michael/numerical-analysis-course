import { FuncValuesTable, LagrangeInterpolation } from "./Interpolation";
import Segment from "./Segment";

export class ReverseInterpolationInfo {
    value: number;
    error: number;
  
    constructor(value: number, error: number) {
      this.value = value;
      this.error = error;
    }
  }
  
  export  class ReverseInterpolation {
    funcValuesTable: FuncValuesTable;
  
    constructor(funcValuesTable: FuncValuesTable) {
      this.funcValuesTable = funcValuesTable;
    }
  }
  
  export  class InverseFuncReverseInterpolation extends ReverseInterpolation {
    constructor(funcValuesTable: FuncValuesTable) {
      const tableCopy = funcValuesTable.copy();
      tableCopy.reverse();
      super(tableCopy);
    }
  
    interpolate(F: number, deg: number, func: (x: number) => number): ReverseInterpolationInfo {
      const nearestNodes = this.funcValuesTable.getNearestNodes(F, deg + 1);
      const nearestNodesTable = this.funcValuesTable.cutByNodes(nearestNodes);
  
      const lagrangeInterpolation = new LagrangeInterpolation(nearestNodesTable);
      console.log(lagrangeInterpolation)
      const value = lagrangeInterpolation.L(F);
      const error = Math.abs(func(value) - F);
  
      return new ReverseInterpolationInfo(value, error);
    }
  }
  
  export  class RootSearchReverseInterpolation extends ReverseInterpolation {
    constructor(funcValuesTable: FuncValuesTable) {
      const tableCopy = funcValuesTable.copy();
      super(tableCopy);
    }
  
    interpolate(
      F: number,
      eps: number,
      segment: Segment,
      deg: number,
      func: (x: number) => number
    ): ReverseInterpolationInfo[] {
      const nearestNodes = this.funcValuesTable.getNearestNodes(F, deg + 1);
      const nearestNodesTable = this.funcValuesTable.cutByNodes(nearestNodes);
  
      const lagrangeInterpolation = new LagrangeInterpolation(nearestNodesTable);
      const polynom = lagrangeInterpolation.getPolynom('x');
  
      const equationStr = `${polynom} - ${F}`;
      const equation = (x: number) => eval(equationStr);
  
      const segmentSplittingFactor = 100;
      const signChangeSegments = separateRoots(equation, segment, segmentSplittingFactor);
  
      const values: number[] = [];
      const infoList: ReverseInterpolationInfo[] = [];
  
      for (const s of signChangeSegments) {
        const bisectionInfo = approximateByBisection(equation, s, eps);
        const value = bisectionInfo.approximation;
        const error = Math.abs(func(value) - F);
  
        if (values.includes(value)) {
          continue;
        }
  
        values.push(value);
  
        const info = new ReverseInterpolationInfo(value, error);
        infoList.push(info);
      }
  
      return infoList;
    }
  }
  
  export  class BisectionApproximationInfo {
    approximation: number;
    initialApproximation: number;
    lastSegment: Segment;
    stepCounter: number;
  
    constructor(approximation: number, initialApproximation: number, lastSegment: Segment, stepCounter: number) {
      this.approximation = approximation;
      this.initialApproximation = initialApproximation;
      this.lastSegment = lastSegment;
      this.stepCounter = stepCounter;
    }
  }
  
  function approximateByBisection(func: (x: number) => number, segment: Segment, eps: number): BisectionApproximationInfo {
    let stepCounter = 0;
    let center = segment.center();
    let currSegment = segment.copy();
  
    while (currSegment.length() > 2 * eps) {
      center = currSegment.center();
      stepCounter = stepCounter + 1;
  
      const valueAtStart = func(currSegment.start);
      const valueAtCenter = func(center);
  
      if (valueAtStart * valueAtCenter <= 0) {
        currSegment.end = center;
      } else {
        currSegment.start = center;
      }
    }
  
    const approximation = currSegment.center();
    const initialApproximation = segment.center();
  
    return new BisectionApproximationInfo(approximation, initialApproximation, currSegment, stepCounter);
  }
  
  export  class NewtonApproximationInfo {
    approximation: number;
    initialApproximation: number;
    lastSegment: Segment;
    stepCounter: number;
  
    constructor(approximation: number, initialApproximation: number, lastSegment: Segment, stepCounter: number) {
      this.approximation = approximation;
      this.initialApproximation = initialApproximation;
      this.lastSegment = lastSegment;
      this.stepCounter = stepCounter;
    }
  }
  
  export  function approximateByNewton(
    func: (x: number) => number,
    derivative: (x: number) => number,
    secondDerivative: (x: number) => number,
    segment: Segment,
    eps: number
  ): NewtonApproximationInfo {
    let stepCounter = 0;
    let prevX = getStartXValue(segment.start, segment.end, func, secondDerivative);
    const initialApproximation = prevX;
  
    while (true) {
      stepCounter = stepCounter + 1;
      const currX = prevX - func(prevX) / derivative(prevX);
  
      if (Math.abs(currX - prevX) < eps) {
        break;
      }
  
      prevX = currX;
    }
  
    const lastSegment = new Segment(prevX, prevX);
    const approximation = prevX;
  
    return new NewtonApproximationInfo(approximation, initialApproximation, lastSegment, stepCounter);
  }
  
  export  class ModifiedNewtonApproximationInfo {
    approximation: number;
    initialApproximation: number;
    lastSegment: Segment;
    stepCounter: number;
  
    constructor(approximation: number, initialApproximation: number, lastSegment: Segment, stepCounter: number) {
      this.approximation = approximation;
      this.initialApproximation = initialApproximation;
      this.lastSegment = lastSegment;
      this.stepCounter = stepCounter;
    }
  }
  
  
  
  export  class SecantApproximationInfo {
    approximation: number;
    initialApproximation: number;
    lastSegment: Segment;
    stepCounter: number;
  
    constructor(approximation: number, initialApproximation: number, lastSegment: Segment, stepCounter: number) {
      this.approximation = approximation;
      this.initialApproximation = initialApproximation;
      this.lastSegment = lastSegment;
      this.stepCounter = stepCounter;
    }
  }
  
  export  function approximateBySecant(func: (x: number) => number, segment: Segment, eps: number): SecantApproximationInfo {
    let stepCounter = 0;
    let prevX = segment.start;
    let currX = segment.end;
    let nextX = currX - func(currX) * (currX - prevX) / (func(currX) - func(prevX));
  
    while (true) {
      stepCounter = stepCounter + 1;
      nextX = currX - func(currX) * (currX - prevX) / (func(currX) - func(prevX));
  
      if (Math.abs(nextX - currX) < eps) {
        break;
      }
  
      prevX = currX;
      currX = nextX;
    }
  
    const lastSegment = new Segment(currX, nextX);
    const approximation = nextX;
    const initialApproximation = segment.center();
  
    return new SecantApproximationInfo(approximation, initialApproximation, lastSegment, stepCounter);
  }
  

  
  export  function checkConvergence(func: (x: number) => number, secondDerivative: (x: number) => number, x0: number): boolean {
    return func(x0) * secondDerivative(x0) > 0;
  }
  
  export  function printSignChangeSegments(signChangeSegments: Segment[]): void {
    console.log('Sign change segments (' + signChangeSegments.length + '):');
  
    let i = 1;
  
    for (const s of signChangeSegments) {
      console.log(i + '. ' + s.toString());
      i = i + 1;
    }
  }
  
  export  function separateRoots(func: (x: number) => number, segment: Segment, stepFactor: number): Segment[] {
    let counter = 0;
    const signChangeSegments: Segment[] = [];
    const h = segment.length() / stepFactor;
  
    let start = segment.start;
    let end = start + h;
  
    while (end <= segment.end) {
      const valueAtStart = func(start);
      const valueAtEnd = func(end);
  
      if (valueAtStart * valueAtEnd <= 0) {
        counter = counter + 1;
        const currSegment = new Segment(start, end);
        signChangeSegments.push(currSegment);
      }
  
      start = end;
      end = start + h;
    }
  
    return signChangeSegments;
  }
  export function getStartXValue(minX: number, maxX: number, func: (x: number) => number, secondDerivative: (x: number) => number): number {
    const segment = new Segment(minX, maxX)
    const STEP_FACTOR = 1000;
    const STEP = segment.length() / STEP_FACTOR;
  
    let startX = minX;
  
    while (true) {
      if (checkConvergence(func, secondDerivative, startX)) {
        break;
      }
  
      startX = startX + STEP;
  
      if (startX > maxX) {
        throw new Error('There is no convergence on the entire segment.');
      }
    }
  
    return startX;
  }
  