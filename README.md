# Trouver l'enveloppe convexe

*Projet annuel - Can Ozan Gurleyen*

## Information

[Lien vers la project](https://ozan-tr.github.io/enveloppe-convexe-projet-annuel-ozan-gurleyen/)

### Raccourcis

**Space** - Prendre une capture d'écran

**Enter** - Démarrer la simulation

**R** - Régénérer les points

## Introduction

### Graham Scan

L'algorithme de Graham's Scan est utilisé pour calculer l'enveloppe convexe d'un ensemble de points dans le plan. Il a été proposé par Ronald Graham en 1972. L'idée principale de l'algorithme est de choisir un point pivot ayant la plus basse coordonnée en y (et le plus à gauche en cas d'égalité). Ensuite, les autres points sont triés en fonction de leurs angles polaires par rapport au pivot. En traitant ensuite ces points triés, l'algorithme construit progressivement l'enveloppe convexe, qui est le plus petit polygone convexe englobant tous les points donnés.

#### Pseudo-code

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

#### Examples du projet

![grahamScan_instant_daire_550_100](https://github.com/ozan-tr/enveloppe-convexe-projet-annuel-ozan-gurleyen/assets/58356769/497e9baa-51eb-4d3e-a4a8-1931a0a6178d)
![grahamScan_instant_daire_550_500](https://github.com/ozan-tr/enveloppe-convexe-projet-annuel-ozan-gurleyen/assets/58356769/87c56b3c-9f8b-4400-9685-562add27a86e)
![grahamScan_instant_kare_500_100](https://github.com/ozan-tr/enveloppe-convexe-projet-annuel-ozan-gurleyen/assets/58356769/dbfed429-92ab-4f08-9244-0e594997fe0a)
![grahamScan_instant_kare_500_500](https://github.com/ozan-tr/enveloppe-convexe-projet-annuel-ozan-gurleyen/assets/58356769/f21b7949-ac59-4ce5-b1bd-cd78697283b1)
