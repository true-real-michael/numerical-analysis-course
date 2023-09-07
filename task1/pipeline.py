import sympy as sp

from .approximation.newton_approximation import NewtonApproximation
from .zeros_of import bisection_approximation, approximate_zeros


def pipeline(
        function: sp.Function,
        left: sp.Number,
        right: sp.Number,
):
    possible_zeros = approximate_zeros(function, left, right, sp.Number(100))
    for local_left, local_right in possible_zeros:
        local_left, local_right = bisection_approximation(function, local_left, local_right, sp.Number(0.01))
        approx = NewtonApproximation(local_left, local_right, 0.0001, function).value
        print(approx)
