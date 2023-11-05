function getNodesWeNeed(x: any, n: any, nodesOrRevers: any) {
    const raznTemp = new Set();
    const tempDict: any = {};
  
    for (const node of nodesOrRevers) {
      const razn = Math.abs(x - node);
      raznTemp.add(razn);
  
      if (razn in tempDict) {
        tempDict[razn].push(node);
      } else {
        tempDict[razn] = [node];
      }
    }
  
    const raznArray = Array.from(raznTemp).sort((a, b) => a - b);
    const nodesWeNeed = [];
  
    for (const t of raznArray) {
      for (const node of tempDict[t]) {
        nodesWeNeed.push(node);
      }
    }
  
    return nodesWeNeed.slice(0, n + 1);
  }

  function lagrangePolynom(n_: number, x_: any, nodesList: string | any[], nodesDict: { [x: string]: number; }) {
    let ans = 0;
    for (const x_k of nodesList.slice(0, n_ + 1)) {
      ans += l_kn(x_k, x_, nodesList) * nodesDict[x_k];
    }
    return ans;
  }
  
  function l_kn(x_k: any, x_: any, nodes_: any) {
    const w = w_dw(n + 1, x_, x_k, nodes_);
    const dw = w_dw(n + 1, x_k, x_k, nodes_);
    return w / dw;
  }
  
  function w_dw(k: any, x_: number, x_j: any, nodes_: string | any[]) {
    let ans = 1;
    for (const x_i of nodes_.slice(0, k)) {
      if (x_i !== x_j) {
        ans *= (x_ - x_i);
      }
    }
    return ans;
  }
  