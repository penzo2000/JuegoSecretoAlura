let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados=[];
let numeroMaximo=10;
let numeroMaximoJugada=5;


function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        activarBoton("reiniciar");
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    
    let numeroGenerado=Math.floor(Math.random()*numeroMaximo)+1;
    
    if (listaNumerosSorteados.length==numeroMaximo){
        return finDelJuegoListaCompleta();
    }
    if(listaNumerosSorteados.length==numeroMaximoJugada){
        return finDelJuegoMaximasJugadas();
    }
    else{
        if (listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        }
        else{
            listaNumerosSorteados.push(numeroGenerado);
            console.log(numeroGenerado);
            console.log(listaNumerosSorteados);
            return numeroGenerado;
        }
    }
}
function finDelJuegoMaximasJugadas(){
    desactivarBoton("#intento");
    return asignarTextoElemento("p","Excediste el numero máximo de jugadas");
}

function finDelJuegoListaCompleta(){
    desactivarBoton("#intento");
    return asignarTextoElemento("p","Todos los números ya fueron sorteados");
}

function desactivarBoton(boton){
    document.querySelector(boton).setAttribute('disabled','true');
}

function activarBoton(boton){
    document.getElementById(boton).removeAttribute('disabled');
}

function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    activarBoton("intento");
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;

}

function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    desactivarBoton("#reiniciar");
}

condicionesIniciales();
