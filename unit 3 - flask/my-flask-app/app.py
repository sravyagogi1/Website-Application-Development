# app.py — your Flask application

from flask import Flask, render_template

app = Flask(__name__)
print(">>> SERVER IS INITIALIZING... <<<")


# The @app.route decorator maps a URL path to a function.
# "/" means the homepage (e.g. http://127.0.0.1:5000/)
@app.route("/")
def index():
    print(">>> VIEWING HOME PAGE (/) <<<")
    name = "World"
    return render_template("index.html", name=name)


@app.route("/about")
def about():
    print(">>> VIEWING ABOUT PAGE (/about) <<<")
    return render_template("about.html")


@app.route("/test")
def home():
    print(">>> VIEWING TEST PAGE (/test) <<<")
    return render_template("test.html")


if __name__ == "__main__":
    app.run(debug=True)
