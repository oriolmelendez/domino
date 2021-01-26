function enviarDades(){

    let nomUsr  = document.getElementById("usuari").value;
    let pwdUsr  = document.getElementById("password").value;
    let puntuacioUsr  = document.getElementById("puntuacio").value;

    let formData = new FormData();
    formData.append('nom', nomUsr);
    formData.append('password', pwdUsr);
    formData.append('puntuacio', puntuacioUsr);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if (this.readyState === 4) {
            if(this.status == 200){
                alert('Usuari afegit correctament');
                window.location.href = '/';
            }else if(this.status == 400){
                alert("L'usuari ja està registrat. Si us plau inicia sessió");
                window.location.href = '/';
            }
            
        }
    }

    xhr.open('POST', '/registrarUsuari', true);
    xhr.responseType = 'text';
    xhr.send(formData);

}