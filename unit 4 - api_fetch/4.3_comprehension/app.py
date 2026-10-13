from pathlib import Path
from flask import Flask, jsonify, render_template

app = Flask(__name__)

WORD_FILE = Path(__file__).with_name("enable1.txt")
SAMPLE_WORDS = [
    "apple","angle","banana","beacon","berry","brick","candle","castle","chair","cheese","cloud","crane",
    "dream","eagle","entry","flame","flower","garden","grape","guitar","happy","lemon","market","melon",
    "planet","pocket","river","school","silver","smile","stone","table","ticket","train","window","yonder",
]

def get_word_list():
    if not WORD_FILE.exists():
        return SAMPLE_WORDS
    return WORD_FILE.read_text().splitlines()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/words")
def words():
    word_list = get_word_list()

    six_letter_words = [word for word in word_list if len(word) == 6]
    words_with_e = [word for word in word_list if "e" in word]
    words_without_e = [word for word in word_list if "e" not in word]
    five_letter_e_not_first = [
        word for word in word_list if len(word) == 5 and "e" in word and word[0] != "e"
    ]

    return jsonify(
        {
            "six_letter_words": six_letter_words,
            "words_with_e": words_with_e,
            "words_without_e": words_without_e,
            "five_letter_e_not_first": five_letter_e_not_first,
        }
    )

if __name__ == "__main__":
    app.run(debug=False, port=5002)
