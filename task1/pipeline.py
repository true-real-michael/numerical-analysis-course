import sympy as sp
import dataclasses

from .approximation import (
    BaseApproximation,
    BisectionApproximation,
    ChordApproximation,
    SecantApproximation,
    FixedPointIterationApproximation,
    NewtonApproximation,
)
from .approximate_zeros import approximate_zeros


@dataclasses.dataclass
class ApproximationCollection:
    left: float
    right: float
    approximations: dict[str, BaseApproximation]

    def __repr__(self):
        val = f"[{self.left}, {self.right}]\n"
        for method_name in self.approximations:
            val += (f"{method_name}:\n"
                    f"\tvalue: {self.approximations[method_name].value}\n"
                    f"\tsteps: {self.approximations[method_name].n_steps}\n")
        val += "\n"
        return val


def pipeline(
    function: sp.Function,
    left: sp.Number,
    right: sp.Number,
    n_divisions: int = 20,
    eps: float = 0.001,
):
    ans = []

    methods = {
        "Bisection Approximation": BisectionApproximation,
        "Chord Approximation": ChordApproximation,
        "Secant Approximation": SecantApproximation,
        "Fixed PointIteration Approximation": FixedPointIterationApproximation,
        "Newton Approximation": NewtonApproximation,
    }

    for left, right in approximate_zeros(function, left, right, sp.Number(n_divisions)):
        new_approx = ApproximationCollection(left, right, {})
        for method_name in methods:
            method = methods[method_name]
            new_approx.approximations[method_name] = method(
                function, left, right, sp.Number(eps)
            )
        ans.append(new_approx)

    return ans
