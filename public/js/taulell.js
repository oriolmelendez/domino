window.onload = function dades(){
    document.getElementById("usuari").innerHTML = localStorage.getItem('nomUsuari');
    document.getElementById("codiP").innerHTML = localStorage.getItem('codiP');
    document.getElementById('obtenirFitxes').addEventListener('click', obtenirFitxes, false);
    document.getElementById('passar').addEventListener('click', passar, false);
    recarregarFitxes();
    setInterval(recarregarTaulell, 1000);
    setInterval( torn, 1000 );
    setInterval( guanyador, 1000 );
    if(document.getElementById("divFitxesRobades").hasChildNodes == true){
        document.getElementById("obtenirFitxes").disabled = true;
    }
}

function obtenirFitxes(){

    let nomUsr = localStorage.getItem('nomUsuari');
    let codiP= localStorage.getItem('codiP');

    let formData = new FormData();
    formData.append('nom', nomUsr);
    formData.append('codi', codiP);

    fetch('/obtenirFitxes',{
        method: 'POST',
        body:formData
    });
    recarregarFitxes();
    document.getElementById("obtenirFitxes").disabled = true;
}

function passar(){
    let nomUsr = localStorage.getItem('nomUsuari');
    let codiP= localStorage.getItem('codiP');

    let formData = new FormData();
    formData.append('nom', nomUsr);
    formData.append('codi', codiP);

    fetch('/passar',{
        method: 'POST',
        body:formData
    });
    recarregarFitxes();
}

function tirada(valor){

    let nomUsr = localStorage.getItem('nomUsuari');
    let codiP= localStorage.getItem('codiP');
    localStorage.setItem("fitxaJugada", valor);

    let formData = new FormData();
    formData.append('nom', nomUsr);
    formData.append('codi', codiP);
    formData.append('fitxa', valor);
    
    fetch('/tirada',{
        method: 'POST',
        body:formData
    });
    recarregarFitxes();
}

async function recarregarTaulell(){

    let codiP= localStorage.getItem('codiP');
    
    let formData = new FormData();
    formData.append('codi', codiP);

    var taulellActual = document.getElementById("divTaulell");
    while(taulellActual.firstChild!=null) { 
        taulellActual.removeChild(taulellActual.firstChild); 
    }

    await fetch('/recarregarTaulell',{
        method: 'POST',
        body:formData
    })
    .then(response => response.json())
    .then(dades => {

        dades.taulell.forEach(element =>{
            let nom, f, v;
            if(element[0]<element[1]){
                nom = 'img/fitxes/'+ element[0] + '_' + element[1] + '.png';
                v = '[' + element[0] + ',' + element[1] + ']';
                f = document.createElement('img');
                f.style.transform = 'rotate(' + 270 + 'deg)';
            }else if(element[0]>element[1]){
                nom = 'img/fitxes/'+ element[1] + '_' + element[0] + '.png';
                v = '[' + element[1] + ',' + element[0] + ']';
                f = document.createElement('img');
                f.style.transform = 'rotate(' + 90 + 'deg)';
            }else{
                nom = 'img/fitxes/'+ element[0] + '_' + element[1] + '.png';
                v = '[' + element[0] + ',' + element[1] + ']';
                f = document.createElement('img');
            }
            f.src = nom;
            taulellActual.appendChild(f);
        });
    });
};

async function recarregarFitxes(){

    let codiP= localStorage.getItem('codiP');
    let nomUsr = localStorage.getItem('nomUsuari');
    
    let formData = new FormData();
    formData.append('codi', codiP);
    formData.append('nom', nomUsr);

    var fitxesActual = document.getElementById("divFitxesRobades");
    while(fitxesActual.firstChild!=null) { 
        fitxesActual.removeChild(fitxesActual.firstChild); 
    }

    await fetch('/recarregarFitxes',{
        method: 'POST',
        body:formData
    })
    .then(response => response.json())
    .then(dades => {

        dades.fitxes.forEach(element =>{
            let nom, f, v;
            nom = 'img/fitxes/'+ element[0] + '_' + element[1] + '.png';
            v = '[' + element[0] + ',' + element[1] + ']';
            f = document.createElement('img');
            f.src = nom;
            f.setAttribute('name', v);
            f.onclick = function(){tirada(this.name);}
            fitxesActual.appendChild(f);
        });
    });
};

async function torn(){

    let div = document.getElementById("tTorn");

    let codiP= localStorage.getItem('codiP');
    let nomUsr = localStorage.getItem('nomUsuari');
    
    let formData = new FormData();
    formData.append('codi', codiP);

    await fetch('/torn',{
        method: 'POST',
        body:formData
    })
    .then(response => response.json())
    .then(dades => {
        if(dades.nom==nomUsr){
            div.innerText="És el teu torn.";
        }else{
            div.innerText="És el torn de l'altre jugador";
        }
    });
}

async function guanyador(){
    let codiP= localStorage.getItem('codiP');

    let formData = new FormData();
    formData.append('codi', codiP);

    await fetch('/guanyador',{
        method: 'POST',
        body:formData
    })
    .then(response => response.json())
    .then(dades => {
        if(dades.nom!=null){
            actuaPuntuacio();
            alert("Ha guanyat el jugador " + dades.nom + "!");
            window.location.href = '/partida';
        }
    });
}

async function actuaPuntuacio(){
    let codiP= localStorage.getItem('codiP');
    let nomUsr = localStorage.getItem('nomUsuari');
    
    let formData = new FormData();
    formData.append('codi', codiP);
    formData.append('nom',nomUsr);

    await fetch('/actualitzarPunts',{
        method: 'POST',
        body:formData
    })
    .then(response => response.json())
    .then(dades => {
        localStorage.setItem("puntuacioUsr",parseInt(dades.puntuacio));
    });
}