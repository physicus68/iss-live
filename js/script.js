
var tle_L1 = "";
var tle_L2 = "";

// on charge initialement la derniere version des TLE de l'ISS si elles sont plus agees de 2h
// pour eviter d'etre bloque par un refus de connexion de celestrak si on exede le quota

window.onload = initTLE();

function initTLE() {

    // il n'y a pas de valeurs de TLE
    if (!localStorage.getItem('date_maj')) {
        loadDoc();
    }

    // on vérifie l'age des valeurs ( > 2 heures? )
    date = parseInt(localStorage.getItem('date_maj'));
    if ((Date.now() - date) > 3600 * 2 * 1000) {
        console.log('TLE stockées trop anciennes, téléchargement des données ...');
        loadDoc();        
    }

    // on charge les TLE
    console.log('récupération locale des TLE');
    tle_L1 = localStorage.getItem('tleL1');
    tle_L2 = localStorage.getItem('tleL2');

    // on démarre l'animation
    positionNow();

}

// connexion sur Celestrak pour récupérer les dernières TLE à jour de l'ISS
function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (xhttp.status = 200) {
            var lignes = this.responseText.split('\r\n');
            var i_max = lignes.length - 2;
            for (let i = 0; i < i_max; i++) {
                // 25544U on cherchee l'ISS
                if (lignes[i].startsWith('ISS (ZARYA) ')) {
                    console.log(lignes[i]);
                    i++;
                    tle_L1 = lignes[i];
                    console.log();

                    i++
                    tle_L2 = lignes[i]
                    console.log(lignes[i]);
                }
            }
            // local storage des TLE !
            console.log('mise à jour des TLE ... ');
            localStorage.setItem('date_maj', Date.now().toString());
            localStorage.setItem('tleL1', tle_L1);
            localStorage.setItem('tleL2', tle_L2);
        }

    }
    xhttp.open("GET", "https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=tle");
    xhttp.send();
}

// on calcule toutes les 0.2 s la position de l'ISS et on met à jour le modèle
// Voir iss-aframe.js
function positionNow() {
    const satrec = satellite.twoline2satrec(tle_L1, tle_L2);
    const date = new Date();
    const positionAndVelocity = satellite.propagate(satrec, date);
    const gmst = satellite.gstime(date);
    const position = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

    positionISS.LON = satellite.degreesLong( position.longitude );
    positionISS.LAT = satellite.degreesLat( position.latitude );

    document.getElementById("lat").innerHTML =  positionISS.LAT.toFixed(2) + " °";
    document.getElementById("lon").innerHTML =  positionISS.LON.toFixed(2) + " °";

    window.setTimeout(positionNow, 200);
}

