from typing import List
from typing import Union

import sympy as sp
from sympy.abc import x as x_sym


def approximate_zeros(
        f: sp.Function,
        left: sp.Number,
        right: sp.Number,
        number_of_subsections: sp.Integer
) -> List[Union[tuple[sp.Number, sp.Number], sp.Number]]:
    if right < left:
        raise ValueError('the left border of domain must be less than the right border')

    h = (right - left) / number_of_subsections
    x1 = left
    x2 = x1 + h

    ans = []

    while x2 < right:
        if f.subs(x_sym, x1) * f.subs(x_sym, x2) < 0:
            ans.append((x1, x2))
        elif f.evalf(x1) == 0:
            ans.append((x1, x1))
        x1 = x2
        x2 = x2 + h

    return ans


def bisection_approximation(
        f: sp.Function,
        left: sp.Number,
        right: sp.Number,
        eps: sp.Number
) -> tuple[sp.Number, sp.Number]:

    while right - left > 2 * eps:
        mid = (left + right) / 2

        if f.subs(x_sym, mid) * f.subs(x_sym, left) <= 0:
            right = mid
        else:
            left = mid

    return left, right
