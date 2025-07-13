// static/script.js

document.addEventListener('DOMContentLoaded', () => {
    const ramoCards = document.querySelectorAll('.ramo-card');
    let approvedRamos = new Set(); // Conjunto para almacenar los IDs de ramos aprobados

    // Cargar ramos aprobados desde localStorage al inicio
    function loadApprovedRamos() {
        const storedApproved = localStorage.getItem('approvedRamos');
        if (storedApproved) {
            approvedRamos = new Set(JSON.parse(storedApproved));
        }
    }

    // Guardar ramos aprobados en localStorage
    function saveApprovedRamos() {
        localStorage.setItem('approvedRamos', JSON.stringify(Array.from(approvedRamos)));
    }

    // Función para actualizar el estado visual de todos los ramos
    function updateMallaState(estado_ramos) {
        ramoCards.forEach(card => {
            const ramoId = card.dataset.ramoId;
            const estado = estado_ramos[ramoId];

            if (estado) {
                // Limpiar todas las clases de estado antes de aplicar las nuevas
                card.classList.remove('aprobado', 'habilitado', 'deshabilitado');

                if (estado.aprobado) {
                    card.classList.add('aprobado');
                } else if (estado.habilitado) {
                    card.classList.add('habilitado');
                } else {
                    card.classList.add('deshabilitado');
                }
            }
        });
    }

    // Solicitar al backend el estado inicial o actualizado de todos los ramos
    // Esto se llama al cargar la página y después de cada toggle
    async function fetchAndUpdateState(ramoIdToToggle = null) {
        const response = await fetch('/toggle_aprobado', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ramo_id: ramoIdToToggle, // El ramo que se intenta togglar (puede ser null para solo obtener estado)
                aprobados_actuales: Array.from(approvedRamos) // Enviar la lista actual de aprobados
            })
        });
        const data = await response.json();

        if (data.success) {
            // Actualizar el conjunto de ramos aprobados con lo que el servidor devuelve
            // Esto es importante porque el servidor valida prerrequisitos
            approvedRamos = new Set(data.aprobados);
            saveApprovedRamos(); // Guardar el nuevo estado en localStorage
            updateMallaState(data.estado_ramos); // Actualizar la interfaz
        } else {
            alert(data.message); // Mostrar mensaje si hay un error (ej. prerrequisitos no cumplidos)
        }
    }

    // Añadir event listeners a cada tarjeta de ramo
    ramoCards.forEach(card => {
        card.addEventListener('click', async () => {
            const ramoId = card.dataset.ramoId;
            await fetchAndUpdateState(ramoId); // Llamar a la función con el ID del ramo a togglar
        });
    });

    // Cargar el estado inicial de la malla al cargar la página
    loadApprovedRamos(); // Primero carga desde localStorage
    fetchAndUpdateState(); // Luego pide al backend que valide y actualice el estado visual
});
