from flask import Flask, render_template, jsonify

app = Flask(__name__)

votes = {"upvotes": 0, "downvotes": 0}

@app.route("/")
def index():
    return render_template(
        "index.html", upvotes=votes["upvotes"], downvotes=votes["downvotes"]
    )

@app.route("/upvote", methods=["POST"])
def upvote():
    votes["upvotes"] += 1
    return jsonify(votes)

@app.route("/downvote", methods=["POST"])
def downvote():
    votes["downvotes"] += 1
    return jsonify(votes)

if __name__ == "__main__":
    app.run(debug=True)