const canvas = document.getElementById('output');
const ctx = canvas.getContext('2d');

var zoneType = "kare";
var algorithm = "grahamScan";
var simulationType = "stepByStep";
var safeZone = 500;
var pointsNum = 100;
var points = [];
// Fonction pour générer des points aléatoires en fonction du type de zone choisi
function generatePoints() {
    points = [];  // Supprime les anciens points
    
    // Si la zone est de type "kare"
    if (zoneType == "kare") {
        for (var pointIndex = 0; pointIndex < pointsNum; pointIndex++) {
            points.push({
                x: Math.random() * safeZone,
                y: Math.random() * safeZone
            });
        }
    } else if (zoneType == "daire") {
        // Si la zone est de type "daire"
        generateCircularPoints(pointsNum,safeZone / 2)
    } else if (zoneType == "hotspot") {
        // Si la zone est de type "hotspot"
        const hotspotNum = Math.ceil(pointsNum / 250);     // Nombre de faux centres
        const numPerHotspot = pointsNum / hotspotNum;     // Nombre de points par faux centre

        for (var hotspotIndex = 0; hotspotIndex < hotspotNum; hotspotIndex++) {
            var hotspotAngle = Math.random() * 360;                                // Angle aléatoire entre 0 et 360 degrés
            var hotspotRadius = Math.random() * safeZone / 2;                      // Rayon aléatoire entre 0 et la moitié de la zone sécurisée
            var hotspotX = safeZone / 2 + Math.cos(hotspotAngle) * hotspotRadius;  // x = centre + cos(angle) * rayon
            var hotspotY = safeZone / 2 + Math.sin(hotspotAngle) * hotspotRadius;  // y = centre + sin(angle) * rayon

            // Générer des points aléatoires autour du faux centre

            generateCircularPoints(numPerHotspot, (safeZone - hotspotRadius) / 4, {x: hotspotX, y: hotspotY})
        }
    }
}

safeZone / 2

function generateCircularPoints(amount, maxRadius, center= {x: safeZone / 2, y: safeZone / 2}) {
    for (var pointIndex = 0; pointIndex < amount; pointIndex++) {
        var angle = Math.random() * 360;                 // Angle aléatoire entre 0 et 360 degrés
        var radius = Math.random() * maxRadius;       // Rayon aléatoire entre 0 et la moitié de la zone sécurisée
        points.push({
            x: center.x + Math.cos(angle) * radius,  // x = centre + cos(angle) * rayon
            y: center.y + Math.sin(angle) * radius  // y = centre + sin(angle) * rayon
        });
    }
}

// Fonction pour dessiner la zone sécurisée (rectangle ou cercle) sur le canevas
function drawSafeZone() {
    ctx.strokeStyle = "black";
    ctx.setLineDash([5, 15]);
    if (zoneType == "kare") {
        ctx.strokeRect(canvas.width / 2 - safeZone / 2, canvas.height / 2 - safeZone / 2, safeZone, safeZone);
    } else if (zoneType == "daire") {
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, safeZone / 2, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// Fonction pour dessiner des points aléatoires sur le canevas
function drawPoints() {
    const pointSize = safeZone / pointsNum
    ctx.fillStyle = "red";
    points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(canvas.width / 2 - safeZone / 2 + point.x, canvas.height / 2 - safeZone / 2 + point.y, pointSize, 0, Math.PI * 2);
        ctx.fill()
    })
}


// Fonction pour mettre à jour le canevas avec la zone sécurisée, les points aléatoires et l'enveloppe convexe
function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPoints();
}

document.addEventListener("keydown", function (event) {
    if(event.key == "Enter"){
        startAlgorithm();
    }else if(event.key == " "){
        takeSnapshot();
    }else if(event.key == "r"){
        generatePoints();
        updateCanvas();
    }
})


function takeSnapshot(){
    var dataURL = canvas.toDataURL();
    var link = document.createElement('a');
    link.download = algorithm + "_" + simulationType + "_" + zoneType + "_" + safeZone + "_" + pointsNum + ".jpg";
    link.href = dataURL
    link.click();
}

// Fonction pour déterminer l'orientation de trois points par rapport à un autre
// Retourne 0 si les points sont colinéaires, 1 si le virage est dans le sens des aiguilles d'une montre,
// et -1 si le virage est dans le sens contraire des aiguilles d'une montre.
function orientation(p, q, r) {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  
    // Si la valeur est proche de zéro, les points sont considérés comme colinéaires
    if (Math.abs(val) < 1e-6) return 0;
  
    // Si la valeur est positive, le virage est dans le sens des aiguilles d'une montre
    return val > 0 ? 1 : -1;
  }
