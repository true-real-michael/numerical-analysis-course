import json

import numpy as np
import sympy as sp
from sympy.abc import x as x_sym

from .approximation import *


def f(x: sp.Number, function) -> sp.Number:
    return sp.Number(sp.N(function.subs(x_sym, x)))


def solve_4_1(function, left, right):
    try:
        function = sp.parsing.sympy_parser.parse_expr(function)
    except Exception:
        raise ValueError("could not parse function")

    left = float(left)
    right = float(right)

    true_value = sp.integrate(function, (x_sym, left, right))

    res = {
        "true_value": float(true_value),
        "approximation_by_method": [
            SIRL(left, right, function, true_value),
            SIRR(left, right, function, true_value),
            SIRM(left, right, function, true_value),
            SIT(left, right, function, true_value),
            SIS(left, right, function, true_value),
            SITE(left, right, function, true_value),
        ],
    }

    return json.dumps(res)


def solve_4_2(function, left, right, n):
    try:
        function = sp.parsing.sympy_parser.parse_expr(function)
    except Exception:
        raise ValueError("could not parse function")

    left = float(left)
    right = float(right)
    n = int(n)
    values = []

    x_values = np.arange(start=left, stop=right, step=(right - left) / n)
    for x in x_values:
        values.append((sp.Number(x), f(sp.Number(x), function)))
    true_value = sp.integrate(function, (x_sym, left, right))

    res = {
        "points": [[x, y] for x, y in values],
        "true_value": float(true_value),
        "approximation_by_method": [
            CIRL(left, right, function, values, true_value),
            CIRR(left, right, function, values, true_value),
            CIRM(left, right, function, values, true_value),
            CIT(left, right, function, values, true_value),
            CIS(left, right, function, values, true_value),
            CITE(left, right, function, values, true_value),
        ],
    }

    return json.dumps(res)
