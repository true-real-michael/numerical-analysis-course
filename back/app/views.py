from flask import Blueprint, render_template, flash
from flask_cors import cross_origin

from back import task1, task2

views = Blueprint("views", __name__)


@views.route("/", methods=["GET"])
def home():
    return render_template("home.html")


@cross_origin()
@views.route(
    "/task1_endpoint/<function>&<left_bound>&<right_bound>&<n_divisions>&<eps>"
)
def task_1endpoint(function, left_bound, right_bound, n_divisions, eps):
    try:
        result = task1.solve(function, left_bound, right_bound, n_divisions, eps)
    except Exception as e:
        result = {"error": str(e)}
        flash(str(e))

    return result


@cross_origin()
@views.route("/task2_endpoint/<function>&<left_bound>&<right_bound>&<n>&<x_values>&<x>")
def task_2endpoint(function, left_bound, right_bound, n, x_values, x):
    try:
        result = task2.solve(function, left_bound, right_bound, n, x_values, x)
    except Exception as e:
        result = {"error": str(e)}
        flash(str(e))

    return result
