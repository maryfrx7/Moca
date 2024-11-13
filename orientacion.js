document.getElementById("orientacion-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const respuestas = {
        fecha: document.getElementById("fecha").value,
        dia: document.getElementById("dia").value,
        lugar: document.getElementById("lugar").value,
        ciudad: document.getElementById("ciudad").value
    };

    console.log("Respuestas de Orientación:", respuestas);
    // Aquí podrías enviar los datos al servidor o base de datos
});

function dictarRespuesta(idCampo) {
    // Verifica si el navegador admite reconocimiento de voz
    if (!('webkitSpeechRecognition' in window)) {
        alert("Lo siento, tu navegador no admite reconocimiento de voz.");
        return;
    }

    const reconocimientoVoz = new webkitSpeechRecognition();
    reconocimientoVoz.lang = "es-ES";  // Configura el idioma a español
    reconocimientoVoz.interimResults = false;  // No mostrar resultados intermedios
    reconocimientoVoz.maxAlternatives = 1;  // Solo una alternativa de reconocimiento

    reconocimientoVoz.onstart = function() {
        console.log("Iniciando dictado de respuesta...");
    };

    reconocimientoVoz.onerror = function(event) {
        console.error("Error en el reconocimiento de voz:", event.error);
    };

    reconocimientoVoz.onresult = function(event) {
        // Obtiene el texto reconocido y lo coloca en el campo correspondiente
        const textoReconocido = event.results[0][0].transcript;
        document.getElementById(idCampo).value = textoReconocido;
        console.log("Respuesta dictada:", textoReconocido);
    };

    reconocimientoVoz.start();
}
