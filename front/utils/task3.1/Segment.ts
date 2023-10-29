class Segment {

    start: number;
    end: number;

    constructor(start: number, end: number) {
      this.start = start;
      this.end = end;
    }
  
    toString() {
      return `[${this.formatFloat(this.start)} ; ${this.formatFloat(this.end)}]`;
    }
  
    length() {
      return Math.abs(this.end - this.start);
    }
  
    center() {
      return (this.start + this.end) / 2;
    }
  
    copy() {
      return new Segment(this.start, this.end);
    }
  
    formatFloat(num: number, digits = 12) {
      const template = `%.${digits}f`;
      return template.replace('%f', num.toFixed(digits));
    }
  
    formatFloatOrNone(num: number, digits = 12) {
      return num !== null ? this.formatFloat(num, digits) : null;
    }
  }
  
export default Segment
// Example usage:
//   const segment = new Segment(2.5, 6.3);
