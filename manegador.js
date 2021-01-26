var fs = require('fs');

function login(){
    let loginfile = fs.readFileSync('public/index.html');
    return loginfile;
}

function registre(){
    let rgs = fs.readFileSync('public/registre.html');
    return rgs;
}

function partida(){
    let partida = fs.readFileSync('public/partida.html');
    return partida;
}

function perfil(){
    let perfil = fs.readFileSync('public/perfil.html');
    return perfil;
}

function taulell(){
    let taulell = fs.readFileSync('public/taulell.html');
    return taulell;
}

function registreJS(){
    let rgsJS = fs.readFileSync('public/js/registre.js');
    return rgsJS;
}

function loginJS(){
    let lgJS = fs.readFileSync('public/js/login.js');
    return lgJS;
}

function partidaJS(){
    let pJS = fs.readFileSync('public/js/partida.js');
    return pJS;
}

function perfilJS(){
    let perfilJS = fs.readFileSync('public/js/perfil.js');
    return perfilJS;
}

function taulellJS(){
    let taulellJS = fs.readFileSync('public/js/taulell.js');
    return taulellJS;
}

function css(){
    let csslogin = fs.readFileSync('public/css/style.css');
    return csslogin;
}

function cssP(){
    let csspartida = fs.readFileSync('public/css/stylePartida.css');
    return csspartida;
}

function cssPerfil(){
    let cssperfil = fs.readFileSync('public/css/stylePerfil.css');
    return cssperfil;
}

function cssTaulell(){
    let csstaulell = fs.readFileSync('public/css/styleTaulell.css');
    return csstaulell;
}

function loginimg(){
    let logimg = fs.readFileSync('public/img/domino.png');
    return logimg;
}

function fitxaMenu(){
    let fitxa1 = fs.readFileSync('public/img/1_1.png');
    return fitxa1;
}

function fitxaMenu2(){
    let fitxa1 = fs.readFileSync('public/img/1_2.png');
    return fitxa1;
}

function fitxaMenu3(){
    let fitxa3 = fs.readFileSync('public/img/1_3.png');
    return fitxa3;
}

function avatar(){
    let avatar = Math.floor(Math.random() * 3) + 1;

    switch(avatar){
        case 1:
            let img1 = fs.readFileSync('public/img/avatar1.png');
            return img1;
        
        case 2:
            let img2 = fs.readFileSync('public/img/avatar2.png');
            return img2;

        case 3:
            let img3 = fs.readFileSync('public/img/avatar3.png');
            return img3;
    }
}

function f00(){
    let fitxa00 = fs.readFileSync('public/img/fitxes/0_0.png');
    return fitxa00;
}

function f01(){
    let fitxa01 = fs.readFileSync('public/img/fitxes/0_1.png');
    return fitxa01;
}

function f02(){
    let fitxa02 = fs.readFileSync('public/img/fitxes/0_2.png');
    return fitxa02;
}

function f03(){
    let fitxa03 = fs.readFileSync('public/img/fitxes/0_3.png');
    return fitxa03;
}

function f04(){
    let fitxa04 = fs.readFileSync('public/img/fitxes/0_4.png');
    return fitxa04;
}

function f05(){
    let fitxa05 = fs.readFileSync('public/img/fitxes/0_5.png');
    return fitxa05;
}

function f06(){
    let fitxa06 = fs.readFileSync('public/img/fitxes/0_6.png');
    return fitxa06;
}

function f11(){
    let fitxa11 = fs.readFileSync('public/img/fitxes/1_1.png');
    return fitxa11;
}

function f12(){
    let fitxa12 = fs.readFileSync('public/img/fitxes/1_2.png');
    return fitxa12;
}

function f13(){
    let fitxa13 = fs.readFileSync('public/img/fitxes/1_3.png');
    return fitxa13;
}

function f14(){
    let fitxa14 = fs.readFileSync('public/img/fitxes/1_4.png');
    return fitxa14;
}

function f15(){
    let fitxa15 = fs.readFileSync('public/img/fitxes/1_5.png');
    return fitxa15;
}

function f16(){
    let fitxa16 = fs.readFileSync('public/img/fitxes/1_6.png');
    return fitxa16;
}

function f22(){
    let fitxa22 = fs.readFileSync('public/img/fitxes/2_2.png');
    return fitxa22;
}

function f23(){
    let fitxa23 = fs.readFileSync('public/img/fitxes/2_3.png');
    return fitxa23;
}

function f24(){
    let fitxa24 = fs.readFileSync('public/img/fitxes/2_4.png');
    return fitxa24;
}

function f25(){
    let fitxa25 = fs.readFileSync('public/img/fitxes/2_5.png');
    return fitxa25;
}

function f26(){
    let fitxa26 = fs.readFileSync('public/img/fitxes/2_6.png');
    return fitxa26;
}

function f33(){
    let fitxa33 = fs.readFileSync('public/img/fitxes/3_3.png');
    return fitxa33;
}

function f34(){
    let fitxa34 = fs.readFileSync('public/img/fitxes/3_4.png');
    return fitxa34;
}

function f35(){
    let fitxa35 = fs.readFileSync('public/img/fitxes/3_5.png');
    return fitxa35;
}

function f36(){
    let fitxa36 = fs.readFileSync('public/img/fitxes/3_6.png');
    return fitxa36;
}

function f44(){
    let fitxa44 = fs.readFileSync('public/img/fitxes/4_4.png');
    return fitxa44;
}

function f45(){
    let fitxa45 = fs.readFileSync('public/img/fitxes/4_5.png');
    return fitxa45;
}

function f46(){
    let fitxa46 = fs.readFileSync('public/img/fitxes/4_6.png');
    return fitxa46;
}

function f55(){
    let fitxa55 = fs.readFileSync('public/img/fitxes/5_5.png');
    return fitxa55;
}

function f56(){
    let fitxa56 = fs.readFileSync('public/img/fitxes/5_6.png');
    return fitxa56;
}

function f66(){
    let fitxa66 = fs.readFileSync('public/img/fitxes/6_6.png');
    return fitxa66;
}

exports.login = login;
exports.registre = registre;
exports.perfil = perfil;
exports.css = css;
exports.loginimg = loginimg;
exports.registreJS = registreJS;
exports.loginJS = loginJS;
exports.partidaJS = partidaJS;
exports.perfilJS = perfilJS;
exports.cssP = cssP;
exports.cssPerfil = cssPerfil;
exports.partida = partida;
exports.fitxaMenu = fitxaMenu;
exports.fitxaMenu2 = fitxaMenu2;
exports.fitxaMenu3 = fitxaMenu3;
exports.avatar = avatar;
exports.cssTaulell = cssTaulell;
exports.taulellJS = taulellJS;
exports.taulell = taulell;
exports.f00 = f00;
exports.f01 = f01;
exports.f02 = f02;
exports.f03 = f03;
exports.f04 = f04;
exports.f05 = f05;
exports.f06 = f06;
exports.f11 = f11;
exports.f12 = f12;
exports.f13 = f13;
exports.f14 = f14;
exports.f15 = f15;
exports.f16 = f16;
exports.f22 = f22;
exports.f23 = f23;
exports.f24 = f24;
exports.f25 = f25;
exports.f26 = f26;
exports.f33 = f33;
exports.f34 = f34;
exports.f35 = f35;
exports.f36 = f36;
exports.f44 = f44;
exports.f45 = f45;
exports.f46 = f46;
exports.f55 = f55;
exports.f56 = f56;
exports.f66 = f66;