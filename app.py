from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# --- INICIO DE DATOS DE LA MALLA ---

# Definición de categorías y sus colores
CATEGORIAS = {
    "Plan Común": "#B3E0FF",  # Azul claro
    "Matemáticas": "#B3FFB3", # Verde claro
    "Humanista": "#FFFFB3",   # Amarillo claro
    "Programación": "#FFD9B3", # Naranja claro
    "Química": "#E6B3FF",     # Morado claro
    "Carrera (ICIV)": "#D9D9D9", # Gris claro
    "Física": "#B3FFFF",      # Cian claro
    "Talleres/Prácticas": "#FFB3D9", # Rosa claro
    "Otros": "#FFFFFF"        # Blanco
}

# Datos completos de la malla curricular
RAMOS = {
    "1": {"id": "1", "siglas": "MAT111", "nombre": "Fundamentos de Matemática", "creditos": 8, "prerequisitos": [], "semestre": 1, "categoria": "Matemáticas"},
    "2": {"id": "2", "siglas": "CFG111", "nombre": "Desafíos de Ingeniería", "creditos": 6, "prerequisitos": [], "semestre": 1, "categoria": "Humanista"},
    "3": {"id": "3", "siglas": "ING111", "nombre": "Desarrollo Personal", "creditos": 5, "prerequisitos": [], "semestre": 1, "categoria": "Humanista"},
    "4": {"id": "4", "siglas": "PRO111", "nombre": "Fundamentos de Programación", "creditos": 5, "prerequisitos": [], "semestre": 1, "categoria": "Programación"},
    "5": {"id": "5", "siglas": "FIS111", "nombre": "Fundamentos de Física", "creditos": 6, "prerequisitos": [], "semestre": 1, "categoria": "Física"},

    "6": {"id": "6", "siglas": "MAT121", "nombre": "Cálculo Diferencial", "creditos": 6, "prerequisitos": ["1"], "semestre": 2, "categoria": "Matemáticas"},
    "7": {"id": "7", "siglas": "MAT122", "nombre": "Álgebra", "creditos": 8, "prerequisitos": ["1"], "semestre": 2, "categoria": "Matemáticas"},
    "8": {"id": "8", "siglas": "ING121", "nombre": "Ingeniería, Innovación y Emprendimiento", "creditos": 6, "prerequisitos": ["3"], "semestre": 2, "categoria": "Humanista"},
    "9": {"id": "9", "siglas": "PRO121", "nombre": "Programación", "creditos": 5, "prerequisitos": ["4"], "semestre": 2, "categoria": "Programación"},
    "10": {"id": "10", "siglas": "QUI121", "nombre": "Química para Ingeniería", "creditos": 5, "prerequisitos": [], "semestre": 2, "categoria": "Química"},

    "11": {"id": "11", "siglas": "MAT211", "nombre": "Cálculo Integral y Series", "creditos": 6, "prerequisitos": ["6"], "semestre": 3, "categoria": "Matemáticas"},
    "12": {"id": "12", "siglas": "MAT212", "nombre": "Álgebra Lineal", "creditos": 6, "prerequisitos": ["7"], "semestre": 3, "categoria": "Matemáticas"},
    "13": {"id": "13", "siglas": "ICIV211", "nombre": "Dibujo en Ingeniería y Topografía", "creditos": 6, "prerequisitos": [], "semestre": 3, "categoria": "Carrera (ICIV)"},
    "14": {"id": "14", "siglas": "ICIV212", "nombre": "Materiales para Ingeniería Civil", "creditos": 5, "prerequisitos": ["10"], "semestre": 3, "categoria": "Carrera (ICIV)"},
    "15": {"id": "15", "siglas": "FIS211", "nombre": "Física Mecánica", "creditos": 6, "prerequisitos": ["5", "6"], "semestre": 3, "categoria": "Física"},

    "16": {"id": "16", "siglas": "MAT221", "nombre": "Cálculo en varias variables", "creditos": 6, "prerequisitos": ["11"], "semestre": 4, "categoria": "Matemáticas"},
    "17": {"id": "17", "siglas": "MAT222", "nombre": "Ecuaciones Diferenciales Ordinarias", "creditos": 6, "prerequisitos": ["11"], "semestre": 4, "categoria": "Matemáticas"},
    "18": {"id": "18", "siglas": "ICIV221", "nombre": "Estática de Estructuras", "creditos": 7, "prerequisitos": ["12", "15"], "semestre": 4, "categoria": "Carrera (ICIV)"},
    "19": {"id": "19", "siglas": "ECO101", "nombre": "Economía", "creditos": 5, "prerequisitos": [], "semestre": 4, "categoria": "Humanista"},
    "20": {"id": "20", "siglas": "FIS221", "nombre": "Física Calor y Ondas", "creditos": 6, "prerequisitos": ["11", "15"], "semestre": 4, "categoria": "Física"},

    "21": {"id": "21", "siglas": "ICIV311", "nombre": "Cálculo Avanzado", "creditos": 6, "prerequisitos": ["16"], "semestre": 5, "categoria": "Matemáticas"},
    "22": {"id": "22", "siglas": "ICIV312", "nombre": "Métodos Numéricos", "creditos": 5, "prerequisitos": ["17"], "semestre": 5, "categoria": "Matemáticas"},
    "23": {"id": "23", "siglas": "ICIV313", "nombre": "Mecánica de Sólidos", "creditos": 6, "prerequisitos": ["18"], "semestre": 5, "categoria": "Carrera (ICIV)"},
    "24": {"id": "24", "siglas": "ICIV314", "nombre": "Mecánica de Fluidos", "creditos": 7, "prerequisitos": ["20"], "semestre": 5, "categoria": "Carrera (ICIV)"},
    "25": {"id": "25", "siglas": "FIS311", "nombre": "Electromagnetismo", "creditos": 6, "prerequisitos": ["11", "20"], "semestre": 5, "categoria": "Física"},

    "26": {"id": "26", "siglas": "ICIV321", "nombre": "Mecánica de Suelos I", "creditos": 7, "prerequisitos": ["23"], "semestre": 6, "categoria": "Carrera (ICIV)"},
    "27": {"id": "27", "siglas": "ICIV322", "nombre": "Análisis Estructural", "creditos": 6, "prerequisitos": ["16", "17", "18", "23"], "semestre": 6, "categoria": "Carrera (ICIV)"},
    "28": {"id": "28", "siglas": "ICIV323", "nombre": "Hidráulica Teórica", "creditos": 7, "prerequisitos": ["24"], "semestre": 6, "categoria": "Carrera (ICIV)"},
    "29": {"id": "29", "siglas": "ICIV324", "nombre": "Comunicación Efectiva para Liderazgo", "creditos": 3, "prerequisitos": ["3", "8", "30"], "semestre": 6, "categoria": "Humanista"},
    "30": {"id": "30", "siglas": "PRACB", "nombre": "Práctica Básica", "creditos": 0, "prerequisitos": [], "semestre": 6, "categoria": "Talleres/Prácticas"},
    "31": {"id": "31", "siglas": "ICIV325", "nombre": "Probabilidad y Estadística", "creditos": 5, "prerequisitos": ["16"], "semestre": 6, "categoria": "Matemáticas"},
    "32": {"id": "32", "siglas": "ICIV326", "nombre": "Inglés I", "creditos": 2, "prerequisitos": [], "semestre": 6, "categoria": "Humanista"},

    "33": {"id": "33", "siglas": "ICIV411", "nombre": "Sistemas y Procesos Constructivos", "creditos": 4, "prerequisitos": ["23", "30"], "semestre": 7, "categoria": "Carrera (ICIV)"},
    "34": {"id": "34", "siglas": "ICIV412", "nombre": "Mecánica de Suelos II", "creditos": 6, "prerequisitos": ["26"], "semestre": 7, "categoria": "Carrera (ICIV)"},
    "35": {"id": "35", "siglas": "ICIV413", "nombre": "Dinámica de Estructuras", "creditos": 6, "prerequisitos": ["27"], "semestre": 7, "categoria": "Carrera (ICIV)"},
    "36": {"id": "36", "siglas": "ICIV414", "nombre": "Hidrología para Ingeniería Civil", "creditos": 6, "prerequisitos": ["24", "31"], "semestre": 7, "categoria": "Carrera (ICIV)"},
    "37": {"id": "37", "siglas": "ICIV415", "nombre": "Infraestructura y Sistemas de Transporte", "creditos": 5, "prerequisitos": ["13", "26"], "semestre": 7, "categoria": "Carrera (ICIV)"},

    "38": {"id": "38", "siglas": "ICIV421", "nombre": "Diseño en Hormigón Armado", "creditos": 6, "prerequisitos": ["27", "33"], "semestre": 8, "categoria": "Carrera (ICIV)"},
    "39": {"id": "39", "siglas": "ICIV422", "nombre": "Diseño en Acero", "creditos": 6, "prerequisitos": ["27", "33"], "semestre": 8, "categoria": "Carrera (ICIV)"},
    "40": {"id": "40", "siglas": "ICIV423", "nombre": "Sistemas de Contención y Fundaciones", "creditos": 5, "prerequisitos": ["33", "34"], "semestre": 8, "categoria": "Carrera (ICIV)"},
    "41": {"id": "41", "siglas": "ICIV424", "nombre": "Hidráulica Aplicada", "creditos": 6, "prerequisitos": ["28", "36"], "semestre": 8, "categoria": "Carrera (ICIV)"},
    "42": {"id": "42", "siglas": "ICIV425", "nombre": "Diseño de Obras Marítimas", "creditos": 5, "prerequisitos": ["24", "28", "35"], "semestre": 8, "categoria": "Carrera (ICIV)"},
    "43": {"id": "43", "siglas": "ICIV426", "nombre": "Inglés II", "creditos": 2, "prerequisitos": ["32"], "semestre": 8, "categoria": "Humanista"},

    "44": {"id": "44", "siglas": "ICIV511", "nombre": "Ingeniería Sanitaria y PTA", "creditos": 6, "prerequisitos": ["41"], "semestre": 9, "categoria": "Carrera (ICIV)"},
    "45": {"id": "45", "siglas": "ICIV512", "nombre": "Máquinas y Sistemas Hidráulicos", "creditos": 6, "prerequisitos": ["28", "36"], "semestre": 9, "categoria": "Carrera (ICIV)"},
    "46": {"id": "46", "siglas": "ICIV513", "nombre": "Ingeniería Vial", "creditos": 5, "prerequisitos": ["33", "37"], "semestre": 9, "categoria": "Carrera (ICIV)"},
    "47": {"id": "47", "siglas": "ICIV514", "nombre": "Ingeniería Sísmica", "creditos": 5, "prerequisitos": ["35", "38"], "semestre": 9, "categoria": "Carrera (ICIV)"},
    "48": {"id": "48", "siglas": "ICIV515", "nombre": "Gestión y Evaluación de Proyectos", "creditos": 5, "prerequisitos": ["33"], "semestre": 9, "categoria": "Carrera (ICIV)"},

    "49": {"id": "49", "siglas": "ICIV521", "nombre": "Proyecto Hidráulico", "creditos": 4, "prerequisitos": ["44", "45"], "semestre": 10, "categoria": "Carrera (ICIV)"},
    "50": {"id": "50", "siglas": "ICIV522", "nombre": "Proyecto Vial", "creditos": 4, "prerequisitos": ["46"], "semestre": 10, "categoria": "Carrera (ICIV)"},
    "51": {"id": "51", "siglas": "ICIV523", "nombre": "Proyecto Estructural", "creditos": 4, "prerequisitos": ["40", "47"], "semestre": 10, "categoria": "Carrera (ICIV)"},
    "52": {"id": "52", "siglas": "ICIV524", "nombre": "Evaluación Ambiental de Proyectos", "creditos": 4, "prerequisitos": [], "semestre": 10, "categoria": "Carrera (ICIV)"},
    "53": {"id": "53", "siglas": "TETI1", "nombre": "Taller de Título I", "creditos": 12, "prerequisitos": ["49", "50", "51"], "semestre": 10, "categoria": "Talleres/Prácticas"},

    "54": {"id": "54", "siglas": "ICIV526", "nombre": "Inglés III", "creditos": 2, "prerequisitos": ["43"], "semestre": 11, "categoria": "Humanista"},
    "55": {"id": "55", "siglas": "TETI2", "nombre": "Taller de Título II", "creditos": 30, "prerequisitos": ["53"], "semestre": 11, "categoria": "Talleres/Prácticas"},
    "56": {"id": "56", "siglas": "PRAPRO", "nombre": "Práctica Profesional", "creditos": 0, "prerequisitos": [], "semestre": 11, "categoria": "Talleres/Prácticas"},
}

