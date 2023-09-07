from sympy import cos

from .zeros_of import *
from .pipeline import pipeline


def example_cos():
    f = cos(x_sym)
    left = sp.Number(-10)
    right = sp.Number(10)
    pipeline(f, left, right)
