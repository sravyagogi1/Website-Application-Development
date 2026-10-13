from flask import Flask, jsonify, render_template
import requests
from datetime import date as datetime_date

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get_schedule_from_ion/<schedule_date>")
def get_schedule_from_ion(schedule_date):
    try:
        datetime_date.fromisoformat(schedule_date)

        url = f"https://ion.tjhsst.edu/api/schedule/{schedule_date}"
        headers = {"User-Agent": "Mozilla/5.0"}

        response = requests.get(url, headers=headers, timeout=10)

        if response.status_code != 200:
            return jsonify({"error": "No schedule found for that date."}), 404

        data = response.json()
        blocks = data.get("day_type", {}).get("blocks", [])

        return jsonify(blocks)

    except ValueError:
        return jsonify({"error": "Please enter a valid date in YYYY-MM-DD format."}), 400

    except requests.RequestException:
        return jsonify({"error": "Could not reach the schedule server"}), 502

    except Exception as e:
        return jsonify({"error": "Something went wrong while loading the schedule"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)
