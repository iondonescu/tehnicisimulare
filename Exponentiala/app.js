let canvas, ctx;
let numarVariabile;//numarul de variabile a fi generate
let x; //variabila exponentiala de parametru 1
let y;//variabila exponentiala de parametru 3
let mediaEmpirica;
let dispersiaEmpirica;
let array_of_number = [];//sir in care stocam variabilele generate
let sumVariabile = 0;
let sumVariabilePow2 = 0;
let intervalArray = [];
let frecventaRelativa = [];
let interval;



function getNumber() {
    numarVariabile = document.getElementById("nr_variabile").value;
    for (let i = 0; i < numarVariabile; i++) {
        genereazaNumarul();
    }
    afiseazaNumerele();
};
let k, u;
let n;

function genereazaNumarul() {

//Pasul 1
    n = 0;
//Pasul 2
    do {
        /*
    Genereaza cele doua nr aleatoare u0 si u1;
     */
        let u0 = Math.random();
        let u1 = Math.random();
//Pasul 3
        u = u0;
        k = 1;
//Pasul 4,5,6
        while (u0 >= u1) {
            k = k + 1;
            u0 = u1;
            u1 = Math.random();
        }
        if (k % 2 == 0) {
            n = n + 1;
        }
    }
//Pasul 7
    while ((k % 2) !== 1) ;
    x = n + u;
    y = x / 3;
    array_of_number.push(y);
}

let panel = document.getElementById("numere_generate");

function afiseazaNumerele() {
    panel.innerHTML = '';
    for (let i = 0; i < numarVariabile; i++) {
        panel.innerHTML += array_of_number[i];
        panel.innerHTML += "<br>";
    }
    panel.scrollIntoView();
    let valideaza = document.getElementById("valideaza");
    valideaza.classList.remove("hidden");
}

/*
Validare cu ajutorul mediei si dispersiei
 */

/*
Calcul medie empirica
 */
function valideaza() {


    for (let i = 0; i < numarVariabile; i++) {
        sumVariabile += array_of_number[i];
        sumVariabilePow2 += Math.pow(array_of_number[i], 2)
    }
    mediaEmpirica = sumVariabile / numarVariabile;
    let media = document.getElementById("media");
    media.innerHTML = "media=0.33333333" + "<br/>" + "media empirică=" + mediaEmpirica.toFixed(8);
    dispersiaEmpirica = Math.sqrt(sumVariabilePow2 / numarVariabile - Math.pow(mediaEmpirica, 2));
    let dispersia = document.getElementById("dispersia");
    dispersia.innerHTML = "dispersia= 0.33333333" + "<br/>" + "dispersia empirică=" + dispersiaEmpirica.toFixed(8);
    /*
    Histograma
     */
//Pasul 1
    let min = Math.min(...array_of_number);
    let max = Math.max(...array_of_number);
//Pasul 2
    let k = 15;
//Pasul 3
    interval = (max - min) / 15;
    //alert(interval);

    for (let i = 0; i <= 15; i++) {
        intervalArray[i] = i * interval + min;
        //alert(intervalArray[i]);
    }
//Pasul 4
    let nrValoriDeSelectie = [];
    for (let i = 0; i <= 15; i++) {
        nrValoriDeSelectie[i] = 0;
    }

    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < numarVariabile; j++) {
            if (array_of_number[j] >= intervalArray[i] && array_of_number[j] <= intervalArray[i + 1]) {
                nrValoriDeSelectie[i] += 1;
            }
        }
        //alert(nrValoriDeSelectie[i]);
    }
//Pasul 5


    for (let i = 0; i <= 15; i++) {
        frecventaRelativa[i] = nrValoriDeSelectie[i] / numarVariabile;
    }
let genereaza=document.getElementById("genereaza");
    genereaza.classList.remove("hidden");
}

//Clear the canvas context using the canvas width and height
function clearCanvas(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isCanvasActive = 1;
    //clear the array
    array_of_number = [];
    window.location.reload();
}

function reprezintaHistograma(canvas, vtx) {
    let a ;// axa x
    let b = 280;//axa y
    let width = interval * 200;
    let height;
    for (let i = 0; i < 15; i++) {
        a = 40 + intervalArray[i] * 200;
        height = 0 - frecventaRelativa[i] * 400;
        //alert(frecventaRelativa[i]);
        ctx.beginPath();
        ctx.fillRect(a, b, width, height);

        ctx.stroke();

        ctx.moveTo(a, b);
        ctx.lineTo(a, b+height);
        ctx.stroke();

        ctx.moveTo(a, b+height);
        ctx.lineTo(a+ width, b+height);
        ctx.stroke();

        ctx.moveTo(a+width, b+height);
        ctx.lineTo(a+width, b);
        ctx.stroke()
        ctx.fillText(frecventaRelativa[i], 40 + intervalArray[i]*200, 275 - frecventaRelativa[i] * 400);
        // ctx.stroke();
    }
    let reia = document.getElementById("reload");
    reia.classList.remove("hidden");
    reia.addEventListener("click",function(){
        location.reload();
    });
}

function init() {
    // Get the specific canvas element from the HTML document
    canvas = document.getElementById('sketchpad');

    // If the browser supports the canvas tag, get the 2d drawing context for this canvas
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
    }
    r = 100;
    g = 100;
    b = 0;
    a = 255;
    // Select a fill style
    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";

    // Check that we have a valid context to draw the histogram

    if (ctx) {
        reprezintaHistograma(canvas, ctx);
        //orizontal
        ctx.font = "10px Georgia";
        ctx.moveTo(40, 280);
        ctx.lineTo(540, 280);
        ctx.stroke();

        // ctx.moveTo(40, 240);
        // ctx.lineTo(540, 240);
        // ctx.stroke();
        // ctx.fillText("0.1", 20, 240);
        //
        // ctx.moveTo(40, 200);
        // ctx.lineTo(540, 200);
        // ctx.stroke();
        // ctx.fillText("0.2", 20, 200);
        //
        // ctx.moveTo(40, 160);
        // ctx.lineTo(540, 160);
        // ctx.stroke();
        // ctx.fillText("0.3", 20, 160);
        //
        // ctx.moveTo(40, 120);
        // ctx.lineTo(540, 120);
        // ctx.stroke();
        // ctx.fillText("0.4", 20, 120);
        //
        // ctx.moveTo(40, 80);
        // ctx.lineTo(540, 80);
        // ctx.stroke();
        // ctx.fillText("0.5", 20, 80);
        //
        // ctx.moveTo(40, 40);
        // ctx.lineTo(540, 40);
        // ctx.stroke();
        // ctx.fillText("0.6", 20, 40);
        ctx.fillText("Frecvențe relative", 20, 20);
        //vertical
        ctx.moveTo(40, 280);
        ctx.lineTo(40, 40);
        ctx.stroke();
        ctx.fillText("Intervale", 100 , 290);
        // ctx.moveTo(140, 280);
        // ctx.lineTo(140, 40);
        // ctx.stroke();
        // ctx.moveTo(240, 280);
        // ctx.lineTo(240, 40);
        // ctx.stroke();
        // ctx.moveTo(340, 280);
        // ctx.lineTo(340, 40);
        // ctx.stroke();
        // ctx.moveTo(440, 280);
        // ctx.lineTo(440, 40);
        // ctx.stroke();
        // ctx.moveTo(540, 280);
        // ctx.lineTo(540, 40);
        // ctx.stroke();
    }

}












