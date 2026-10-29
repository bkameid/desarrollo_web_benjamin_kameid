from datetime import datetime
from pathlib import Path
from uuid import uuid4

from flask import Flask, request, render_template, redirect, url_for, session
from werkzeug.utils import secure_filename

from database import db
from utils.validations import validate_image_upload, validate_report, validate_volunteer

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
    page_size = 10
    try:
        page = max(1, int(request.args.get("page", 1)))
    except (TypeError, ValueError):
        page = 1

    total = db.get_avistamiento_count()
    total_pages = max(1, (total + page_size - 1) // page_size)
    page = min(page, total_pages)
    data = db.get_recent_avistamientos(page_size, (page - 1) * page_size)
    return render_template(
        "avistamientos.html",
        avistamientos=data,
        page=page,
        total_pages=total_pages,
    )

@app.route("/voluntario", methods=["GET", "POST"])
def voluntario():
    if request.method == "POST":
        form_data = request.form
        errors = validate_volunteer(form_data)
        regiones = db.get_region()
        region = next((item for item in regiones if str(item["id"]) == form_data.get("region", "")), None)

        if region is None:
            errors["region"] = "Selecciona una región válida."

        comuna = form_data.get("comuna", "").strip()
        db_comuna = db.get_comuna(comuna, region["nombre"]) if region and "comuna" not in errors else None
        if db_comuna is None:
            errors["comuna"] = "Selecciona una comuna válida para la región elegida."

        if errors:
            return render_template("voluntario.html", error=" ".join(errors.values()), regiones=regiones)

        nombre = form_data.get("nombre", "").strip()
        email = form_data.get("email", "").strip()
        telefono = form_data.get("fono", "").strip()
        session["voluntario_id"] = db.create_voluntario(nombre, email, telefono, db_comuna["id"])
        return redirect(url_for("reporte"))
    return render_template("voluntario.html", regiones=db.get_region())

@app.route("/reporte", methods=["GET", "POST"])
def reporte():
    return render_template("reporte.html", regiones=db.get_region(), aves=db.get_aves())

@app.route("/aboutus")
def aboutus():
    return render_template("aboutus.html", cantidad=197 + db.get_user_count()[0]["count"])

@app.route("/index")
def index():
    data = db.get_recent_avistamientos(2)
    return render_template("index.html", avistamientos = data)

@app.route("/post-avis", methods=["POST"])
def post_avis():
    voluntario_id = session.get("voluntario_id")
    if voluntario_id is None:
        return redirect(url_for("voluntario"))

    errors = validate_report(request.form)
    region_id = request.form.get("region", "").strip().lower()
    comuna = request.form.get("comuna", "").strip()
    foto = request.files.get("foto")
    image_error = validate_image_upload(foto)
    if image_error:
        errors["foto"] = image_error

    comuna_data = db.get_comuna_in_region(comuna, region_id)
    if comuna_data is None:
        errors["comuna"] = "Selecciona una comuna válida para la región elegida."

    ave = request.form.get("nombre-ave", "").strip()
    descripcion = request.form.get("descripcion", "").strip()
    ave = db.get_ave_by_id(ave) if "nombre-ave" not in errors else None
    
    if ave is None:
        errors["nombre-ave"] = "El ave indicada no existe en el catálogo."

    if errors:
        return render_template("reporte.html", error=" ".join(errors.values()), aves = db.get_aves(), regiones = db.get_region())

    fecha_hora = datetime.strptime(request.form["fecha"], "%Y-%m-%d")

    original_name = secure_filename(foto.filename)
    extension = Path(original_name).suffix.lower()

    filename = f"{uuid4().hex}{extension}"
    foto.save(Path(app.config["UPLOAD_FOLDER"]) / filename)
    lugar = f"{comuna}, {db.get_nombreregion_from_id(region_id)}" #HERE
    sighting_id = db.create_avistamiento(
        voluntario_id, ave["id"], fecha_hora, lugar, descripcion
    )
    db.create_registro(f"uploads/{filename}", original_name, sighting_id)
    return redirect(url_for("avistamientos"))
