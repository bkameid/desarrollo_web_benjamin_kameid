import pymysql
import json
from datetime import datetime
from pathlib import Path

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306
DB_CHARSET = "utf8"

BASE_DIR = Path(__file__).resolve().parent.parent

with open(BASE_DIR / "database" / "querys.json", 'r') as querys:
    QUERY_DICT = json.load(querys)

def get_conn():
    conn = pymysql.connect(
        db=DB_NAME,
        user=DB_USERNAME,
        passwd=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT,
        charset=DB_CHARSET
        , cursorclass=pymysql.cursors.DictCursor
    )
    return conn


def get_ave_by_id(id):
    conn = get_conn()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM ave WHERE id = %s;",
                (id.strip(),),
            )
            return cursor.fetchone()
    finally:
        conn.close()

def get_comuna(nombre, region_nombre=None):
    conn = get_conn()
    try:
        with conn.cursor() as cursor:
            query = """
                SELECT c.id, c.nombre, r.id, r.nombre
                FROM comuna c
                JOIN region r ON r.id = c.region_id
                WHERE LOWER(c.nombre) = LOWER(%s)
            """
            params = [nombre.strip()]
            if region_nombre:
                query += " AND LOWER(r.nombre) LIKE LOWER(%s)"
                params.append(f"%{region_nombre.strip()}%")
            query += " LIMIT 1"
            cursor.execute(query, params)
            return cursor.fetchone()
    finally:
        conn.close()


def get_comuna_in_region(nombre, region_id):
    conn = get_conn()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                """
                SELECT c.id, c.nombre
                FROM comuna c
                WHERE LOWER(c.nombre) = LOWER(%s) AND c.region_id = %s
                LIMIT 1
                """,
                (nombre.strip(), region_id),
            )
            return cursor.fetchone()
    finally:
        conn.close()


def create_voluntario(nombre, email, telefono, comuna_id):
    conn = get_conn()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO voluntario
                    (nombre, email, telefono, fecha_registro, comuna_id)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (nombre.strip(), email.strip(), telefono.strip(), datetime.now(), comuna_id),
            )
            volunteer_id = cursor.lastrowid
        conn.commit()
        return volunteer_id
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def create_avistamiento(voluntario_id, ave_id, fecha_hora, lugar, descripcion):
    conn = get_conn()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                QUERY_DICT["createAvis"],
                (voluntario_id, ave_id, fecha_hora, lugar, descripcion or None),
            )
            sighting_id = cursor.lastrowid
        conn.commit()
        return sighting_id
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def create_registro(ruta_archivo, nombre_archivo, avistamiento_id):
    conn = get_conn()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                QUERY_DICT["createRegistro"],
                (ruta_archivo, nombre_archivo, avistamiento_id),
            )
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def get_recent_avistamientos(limit=20):
    conn = get_conn()
    try:
        with conn.cursor() as cursor:
            cursor.execute(QUERY_DICT["getRecentPosts"], (limit))
            return cursor.fetchall()
    finally:
        conn.close()

def get_region():
    conn = get_conn()
    try:
        with conn.cursor() as cursor:
            cursor.execute(QUERY_DICT["getRegion"])
            return cursor.fetchall()
    finally:
        conn.close()

def get_comunas_from_region(region_id):
    conn = get_conn()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
            """
            SELECT c.nombre FROM comuna c
            JOIN region r ON r.id = %s;
            """, region_id)
            return cursor.fetchall()
    finally:
        conn.close()

def get_user_count():
    conn = get_conn()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
            """
            SELECT Count(*) as count FROM voluntario;
            """)
            return cursor.fetchall()
    finally:
        conn.close()

def get_aves():
    conn = get_conn()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
            """
            SELECT * FROM ave;
            """)
            return cursor.fetchall()
    finally:
        conn.close()

def get_nombreregion_from_id(id):
    conn = get_conn()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
            """
            SELECT nombre FROM region WHERE id = %s;
            """, id)
            return cursor.fetchall()
    finally:
        conn.close()