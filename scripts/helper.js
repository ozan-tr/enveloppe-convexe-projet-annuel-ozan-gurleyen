const canvas = document.getElementById('output');
const ctx = canvas.getContext('2d');

var zoneType = "kare";
var safeZone = 500;
var pointsNum = 100;
var points = [];

// Fonction pour générer des points aléatoires en fonction du type de zone choisi
function generatePoints() {
    points = [];
    if (zoneType == "kare") {
        for (var i = 0; i < pointsNum; i++) {
            points.push({
                x: Math.random() * safeZone,
                y: Math.random() * safeZone
            });
        }
    } else if (zoneType == "daire") {
        for (var i = 0; i < pointsNum; i++) {
            var angle = Math.random() * 360;
            var radius = Math.random() * safeZone / 2;
            points.push({
                x: safeZone / 2 + Math.cos(angle) * radius,
                y: safeZone / 2 + Math.sin(angle) * radius
            });
        }
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

// Fonction pour mettre à jour le canevas avec la zone sécurisée, les points aléatoires et l'enveloppe convexe
function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //drawSafeZone();
    drawPoints();
    giftWrappingConvexHull();
}
