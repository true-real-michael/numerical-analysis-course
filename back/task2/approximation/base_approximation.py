from typing import List

import sympy as sp


class BaseApproximation:
    def __init__(self, values: List[List[float]]):
        self.values = []
        for x, y in values:
            self.values.append((sp.Number(x), sp.Number(y)))
