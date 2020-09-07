/* Patron modulo para protejer el equipo */
// funcion anónima autoejecutable
const miModulo = (() => {
    'use strict';

    let deck = [];
    const tipos = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];

    let puntosJugadores = [];

    let input = window.prompt("Nombre del Jugador","Jugador");
    let jugador = input ? input : 'Jugador 1';
    document.querySelector('#nombre-jugador').innerHTML = `${jugador} - <small>0</small>`;
    
    // Referencias
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo'),
          puntosHTML = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas');
        //   cartasJugador = document.querySelector('#jugador-cartas'),
        //   cartasComputadora = document.querySelector('#computadora-cartas');
    
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();
        
        puntosJugadores = [];
        for (let index = 0; index < numJugadores; index++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach ( elem => elem.innerText = 0);
        divCartasJugadores.forEach ( elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    };

    // esta funcion crea un nuevo deck
    const crearDeck = () => {
    
        deck = [];
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
    
        return _.shuffle ( deck );;
    };
        
    // Esta funcion me permite tomar una nueva carta
    const pedirCarta = () => {
    
        if (deck.length === 0) {
            throw 'no hay cartas en el deck';
        }
        return deck.pop();
    };
    
    const valorCarta = (carta) => {
        const valor = carta.substring(0 , carta.length-1);
        return (isNaN ( valor )) ? 
                (valor === 'A') ? 11 : 10 
                : valor * 1;
    
    };

    // turno o = primer jugador y ultimo será la pc
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] += valorCarta (carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    };
    
    const crearCarta = (carta, turno) => {

        const cartaImg = document.createElement('img');
        cartaImg.src = `assets/cartas/${carta}.png`;
        cartaImg.classList.add('carta');
        divCartasJugadores[turno].append (cartaImg);
    };

    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if ( puntosComputadora === puntosMinimos ) {
                alert ('nadie gana');
                
            } else if (puntosMinimos > 21) {
                alert('Computadora Gana');
            } else if ( puntosComputadora > 21 ){
                alert ('Jugador gana');
            } else {
                alert ('computadora gana');
            }
        }, 100);
    };

    //turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
    
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos ( carta, puntosJugadores.length - 1);
            crearCarta (carta, puntosJugadores.length - 1);
    
        } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21 ) );
    
        determinarGanador();
    };
    
    // eventos
    btnPedir.addEventListener('click',  () => {
    
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos ( carta, 0 );
        crearCarta (carta, 0);

        if (puntosJugador > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
            
        } else if (puntosJugador === 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });
    
    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });
    
    btnNuevo.addEventListener ('click', () => {
    
        inicializarJuego();

    });

    // esto vuelve publico lo que devuelva
    return {
        nuevoJuego: inicializarJuego
    };

})();


