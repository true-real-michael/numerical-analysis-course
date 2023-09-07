import abc

from typing import Optional

import sympy as sp


class Approximation(abc.ABC):
    n_steps: int = 0
    _value: Optional[sp.Number]
    left: sp.Number
    right: sp.Number
    eps: sp.Number
    function: sp.Function

    def __init__(
        self,
        left: sp.Number,
        right: sp.Number,
        eps: sp.Number,
        function: sp.Function,
    ):
        if right < left:
            raise ValueError(
                "the left border of domain must be less than the right border"
            )
        self.left = left
        self.right = right
        self._value = (right + left) / 2
        self.eps = eps
        self.function = function

        self._solve()

    def _inc_steps(self):
        self.n_steps += 1

    @property
    def is_valid(self):
        return self.left <= self._value <= self.right

    @property
    def value(self):
        return sp.N(self._value)

    @abc.abstractmethod
    def _step(self) -> sp.Number:
        pass

    def _solve(self):
        new_value = self._step()
        self._inc_steps()
        while abs(new_value - self._value) > self.eps:
            self._value = new_value
            new_value = self._step()
            self._inc_steps()
        self._value = new_value