# Calculamos los años de impartición de forma dinámica con los nuevos nombres
SEMESTRES_INFO = {}
nombres_anos = {
    1: "Primer Año",
    2: "Primer Año",
    3: "Segundo Año",
    4: "Segundo Año",
    5: "Tercer Año",
    6: "Tercer Año",
    7: "Cuarto Año",
    8: "Cuarto Año",
    9: "Quinto Año",
    10: "Quinto Año",
    11: "Quinto Año y Medio" # Asumiendo que el semestre 11 es el "medio" del sexto año
}

for i in range(1, 12): # Semestres del 1 al 11
    SEMESTRES_INFO[i] = {
        "numero": i,
        "nombre_año": nombres_anos.get(i, f"Semestre {i}") # Usa el nombre personalizado o un fallback
    }


# Función para obtener los ramos de un semestre específico
def get_ramos_por_semestre():
    ramos_por_semestre = {s_num: [] for s_num in SEMESTRES_INFO.keys()}
    for ramo_id, ramo_data in RAMOS.items():
        ramos_por_semestre[ramo_data["semestre"]].append(ramo_data)
    # Ordenar los ramos dentro de cada semestre si es necesario (ej. por ID para consistencia)
    for s_num in ramos_por_semestre:
        ramos_por_semestre[s_num].sort(key=lambda x: int(x['id']))
    return ramos_por_semestre

