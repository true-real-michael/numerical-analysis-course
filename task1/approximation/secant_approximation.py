from typing import Optional

import sympy as sp
from sympy.abc import x as x_sym

from .base_approximation import BaseApproximation


class SecantApproximation(BaseApproximation):
    value_prev: Optional[sp.Number] = None
    method_name = "Secant Appoximation"

    def _step(self) -> sp.Number:
        x = self.value
        x_prev = self.approximation_values[-2]
        f = self.function
        new_value = x - f.subs(x_sym, x) / (
            f.subs(x_sym, x) - f.subs(x_sym, x_prev)
        ) * (x - x_prev)
        return new_value

    def _solve(self):
        self.approximation_values.insert(
            0, self._right if self.value != self._right else self._left
        )
        super()._solve()
