from typing import List, Tuple, Dict

import json


def solve(function: str, values: str, x: str, left: str, right: str, n: str):
    left = float(left)
    right = float(right)
    n = int(n)
    x = float(x)
    values = json.loads(values)  # List[Tuple[float, float]]
    assert n < len(values)

    values = sorted(values, key=lambda pair: abs(pair[0] - x))
    selected = values[:n+1]

