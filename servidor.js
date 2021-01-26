const Partida = require("./Partida");
const Jugador = require("./Jugador");

var http = require("http");
var url = require("url");
var fs = require('fs');
const formidable = require('formidable');

//MongoDB
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert'); //utilitzem assercions
var ObjectId = require('mongodb').ObjectID;
const { Console } = require("console");
const { clearScreenDown } = require("readline");

//Partides
var partides = [];

function iniciar(encaminar, manegadorPeticions) {
    //Usuari
    let usuaris = new UsuariDAOImpl();
    async function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        var body = '';
        var contingut = '';
        console.log("Petició per a  " + pathname + " rebuda.");

        if(pathname == '/registrarUsuari'){   
            const form = formidable({ multiples: true });            
            form.parse(request, async(err, fields, files) => {
                response.writeHead(200, { 'content-type': 'application/json' });                
                let estat = await usuaris.desarUsuari(fields.nom,fields.puntuacio,fields.password);
                response.writeHead(estat);
                response.end();
            });
        
        
        } else if(pathname == '/iniciarSessio'){      
            const form = formidable({ multiples: true });
            
            form.parse(request, async (err, fields, files) => {
                response.writeHead(200, { 'content-type': 'application/json' });
                let r = await usuaris.llegirUsuari(fields.nom, fields.password);
                if(r == -1 || r == undefined){
                    response.writeHead(400);
                    response.end();
                } else{
                    response.writeHead(200);
                    response.write(r.toString());
                    response.end();
                }
            });
        }else if(pathname == '/crearPartida'){
            const form = formidable({ multiples: true });
            form.parse(request, (err, fields, files) => {

                if(partides.find(element => element.codiPartida == fields.codiP) == undefined){
                    let j = new Jugador(fields.nom, fields.puntuacio*1, null);
                    let p = new Partida(fields.codiP);
                    p.jugador1 = j;
                    partides.push(p);
                    response.writeHead(200);
                    response.end();
                }else{
                    response.writeHead(400);
                    response.end();
                }
            });

        }else if(pathname == '/accedirPartida'){
            const form = formidable({ multiples: true });
            form.parse(request, (err, fields, files) => {

                partides.forEach(element => {
                    if(element.codiPartida == fields.codiP){
                        let j = new Jugador(fields.nom, fields.puntuacio, null);
                        if(element.jugador2 == null && element.jugador1.nom != j.nom){
                            element.jugador2 = j;
                            response.writeHead(200);
                            response.end();
                        }else{
                            if(element.jugador1.nom == j.nom){
                                response.writeHead(200);
                                response.end();
                            }else if(element.jugador2.nom == j.nom){
                                response.writeHead(200);
                                response.end();
                            }
                        }
                    }
                });
            });
        }else if(pathname == '/obtenirFitxes'){
            const form = formidable({ multiples: true });
            form.parse(request, (err, fields, files) => {

                let nom = fields.nom;
                let codiP = fields.codi;

                partides.forEach(element => {
                    if(element.codiPartida == codiP){

                        response.writeHead(200);
                        response.write(JSON.stringify(element.repartirFitxes(nom)));
                        response.end();
                        
                    }
                });
            });
        }else if(pathname == '/passar'){
            const form = formidable({ multiples: true });
            form.parse(request, (err, fields, files) => {

                let nom = fields.nom;
                let codiP = fields.codi;

                partides.forEach(element => {
                    if(element.codiPartida == codiP){
                        element.robarFitxa(nom);
                    }
                    response.writeHead(200);
                    response.end();
                });
            });

        }else if(pathname == '/tirada'){
            
            const form = formidable({ multiples: true });
            form.parse(request, (err, fields, files) => {

                let nom = fields.nom;
                let codiP = fields.codi;
                let f = new Array (parseInt(fields.fitxa.charAt(1)), parseInt(fields.fitxa.charAt(3)));

                partides.forEach(element => {
                    if(element.codiPartida == codiP){
                        if(element.torn != null){
                            element.tirar(nom,f);
                        }
                    }
                    response.writeHead(200);
                    response.end();
                });
            });                           

        }else if(pathname == '/recarregarTaulell'){
            const form = formidable({ multiples: true });
            form.parse(request, (err, fields, files) => {

                let codiP = fields.codi;

                partides.forEach(element => {
                    if(element.codiPartida == codiP){
                        if(element.jugada){
                            response.write(JSON.stringify({taulell: element.jugada}));
                            response.end();
                        }
                    }
                });
            });
        }else if(pathname == '/recarregarFitxes'){
            const form = formidable({ multiples: true });
            form.parse(request, (err, fields, files) => {

                let nom = fields.nom;
                let codiP = fields.codi;

                partides.forEach(element => {
                    if(element.codiPartida == codiP){
                        if(element.jugador1 && element.jugador2){
                            if(nom == element.jugador1.nom){
                                response.write(JSON.stringify({fitxes: element.jugador1.fitxes}));
                                response.end();
                            }else if(nom == element.jugador2.nom){
                                response.write(JSON.stringify({fitxes: element.jugador2.fitxes}));
                                response.end();
                            }
                        }
                    }
                });
            });
        }else if(pathname == '/torn'){
            const form = formidable({ multiples: true });
            form.parse(request, (err, fields, files) => {

                let codiP = fields.codi;

                partides.forEach(element => {
                    if(element.codiPartida == codiP){
                            if(element.jugador1 && element.jugador2){
                            if(element.torn==1){
                                response.write(JSON.stringify({nom: element.jugador1.nom}));
                                response.end();
                            }else{
                                response.write(JSON.stringify({nom: element.jugador2.nom}));
                                response.end();
                            }
                        }
                    }
                });
            });
        }else if(pathname == '/guanyador'){
            const form = formidable({ multiples: true });
            form.parse(request, (err, fields, files) => {

                let codiP = fields.codi;

                partides.forEach(element => {
                    if(element.codiPartida == codiP){
                        response.write(JSON.stringify({nom: element.guanyador}));
                        response.end();
                    }
                });
            });
        }else if(pathname == '/actualitzarPunts'){
            const form = formidable({ multiples: true });
            form.parse(request, (err, fields, files) => {

                let codiP = fields.codi;
                let nom = fields.nom;

                partides.forEach(element => {
                    if(element.codiPartida == codiP){
                        if(element.jugador1.nom==nom){
                            usuaris.actualitzarPuntuacio(element.jugador1.nom, element.jugador1.puntuacio);
                            response.write(JSON.stringify({puntuacio: element.jugador1.puntuacio}));
                            response.end();
                        }else{
                            usuaris.actualitzarPuntuacio(element.jugador2.nom, element.jugador2.puntuacio);
                            response.write(JSON.stringify({puntuacio: element.jugador2.puntuacio}));
                            response.end();
                        }
                    }
                });
            });
        }else if (request.method === 'POST') {
            request.on('data', chunk => {
                body += chunk.toString();
            });
            request.on('end', () => {
                contingut = encaminar(manegadorPeticions, pathname, response,body);
            });
            response.write(contingut);
            response.end();        
        }else{
            contingut = encaminar(manegadorPeticions, pathname, response);
            response.write(contingut);
            response.end();
        }
    }

    http.createServer(onRequest).listen(8888);
    console.log("Servidor iniciat.");
}

