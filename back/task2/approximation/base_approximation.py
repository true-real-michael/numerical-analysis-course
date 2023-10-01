from typing import List, Any

import sympy as sp
from sympy.abc import x as x_sym


class BaseApproximation:
    name = ""
    polynomial = None

    def __init__(self, function: sp.Function, values: List[Any], x):
        self.function = function
        self.x = x
        self.values = []
        for x, y in values:
            self.values.append((sp.Number(x), sp.Number(y)))

    def _f(self, x: sp.Number) -> sp.Number:
        return sp.N(self.function.subs(x_sym, x))

    def _p(self, x: sp.Number) -> sp.Number:
        return sp.N(self.polynomial.subs(x_sym, x))

    def to_dict(self):
        return {
            "name": self.name,
            "polynomial": self.polynomial,
            "error": abs(float(self._f(self.x)) - float(self._p(self.x))),
        }