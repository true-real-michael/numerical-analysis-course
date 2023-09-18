import abc

from typing import Optional

import sympy as sp
from sympy.abc import x as x_sym
from scipy.optimize import fsolve


class BaseApproximation(abc.ABC):
    n_steps: int = 0
    _left: sp.Number
    _right: sp.Number
    eps: sp.Number
    function: sp.Function
    approximation_values: list[sp.Number]
    method_name: str
    _true_value: Optional[float]

    def __init__(
        self,
        function: sp.Function,
        left: sp.Number,
        right: sp.Number,
        eps: sp.Number,
        true_value: Optional[float]
    ):
        if right < left:
            raise ValueError(
                "the left border of domain must be less than the right border"
            )
        self._left = sp.N(left)
        self._right = sp.N(right)
        self.approximation_values = [(right + left) / 2]
        self.eps = eps
        self.function = function
        self._true_value = true_value

        self._solve()

    def _inc_steps(self):
        self.n_steps += 1

    @property
    def is_valid(self):
        return self._left <= self.value <= self._right

    @property
    def value(self):
        return float(sp.N(self.approximation_values[-1]))

    @property
    def left(self):
        return float(sp.N(self._left))

    @property
    def right(self):
        return float(sp.N(self._right))

    @property
    def true_value(self):
        return self._true_value or -999

    def _residual(self, val: sp.Number) -> float:
        return abs(float(sp.N(self.function.subs(x_sym, val))))

    @abc.abstractmethod
    def _step(self) -> sp.Number:
        pass

    def _solve(self):
        new_value = sp.N(self._step())
        self.approximation_values.append(new_value)
        self._inc_steps()
        while abs(self.approximation_values[-1] - self.approximation_values[-2]) > self.eps:
            new_value = sp.N(self._step())
            self._inc_steps()
            self.approximation_values.append(new_value)

    def to_dict(self):
        return {
            "method_name": self.method_name,
            "approximations": [
                {
                    "index": i,
                    "value": float(sp.N(x)),
                    "diff": float(sp.N(x - self.approximation_values[i - 1]))
                    if i != 0
                    else 0,
                    "error": float(sp.N(abs(x - self._true_value)))
                    if self._true_value
                    else -999,
                    "residual": self._residual(x),
                }
                for i, x in enumerate(self.approximation_values)
            ],
            "n_of_steps": self.n_steps,
            "residual": self._residual(self.value),
        }
