// Establecemos la funcion de cada boton
const botones = document.getElementsByTagName("button");

for (let i = 0; i < botones.length; i++) {
    if (botones[i].hasAttribute("data-action")) {
        switch (botones[i].getAttribute("data-action")) {
            case "nw":
                botones[i].addEventListener("click", () => {
                    dx = -1;
                    dy = -1;
                });
                break;
            case "n":
                botones[i].addEventListener("click", () => {
                    dx = 0;
                    dy = -1;
                });
                break;
            case "ne":
                botones[i].addEventListener("click", () => {
                    dx = 1;
                    dy = -1;
                });
                break;
            case "w":
                botones[i].addEventListener("click", () => {
                    dx = -1;
                    dy = 0;
                });
                break;
            case "p":
                botones[i].addEventListener("click", () => {
                    if(!(dx === 0 && dy === 0)){
                        paradas++;
                        dx = 0;
                        dy = 0;
                    }
                });
                break;
            case "e":
                botones[i].addEventListener("click", () => {
                    dx = 1;
                    dy = 0;
                });
                break;
            case "sw":
                botones[i].addEventListener("click", () => {
                    dx = -1;
                    dy = 1;
                });
                break;
            case "s":
                botones[i].addEventListener("click", () => {
                    dx = 0;
                    dy = 1;
                });
                break;
            case "se":
                botones[i].addEventListener("click",() => {
                    dx = 1;
                    dy = 1;
                });
                break;
            case "agrandar":
                botones[i].addEventListener("mousedown", () => {
                    if(radio < 20) radio +=2;
                });
                break;
            case "disminuir":
                botones[i].addEventListener("mousedown", () => {
                    if(radio > 2) radio -=2;
                });
                break;
        }
    }
}

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

ctx.font = " bold 24px Arial";

// Posicion inicial
var x = 50;
var y = 125;

var radio = 10;

var paradas = 0;

var dx = 0; // Velocidad en el eje X
var dy = 0; // Velocidad en el eje Y

// Dibujar el laberinto
function dibujarLinea() {
    ctx.beginPath();
    ctx.moveTo(0, 150);
    ctx.lineTo(175, 150);
    ctx.lineTo(300, 275);
    ctx.lineTo(425, 275);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(175, 100);
    ctx.lineTo(300, 225);
    ctx.lineTo(475, 225);
    ctx.lineTo(475, 325);
    ctx.lineTo(300, 325);
    ctx.lineTo(175, 200);
    ctx.lineTo(0, 200);
    ctx.stroke();
}

function dibujarBola() {
    ctx.beginPath();
    ctx.arc(x, y, radio, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function dibujarCoordenadas() {
    ctx.fillText("x: " + x + " y: " + y + " Numero de paradas: " + paradas, 20, 20);
}

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    dibujarCoordenadas();
    dibujarLinea();
    dibujarBola();
    x += dx;
    y += dy;
    
    //Colisiones con los bordes del canvas. 
    if(x > (500 - radio)){ // Abajo
        dx = 0;
    }
    if(x < radio){ // Arriba
        dx = 0;
    }
    if(y > (400 - radio)){ // Derecha
        dy = 0;
    }
    if(y < radio){ // Izquierda
        dy = 0;
    }
}

setInterval(draw, 25)