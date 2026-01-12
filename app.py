from flask import Flask, render_template, request, jsonify
from dijkstra import dijkstra

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/run", methods=["POST"])
def run_algorithm():
    data = request.json

    grid = data["grid"]
    start = tuple(data["start"])
    end = tuple(data["end"])
    diagonal = data.get("diagonal", False)

    result = dijkstra(grid, start, end, diagonal)

    # 🔍 DEBUG PRINT (VERY IMPORTANT)
    print("Visited:", len(result["visited"]))
    print("Path:", result["path"])

    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
