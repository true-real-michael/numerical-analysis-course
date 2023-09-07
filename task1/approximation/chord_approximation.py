import sympy as sp
from sympy.abc import x as x_sym

from .approximation import Approximation


class ChordApproximation(Approximation):
    def _step(self) -> sp.Number:
        x = self._value
        f = self.function
        return (
            x
            - f.subs(x_sym, x)
            / (f.subs(x_sym, x) - f.subs(x_sym, self.left))
            * (x - self.left)
            if self.left > 0
            else x
            - f.subs(x_sym, x)
            / (f.subs(x_sym, self.right) - f.subs(x_sym, x))
            * (self.right - x)
        )
