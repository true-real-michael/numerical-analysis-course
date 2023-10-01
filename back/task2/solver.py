import json

import sympy as sp

from back.task2.approximation import NewtonApproximation
from back.task2.approximation import LagrangeApproximation


def solve(function: str, left: str, right: str, n: str, x_values: str, x: str):
    try:
        function = sp.parsing.sympy_parser.parse_expr(function)
    except Exception:
        raise ValueError("could not parse function")

    left = float(left)
    right = float(right)
    n = int(n)
    x = float(x)
    x_values = json.loads(x_values)

    assert n < len(x_values)
    assert all(tuple(map(lambda xi: left <= xi <= right, x_values)))

    x_values = sorted(x_values, key=lambda xi: abs(xi - x))
    selected = x_values[: n + 1]

    res = [
        NewtonApproximation(function, selected, x).to_dict(),
        LagrangeApproximation(function, selected, x).to_dict(),
    ]

    return json.dumps(res)
