from flask import Flask, render_template, request, jsonify
from sympy import symbols, Eq, solve, diff, sympify, latex

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/quadratic", methods=["POST"])
def quadratic():
    data = request.get_json()
    a, b, c = data.get("a", 1), data.get("b", 0), data.get("c", 0)
    x = symbols('x')
    eq = Eq(a*x**2 + b*x + c, 0)
    sol = solve(eq, x)
    return jsonify({"solutions": [str(s) for s in sol]})

@app.route("/api/derivative", methods=["POST"])
def derivative():
    data = request.get_json()
    expr = data.get("expr", "x**2")
    variable = symbols(data.get("variable", "x"))
    f = sympify(expr)
    d = diff(f, variable)
    return jsonify({
        "result": str(d),
        "latex": latex(d)
    })

if __name__ == "__main__":
    app.run(debug=True)
