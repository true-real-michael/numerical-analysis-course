import sympy as sp
from sympy.abc import x as x_sym

from .base_approximation import BaseApproximation


class NewtonApproximation(BaseApproximation):
    method_name = "Newton Approximation"

    def _step(self) -> sp.Number:
        x = self.approximation_values[-1]
        f = self.function
        return x - f.subs(x_sym, x) / sp.diff(f, x_sym).subs(x_sym, x)
