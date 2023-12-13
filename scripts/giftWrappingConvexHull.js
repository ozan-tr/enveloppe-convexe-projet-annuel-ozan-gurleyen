// Fonction pour mettre en œuvre l'algorithme de l'enveloppe convexe et dessiner l'enveloppe
function giftWrappingConvexHull() {

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
    console.log(convexHull);
  }


  // Dessiner l'enveloppe convexe
  ctx.beginPath();
  ctx.moveTo(convexHull[0].x + canvas.width / 2 - safeZone / 2, convexHull[0].y + canvas.height / 2 - safeZone / 2);
  for (let i = 1; i < convexHull.length; i++) {
    ctx.lineTo(
      convexHull[i].x + canvas.width / 2 - safeZone / 2,
      convexHull[i].y + canvas.height / 2 - safeZone / 2
    );
  }
  ctx.closePath();
  ctx.stroke();
}


