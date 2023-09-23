from typing import List

import sympy as sp
from sympy.abc import x as x_sym


def approximate_zeros(
    function: sp.Function,
    left: sp.Number,
    right: sp.Number,
    number_of_subsections: sp.Integer,
) -> List[tuple[sp.Number, sp.Number]]:
    if right < left:
        raise ValueError("the left border of domain must be less than the right border")

    h = (right - left) / number_of_subsections
    x1 = left
    x2 = x1 + h

    ans = []

    while x2 < right:
        if function.subs(x_sym, x1) * function.subs(x_sym, x2) < 0:
            ans.append((x1, x2))
        elif abs(float(sp.N(function.subs(x_sym, x1)))) < 1e-10:
            ans.append((x1, x2))
        x1 = x2
        x2 = x2 + h

    return ans
