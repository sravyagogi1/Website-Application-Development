from pathlib import Path
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

WORD_FILE = Path(__file__).with_name("enable1.txt")
SYSTEM_DESCRIPTION = (
    "Each tile is letter + color number. "
    "0 = grey, 1 = yellow, 2 = green. "
    "A row like CRANE can be encoded as c0r1a2n0e0. "
    "Multiple rows are separated with dashes."
)

def get_word_list():
    words = WORD_FILE.read_text().splitlines()
    return [word.lower() for word in words if len(word)==5 and word.isalpha()]

def parse_wordle_code(board_code):
    green = [None,None,None,None,None]
    yellow = []
    yellow_positions = {}
    grey_letters = []
    guesses = []
    errors = []

    if not board_code:
        return {
            "green": green,
            "yellow": yellow,
            "yellow_positions": yellow_positions,
            "grey": grey_letters,
            "guesses": guesses,
            "errors": errors,
        }

    for guess_number, guess_code in enumerate(board_code.lower().split("-"), start=1):
        guess = []

        if len(guess_code)!=10:
            errors.append(f"Guess {guess_number} should have 10 characters.")
            continue

        for pair_start in range(0,10,2):
            letter = guess_code[pair_start]
            color = guess_code[pair_start+1]
            position = pair_start // 2

            if not letter.isalpha():
                errors.append(f"Guess {guess_number}, position {position+1} needs letter")
                continue

            if color not in "012":
                errors.append(f"Guess {guess_number}, position {position+1} needs 0, 1, or 2.")
                continue

            guess.append({"letter": letter, "color": color, "position": position})

            if color == "2":
                green[position] = letter
            elif color == "1":
                yellow.append(letter)
                if letter not in yellow_positions:
                    yellow_positions[letter] = []
                yellow_positions[letter].append(position)
            else:
                grey_letters.append(letter)

        if len(guess) == 5:
            guesses.append(guess)

    known_letters = set(letter for letter in green if letter) | set(yellow)
    grey = sorted(set(grey_letters) - known_letters)

    return {
        "green": green,
        "yellow": sorted(set(yellow)),
        "yellow_positions": yellow_positions,
        "grey": grey,
        "guesses": guesses,
        "errors": errors,
    }

def word_matches(word, conditions):
    for position, letter in enumerate(conditions["green"]):
        if letter and word[position] != letter:
            return False

    for letter in conditions["grey"]:
        if letter in word:
            return False

    for letter, blocked_positions in conditions["yellow_positions"].items():
        if letter not in word:
            return False

        for position in blocked_positions:
            if word[position] == letter:
                return False

    return True

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/getwords")
@app.route("/getwords/<board_code>")
def getwords(board_code=None):
    board_code = board_code or request.args.get("board","")
    conditions = parse_wordle_code(board_code)
    valid_words = [
        word for word in get_word_list() if word_matches(word, conditions)
    ]

    return jsonify(
        {
            "system": SYSTEM_DESCRIPTION,
            "encoded_board": board_code,
            "conditions": conditions,
            "valid_words": valid_words,
        }
    )

if __name__ == "__main__":
    app.run(debug=False, port=5002)
