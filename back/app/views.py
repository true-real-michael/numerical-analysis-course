from flask import Blueprint, render_template, request, flash

import task1

views = Blueprint("views", __name__)


@views.route("/", methods=["GET"])
def home():
    return render_template("home.html")


@views.route("/task1.html", methods=["GET", "POST"])
def task1_handler():
    function = request.form.get("function", "")
    left_bound = request.form.get("left_bound", "")
    right_bound = request.form.get("right_bound", "")

    try:
        result = task1.solve(function, left_bound, right_bound)
    except Exception as e:
        result = ""
        flash(str(e))
    return render_template("task1.html", submitted_text=result)


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
