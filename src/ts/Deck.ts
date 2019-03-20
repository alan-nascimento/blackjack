class Deck {
    
    private deck: Carta[];

    constructor() {

        this.deck = [];
        this.gerarDeck();
    }

    gerarDeck() {
    
        for (let i = 1; i <= 4; i++) {
            for (let x = 1; x <= 13; x++) {
                this.deck.push(new Carta(i, x));
            }    
        }
    }

    puxarCarta() {
        
        return this.deck.splice(Math.floor(Math.random() * this.deck.length), 1)[0];
    }

    get Deck() {
        return this.deck;
    }
}