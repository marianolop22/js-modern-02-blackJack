/* 
2C = two of clubs (treboles)
2D = two of diamantes
2H = two of coraazones
2S = two of espadas
*/

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

// esta funcion crea un nuevo deck
const crearDeck = () => {

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

console.log([...deck]);

// Esta funcion me permite tomar una nueva carta
const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'no hay cartas en el deck';
    }

    const carta = deck.pop();
    console.log(carta);
    console.log(deck);

    return carta;
}

// pedirCarta();


const valorCarta = (carta) => {

    const valor = carta.substring(0 , carta.length-1);

    return (isNaN ( valor )) ? 
            (valor === 'A') ? 11 : 10 
            : valor * 1;

};

console.log(valorCarta(pedirCarta()));
