from flask import Blueprint, flash
from flask_cors import cross_origin

import task1

views = Blueprint("views", __name__)


@views.route(
    "/task1_endpoint/<function>&<left_bound>&<right_bound>&<n_divisions>&<eps>"
)
@cross_origin()
def task_1endpoint(function, left_bound, right_bound, n_divisions, eps):
    try:
        result = task1.solve(function, left_bound, right_bound, n_divisions, eps)
    except Exception as e:
        result = {"error": str(e)}
        flash(str(e))

    return result
