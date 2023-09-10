import abc

from typing import Optional

import sympy as sp


class BaseApproximation(abc.ABC):
    n_steps: int = 0
    left: sp.Number
    right: sp.Number
    eps: sp.Number
    function: sp.Function
    residual: sp.Number
    approximation_values: list[sp.Number]

    def __init__(
        self,
        function: sp.Function,
        left: sp.Number,
        right: sp.Number,
        eps: sp.Number,
    ):
        if right < left:
            raise ValueError(
                "the left border of domain must be less than the right border"
            )
        self.left = left
        self.right = right
        self.approximation_values = [(right + left) / 2]
        self.eps = eps
        self.function = function

        self._solve()

    def _inc_steps(self):
        self.n_steps += 1

    @property
    def is_valid(self):
        return self.left <= self.value <= self.right

    @property
    def value(self):
        return sp.N(self.approximation_values[-1])

    @abc.abstractmethod
    def _step(self) -> sp.Number:
        pass

    def _solve(self):
        new_value = self._step()
        self._inc_steps()
        while abs(new_value - self.value) > self.eps:
            self.approximation_values.append(new_value)
            new_value = self._step()
            self._inc_steps()
        self.approximation_values.append(new_value)
