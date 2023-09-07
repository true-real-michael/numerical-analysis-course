import sympy as sp
from sympy.abc import x as x_sym

from .base_approximation import BaseApproximation


class BisectionApproximation(BaseApproximation):
    def _step(self) -> sp.Number:
        pass

    def _solve(self):
        left = self.left
        right = self.right
        f = self.function

        while right - left > 2 * self.eps:
            self._inc_steps()
            mid = (left + right) / 2
            if f.subs(x_sym, mid) * f.subs(x_sym, left) <= 0:
                right = mid
            else:
                left = mid

        self._value = (left + right) / 2
