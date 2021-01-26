class Jugador {

    constructor(nom,puntuacio,contrasenya) {
        this.nom = nom;
        this.puntuacio = puntuacio;
        this.fitxes = new Array();
        this.contrasenya = contrasenya;
    }
    
    //Suma de totes les fitxes que te un jugador
    sumaFitxes(){
        let suma = 0;
        this.fitxes[0].forEach(element => {
            suma = suma + element[0] + element[1];
        });
        return suma;
    }
    
}

module.exports = Jugador;