class Blackjack {
    
    constructor(private deck: Deck, private jogador: Jogador, private maquina: Maquina) {
        
    }
    
    iniciarJogo() {
        
        this.deck = new Deck();
        this.jogador = new Jogador();
        this.maquina = new Maquina();
        
        this.jogador.pegaCarta(this.deck);
        this.jogador.pegaCarta(this.deck);
        this.maquina.pegaCarta(this.deck);
        this.maquina.pegaCarta(this.deck);
    }

    finalizarJogo() {
        
        this.maquina.jogar(this.jogador.Pontos, this.deck);
    }

    get Deck() {
        return this.deck;
    }

    get Jogador() {
        return this.jogador;
    }

    get Maquina() {
        return this.maquina;
    }
};

