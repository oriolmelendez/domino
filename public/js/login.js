function comprovarDades(){

    let nomUsr  = document.getElementById("usuari").value;
    let pwdUsr  = document.getElementById("password").value;
    
    let formData = new FormData();
    formData.append('nom', nomUsr);
    formData.append('password', pwdUsr);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if (this.readyState === 4) {
            if(this.status == 200){
                localStorage.setItem("nomUsuari",nomUsr);
                localStorage.setItem("puntuacioUsr",this.response);
                window.location.href = '/partida';
            }else if(this.status == 400){
                alert("L'usuari no està registrat. Si us plau registra'l");
                window.location.href = '/registre';
            }
           
        }
    }

    xhr.open('POST', '/iniciarSessio', true);
    xhr.responseType = 'text';
    xhr.send(formData);

}