# --- FIN DE DATOS DE LA MALLA ---


# Función para verificar si un ramo está habilitado
# Ahora recibe 'aprobados_set' como argumento
def es_ramo_habilitado(ramo_id, aprobados_set):
    ramo = RAMOS.get(ramo_id)
    if not ramo:
        return False

    # Si el ramo ya está aprobado, no se considera "habilitado" para tomar (ya se tomó)
    if ramo_id in aprobados_set:
        return False

    # Un ramo sin prerrequisitos está habilitado por defecto si no está aprobado
    if not ramo["prerequisitos"]:
        return True

    # Verificar si todos los prerrequisitos están en la lista de aprobados
    for prereq_id in ramo["prerequisitos"]:
        if prereq_id not in aprobados_set:
            return False
    return True


@app.route('/')
def index():
    ramos_por_semestre = get_ramos_por_semestre()
    # No pasamos 'aprobados' inicial desde Flask, el JS lo manejará desde localStorage
    return render_template('index.html',
                           ramos_por_semestre=ramos_por_semestre,
                           semestres_info=SEMESTRES_INFO,
                           categorias=CATEGORIAS)


@app.route('/toggle_aprobado', methods=['POST'])
def toggle_aprobado():
    data = request.get_json()
    ramo_id = data.get('ramo_id')
    # Recibe la lista de ramos aprobados actual desde el frontend
    aprobados_desde_cliente = set(data.get('aprobados_actuales', []))

    if ramo_id in RAMOS:
        # Crea un set mutable para trabajar con él
        aprobados_actuales_set = set(aprobados_desde_cliente)

        # Si el ramo ya está aprobado, lo desaprobamos directamente
        if ramo_id in aprobados_actuales_set:
            aprobados_actuales_set.remove(ramo_id)
        # Si no está aprobado, verificamos prerrequisitos antes de aprobarlo
        elif es_ramo_habilitado(ramo_id, aprobados_actuales_set) or not RAMOS[ramo_id]["prerequisitos"]:
            aprobados_actuales_set.add(ramo_id)
        else:
            return jsonify({"success": False, "message": "No cumples con los prerrequisitos para aprobar este ramo."})

        # Recalcular todos los estados para enviar al frontend
        estado_ramos = {}
        for r_id in RAMOS:
            estado_ramos[r_id] = {
                "aprobado": r_id in aprobados_actuales_set,
                "habilitado": es_ramo_habilitado(r_id, aprobados_actuales_set)
            }
        # Devuelve la lista actualizada de aprobados y el estado de todos los ramos
        return jsonify({"success": True, "aprobados": list(aprobados_actuales_set), "estado_ramos": estado_ramos})
    return jsonify({"success": False, "message": "Ramo no encontrado."})


if __name__ == '__main__':
    app.run(debug=True) # Para desarrollo local, PythonAnywhere ignora esto
