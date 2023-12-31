import json
import dataclasses

import sympy as sp
from sympy.abc import x as x_sym
from scipy.optimize import fsolve

from .approximation import (
    BaseApproximation,
    BisectionApproximation,
    ChordApproximation,
    SecantApproximation,
    FixedPointIterationApproximation,
    NewtonApproximation,
    ModifiedNewtonApproximation,
)
from .approximate_zeros import approximate_zeros


@dataclasses.dataclass
class ApproximationCollection:
    left: float
    right: float
    approximations: dict[str, BaseApproximation]

    def to_dict(self):
        return {
            "left_bound": self.left,
            "right_bound": self.right,
            "true_value": self.approximations["Newton Approximation"].true_value,
            "approximations_by_method": [
                self.approximations[name].to_dict() for name in self.approximations
            ],
        }

    def __repr__(self):
        val = f"[{self.left}, {self.right}]\n"
        for method_name in self.approximations:
            val += f"{self.approximations[method_name].to_dict()}"
        val += "\n"
        return val


def pipeline(
    function: sp.Function,
    left: sp.Number,
    right: sp.Number,
    n_divisions: int,
    eps: float,
):
    ans = []

    methods = {
        "Bisection Approximation": BisectionApproximation,
        "Chord Approximation": ChordApproximation,
        "Secant Approximation": SecantApproximation,
        "Fixed PointIteration Approximation": FixedPointIterationApproximation,
        "Newton Approximation": NewtonApproximation,
        "Modified Newton Approximation": ModifiedNewtonApproximation,
    }

    for left, right in approximate_zeros(function, left, right, sp.Number(n_divisions)):
        print(f"{left} {right}")
        function_lambda = sp.lambdify(x_sym, function, modules=["numpy"])
        roots = fsolve(function_lambda, float(sp.N((left + right) / 2)))
        true_value = float(roots[0]) if roots else None

        new_approx = ApproximationCollection(float(sp.N(left)), float(sp.N(right)), {})
        for method_name in methods:
            method = methods[method_name]
            new_approx.approximations[method_name] = method(
                function, left, right, sp.Number(eps), true_value
            )
            print(f"done {method_name}")
        ans.append(new_approx)

    return json.dumps(
        {
            "n_divisions": n_divisions,
            "eps": eps,
            "selected_divisions": [collection.to_dict() for collection in ans],
        }
    )
