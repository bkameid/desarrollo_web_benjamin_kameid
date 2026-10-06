import re
from datetime import date, datetime


MAX_NAME_LENGTH = 100
MAX_EMAIL_LENGTH = 254
MAX_PHONE_LENGTH = 15
MAX_COMUNA_LENGTH = 100
MAX_BIRD_NAME_LENGTH = 100
MAX_DESCRIPTION_LENGTH = 1000
MAX_IMAGE_SIZE = 10 * 1024**2

NAME_PATTERN = re.compile(r"^[\wáéíóúüñÁÉÍÓÚÜÑ]+(?:[ '\-][\wáéíóúüñÁÉÍÓÚÜÑ]+)+$", re.UNICODE)
EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
PHONE_PATTERN = re.compile(r"^[29]\d{8}$")
TEXT_PATTERN = re.compile(r"^[\wáéíóúüñÁÉÍÓÚÜÑ0-9 .,'()\-/]+$", re.UNICODE)


def validate_volunteer(data):
    """Return a dictionary of server-side validation errors for a volunteer."""
    errors = {}
    nombre = data.get("nombre", "").strip()
    genero = data.get("genero", "").strip().lower()
    email = data.get("email", "").strip()
    region = data.get("region", "").strip()
    comuna = data.get("comuna", "").strip()
    telefono = data.get("fono", "").strip()
    fecha_nacimiento = data.get("dob", "").strip()

    if not nombre or len(nombre) > MAX_NAME_LENGTH or not NAME_PATTERN.fullmatch(nombre):
        errors["nombre"] = "Ingresa un nombre completo válido."

    if genero not in {"m", "f", "x"}:
        errors["genero"] = "Selecciona un género válido."

    if not email or len(email) > MAX_EMAIL_LENGTH or not EMAIL_PATTERN.fullmatch(email):
        errors["email"] = "Ingresa un correo válido."

    if not region or not region.isdigit() or int(region) <= 0:
        errors["region"] = "Selecciona una región válida."

    if not comuna or len(comuna) > MAX_COMUNA_LENGTH:
        errors["comuna"] = "Ingresa una comuna válida."

    if not PHONE_PATTERN.fullmatch(telefono) or len(telefono) > MAX_PHONE_LENGTH:
        errors["fono"] = "Ingresa un teléfono chileno válido de 9 dígitos."

    try:
        nacimiento = datetime.strptime(fecha_nacimiento, "%Y-%m-%d").date()
        today = date.today()
        age = today.year - nacimiento.year - (
            (today.month, today.day) < (nacimiento.month, nacimiento.day)
        )
        if nacimiento > today or age < 18:
            errors["dob"] = "Debes tener al menos 18 años."
    except ValueError:
        errors["dob"] = "Ingresa una fecha de nacimiento válida."

    return errors


def validate_report(data):
    """Return server-side validation errors for an observation report."""
    errors = {}
    nombre_ave = data.get("nombre-ave", "").strip()
    region = data.get("region", "").strip().lower()
    comuna = data.get("comuna", "").strip()
    fecha = data.get("fecha", "").strip()
    descripcion = data.get("descripcion", "").strip()
    valid_regions = {
        "arica-parinacota", "tarapacá", "antofagasta", "atacama", "coquimbo",
        "valparaiso", "metropolitana", "o'higgins", "maule", "ñuble", "biobio",
        "araucanía", "los rios", "los lagos", "aysén", "magallanes y antártica",
    }

    if not nombre_ave or len(nombre_ave) > MAX_BIRD_NAME_LENGTH or not TEXT_PATTERN.fullmatch(nombre_ave):
        errors["nombre-ave"] = "Ingresa un nombre de ave válido."

    if region not in valid_regions:
        errors["region"] = "Selecciona una región válida."

    if not comuna or len(comuna) > MAX_COMUNA_LENGTH or not TEXT_PATTERN.fullmatch(comuna):
        errors["comuna"] = "Ingresa una comuna válida."

    try:
        fecha_avistamiento = datetime.strptime(fecha, "%Y-%m-%d").date()
        if fecha_avistamiento > date.today():
            errors["fecha"] = "La fecha no puede ser futura."
    except ValueError:
        errors["fecha"] = "Ingresa una fecha válida."

    if len(descripcion) > MAX_DESCRIPTION_LENGTH or (
        descripcion and not TEXT_PATTERN.fullmatch(descripcion)
    ):
        errors["descripcion"] = "La descripción contiene caracteres no permitidos o es demasiado larga."

    return errors


def validate_image_upload(image):
    """Validate an uploaded image using its name, MIME type and size."""
    if image is None or not image.filename:
        return "Adjunta una imagen."

    allowed_types = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".webp": "image/webp",
    }
    filename = image.filename.lower()
    extension = "." + filename.rsplit(".", 1)[-1] if "." in filename else ""
    if extension not in allowed_types or image.mimetype != allowed_types[extension]:
        return "La imagen debe ser JPG, PNG, GIF o WEBP."

    image.stream.seek(0, 2)
    size = image.stream.tell()
    image.stream.seek(0)
    if size == 0 or size > MAX_IMAGE_SIZE:
        return "La imagen debe pesar entre 1 byte y 5 MB."
    return None