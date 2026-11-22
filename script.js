
document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       ELEMENTOS
    ========================= */

    const boton = document.getElementById("botonCarta");
    const inicio = document.getElementById("inicio");
    const historia = document.getElementById("historia");
    const musicaFinal = document.getElementById("musicaFinal");


    /* =========================
       COMPROBAR ELEMENTOS
    ========================= */

    if (!boton || !inicio || !historia) {
        console.error("Error: no se encontraron los elementos principales.");
        return;
    }

    if (!musicaFinal) {
        console.error("Error: no se encontró el elemento de audio.");
    } else {
        musicaFinal.volume = 0.35;
    }


    /* =========================
       ABRIR HISTORIA + MUSICA
    ========================= */

    boton.addEventListener("click", function () {

        console.log("Abriendo museo...");

        // Evitar múltiples ejecuciones
        boton.disabled = true;

        // Ocultar pantalla inicial
        inicio.style.display = "none";

        // Mostrar historia
        historia.classList.remove("oculto");

        // Iniciar música inmediatamente
        if (musicaFinal) {

            musicaFinal.volume = 0.35;
            musicaFinal.currentTime = 0;

            musicaFinal.play()
                .then(() => {
                    console.log("Música reproduciéndose correctamente.");
                })
                .catch(error => {
                    console.error("Error al reproducir la música:", error);

                    // Permitir volver a intentar
                    boton.disabled = false;
                });

        }

        // Volver al principio del recorrido
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        // Iniciar animaciones
        iniciarAnimaciones();

    });


    /* =========================
       ANIMACIONES AL DESLIZAR
    ========================= */

    function iniciarAnimaciones() {

        const elementos = historia.querySelectorAll(
            ".seccion h2, .seccion p, .seccion img, .seccion video, .seccion .numero"
        );

        // Compatibilidad con navegadores antiguos
        if (!("IntersectionObserver" in window)) {

            elementos.forEach(elemento => {
                elemento.classList.add("revelar", "visible");
            });

            return;
        }

        // Preparar elementos
        elementos.forEach(elemento => {
            elemento.classList.add("revelar");
        });

        // Crear observador
        const observador = new IntersectionObserver(
            function (entradas, observador) {

                entradas.forEach(function (entrada) {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add("visible");

                        observador.unobserve(entrada.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        // Observar elementos
        elementos.forEach(elemento => {
            observador.observe(elemento);
        });

    }


    /* =========================
       PARTICULAS FLOTANTES
    ========================= */

    function crearParticula() {

        const particula = document.createElement("div");

        particula.classList.add("particle");

        // Posición horizontal aleatoria
        particula.style.left = Math.random() * 100 + "vw";

        // Tamaño aleatorio
        const tamanio = Math.random() * 3 + 2;

        particula.style.width = tamanio + "px";
        particula.style.height = tamanio + "px";

        // Duración aleatoria
        const duracion = Math.random() * 6 + 5;

        particula.style.animationDuration = duracion + "s";

        // Agregar al documento
        document.body.appendChild(particula);

        // Eliminar al terminar la animación
        setTimeout(function () {
            particula.remove();
        }, duracion * 1000);

    }


    /* =========================
       GENERADOR DE PARTICULAS
    ========================= */

    setInterval(crearParticula, 250);


    /* =========================
       MENSAJE DE INICIALIZACION
    ========================= */

    console.log("Museo de los gordos cargado correctamente.");

});
