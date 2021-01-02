let canvas, ctx;

let x; //variabila Pascal - nr de eșecuri până la apariția
let y;    //variabila Bernoulli
let p = 0.05; //probabilitatea de realizare a evenimentului
let q;//probabilitatea de nerealizare a evenimentului
let k ;// numărul de succese de realizare a evenimentului
let j ;//contor pentru numărul de eșecuri
let media;
let mediaEmpirica;
let dispersia;
let dispersiaEmpirica;
let array_of_number = [];//sir in care stocam variabilele generate
let sumVariabile = 0;
let sumVariabilePow2 = 0;
let intervalArray = [];
let frecventaRelativa = [];
let interval;
let intervale;
let numarVariabile;


function getNumber() {
    numarVariabile = document.getElementById("nr_variabile").value;
    p = 0.7;
    q = 1 - p;
    k = 10;
    media = k*q/p;
    dispersia = Math.sqrt(k*q/Math.pow(p,2));
    for (let i = 0; i < numarVariabile; i++) {
          genereazaNumarul(q);//genereaza variabila Pascal
    }
    afiseazaNumerele();
};

function genereazaNumarul(q) {
    x = 0;
    j = 0;

do  {
//Algoritmul Pascal
    //Pasul 1
    /*
        Algoritmul Bernoulli
     */

    let u = Math.random();

    if(u <= q) {
        y = 0;
    }else{
        y = 1;
    }
    //Pasul 2
    if (y == 0){
        x+=1;
    }else {
        j+=1;
    }
    //Pasul 3
} while ( j < k);
    //alert(x);
    array_of_number.push(x);

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
Calcul medie empirică
 */
function valideaza() {
    for (let i = 0; i < numarVariabile; i++) {
        sumVariabile += array_of_number[i];
        //alert(sumVariabile);
        sumVariabilePow2 += Math.pow(array_of_number[i], 2)
    }

    mediaEmpirica = sumVariabile / numarVariabile;
    let valMedie = document.getElementById("media");
    valMedie.innerHTML = "media="+ media.toFixed(8) + "<br/>" + "media empirică=" + mediaEmpirica.toFixed(8);
    dispersiaEmpirica = Math.sqrt(sumVariabilePow2 / numarVariabile - Math.pow(mediaEmpirica, 2));
    let valDispersie = document.getElementById("dispersia");
    valDispersie.innerHTML = "dispersia= "+dispersia.toFixed(8) + "<br/>" + "dispersia empirică=" + dispersiaEmpirica.toFixed(8);
/*
Histograma
 */
//Pasul 1
    let min = Math.min(...array_of_number);
    let max = Math.max(...array_of_number);
//Pasul 2
    intervale = 20;
//Pasul 3
    interval = (max - min) / intervale;
    //alert(interval);

    for (let i = 0; i <= intervale; i++) {
        intervalArray[i] = i * interval + min;
        //alert(intervalArray[i]);
    }
//Pasul 4
    let nrValoriDeSelectie = [];
    for (let i = 0; i <= intervale; i++) {
        nrValoriDeSelectie[i] = 0;
    }

    for (let i = 0; i < intervale; i++) {
        for (let j = 0; j < numarVariabile; j++) {
            if (array_of_number[j] >= intervalArray[i] && array_of_number[j] < intervalArray[i + 1]) {
                nrValoriDeSelectie[i] += 1;
            }
        }
        //alert(nrValoriDeSelectie[i]);
    }
//Pasul 5
///////////////////////////////////////////////////////////////

    for (let i = 0; i <= intervale; i++) {
        frecventaRelativa[i] = nrValoriDeSelectie[i] / numarVariabile;
    }
    let genereaza=document.getElementById("genereaza");
    genereaza.classList.remove("hidden");
    //alert(frecventaRelativa[15]);
}

//Clear the canvas context using the canvas width and height
function clearCanvas(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isCanvasActive = 1;
    //clear the array
    array_of_number = [];
    window.location.reload();
}

function reprezintaHistograma() {
    let a ;// axa x
    let b = 280;//axa y
    let width = interval * 30;
    let height;
    for (let i = 0; i < intervale; i++) {
        a = 40 + intervalArray[i] * 30;
        height = 0 - frecventaRelativa[i] * 1000;
        //alert(frecventaRelativa[i]);
        ctx.beginPath();
        ctx.fillRect(a, b, width, height);

        ctx.moveTo(a, b);
        ctx.lineTo(a, b+height);
        ctx.stroke();

        ctx.moveTo(a, b+height);
        ctx.lineTo(a+ width, b+height);
        ctx.stroke();

        ctx.moveTo(a+width, b+height);
        ctx.lineTo(a+width, b);
        ctx.stroke()
         ctx.fillText(frecventaRelativa[i], 40 + intervalArray[i]*30, 275 - frecventaRelativa[i] * 1000);
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
        reprezintaHistograma();
        //orizontal
        ctx.font = "10px Georgia";
        ctx.moveTo(40, 280);
        ctx.lineTo(540, 280);
        ctx.stroke();

        // ctx.moveTo(40, 240);
        // ctx.lineTo(540, 240);
        // ctx.stroke();
        // ctx.fillText("0.01", 20, 240);

        // ctx.moveTo(40, 200);
        // ctx.lineTo(540, 200);
        // ctx.stroke();
        // ctx.fillText("0.02", 20, 200);
        //
        // ctx.moveTo(40, 160);
        // ctx.lineTo(540, 160);
        // ctx.stroke();
        // ctx.fillText("0.03", 20, 160);
        //
        // ctx.moveTo(40, 120);
        // ctx.lineTo(540, 120);
        // ctx.stroke();
        // ctx.fillText("0.04", 20, 120);
        //
        // ctx.moveTo(40, 80);
        // ctx.lineTo(540, 80);
        // ctx.stroke();
        // ctx.fillText("0.05", 20, 80);
        //
        // ctx.moveTo(40, 40);
        // ctx.lineTo(540, 40);
        // ctx.stroke();
        // ctx.fillText("0.06", 20, 40);
        ctx.fillText("Frecvențe relative", 20, 20);
        // //vertical
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












