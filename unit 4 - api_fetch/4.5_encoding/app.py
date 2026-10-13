from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

SYSTEM_DESCRIPTION = (
    "Each tile is encoded as letter + color number. "
    "0 = grey, 1 = yellow, 2 = green. "
    "A five-letter guess has ten characters, like c0r1a2n0e0. "
    "Multiple guesses are separated with dashes."
)

def parse_wordle_code(board_code):
    green = [None, None, None, None, None]
    yellow_letters = []
    yellow_positions = {}
    grey = []
    guesses = []
    errors = []

    if not board_code:
        return {
            "green": green,
            "yellow": yellow_letters,
            "yellow_positions": yellow_positions,
            "grey": grey,
            "guesses": guesses,
            "errors": ["No board code was sent."],
        }

    for guess_number, guess_code in enumerate(board_code.lower().split("-"), start=1):
        guess = []

        if len(guess_code) != 10:
            errors.append(f"Guess {guess_number} should have 10 characters.")
            continue

        for pair_start in range(0, 10, 2):
            letter = guess_code[pair_start]
            color = guess_code[pair_start + 1]
            position = pair_start // 2

            if not letter.isalpha():
                errors.append(f"Guess {guess_number}, position {position + 1} needs a letter.")
                continue

            if color not in "012":
                errors.append(f"Guess {guess_number}, position {position + 1} needs color 0, 1, or 2.")
                continue

            tile = {
                "letter": letter,
                "position": position,
                "color": color,
            }
            guess.append(tile)

            if color == "2":
                green[position] = letter
            elif color == "1":
                yellow_letters.append(letter)
                if letter not in yellow_positions:
                    yellow_positions[letter] = []
                yellow_positions[letter].append(position)
            else:
                grey.append(letter)

        if len(guess) == 5:
            guesses.append(guess)

    positive_letters = set(letter for letter in green if letter) | set(yellow_letters)
    grey_only = sorted(set(grey) - positive_letters)

    return {
        "green": green,
        "yellow": sorted(set(yellow_letters)),
        "yellow_positions": yellow_positions,
        "grey": grey_only,
        "guesses": guesses,
        "errors": errors,
    }

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/getwords")
@app.route("/getwords/<board_code>")
def getwords(board_code=None):
    board_code = board_code or request.args.get("board", "")
    parsed = parse_wordle_code(board_code)

    return jsonify(
        {
            "system": SYSTEM_DESCRIPTION,
            "encoded_board": board_code,
            "parsed": parsed,
        }
    )

if __name__ == "__main__":
    app.run(debug=False, port=5002)
