function generarPlan() {
    let nombre = document.getElementById("nombre").value;
    let edad = parseInt(document.getElementById("edad").value);
    let genero = document.getElementById("genero").value;
    let peso = parseFloat(document.getElementById("peso").value);
    let estatura = parseFloat(document.getElementById("estatura").value);
    let objetivo = document.getElementById("objetivo").value;
    let metaPeso = parseFloat(document.getElementById("metaPeso").value);

    if (peso <= 0 || estatura <= 0 || isNaN(peso) || isNaN(estatura)) {
        alert("Por favor ingrese peso y estatura válidos.");
        return;
    }

    let imc = peso / (estatura * estatura);
    let estado = "";
    if (imc < 18.5) estado = "Bajo peso";
    else if (imc < 25) estado = "Peso saludable";
    else if (imc < 30) estado = "Sobrepeso";
    else estado = "Obesidad";

    const planes = {
        "Bajar de peso": {
            desayuno: "Avena con fruta, té verde.",
            almuerzo: "Pollo a la plancha, ensalada y arroz integral.",
            cena: "Sopa de vegetales, ensalada ligera.",
            ejercicio: "30 min de cardio + abdominales."
        },
        "Mantenerme saludable": {
            desayuno: "Pan integral, huevo, jugo natural.",
            almuerzo: "Pescado al horno, verduras salteadas, quinoa.",
            cena: "Sándwich integral con pollo y vegetales.",
            ejercicio: "20 min de caminata rápida o yoga."
        },
        "Subir masa muscular": {
            desayuno: "Tortilla de huevo, avena con leche, banana.",
            almuerzo: "Pasta con carne, ensalada, batido de frutas.",
            cena: "Arroz con huevo y aguacate, yogur.",
            ejercicio: "Rutina de fuerza: brazos/pecho/piernas alternados."
        }
    };

    let html = `<h3>Hola ${nombre}</h3>
    <p>Tu IMC actual es <strong>${imc.toFixed(2)}</strong> (${estado})</p>
    <p><strong>Objetivo:</strong> ${objetivo}</p>`;

    const diasSemana = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
    for (let semana = 1; semana <= 4; semana++) {
        html += `<div class="semana"><h4>Semana ${semana}</h4>`;
        for (let d = 0; d < 7; d++) {
            html += `<p><strong>${diasSemana[d]}:</strong><br>
            Desayuno: ${planes[objetivo].desayuno}<br>
            Almuerzo: ${planes[objetivo].almuerzo}<br>
            Cena: ${planes[objetivo].cena}<br>
            Ejercicio: ${planes[objetivo].ejercicio}</p>`;
        }
        html += `</div>`;
    }

    html += `<div class="seguimiento"><h4>Seguimiento de Progreso Mensual</h4>`;
    for (let semana = 1; semana <= 4; semana++) {
        html += `<p>Semana ${semana}: Peso actual: 
        <input type="number" id="pesoSemana${semana}" step="0.1" onchange="actualizarIMC(${semana}, ${estatura}, ${metaPeso})"> 
        <span id="resultadoSemana${semana}"></span></p>`;
    }
    html += `</div>`;

    document.getElementById("resultado").innerHTML = html;
    document.getElementById("resultado").style.display = "block";
}

function actualizarIMC(semana, estatura, metaPeso) {
    let peso = parseFloat(document.getElementById(`pesoSemana${semana}`).value);
    if (isNaN(peso) || peso <= 0) {
        document.getElementById(`resultadoSemana${semana}`).innerText = "";
        return;
    }
    let imc = peso / (estatura * estatura);
    let mensaje = `IMC: ${imc.toFixed(2)} - `;
    if (peso <= metaPeso) {
        mensaje += "¡Felicitaciones! Estás alcanzando tu meta.";
    } else {
        mensaje += "¡Sigue así! Estás avanzando.";
    }
    document.getElementById(`resultadoSemana${semana}`).innerText = mensaje;
}