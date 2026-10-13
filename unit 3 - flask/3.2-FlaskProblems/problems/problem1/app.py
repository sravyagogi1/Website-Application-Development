from flask import Flask, render_template

app = Flask(__name__)
count = 0

@app.route("/")
def home():
    global count
    count += 1
    return render_template("index.html", count=count)

if __name__ == "__main__":
    app.run(debug=True)
