from flask import Flask, render_template

app = Flask(__name__)

tier_list = [
    'Galarian Stunfisk',
    'Wobbuffet',
    'Magikarp',
    'Throh',
    'Mega Charizard'
]

@app.route("/")
def home():
    return render_template("index.html", tier_list=tier_list)

if __name__ == "__main__":
    app.run(debug=True)
