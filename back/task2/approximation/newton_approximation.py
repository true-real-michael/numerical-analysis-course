import sympy as sp
from sympy.abc import x as x_sym

from .base_approximation import BaseApproximation


class NewtonApproximation(BaseApproximation):
    name = "Newton Approximation"

    def __init__(self, function, values, x):
        super().__init__(function, values, x)

        def div_diff(values):
            if len(values) < 2:
                return values[0][1]
            if len(values) == 2:
                return sp.N(
                    (values[1][1] - values[0][1]) / (values[1][0] - values[0][0])
                )
            return sp.N(
                (div_diff(values[1:]) - div_diff(values[:-1]))
                / (values[-1][0] - values[0][0])
            )

        self.polynomial = sp.Number(0)
        multiplicator = sp.Number(1)

        for i in range(len(self.values)):
            self.polynomial += div_diff(self.values[: i + 1]) * multiplicator
            multiplicator *= x_sym - self.values[i][0]
        self.polynomial = sp.simplify(self.polynomial)  # or expand
