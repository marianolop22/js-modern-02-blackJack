/* 
2C = two of clubs (treboles)
2D = two of diamantes
2H = two of coraazones
2S = two of espadas
*/

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];
let puntosJugador = 0;
let puntosComputadora = 0;

let input = window.prompt("Nombre del Jugador","Jugador");
let jugador = input ? input : 'Jugador 1';
document.querySelector('#nombre-jugador').innerHTML = `${jugador} - <small>0</small>`;

// Referencias
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const puntosHTMTL = document.querySelectorAll('small');
const cartasJugador = document.querySelector('#jugador-cartas');
const cartasComputadora = document.querySelector('#computadora-cartas');



// esta funcion crea un nuevo deck
const crearDeck = () => {

    deck =  [];
    for (let index = 2; index <= 10; index++) {

        tipos.forEach ( tipo => {
            deck.push (`${index}${tipo}`);
        })
    };

    tipos.forEach ( tipo => {
        especiales.forEach ( especial => {
            deck.push (`${especial}${tipo}`);
        })
    });

    deck = _.shuffle ( deck );
    return deck;

}

crearDeck();

// Esta funcion me permite tomar una nueva carta
const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'no hay cartas en el deck';
    }

    const carta = deck.pop();
    return carta;
}

// pedirCarta();


const valorCarta = (carta) => {

    const valor = carta.substring(0 , carta.length-1);

    return (isNaN ( valor )) ? 
            (valor === 'A') ? 11 : 10 
            : valor * 1;

};

//turno de la computadora
const turnoComputadora = (puntosMinimos) => {

    do {
        const carta = pedirCarta();
        const cartaImg = document.createElement('img');
        cartaImg.src = `assets/cartas/${carta}.png`;
        cartaImg.classList.add('carta');
    
        puntosComputadora += valorCarta (carta);
        
        puntosHTMTL[1].innerText = puntosComputadora;
        cartasComputadora.append (cartaImg);

        if (puntosMinimos > 21 ) {
            break;
        }
    } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21 ) );


    setTimeout(() => {
        if ( puntosComputadora === puntosJugador ) {
            alert ('nadie gana');
            
        } else if (puntosJugador > 21) {
            alert('Computadora Gana');
        } else if ( puntosComputadora > 21 ){
            alert ('Jugador gana');
        } else {
            alert ('computadora gana');
        }
    }, 100);

};

// eventos

btnPedir.addEventListener('click',  () => {

    const carta = pedirCarta();
    const cartaImg = document.createElement('img');
    cartaImg.src = `assets/cartas/${carta}.png`;
    cartaImg.classList.add('carta');

    puntosJugador += valorCarta (carta);

    puntosHTMTL[0].innerText = puntosJugador;
    cartasJugador.append (cartaImg);

    if (puntosJugador > 21) {
        console.warn('Ya perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
        
    } else if (puntosJugador === 21) {
        console.warn ('21, genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
})

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
})

btnNuevo.addEventListener ('click', () => {

    deck = crearDeck();
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    puntosComputadora = 0;
    puntosJugador = 0;

    puntosHTMTL[0].innerText = 0;
    puntosHTMTL[1].innerText = 0;

    cartasComputadora.innerHTML = '';
    cartasJugador.innerHTML = ''
    console.log(deck);
})

