import sympy as sp
from sympy.abc import x as x_sym

from back.task4.approximation.formulae import *

__all__ = ["SIS", "SIT", "SIRL", "SIRR", "SIRM", "SITE", "CIS", "CIT", "CIRL", "CIRR", "CIRM", "CITE"]


class SimpleIntegration(Formula, ABC):
    name = "base integration"

    def __init__(self, left, right, function, true_value):
        super().__init__(function)
        self.left = left
        self.right = right
        self.true_value = true_value

        self.value = sp.N(self.formula(self.left, self.right))

    def to_dict(self):
        return {
            "name": self.name,
            "value": float(self.value),
            "error": float(abs(self.value - self.true_value)),
        }


class SIRL(SimpleIntegration, RectangleLeft):
    name = "Rectangle Left"


class SIRR(SimpleIntegration, RectangleRight):
    name = "Rectangle Right"


class SIRM(SimpleIntegration, RectangleMid):
    name = "Rectangle Middle"


class SIT(SimpleIntegration, Trapeze):
    name = "Trapeze"


class SIS(SimpleIntegration, Simpsons):
    name = "Simpson's"


class SITE(SimpleIntegration, ThreeEighths):
    name = "Three Eighths"


class ComplexIntegration(Formula, ABC):
    name = "base integration"

    def __init__(self, left, right, function, values, true_value):
        super().__init__(function)
        self.left = left
        self.right = right
        self.values = values
        self.true_value = true_value

        self.value = self.solve()

    def solve(self):
        for x1, y1, x2, y2 in zip(self.values[:-1], self.values[1:]):
            self.value = sp.N(self.value + self.formula(x1, x2))

    def to_dict(self):
        return {
            "name": self.name,
            "value": float(self.value),
            "error": float(abs(self.value - self.true_value)),
        }


class CIRL(ComplexIntegration, RectangleLeft):
    name = "Rectangle Left"


class CIRR(ComplexIntegration, RectangleRight):
    name = "Rectangle Right"


class CIRM(ComplexIntegration, RectangleMid):
    name = "Rectangle Middle"


class CIT(ComplexIntegration, Trapeze):
    name = "Trapeze"


class CIS(ComplexIntegration, Simpsons):
    name = "Simpson's"


class CITE(ComplexIntegration, ThreeEighths):
    name = "Three Eighths"
