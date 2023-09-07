from typing import Optional

import sympy as sp
from sympy.abc import x as x_sym

from .base_approximation import BaseApproximation


class SecantApproximation(BaseApproximation):
    value_prev: Optional[sp.Number] = None

    def _step(self) -> sp.Number:
        x = self._value
        x_prev = self.value_prev
        f = self.function
        new_value = x - f.subs(x_sym, x) / (
            f.subs(x_sym, x) - f.subs(x_sym, x_prev)
        ) * (x - x_prev)
        self.value_prev = x
        return new_value

    def _solve(self):
        self.value_prev = self.right if self.value != self.right else self.left
        super()._solve()
