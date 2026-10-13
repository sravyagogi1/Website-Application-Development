from flask import Flask, render_template, redirect, url_for
import random

app = Flask(__name__)

@app.route("/ask")
def ask():
    choice = random.choice(["yes", "no", "maybe"])
    return redirect(url_for(choice))

@app.route("/yes")
def yes():
    return render_template("yes.html")

@app.route("/no")
def no():
    return render_template("no.html")

@app.route("/maybe")
def maybe():
    return render_template("maybe.html")

if __name__ == "__main__":
    app.run(debug=True)
