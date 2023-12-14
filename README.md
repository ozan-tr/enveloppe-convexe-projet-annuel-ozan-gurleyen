# Trouver l'enveloppe convexe

[Lien vers la project](https://ozan-tr.github.io/enveloppe-convexe-projet-annuel-ozan-gurleyen/)

## Graham Scan

L'algorithme de Graham's Scan est utilisé pour calculer l'enveloppe convexe d'un ensemble de points dans le plan. Il a été proposé par Ronald Graham en 1972. L'idée principale de l'algorithme est de choisir un point pivot ayant la plus basse coordonnée en y (et le plus à gauche en cas d'égalité). Ensuite, les autres points sont triés en fonction de leurs angles polaires par rapport au pivot. En traitant ensuite ces points triés, l'algorithme construit progressivement l'enveloppe convexe, qui est le plus petit polygone convexe englobant tous les points donnés.

```arduino
fonction grahamScan(points) :
    // Trouver le point pivot
    startPoint = trouverPointPivot(points)

    // Trier les points en fonction des angles polaires
    pointsTriés = trierPointsParAngle(points, startPoint)

    // Initialiser l'enveloppe convexe avec les deux premiers points
    enveloppeConvexe = [pointsTriés[0], pointsTriés[1]]

    // Parcourir les points triés pour construire l'enveloppe convexe
    pour chaque point dans pointsTriés[2:] :
        tant que l'orientation(enveloppeConvexe[-2], enveloppeConvexe[-1], point) n'est pas dans le sens anti-horaire :
            enlever le dernier point de l'enveloppeConvexe
        ajouter le point à l'enveloppeConvexe

    retourner enveloppeConvexe
```
