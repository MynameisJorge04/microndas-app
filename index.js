let estado = "APAGADO";
let tiempoDeCoccion = null;
let tiempoOriginal = null;
let intervalo = null;

function cambiarEstado(nuevoEstado, imagen) {
    estado = nuevoEstado;
    document.getElementById("estado").textContent = estado;
    document.getElementById("imagen").src = imagen;
}

function abrirPuerta() {
    if (estado === "COCINANDO") {
        alert("No se puede abrir la puerta, el microondas está cocinando.");
    } else {
        cambiarEstado("PUERTA_ABIERTA", "puerta_abierta.png");
    }
}

function cerrarPuerta() {
    if (estado === "COCINANDO") {
        alert("No se puede cerrar la puerta, el microondas está cocinando.");
    } else if (estado === "PUERTA_ABIERTA") {
        cambiarEstado("PUERTA_CERRADA", "puerta_cerrada.png");
    } else {
        alert("La puerta ya está cerrada.");
    }
}

function empezarACocinar() {
    if (estado === "COCINANDO") {
        alert("El microondas ya está cocinando.");
    } else if (estado === "APAGADO") {
        alert("El microondas está apagado. Enciéndelo antes de cocinar.");
    } else if (estado === "PUERTA_CERRADA") {
        if (tiempoDeCoccion) {
            tiempoOriginal = tiempoDeCoccion;
            cambiarEstado("EMPEZANDO_A_COCINAR", "cocinando.png");
            setTimeout(function() {
                cambiarEstado("COCINANDO", "cocinando.png");
                document.getElementById("tiempoRestante").textContent = tiempoDeCoccion;
                intervalo = setInterval(contador, 1000);
                setTimeout(terminarDeCocinar, tiempoDeCoccion * 1000);
            }, 1000);
        } else {
            alert("Establezca un tiempo de cocción antes de empezar a cocinar.");
        }
    } else {
        alert("Cierra la puerta para empezar a cocinar.");
    }
}

function terminarDeCocinar() {
    if (estado === "COCINANDO") {
      cambiarEstado("PUERTA_CERRADA", "puerta_cerrada.png");
      clearInterval(intervalo);
      document.getElementById("tiempoRestante").textContent = "";
  
      // Eliminar el tiempo de cocción
      tiempoDeCoccion = null;
      document.getElementById("tiempo").value = "";
  
      // Reproducir el audio al terminar la cocción
      var audio = new Audio("sonidos.mp3");
      audio.play();
    } else {
      alert("El microondas no está cocinando.");
    }
}  

function encender() {
    if (estado === "COCINANDO") {
        alert("No puedes encender el microondas, está cocinando.");
    } else if (estado === "APAGADO") {
        cambiarEstado("PUERTA_CERRADA", "puerta_cerrada.png");
    } else {
        alert("El microondas ya está encendido.");
    }
}

function apagar() {
    if (estado === "COCINANDO") {
        alert("No puedes apagar el microondas, está cocinando.");
    } else {
        cambiarEstado("APAGADO", "apagado.png");
    }
}

function establecerTiempo() {
    if (estado === "COCINANDO") {
        alert("No puedes establecer el tiempo de cocción, el microondas está cocinando.");
    }
    else if (estado === "PUERTA_CERRADA") {
        tiempoDeCoccion = document.getElementById("tiempo").value;
        alert(`Tiempo de cocción establecido en ${tiempoDeCoccion} segundos.`);
    } else {
        alert("Enciende el microondas y cierra la puerta antes de establecer el tiempo.");
    }
}


function contador() {
    tiempoDeCoccion--;
    document.getElementById("tiempoRestante").textContent = tiempoDeCoccion;
}
