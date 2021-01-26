window.onload = function(){
    document.getElementById('Bcrear').addEventListener('click', crearPartida, false);
    document.getElementById('Baccedir').addEventListener('click', accedirPartida, false);
}

function crearPartida(){

    let codiP = document.getElementById("crearp").value;
    let nomUsr = localStorage.getItem("nomUsuari");
    let puntuacio = localStorage.getItem("puntuacioUsr");
    
    let formData = new FormData();
    formData.append('nom', nomUsr);
    formData.append('codiP', codiP);
    formData.append('puntuacio', puntuacio);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if (this.readyState === 4) {
            if(this.status == 200){
                localStorage.setItem("codiP", codiP);
                window.location.href = '/taulell';
            }else if(this.status == 400){
                alert("Aquesta partida ja existeix.");
                window.location.href = '/partida';
            }         
        }
    }

    xhr.open('POST', '/crearPartida', true);
    xhr.responseType = 'text';
    xhr.send(formData);

}

function accedirPartida(){

    let codiPartida = (document.getElementById("unir").value)*1;
    let nomUsr = localStorage.getItem("nomUsuari");
    let puntuacio = localStorage.getItem("puntuacioUsr");

    let formData = new FormData();
    formData.append('nom', nomUsr);
    formData.append('codiP', codiPartida);
    formData.append('puntuacio', puntuacio);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.status == 200){
            localStorage.setItem("codiP", codiPartida);
            window.location.href = '/taulell';
        }else if(this.status == 400){
            alert("Aquesta partida no existeix.");
            window.location.href = '/partida';
        }else if(this.status == 401){
            alert("Aquesta partida ja està plena.");
            window.location.href = '/partida';
        }
    }

    xhr.open('POST', '/accedirPartida', true);
    xhr.responseType = 'text';    
    xhr.send(formData);

}

function sortir(){
    localStorage.removeItem("nomUsuari");
    localStorage.removeItem("puntuacioUsr");
    window.location.href = '/';
}