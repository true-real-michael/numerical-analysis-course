import sympy as sp
from sympy.abc import x as x_sym

from .approximation import Approximation


class FixedPointIterationApproximation(Approximation):
    def _step(self) -> sp.Number:
        phi = x_sym - self.function / sp.diff(self.function, x_sym)
        return phi.subs(x_sym, self.value)
