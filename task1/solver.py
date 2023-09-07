import sympy as sp
from .pipeline import pipeline


def solve(function: str, left: str, right: str):
    if not function:
        return ""
    function = sp.parsing.sympy_parser.parse_expr(function)
    result = pipeline(function, int(left), int(right))
    return str(result)
