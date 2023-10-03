import sympy as sp
from sympy.abc import x as x_sym

from .base_approximation import BaseApproximation


class LagrangeApproximation(BaseApproximation):
    name = "Lagrange Approximation"

    def __init__(self, function, values, x):
        super().__init__(function, values, x)

        self.polynomial = 0
        for k, (xk, yk) in enumerate(self.values):
            numerator = 1
            denominator = 1
            for i, (xi, _) in enumerate(self.values):
                numerator *= (x_sym - xi) if i != k else 1
                denominator *= (xk - xi) if i != k else 1
            self.polynomial += yk * numerator / denominator

        # self.polynomial = sp.expand(self.polynomial)
