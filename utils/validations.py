import re
from datetime import date, datetime


MAX_NAME_LENGTH = 100
MAX_EMAIL_LENGTH = 254
MAX_PHONE_LENGTH = 15
MAX_COMUNA_LENGTH = 100

NAME_PATTERN = re.compile(r"^[\wáéíóúüñÁÉÍÓÚÜÑ]+(?:[ '\-][\wáéíóúüñÁÉÍÓÚÜÑ]+)+$", re.UNICODE)
EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
PHONE_PATTERN = re.compile(r"^[29]\d{8}$")


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