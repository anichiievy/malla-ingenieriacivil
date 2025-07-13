document.addEventListener('DOMContentLoaded', () => {
    // --- INICIO DE DATOS DE LA MALLA ---
    // Definición de categorías y sus colores (¡usaremos estos colores para la leyenda y las barras de ramo!)
    const CATEGORIAS = {
        "Plan Común": "#D8D8D8",
        "Humanista": "#BDFFBE",
        "Fundamentos de la Ingenieria": "#FAFFAF",
        "Estructura": "#FFA571",
        "Hidraulica": "#92F8FB",
        "Suelo": "#5E3B10",
        "Vialidad": "#505050",
        "Gestión": "#147735",
        "Acero": "#7D090A",
        "Sanitario": ##102AAA",
        "Talleres/Prácticas": "#FFB3D9"
    };

    // Datos completos de la malla curricular
    const RAMOS = {
        "1": {"id": "1", "siglas": "MAT111", "nombre": "Fundamentos de Matemática", "creditos": 8, "prerequisitos": [], "semestre": 1, "categoria": "Plan Común"},
        "2": {"id": "2", "siglas": "CFG111", "nombre": "Desafíos de Ingeniería", "creditos": 6, "prerequisitos": [], "semestre": 1, "categoria": "Fundamentos de la Ingenieria"},
        "3": {"id": "3", "siglas": "ING111", "nombre": "Desarrollo Personal", "creditos": 5, "prerequisitos": [], "semestre": 1, "categoria": "Humanista"},
        "4": {"id": "4", "siglas": "PRO111", "nombre": "Fundamentos de Programación", "creditos": 5, "prerequisitos": [], "semestre": 1, "categoria": "Plan Común"},
        "5": {"id": "5", "siglas": "FIS111", "nombre": "Fundamentos de Física", "creditos": 6, "prerequisitos": [], "semestre": 1, "categoria": "Plan Común"},

        "6": {"id": "6", "siglas": "MAT121", "nombre": "Cálculo Diferencial", "creditos": 6, "prerequisitos": ["1"], "semestre": 2, "categoria": "Plan Común"},
        "7": {"id": "7", "siglas": "MAT122", "nombre": "Álgebra", "creditos": 8, "prerequisitos": ["1"], "semestre": 2, "categoria": "Plan Común"},
        "8": {"id": "8", "siglas": "ING121", "nombre": "Ingeniería, Innovación y Emprendimiento", "creditos": 6, "prerequisitos": ["3"], "semestre": 2, "categoria": "Humanista"},
        "9": {"id": "9", "siglas": "PRO121", "nombre": "Programación", "creditos": 5, "prerequisitos": ["4"], "semestre": 2, "categoria": "Plan Común"},
        "10": {"id": "10", "siglas": "QUI121", "nombre": "Química para Ingeniería", "creditos": 5, "prerequisitos": [], "semestre": 2, "categoria": "Plan Común"},

        "11": {"id": "11", "siglas": "MAT211", "nombre": "Cálculo Integral y Series", "creditos": 6, "prerequisitos": ["6"], "semestre": 3, "categoria": "Plan Común"},
        "12": {"id": "12", "siglas": "MAT212", "nombre": "Álgebra Lineal", "creditos": 6, "prerequisitos": ["7"], "semestre": 3, "categoria": "Plan Común"},
        "13": {"id": "13", "siglas": "ICIV211", "nombre": "Dibujo en Ingeniería y Topografía", "creditos": 6, "prerequisitos": ["9"], "semestre": 3, "categoria": "Fundamentos de la Ingenieria"},
        "14": {"id": "14", "siglas": "ICIV212", "nombre": "Materiales para Ingeniería Civil", "creditos": 5, "prerequisitos": ["10", "3"], "semestre": 3, "categoria": "Fundamentos de la Ingenieria"},
        "15": {"id": "15", "siglas": "FIS211", "nombre": "Física Mecánica", "creditos": 6, "prerequisitos": ["5", "1"], "semestre": 3, "categoria": "Plan Común"},

        "16": {"id": "16", "siglas": "MAT221", "nombre": "Cálculo en varias variables", "creditos": 6, "prerequisitos": ["11", "12"], "semestre": 4, "categoria": "Plan Común"},
        "17": {"id": "17", "siglas": "MAT222", "nombre": "Ecuaciones Diferenciales Ordinarias", "creditos": 6, "prerequisitos": ["11", "12"], "semestre": 4, "categoria": "Plan Común"},
        "18": {"id": "18", "siglas": "ICIV221", "nombre": "Estática de Estructuras", "creditos": 7, "prerequisitos": ["6", "13", "15"], "semestre": 4, "categoria": "Estructura"},
        "19": {"id": "19", "siglas": "ECO101", "nombre": "Economía", "creditos": 5, "prerequisitos": ["6"], "semestre": 4, "categoria": "Gestión"},
        "20": {"id": "20", "siglas": "FIS221", "nombre": "Física Calor y Ondas", "creditos": 6, "prerequisitos": ["11", "15"], "semestre": 4, "categoria": "Plan Común"},

        "21": {"id": "21", "siglas": "ICIV311", "nombre": "Cálculo Avanzado", "creditos": 6, "prerequisitos": ["16", "17"], "semestre": 5, "categoria": "Plan Común"},
        "22": {"id": "22", "siglas": "ICIV312", "nombre": "Métodos Numéricos", "creditos": 5, "prerequisitos": ["16", "17"], "semestre": 5, "categoria": "Plan Común"},
        "23": {"id": "23", "siglas": "ICIV313", "nombre": "Mecánica de Sólidos", "creditos": 6, "prerequisitos": ["11", "18"], "semestre": 5, "categoria": "Estructura"},
        "24": {"id": "24", "siglas": "ICIV314", "nombre": "Mecánica de Fluidos", "creditos": 7, "prerequisitos": ["16", "20"], "semestre": 5, "categoria": "Hidraulica"},
        "25": {"id": "25", "siglas": "FIS311", "nombre": "Electromagnetismo", "creditos": 6, "prerequisitos": ["15", "11"], "semestre": 5, "categoria": "Plan Común"},
        "26": {"id": "26", "siglas": "PRACB", "nombre": "Práctica Básica", "creditos": 0, "prerequisitos": [], "semestre": 5, "categoria": "Talleres/Prácticas"},

        "27": {"id": "27", "siglas": "ICIV321", "nombre": "Mecánica de Suelos I", "creditos": 7, "prerequisitos": ["23"], "semestre": 6, "categoria": "Suelo"},
        "28": {"id": "28", "siglas": "ICIV322", "nombre": "Análisis Estructural", "creditos": 6, "prerequisitos": ["16", "17", "23"], "semestre": 6, "categoria": "Estructura"},
        "29": {"id": "29", "siglas": "ICIV323", "nombre": "Hidráulica Teórica", "creditos": 7, "prerequisitos": ["22", "24"], "semestre": 6, "categoria": "Hidraulica"},
        "30": {"id": "30", "siglas": "ICIV324", "nombre": "Comunicación Efectiva para Liderazgo", "creditos": 3, "prerequisitos": ["2", "8", "26"], "semestre": 6, "categoria": "Humanista"},
        "31": {"id": "31", "siglas": "ICIV325", "nombre": "Probabilidad y Estadística", "creditos": 5, "prerequisitos": ["16"], "semestre": 6, "categoria": "Fundamentos de la Ingenieria"},
        "32": {"id": "32", "siglas": "ICIV326", "nombre": "Inglés I", "creditos": 2, "prerequisitos": [], "semestre": 6, "categoria": "Humanista"},

        "33": {"id": "33", "siglas": "ICIV411", "nombre": "Sistemas y Procesos Constructivos", "creditos": 4, "prerequisitos": ["23", "26"], "semestre": 7, "categoria": "Estructura"},
        "34": {"id": "34", "siglas": "ICIV412", "nombre": "Mecánica de Suelos II", "creditos": 6, "prerequisitos": ["27"], "semestre": 7, "categoria": "Suelo"},
        "35": {"id": "35", "siglas": "ICIV413", "nombre": "Dinámica de Estructuras", "creditos": 6, "prerequisitos": ["21", "22", "28"], "semestre": 7, "categoria": "Estructura"},
        "36": {"id": "36", "siglas": "ICIV414", "nombre": "Hidrología para Ingeniería Civil", "creditos": 6, "prerequisitos": ["24", "31"], "semestre": 7, "categoria": "Hidraulica"},
        "37": {"id": "37", "siglas": "ICIV415", "nombre": "Infraestructura y Sistemas de Transporte", "creditos": 5, "prerequisitos": ["19", "23"], "semestre": 7, "categoria": "Vialidad"},
        "38": {"id": "38", "siglas": "ICIV416", "nombre": "TIPE I", "creditos": 3, "prerequisitos": [], "semestre": 7, "categoria": "Humanista"},

        "39": {"id": "39", "siglas": "ICIV421", "nombre": "Diseño en Hormigón Armado", "creditos": 6, "prerequisitos": ["28", "33"], "semestre": 8, "categoria": "Estructura"},
        "40": {"id": "40", "siglas": "ICIV422", "nombre": "Diseño en Acero", "creditos": 6, "prerequisitos": ["28", "33"], "semestre": 8, "categoria": "Acero"},
        "41": {"id": "41", "siglas": "ICIV423", "nombre": "Sistemas de Contención y Fundaciones", "creditos": 5, "prerequisitos": ["33", "34"], "semestre": 8, "categoria": "Estructura"},
        "42": {"id": "42", "siglas": "ICIV424", "nombre": "Hidráulica Aplicada", "creditos": 6, "prerequisitos": ["21", "29", "36"], "semestre": 8, "categoria": "Hidraulica"},
        "43": {"id": "43", "siglas": "ICIV425", "nombre": "Diseño de Obras Marítimas", "creditos": 5, "prerequisitos": ["24", "34", "35"], "semestre": 8, "categoria": "Hidraulica"},
        "44": {"id": "44", "siglas": "ICIV426", "nombre": "Inglés II", "creditos": 2, "prerequisitos": ["32"], "semestre": 8, "categoria": "Humanista"},

        "45": {"id": "45", "siglas": "ICIV511", "nombre": "Ingeniería Sanitaria y PTA", "creditos": 6, "prerequisitos": ["42"], "semestre": 9, "categoria": "Sanitario"},
        "46": {"id": "46", "siglas": "ICIV512", "nombre": "Máquinas y Sistemas Hidráulicos", "creditos": 6, "prerequisitos": ["29", "36"], "semestre": 9, "categoria": "Hidraulica"},
        "47": {"id": "47", "siglas": "ICIV513", "nombre": "Ingeniería Vial", "creditos": 5, "prerequisitos": ["33", "37"], "semestre": 9, "categoria": "Vialidad"},
        "48": {"id": "48", "siglas": "ICIV514", "nombre": "Ingeniería Sísmica", "creditos": 5, "prerequisitos": ["35", "39", "40"], "semestre": 9, "categoria": "Estructura"},
        "49": {"id": "49", "siglas": "ICIV515", "nombre": "Gestión y Evaluación de Proyectos", "creditos": 5, "prerequisitos": ["30", "33"], "semestre": 9, "categoria": "Gestión"},
        "50": {"id": "50", "siglas": "ICIV4516", "nombre": "TIPE II", "creditos": 3, "prerequisitos": ["38"], "semestre": 9, "categoria": "Humanista"},

        "51": {"id": "51", "siglas": "ICIV521", "nombre": "Proyecto Hidráulico", "creditos": 4, "prerequisitos": ["45", "46", "49"], "semestre": 10, "categoria": "Hidraulica"},
        "52": {"id": "52", "siglas": "ICIV522", "nombre": "Proyecto Vial", "creditos": 4, "prerequisitos": ["47", "49"], "semestre": 10, "categoria": "Vialidad"},
        "53": {"id": "53", "siglas": "ICIV523", "nombre": "Proyecto Estructural", "creditos": 4, "prerequisitos": ["41", "48"], "semestre": 10, "categoria": "Estructura"},
        "54": {"id": "54", "siglas": "ICIV524", "nombre": "Evaluación Ambiental de Proyectos", "creditos": 4, "prerequisitos": ["33", "49"], "semestre": 10, "categoria": "Sanitario"},
        "55": {"id": "55", "siglas": "ICIV525", "nombre": "Taller de Título I", "creditos": 12, "prerequisitos": ["46", "47", "48"], "semestre": 10, "categoria": "Talleres/Prácticas"},
        "56": {"id": "56", "siglas": "ICIV526", "nombre": "Inglés III", "creditos": 2, "prerequisitos": ["44"], "semestre": 10, "categoria": "Humanista"},

        "57": {"id": "57", "siglas": "ICIV611", "nombre": "Taller de Título II", "creditos": 30, "prerequisitos": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56"], "semestre": 11, "categoria": "Talleres/Prácticas"},
        "58": {"id": "58", "siglas": "PRAPRO", "nombre": "Práctica Profesional", "creditos": 0, "prerequisitos": [], "semestre": 11, "categoria": "Talleres/Prácticas"},
    };
    // --- FIN DE DATOS DE LA MALLA ---

    const mallaContainer = document.getElementById('malla-container');
    let approvedRamos = new Set();

    // Función para guardar el estado de los ramos aprobados
    function saveState() {
        localStorage.setItem('approvedRamos', JSON.stringify(Array.from(approvedRamos)));
    }

    // Función para cargar el estado de los ramos aprobados
    function loadState() {
        const savedState = localStorage.getItem('approvedRamos');
        if (savedState) {
            approvedRamos = new Set(JSON.parse(savedState));
        }
    }

    // Función para verificar si un ramo está desbloqueado
    function isRamoUnlocked(ramoId) {
        const ramo = RAMOS[ramoId];
        if (!ramo) return false;

        if (ramo.prerequisitos.length === 0) {
            return true;
        }

        return ramo.prerequisitos.every(prereqId => approvedRamos.has(prereqId));
    }

    // Función para actualizar el estado visual de todos los ramos
    function updateRamoStates() {
        Object.values(RAMOS).forEach(ramo => {
            const ramoElement = document.getElementById(`ramo-${ramo.id}`);
            if (!ramoElement) return;

            if (approvedRamos.has(ramo.id)) {
                ramoElement.classList.add('approved');
                ramoElement.classList.remove('locked');
                ramoElement.style.pointerEvents = 'auto'; // Permitir hacer clic para desaprobar
            } else if (isRamoUnlocked(ramo.id)) {
                ramoElement.classList.remove('locked');
                ramoElement.classList.remove('approved');
                ramoElement.style.pointerEvents = 'auto'; // Permitir hacer clic
            } else {
                ramoElement.classList.add('locked');
                ramoElement.classList.remove('approved');
                ramoElement.style.pointerEvents = 'auto'; // Permitir hacer clic, pero con alerta
            }
        });
    }

    // Función para manejar el clic en un ramo
    function handleRamoClick(event) {
        const ramoCard = event.currentTarget;
        const ramoId = ramoCard.dataset.ramoId;

        if (approvedRamos.has(ramoId)) {
            // Si ya está aprobado, se puede desaprobar
            approvedRamos.delete(ramoId);
            saveState();
            updateRamoStates();
        } else {
            // Si no está aprobado, intentar aprobar
            if (isRamoUnlocked(ramoId)) {
                approvedRamos.add(ramoId);
                saveState();
                updateRamoStates();
            } else {
                // Si está bloqueado, mostrar alerta sin cambiar estado
                alert('No puedes aprobar este ramo. Primero debes aprobar sus prerequisitos.');
            }
        }
    }

    // Función para renderizar la leyenda de categorías
    function renderCategoryLegend() {
        const legendContainer = document.getElementById('category-legend');
        // Limpiar leyenda existente para evitar duplicados si se llama varias veces
        legendContainer.innerHTML = '';
        for (const category in CATEGORIAS) {
            const color = CATEGORIAS[category];
            const legendItem = document.createElement('div');
            legendItem.classList.add('legend-item');
            legendItem.innerHTML = `
                <div class="legend-color-box" style="background-color: ${color};"></div>
                <span>${category}</span>
            `;
            legendContainer.appendChild(legendItem);
        }
    }

    // Función principal para generar la malla
    function generateMalla() {
        const ramosBySemestre = {};
        Object.values(RAMOS).forEach(ramo => {
            if (!ramosBySemestre[ramo.semestre]) {
                ramosBySemestre[ramo.semestre] = [];
            }
            ramosBySemestre[ramo.semestre].push(ramo);
        });

        const sortedSemestres = Object.keys(ramosBySemestre).sort((a, b) => parseInt(a) - parseInt(b));

        // Limpiar el contenedor antes de generar
        mallaContainer.innerHTML = '';

        sortedSemestres.forEach(semestre => {
            const semestreColumn = document.createElement('div');
            semestreColumn.classList.add('semestre-column');
            semestreColumn.innerHTML = `<h3>Semestre ${semestre}</h3>`;

            ramosBySemestre[semestre].sort((a, b) => parseInt(a.id) - parseInt(b.id));

            ramosBySemestre[semestre].forEach(ramo => {
                const ramoCard = document.createElement('div');
                ramoCard.classList.add('ramo-card');
                ramoCard.dataset.ramoId = ramo.id;
                ramoCard.id = `ramo-${ramo.id}`;

                const categoryColorBar = document.createElement('div');
                categoryColorBar.classList.add('category-color-bar');
                categoryColorBar.style.backgroundColor = CATEGORIAS[ramo.categoria] || CATEGORIAS["Otros"];
                ramoCard.appendChild(categoryColorBar);

                ramoCard.innerHTML += `
                    <span class="siglas">${ramo.siglas}</span>
                    <h4>${ramo.nombre}</h4>
                    <p>Créditos: ${ramo.creditos}</p>
                `;

                if (ramo.prerequisitos && ramo.prerequisitos.length > 0) {
                    const prereqContainer = document.createElement('div');
                    prereqContainer.classList.add('prerequisite-ids');
                    ramo.prerequisitos.forEach(prereqId => {
                        const prereqBadge = document.createElement('span');
                        prereqBadge.classList.add('prerequisite-id-badge');
                        // Asegurarse de que el prereqId exista en RAMOS
                        prereqBadge.textContent = RAMOS[prereqId] ? RAMOS[prereqId].siglas : `ID:${prereqId}`;
                        prereqContainer.appendChild(prereqBadge);
                    });
                    ramoCard.appendChild(prereqContainer);
                }

                ramoCard.addEventListener('click', handleRamoClick);
                semestreColumn.appendChild(ramoCard);
            });
            mallaContainer.appendChild(semestreColumn);
        });

        loadState();
        updateRamoStates();
    }

    // Inicializar la aplicación
    renderCategoryLegend();
    generateMalla();
});
