from flask import Flask, render_template

app = Flask(__name__)

@app.route("/dogs")
def dogs():
    return render_template("dogs.html")

@app.route("/cats")
def cats():
    return render_template("cats.html")

if __name__ == "__main__":
    app.run(debug=True)
