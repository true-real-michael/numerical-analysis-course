import sympy as sp
from sympy.abc import x as x_sym

from .base_approximation import BaseApproximation


class NewtonApproximation(BaseApproximation):
    def _step(self) -> sp.Number:
        x = self._value
        f = self.function
        return x - f.subs(x_sym, x) / sp.diff(f, x_sym).subs(x_sym, x)
