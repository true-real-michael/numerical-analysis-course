import json

import numpy as np
import sympy as sp
from sympy.abc import x as x_sym
from math import exp

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
            SIRL(left, right, function, true_value).to_dict(),
            SIRR(left, right, function, true_value).to_dict(),
            SIRM(left, right, function, true_value).to_dict(),
            SIT(left, right, function, true_value).to_dict(),
            SIS(left, right, function, true_value).to_dict(),
            SITE(left, right, function, true_value).to_dict(),
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

    h = (right - left) / n

    x_values = [left + i * h for i in range(n + 1)]
    for x in x_values:
        values.append((sp.Number(x), f(sp.Number(x), function)))
    true_value = sp.integrate(function, (x_sym, left, right))

    w = sp.N(sum(f(x, function) for x in x_values[1:-1]))
    q = sp.N(sum(f(x + h / 2, function) for x in x_values[:-1]))
    z = sp.N(f(x_values[0], function) + f(x_values[-1], function))

    res = {
        "points": [[float(x), float(y)] for x, y in values],
        "true_value": float(true_value),
        "approximation_by_method": [
            CIRL(left, right, function, x_values, true_value, h, w, q, z).to_dict(),
            CIRR(left, right, function, x_values, true_value, h, w, q, z).to_dict(),
            CIRM(left, right, function, x_values, true_value, h, w, q, z).to_dict(),
            CIT(left, right, function, x_values, true_value, h, w, q, z).to_dict(),
            CIS(left, right, function, x_values, true_value, h, w, q, z).to_dict(),
        ],
    }

    return json.dumps(res)


def solve_4_3(function, left, right, m, l):
    try:
        function = sp.parsing.sympy_parser.parse_expr(function)
    except Exception:
        raise ValueError("could not parse function")

    left = float(left)
    right = float(right)
    m = int(m)
    l = int(l)

    h = (right - left) / m
    hl = h / l

    x_values = [left + i * h for i in range(m + 1)]
    xl_values = [left + i * hl for i in range(m * l + 1)]

    w = sp.N(sum(f(x, function) for x in x_values[1:-1]))
    wl = sp.N(sum(f(x, function) for x in xl_values[1:-1]))
    q = sp.N(sum(f(x + h / 2, function) for x in x_values[:-1]))
    ql = sp.N(sum(f(x + hl / 2, function) for x in xl_values[:-1]))
    z = sp.N(f(x_values[0], function) + f(x_values[-1], function))
    zl = sp.N(f(xl_values[0], function) + f(xl_values[-1], function))

    true_value = sp.integrate(function, (x_sym, left, right))

    res = {
        "true_value": float(true_value),
        "approximation_by_method": []
    }

    for method in [CIRL, CIRR, CIRM, CIT, CIS]:
        res_Jh = method(left, right, function, x_values, true_value, h, w, q, z)
        res_Jhl = method(left, right, function, xl_values, true_value, hl, wl, ql, zl)
        refined_value = (l**method.r * res_Jhl.value - res_Jh.value) / (
            l**method.r - 1
        )
        res['approximation_by_method'].append({
            "name": res_Jh.name,
            "raw_value": float(res_Jh.value),
            "refined_value": float(refined_value),
            "raw_error": float(abs(res_Jh.value - true_value)),
            "refined_error": float(abs(float(refined_value) - true_value)),
        })

    return json.dumps(res)


if __name__ == "__main__":
    function = input("input function: ")
    left = input("left border: ")
    right = input("right border: ")
    m = input("M: ")
    l = input("L: ")
    solve_4_3(function, left, right, m, l)
