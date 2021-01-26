function dades(){
    document.getElementById("nomUsuari").innerHTML = localStorage.getItem('nomUsuari');
    document.getElementById("puntuacioUsuari").innerHTML = localStorage.getItem('puntuacioUsr');
}

window.onload = function(){
    dades();
}