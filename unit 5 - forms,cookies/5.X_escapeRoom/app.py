from flask import Flask, redirect, render_template, session, url_for

app = Flask(__name__)
app.secret_key = "visit-counter-inventory-key-527"

def init_user_state():
    session["visits"] = 0
    session["cars"] = 0
    session["cows"] = 0
    session.modified = True

def create_or_retrieve():
    if "visits" not in session or "cars" not in session or "cows" not in session:
        init_user_state()

def get_user_data():
    return { "visits": session["visits"], "cars": session["cars"], "cows": session["cows"], "total_items": session["cars"] + session["cows"],}

@app.route("/")
def index():
    create_or_retrieve()
    session["visits"] += 1
    session.modified = True
    return render_template("index.html", user_data=get_user_data())

@app.route("/buycar")
def buy_car():
    create_or_retrieve()
    session["cars"] += 1
    session.modified = True
    return redirect(url_for("index"))

@app.route("/buycow")
def buy_cow():
    create_or_retrieve()
    session["cows"] += 1
    session.modified = True
    return redirect(url_for("index"))

@app.route("/clearinventory")
def clear_inventory():
    session.clear()
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(debug=True, port=5002)
