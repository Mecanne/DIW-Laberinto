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

var tiempo = 0;

ctx.font = " bold 24px Arial";

// Posicion inicial
var x = 50;
var y = 125;

var radio = 10;

var paradas = 0;

var dx = 0; // Velocidad en el eje X
var dy = 0; // Velocidad en el eje Y

// Dibujar el laberinto
function dibujarLaberinto() {
    ctx.beginPath();
    ctx.moveTo(0,50);
    ctx.lineTo(75,50);
    ctx.lineTo(75,200);
    ctx.lineTo(150,200);
    ctx.lineTo(150,200);
    ctx.lineTo(150,50);
    ctx.lineTo(500,50);

    ctx.moveTo(200,100);
    ctx.lineTo(250,100);
    ctx.lineTo(250,50);

    ctx.moveTo(300,150);
    ctx.lineTo(300,100);
    ctx.lineTo(400,100);

    ctx.moveTo(450,100);
    ctx.lineTo(450,150);
    ctx.lineTo(450,300);
    ctx.lineTo(400,300);

    ctx.moveTo(0,250);
    ctx.lineTo(100,250);
    ctx.lineTo(200,250);
    ctx.lineTo(200,150);
    ctx.lineTo(400,150);
    ctx.lineTo(400,250);
    ctx.lineTo(350,250);
    ctx.lineTo(350,350);
    ctx.lineTo(450,350);

    ctx.moveTo(300,400);
    ctx.lineTo(300,350);
    ctx.lineTo(250,350);

    ctx.moveTo(75,400);
    ctx.lineTo(75,300);
    ctx.lineTo(150,300);
    ctx.lineTo(150,350);
    ctx.moveTo(200,400);
    ctx.lineTo(200,300);
    ctx.lineTo(300,300);
    ctx.lineTo(300,200);
    ctx.lineTo(350,200);
    ctx.moveTo(300,200);
    ctx.lineTo(250,200);
    ctx.lineTo(250,250);

    ctx.moveTo(450,300);
    ctx.lineTo(500,300);

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
    ctx.fillText("x: " + x + " y: " + y + " Paradas: " + paradas + " Tiempo:" + getTiempo() + " s", 20, 20);
}

function dibujarMeta(){
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.fillRect(30,350,20,20);
    ctx.stroke();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    dibujarCoordenadas();
    dibujarLaberinto();
    dibujarBola();
    dibujarMeta();
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

    // Condiciones de victoria
    if(x <= 50 && y >= 350){
        alert('Has ganado en un tiempo de ' + getTiempo() + ' segundos.');
        clearInterval(intervalo);
        clearInterval(intervaloTiempo);
    }
}

function sumarTiempo(){
    tiempo += 1;
}

function getTiempo(){
    return tiempo/10;
}

// Intervalo para dibujar el canvas
var intervalo = setInterval(draw, 10);

var intervaloTiempo = setInterval(sumarTiempo,100);