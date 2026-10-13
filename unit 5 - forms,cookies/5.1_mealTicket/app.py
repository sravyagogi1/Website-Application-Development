from flask import Flask, render_template, request

app = Flask(__name__)

meals = [
    {"name":"Breakfast","price":8.00},
    {"name":"Lunch","price":10.00},
    {"name":"Dinner","price":12.00},
]

#track across submissions
total_orders = 0
total_revenue = 0.0

@app.route("/")
def index():
    return render_template("index.html", meals=meals)

@app.route("/result", methods=["POST"])
def result():
    global total_orders,total_revenue

    name = request.form.get("name", "Guest")
    selected_meal = request.form.get("meal")
    instructions = request.form.get("instructions", "")

    base_price = 0.0
    for meal in meals:
        if meal["name"] == selected_meal:
            base_price = meal["price"]

    subtotal = base_price

    senior_discount = request.form.get("senior_discount")
    if senior_discount == "1":
        subtotal *= 0.90

    #track kitchen stats 
    if subtotal > 0:
        total_orders += 1
        total_revenue += subtotal

    return render_template(
        "result.html", 
        name=name, 
        meal=selected_meal, 
        instructions=instructions, 
        total=round(subtotal,2)
    )

@app.route("/kitchen")
def kitchen():
    return render_template("kitchen.html",total_orders=total_orders,total_revenue=round(total_revenue,2))

if __name__ == "__main__":
    app.run(debug=False, port=5001)