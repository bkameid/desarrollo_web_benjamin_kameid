from datetime import datetime
from pathlib import Path
from uuid import uuid4

from flask import Flask, request, render_template, redirect, url_for, session
from werkzeug.utils import secure_filename

from database import db

app = Flask(__name__)
app.secret_key = "tarea2-development-key"
BASE_DIR = Path(__file__).resolve().parent
UPLOAD_FOLDER = BASE_DIR / "static" / "uploads"
UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def home():
    return redirect(url_for("index"))

@app.route("/avistamientos")
def avistamientos():
    data = db.get_recent_avistamientos()
    return render_template("avistamientos.html", avistamientos=data)

@app.route("/voluntario", methods=["GET", "POST"])
def voluntario():
    if request.method == "POST":
        nombre = request.form.get("nombre", "").strip()
        email = request.form.get("email", "").strip()
        telefono = request.form.get("fono", "").strip()
        comuna = request.form.get("comuna", "").strip()
        region = request.form.get("region", "").strip()
        comuna_data = db.get_comuna(comuna)
        if not all((nombre, email, telefono)) or comuna_data is None:
            return render_template("voluntario.html", error="Completa los datos y selecciona una comuna válida.")
        session["voluntario_id"] = db.create_voluntario(nombre, email, telefono, comuna_data["id"])
        return redirect(url_for("reporte"))
    return render_template("voluntario.html")

@app.route("/reporte", methods=["GET", "POST"])
def reporte():
    return render_template("reporte.html")

@app.route("/aboutus")
def aboutus():
    return render_template("aboutus.html")

@app.route("/index")
def index():
    return render_template("index.html")

@app.route("/post-avis", methods=["POST"])
def post_avis():
    voluntario_id = session.get("voluntario_id")
    print(voluntario_id)

    #if voluntario_id is None:
    #    return redirect(url_for("voluntario"))

    nombre_ave = request.form.get("nombre-ave", "").strip()
    comuna = request.form.get("comuna", "").strip()
    fecha = request.form.get("fecha", "").strip()
    descripcion = request.form.get("descripcion", "").strip()
    foto = request.files.get("foto")
    ave = db.get_ave_by_name(nombre_ave)

    if not ave or not comuna or not fecha or not foto or not foto.filename:
        print(ave, comuna, fecha, foto, foto.filename)
        return render_template("reporte.html", error="Completa todos los campos del reporte.")

    try:
        fecha_hora = datetime.strptime(fecha, "%Y-%m-%d")
    except ValueError:
        return render_template("reporte.html", error="La fecha no es válida.")

    original_name = secure_filename(foto.filename)
    extension = Path(original_name).suffix.lower()

    if extension not in {".jpg", ".jpeg", ".png", ".gif", ".webp"}:
        return render_template("reporte.html", error="La imagen debe ser JPG, PNG, GIF o WEBP.")

    filename = f"{uuid4().hex}{extension}"
    foto.save(Path(app.config["UPLOAD_FOLDER"]) / filename)
    lugar = f"{comuna}, {request.form.get('region', '').strip()}"
    sighting_id = db.create_avistamiento(
        voluntario_id, ave["id"], fecha_hora, lugar, descripcion
    )
    db.create_registro(f"uploads/{filename}", original_name, sighting_id)
    return redirect(url_for("avistamientos"))
