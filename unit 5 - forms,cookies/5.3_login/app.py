import hashlib
import json
from flask import Flask, redirect, render_template, request, session, url_for

app = Flask(__name__)
app.secret_key = "login-session-secret-key-531"

def load_credentials():
    with open("credentials.json", "r") as file:
        return json.load(file)

def hash_password(password):
    password_bytes = password.encode("utf-8")
    sha_obj = hashlib.sha256()
    sha_obj.update(password_bytes)
    return sha_obj.hexdigest()

@app.route("/")
def index():
    return render_template(
        "index.html",
        logged_in=session.get("logged_in") is True,
        username=session.get("user"),
        success=request.args.get("success"),
        auth_error=request.args.get("auth_error"),
        logout=request.args.get("logout"),
    )

@app.route("/login", methods=["POST"])
def login():
    credentials = load_credentials()
    username = request.form.get("username", "")
    password = request.form.get("password", "")
    hashed_password = hash_password(password)

    if username in credentials and credentials[username] == hashed_password:
        session["logged_in"] = True
        session["user"] = username
        return redirect(url_for("secret"))

    return redirect(url_for("index", success="false"))

@app.route("/secret")
def secret():
    if session.get("logged_in") is not True:
        return redirect(url_for("index", auth_error="true"))

    return render_template("secret.html", username=session.get("user"))

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index", logout="true"))

if __name__ == "__main__":
    app.run(debug=True, port=5003)
