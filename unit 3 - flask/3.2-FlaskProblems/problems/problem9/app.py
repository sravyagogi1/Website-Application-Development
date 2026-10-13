from flask import Flask, render_template
import random

app = Flask(__name__)

@app.route("/roll/<int:num_sides>")
def roll_one(num_sides):
    if num_sides < 2 or num_sides > 100:
        return render_template("invalid.html")
    rolls = [random.randint(1, num_sides)]
    return render_template("roll.html", rolls=rolls, num_sides=num_sides, num_dice=1)

@app.route("/roll/<int:num_sides>/<int:num_dice>")
def roll_many(num_sides, num_dice):
    if num_sides < 2 or num_sides > 100 or num_dice < 1 or num_dice > 20:
        return render_template("invalid.html")
    rolls = [random.randint(1, num_sides) for _ in range(num_dice)]
    return render_template("roll.html", rolls=rolls, num_sides=num_sides, num_dice=num_dice)

if __name__ == "__main__":
    app.run(debug=True)