class UsuariDAO {
	desarUsuari(nomU, puntuacioU, contrasenyaU){};
	llegirUsuari(nomU, contrasenyaU){};
	actualitzarPuntuacio(nomU, puntuacioU){};
}

class UsuariDAOImpl extends UsuariDAO {

	async desarUsuari(nomU, puntuacioU, contrasenyaU){
        var ruta = 'mongodb://localhost:27017/domino';
        const client = await MongoClient.connect(ruta);
        const datab = client.db("domino");
        const taula = await datab.collection("usuaris").find({nom: nomU}).toArray();
        if(taula.length == 0){
            let j = new Jugador(nomU,puntuacioU*1,contrasenyaU);
            datab.collection('usuaris').insertOne({
                "nom": j.nom,
                "contrasenya": j.contrasenya,
                "puntuacio": j.puntuacio
            });
            return 200;
        }else{
            return 400;
        } 
    };

	async llegirUsuari(nomU, contrasenyaU){
        var ruta = 'mongodb://localhost:27017/domino';
        let r = -1;
        const client = await MongoClient.connect(ruta);
        const datab = client.db("domino");
        const taula = await datab.collection("usuaris").find({nom: nomU, contrasenya: contrasenyaU}).toArray();
        if (taula[0] != null) {
            r = taula[0].puntuacio;            
        }
        return r;
    };

	async actualitzarPuntuacio(nomU, puntuacioU){
        var ruta = 'mongodb://localhost:27017/domino';
        const client = await MongoClient.connect(ruta);
        const datab = client.db("domino");
        datab.collection("usuaris").updateOne({nom: nomU}, {$set: {"puntuacio": puntuacioU*1}});
    };

}

exports.iniciar = iniciar;