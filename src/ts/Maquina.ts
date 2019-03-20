
class Maquina extends Jogador {

    jogar(pontosJogador: number, deck: { puxarCarta: () => Carta; }) {
        
        while (pontosJogador < 21) {
            
            this.pegaCarta(deck);

            if (this.Pontos > pontosJogador) {
                
                break;
            }
        }
    }
}
