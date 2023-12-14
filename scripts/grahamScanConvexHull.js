var grahamScanLoop = null;

// Fonctions pour l'algorithme de l'enveloppe convexe
function grahamScanStepByStep() {
  clearInterval(grahamScanLoop);

  // Faire une copie des points pour ne pas modifier l'original
  const pointsCopy = [...points];


  function drawConvexHull(convexHull) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // dessiner l'enveloppe convexe
    ctx.beginPath();
    ctx.moveTo(convexHull[0].x + canvas.width / 2 - safeZone / 2, convexHull[0].y + canvas.height / 2 - safeZone / 2);
    for (let i = 1; i < convexHull.length - 1; i++) {
      ctx.lineTo(
        convexHull[i].x + canvas.width / 2 - safeZone / 2,
        convexHull[i].y + canvas.height / 2 - safeZone / 2
      );
    }
    ctx.strokeStyle = "black";
    ctx.stroke()

    ctx.beginPath();
    ctx.moveTo(convexHull[convexHull.length - 2].x + canvas.width / 2 - safeZone / 2, convexHull[convexHull.length - 2].y + canvas.height / 2 - safeZone / 2);
    ctx.lineTo(
      convexHull[convexHull.length - 1].x + canvas.width / 2 - safeZone / 2,
      convexHull[convexHull.length - 1].y + canvas.height / 2 - safeZone / 2
    );
    ctx.strokeStyle = "red";
    ctx.stroke();

    drawPoints();
  }


  function finalizeDrawing(convexHull) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // dessiner l'enveloppe convexe
    ctx.beginPath();
    ctx.moveTo(convexHull[0].x + canvas.width / 2 - safeZone / 2, convexHull[0].y + canvas.height / 2 - safeZone / 2);
    for (let i = 1; i < convexHull.length; i++) {
      ctx.lineTo(
        convexHull[i].x + canvas.width / 2 - safeZone / 2,
        convexHull[i].y + canvas.height / 2 - safeZone / 2
      );
    }
    ctx.strokeStyle = "black";
    ctx.closePath()
    ctx.stroke()

    drawPoints();
  }

  // Trouver le point avec la coordonnée y la plus basse (et le plus à gauche en cas d'égalité)
  let startPoint = pointsCopy[0];
  for (let i = 1; i < pointsCopy.length; i++) {
    if (pointsCopy[i].y < startPoint.y || (pointsCopy[i].y === startPoint.y && pointsCopy[i].x < startPoint.x)) {
      startPoint = pointsCopy[i];
    }
  }


  // Trier les points en fonction de l'angle polaire par rapport au point de départ

  pointsCopy.sort((a, b) => {
    const angleA = Math.atan2(a.y - startPoint.y, a.x - startPoint.x);
    const angleB = Math.atan2(b.y - startPoint.y, b.x - startPoint.x);

    return angleA - angleB;
  });


  const convexHull = [startPoint, pointsCopy[0], pointsCopy[1]];
  drawConvexHull(convexHull);

  // Algorithme de l'enveloppe convexe

  let i = 2;

  grahamScanLoop = setInterval(async () => {
    if (i == pointsCopy.length) {
      finalizeDrawing(convexHull);
      clearInterval(grahamScanLoop);
      return;
    } else {
      while (
        convexHull.length >= 2 &&
        orientation(
          convexHull[convexHull.length - 2],
          convexHull[convexHull.length - 1],
          pointsCopy[i]
        ) >= 0
      ) {
        convexHull.pop();
      }
      convexHull.push(pointsCopy[i]);

      drawConvexHull(convexHull);
    }

    i++
  }, 100);

}

// Fonction pour mettre en œuvre l'algorithme de l'enveloppe convexe et dessiner l'enveloppe
function grahamScan() {

  clearInterval(grahamScanLoop);

  var startTime = performance.now();

  // Trouver le point avec la coordonnée y la plus basse (et le plus à gauche en cas d'égalité)
  let startPoint = points[0];
  for (let i = 1; i < points.length; i++) {
    if (points[i].y < startPoint.y || (points[i].y === startPoint.y && points[i].x < startPoint.x)) {
      startPoint = points[i];
    }
  }

  // Trier les points en fonction de l'angle polaire par rapport au point de départ
  points.sort((a, b) => {
    const angleA = Math.atan2(a.y - startPoint.y, a.x - startPoint.x);
    const angleB = Math.atan2(b.y - startPoint.y, b.x - startPoint.x);

    return angleA - angleB;
  });

  // Initialiser l'enveloppe convexe avec le point de départ et les deux premiers points triés
  const convexHull = [startPoint, points[0], points[1]];

  // Algorithme de l'enveloppe convexe
  for (let i = 2; i < points.length; i++) {
    while (
      convexHull.length >= 2 &&
      orientation(
      convexHull[convexHull.length - 2],
      convexHull[convexHull.length - 1],
      points[i]) >= 0
    ) 
    {
      convexHull.pop();
    }
    convexHull.push(points[i]);
    
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dessiner l'enveloppe convexe
  ctx.beginPath();
  ctx.moveTo(convexHull[0].x + canvas.width / 2 - safeZone / 2, convexHull[0].y + canvas.height / 2 - safeZone / 2);
  for (let i = 1; i < convexHull.length; i++) {
    ctx.lineTo(
      convexHull[i].x + canvas.width / 2 - safeZone / 2,
      convexHull[i].y + canvas.height / 2 - safeZone / 2
    );
  }
  ctx.strokeStyle = "black";
  ctx.closePath();
  ctx.stroke();

  drawPoints();

  var endTime = performance.now();

  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "black";
  ctx.fillText("Temps d'exécution: " + (endTime - startTime).toFixed(2) + " ms", canvas.width/2, 25);

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





