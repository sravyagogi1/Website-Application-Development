from flask import Flask, render_template, request
from datetime import datetime

app = Flask(__name__)
log_data = []
last_visit = None

@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/log")
def log():
    global last_visit
    now = datetime.now()
    current_time = now.strftime("%Y-%m-%d %H:%M:%S")
    if last_visit is None:
        seconds_since_last = 0
    else:
        seconds_since_last = round((now - last_visit).total_seconds(), 2)
    entry = {
        "ip": request.remote_addr,
        "agent": request.headers.get("User-Agent"),
        "time": current_time,
        "seconds": seconds_since_last,
    }
    log_data.append(entry)
    last_visit = now
    return render_template("log.html", log_data=log_data)

if __name__ == "__main__":
    app.run(debug=True)
