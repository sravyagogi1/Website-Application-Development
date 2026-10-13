from pathlib import Path
from flask import Flask, jsonify, render_template

app = Flask(__name__)

WORD_FILE = Path(__file__).with_name("enable1.txt")
SAMPLE_WORDS = [
    "abaca",
    "added",
    "baaed",
    "bacca",
    "caeca",
    "ceded",
    "ebbed",
    "apple",
    "angle",
    "beacon",
    "brick",
    "crane",
    "dream",
    "flame",
    "grape",
    "lemon",
    "melon",
    "river",
    "smile",
    "stone",
    "table",
    "train",
]

def get_word_list():
    if not WORD_FILE.exists():
        return SAMPLE_WORDS
    return WORD_FILE.read_text().splitlines()

def find_words_without(grey_letters):
    blocked_letters = set(grey_letters.lower())
    return [
        word
        for word in get_word_list()
        if len(word) == 5 and not blocked_letters.intersection(word.lower())
    ]

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/<grey_letters>")
def words_without_grey_letters(grey_letters):
    return jsonify(find_words_without(grey_letters))


if __name__ == "__main__":
    app.run(debug=False, port=5002)
