import sympy as sp
from sympy.abc import x as x_sym

from .base_approximation import BaseApproximation


class FixedPointIterationApproximation(BaseApproximation):
    method_name = "Fixed Point Iteration Approximation"

    def _step(self) -> sp.Number:
        phi = x_sym - self.function / sp.diff(self.function, x_sym)
        return phi.subs(x_sym, self.value)
