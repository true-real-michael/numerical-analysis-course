import sympy as sp
from sympy.abc import x as x_sym

from .base_approximation import BaseApproximation


class ChordApproximation(BaseApproximation):
    method_name = "Chord Approximation"

    def _step(self) -> sp.Number:
        x = self.value
        f = self.function
        return (
            x
            - f.subs(x_sym, x)
            / (f.subs(x_sym, x) - f.subs(x_sym, self._left))
            * (x - self._left)
            if self._left > 0
            else x
            - f.subs(x_sym, x)
            / (f.subs(x_sym, self._right) - f.subs(x_sym, x))
            * (self._right - x)
        )
