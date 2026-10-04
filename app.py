from flask import Flask, request, render_template, redirect, url_for, session
import werkzeug


app = Flask(__name__)
@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")

@app.route("/avistamientos")
def avistamientos():
    return render_template("avistamientos.html")

@app.route("/voluntario")
def voluntario():
    return render_template("voluntario.html")

@app.route("/reporte")
def reporte():
    return render_template("reporte.html")

@app.route("/aboutus")
def aboutus():
    return render_template("aboutus.html")

@app.route("/index")
def index():
    return render_template("index.html")