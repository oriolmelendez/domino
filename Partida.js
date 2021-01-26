class Partida {

    constructor(codiPartida) {
        this.codiPartida = codiPartida;
        this.jugador1 = null;
        this.jugador2 = null;
        this.jugada = new Array();
        this.torn = null;
        this.passar=0;
        this.guanyador = null;
        this.tirada = true;
        this.fitxaObertura = null;
        this.fitxes = new Array(new Array(0,0),new Array(0,1),new Array(0,2),new Array(0,3),new Array(0,4),new Array(0,5),new Array(0,6),new Array(1,1),new Array(1,2),new Array(1,3),new Array(1,4),new Array(1,5),new Array(1,6),new Array(2,2),new Array(2,3),new Array(2,4),new Array(2,5),new Array(2,6),new Array(3,3),new Array(3,4),new Array(3,5),new Array(3,6),new Array(4,4),new Array(4,5),new Array(4,6),new Array(5,5),new Array(5,6),new Array(6,6));
        this.barrejarFitxes();
        this.barrejarFitxes();
    }

    //Mètodes

    //Barrejar fitxes perque siguin repartides
    
    barrejarFitxes(){
        let n = this.fitxes.length, aux, nRandom;

        for(let i = 0; i< n; i++){
              
            nRandom = Math.floor(Math.random() * n);

            aux = this.fitxes[i];
            this.fitxes[i] = this.fitxes[nRandom];
            this.fitxes[nRandom] = aux;
        }

    }
    
    //Repartim fitxes, quan tots dos jugadors ja les tenen assignades, comprovem qui ha de realitzar el primer llançament

    repartirFitxes(nom){
        if(this.jugador1.nom == nom && this.jugador1.fitxes.length == 0){
            this.jugador1.fitxes = this.fitxes.splice(0,7);
            if(this.jugador1.fitxes.length > 0 && this.jugador2.fitxes.length > 0){
                this.calcularTornIFitxaObertura();
            }
            return {fitxes: this.jugador1.fitxes};
        }else if(this.jugador2.nom == nom && this.jugador2.fitxes.length == 0){
            this.jugador2.fitxes = this.fitxes.splice(0,7);
            if(this.jugador1.fitxes.length > 0 && this.jugador2.fitxes.length > 0){
                this.calcularTornIFitxaObertura();
            }
            return {fitxes: this.jugador2.fitxes};
        }
        return; 
    }

    //Comprovació si algun jugador te fitxes dobles per començar la partida en cas negatiu comprova qui te la fitxa més alta

    calcularTornIFitxaObertura(){
        let i = 6;
        let j = 6;
        let k = 6;
        do{
            if(this.jugador1.fitxes.find(e => e[0]==i && e[1]==i)){
                this.torn = 1;
                this.fitxaObertura = new Array(i,i);
            }else if(this.jugador2.fitxes.find(e => e[0]==i && e[1]==i)){
                this.torn = 2;
                this.fitxaObertura = new Array(i,i);
            }
            i = i - 1;
        }while(i>0 && this.torn==null);
        if(this.torn==null){
            do{
                do{
                    if(this.jugador1.fitxes.find(e => e[0]==j && e[1]==k)){
                        this.torn = 1;
                        this.fitxaObertura = new Array(j,k);
                    }else if(this.jugador2.fitxes.find(e[0]==j && e[1]==k)){
                        this.torn = 2;
                        this.fitxaObertura = new Array(j,k);
                    }
                    k = k - 1;
                }while(k>0 && this.torn==null);
                j = j - 1;
                k = 6;
            }while(j>0 && k>0 && this.torn==null);
        }
    }

    //Canvi de torn
    canviaTorn(){
        if(this.torn==1){
            this.torn=2;
        }else{
            this.torn=1
        }
        return;
    }

    /*Si el jugador pulsa el botó passar se li retorna una fitxa per tal que pugui tornar a intentar tirar.
    * El jugador rebra fitxes fins que se li doni una que pugui tirar */

    robarFitxa(nom){
        let f = [7,7];
        while(this.fitxes.length>0 && f[0][0]!=this.jugada[0][0] && f[0][0]!=this.jugada[this.jugada.length-1][1] && f[0][1]!=this.jugada[0][0] && f[0][1]!=this.jugada[this.jugada.length-1][1]){
            if(this.jugador1.nom == nom && this.torn == 1){
                f = this.fitxes.splice(0,1);
                this.jugador1.fitxes.push(f[0]);               
            }else if(this.jugador2.nom == nom && this.torn == 2){
                f = this.fitxes.splice(0,1);
                this.jugador2.fitxes.push(f[0]);
            }else{
                break;
            }
        }
        if(this.jugador1.nom == nom && this.torn == 1){
            this.actualitzarPunts();                 
        }else if(this.jugador2.nom == nom && this.torn == 2){
            this.actualitzarPunts();
        }
    }

    //Quan cap jugador pot seguir tirant, es suma les fitxes de cadascú i s'actualitza la puntuació.

    actualitzarPunts(){
        if(this.fitxes.length==0){
            this.passar = this.passar + 1;
            if(this.passar >= 2){
                let f1 = this.jugador1.sumaFitxes();
                let f2 = this.jugador2.sumaFitxes();
                if(f1>f2){
                    this.jugador2.puntuacio = this.jugador2.puntuacio*1 + 5;
                    this.guanyador = this.jugador2.nom;
                }else if(f2>f1){
                    this.jugador1.puntuacio = this.jugador1.puntuacio*1 + 5;
                    this.guanyador = this.jugador1.nom;
                }
            }
            this.canviaTorn();
        }
    }

    //Acció de realitzar el moviment

    tirar(nom, f){
        if(this.tirada){
            this.primeraFitxa(nom,f);
        }else{
            this.altresFitxes(nom, f);
        }
    }

    //Comprova si la primera fitxa que s'ha tirat es correcte. Aquesta fitxa es comprova a la funció calcularTornIFitxaObertura()

    primeraFitxa(nom, f){
        if(f[0] == this.fitxaObertura[0] && f[1]== this.fitxaObertura[1] && this.jugador1.nom == nom){
            this.jugada.push(f); 
            this.jugador1.fitxes.splice(this.buscarFitxa(this.jugador1.fitxes, f), 1 );
            this.canviaTorn();
            this.tirada = false;
        }else if(f[0] == this.fitxaObertura[0] && f[1]== this.fitxaObertura[1] && this.jugador2.nom == nom){
            this.jugada.push(f); 
            this.jugador2.fitxes.splice(this.buscarFitxa(this.jugador2.fitxes, f), 1 );
            this.canviaTorn();
            this.tirada = false;
        }
    }

    //Busca la fitxa que ha tirat el jugador per tal de eliminar-la de la seva mà de fitxes

    buscarFitxa(fitxes, fitxa){
        let i;
        for(let j = 0; j<fitxes.length; j++){
            if(fitxes[j]){
                if(fitxes[j][0] == fitxa[0] && fitxes[j][1] == fitxa[1]){
                i = j;
                }
            }
        }
        return i;
    }

    /* Comprova si la fitxa tirada es correcte. 
    * En cas que el primer nombre de la peça coincideixi amb el primer nombre de la jugada >> Girem la fitxa 
    * En cas que el segon nombre de la peça coincideixi amb l'últim de la jugada >> Girem la fitxa 
    * Si la fitxa s'ha pogut tirar, la busquem a la mà del jugador i l'esborrem. */

    altresFitxes(nom, f){
        let jugable = false;
        if(f[0] == this.jugada[this.jugada.length-1][1]){
            this.jugada.push(f);
            jugable = true;
        }else if(f[1] == this.jugada[0][0]){
            this.jugada.unshift(f);
            jugable = true;
        }else if(f[0] == this.jugada[0][0]){
            let fg =this.girarFitxa(f);
            this.jugada.unshift(fg);
            jugable = true;
        }else if(f[1] == this.jugada[this.jugada.length-1][1]){
            let fg =this.girarFitxa(f);
            this.jugada.push(fg);
            jugable = true;
        }

        if(jugable == true & nom == this.jugador1.nom){
            this.jugador1.fitxes.splice(this.buscarFitxa(this.jugador1.fitxes, f), 1 );
            this.canviaTorn();
        }else if(jugable == true & nom == this.jugador2.nom){
            this.jugador2.fitxes.splice(this.buscarFitxa(this.jugador2.fitxes, f), 1 );
            this.canviaTorn();
        }

        if(this.jugador1.fitxes.length==0){
            this.jugador1.puntuacio = this.jugador1.puntuacio*1 + 5;
            this.guanyador = this.jugador1.nom;
        }else if(this.jugador2.fitxes.length == 0){
            this.jugador2.puntuacio = this.jugador2.puntuacio*1 + 5;
            this.guanyador = this.jugador2.nom;
        }

    }

    //Girem els valors de la fitxa
    girarFitxa(f){
        let aux = f[0];
        f[0] = f[1];
        f[1] = aux;
        return f;
    }


}

module.exports = Partida;
