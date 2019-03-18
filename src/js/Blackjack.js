class Blackjack {
    
    constructor() {
        
        this.deck = null;
        this.jogador = null;
        this.maquina = null;
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
        
        this.maquina.jogar(this.jogador.pontos, this.deck);
    }
}