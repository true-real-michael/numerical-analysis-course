from typing import List, Tuple, Dict

import json

import sympy as sp
from sympy.abc import x as x_sym

from back.task2.approximation import NewtonApproximation
from back.task2.approximation import LagrangeApproximation


# def get_values(function: sp.Function, x_values: str):
#     x_values = json.loads(x_values)
#     return [(x, float(sp.N(function.subs(x_sym, x)))) for x in x_values]


def solve(function: str, left: str, right: str, n: str, x_values: str, x: str):
    try:
        function = sp.parsing.sympy_parser.parse_expr(function)
    except Exception:
        raise ValueError("could not parse function")

    left = float(left)
    right = float(right)
    n = int(n)
    x = float(x)
    # values = get_values(function, x_values)
    assert n < len(x_values)

    # values = sorted(values, key=lambda pair: abs(pair[0] - x))
    # selected = values[: n + 1]

    x_values = sorted(x_values, key=lambda xi: abs(xi - x))
    selected = x_values[: n + 1]

    res = [
        NewtonApproximation(function, selected).to_dict(),
        LagrangeApproximation(function, selected).to_dict(),
    ]

    return json.dumps(res)
