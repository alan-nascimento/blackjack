
class Maquina extends Jogador {

    jogar(pontosJogador, deck) {
        
        while (pontosJogador < 21) {
            
            this.pegaCarta(deck);

            if (this.pontos > pontosJogador) {
                
                break;
            }
        }
    }
}
