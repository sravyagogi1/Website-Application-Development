from flask import Flask, render_template
import random

app = Flask(__name__)

wins = 0
losses = 0

@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/gamble")
def gamble():
    global wins, losses
    result = random.choice(["win", "lose"])
    if result == "win":
        wins += 1
        return render_template("win.html")
    losses += 1
    return render_template("lose.html")

@app.route("/stats")
def stats():
    return render_template("stats.html", wins=wins, losses=losses)

if __name__ == "__main__":
    app.run(debug=True)
