from abc import abstractmethod, ABC

import sympy as sp
from sympy.abc import x as x_sym


class Formula(ABC):
    def __init__(self, function):
        self.function = function

    def _f(self, x: sp.Number) -> sp.Number:
        return sp.N(self.function.subs(x_sym, x))

    @abstractmethod
    def formula(self, x1, x2):
        pass


class RectangleLeft(Formula):
    def formula(self, x1, x2):
        return (x2 - x1) * self._f(x1)


class RectangleRight(Formula):
    def formula(self, x1, x2):
        return (x2 - x1) * self._f(x2)


class RectangleMid(Formula):
    def formula(self, x1, x2):
        return (x2 - x1) * (self._f((x1 + x2) / 2))


class Trapeze(Formula):
    def formula(self, x1, x2):
        return (x2 - x1) / 2 * (self._f(x1) + self._f(x2))


class Simpsons(Formula):
    def formula(self, x1, x2):
        return (x2 - x1) / 6 * (self._f(x1) + 4 * self._f((x1 + x2) / 2) + self._f(x2))


class ThreeEighths(Formula):
    def formula(self, x1, x2):
        h = (x2 - x1) / 3
        return (x2 - x1) / 8 * (self._f(x1) + 3*self._f(x1 + h) + 3*self._f(x1 + h + h) + self._f(x2))
