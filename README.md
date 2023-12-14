# Trouver l'enveloppe convexe

*Projet annuel - Can Ozan Gurleyen*

[Lien vers la project](https://ozan-tr.github.io/enveloppe-convexe-projet-annuel-ozan-gurleyen/)

## Table des matières

- [Trouver l'enveloppe convexe](#trouver-lenveloppe-convexe)
  - [Table des matières](#table-des-matières)
  - [Raccourcis](#raccourcis)
  - [Introduction](#introduction)
    - [Graham Scan](#graham-scan)
      - [Pseudo-code](#pseudo-code)
      - [Complexité](#complexité)
    - [L'aire et le périmètre de l'enveloppe convexe](#laire-et-le-périmètre-de-lenveloppe-convexe)
      - [L'aire](#laire)
      - [Le périmètre](#le-périmètre)
  - [Langage](#langage)
  - [Examples du projet](#examples-du-projet)
  - [Sources](#sources)

### Raccourcis

**Space** - Prendre une capture d'écran

**Enter** - Démarrer la simulation

**R** - Régénérer les points

## Introduction

### Graham Scan

L'algorithme de [Graham's Scan](#sources) est utilisé pour calculer l'enveloppe convexe d'un ensemble de points dans le plan. Il a été proposé par Ronald Graham en 1972. L'idée principale de l'algorithme est de choisir un point pivot ayant la plus basse coordonnée en y (et le plus à gauche en cas d'égalité). Ensuite, les autres points sont triés en fonction de leurs angles polaires par rapport au pivot. En traitant ensuite ces points triés, l'algorithme construit progressivement l'enveloppe convexe, qui est le plus petit polygone convexe englobant tous les points donnés.

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

#### Complexité

La complexité de l'algorithme de Graham's Scan est O(n log n), où n est le nombre de points. La complexité de l'algorithme est dominée par le tri des points en fonction de leurs angles polaires par rapport au point pivot. Le tri peut être effectué en O(n log n) en utilisant un algorithme de tri efficace tel que le tri rapide. Le reste de l'algorithme est linéaire, car il ne fait que parcourir les points triés.

### L'aire et le périmètre de l'enveloppe convexe

Pour voir l'aire et la perimetre d'un envelope convexe il faut selectionner l'option "Instantané" dans le menu de type de simulation.

#### L'aire

L'aire d'un polygone peut être calculée en utilisant la formule suivante :

$$
A = \frac{1}{2} \sum_{i=0}^{n-1} (x_i y_{i+1} - x_{i+1} y_i)
$$

Implementé en JavaScript :

```js
  var area = convexHull.reduce((acc, point, index, array) => {
    if (index == array.length - 1) return acc + (point.x * array[0].y - point.y * array[0].x);
    return acc + (point.x * array[index + 1].y - point.y * array[index + 1].x);
  }, 0);
```

(Le résultat est divisé par 2 car c'est la somme des aires des triangles formés par les points du polygone, et c'est formule donne les aires des carrés formés par les points du polygone)

#### Le périmètre

Le périmètre d'un polygone peut être calculé en utilisant la formule suivante :

$$
P = \sum_{i=0}^{n-1} \sqrt{(x_{i+1} - x_i)^2 + (y_{i+1} - y_i)^2}
$$

Implementé en JavaScript :

```js
var perimeterLength = convexHull.reduce((acc, point, index, array) => {
    if (index == array.length - 1) return acc + distance(point, array[0]);
    return acc + distance(point, array[index + 1]);
  }, 0);

function distance(point1, point2) {  // Pythagorean theorem
    return Math.sqrt(Math.pow(point2.x - point1.x,2) + Math.pow(point2.y - point1.y, 2));
}
```

## Langage

Le langage utilisé pour ce projet est JavaScript.

## Examples du projet

<details>
    <summary>Cliquez pour agrandir</summary>
    
![grahamScan_instant_daire_550_100](https://github.com/ozan-tr/enveloppe-convexe-projet-annuel-ozan-gurleyen/assets/58356769/497e9baa-51eb-4d3e-a4a8-1931a0a6178d)
![grahamScan_instant_daire_550_500](https://github.com/ozan-tr/enveloppe-convexe-projet-annuel-ozan-gurleyen/assets/58356769/87c56b3c-9f8b-4400-9685-562add27a86e)
![grahamScan_instant_kare_500_100](https://github.com/ozan-tr/enveloppe-convexe-projet-annuel-ozan-gurleyen/assets/58356769/dbfed429-92ab-4f08-9244-0e594997fe0a)
![grahamScan_instant_kare_500_500](https://github.com/ozan-tr/enveloppe-convexe-projet-annuel-ozan-gurleyen/assets/58356769/f21b7949-ac59-4ce5-b1bd-cd78697283b1)
    
</details>

## Sources

- [Graham Scan](https://en.wikipedia.org/wiki/Graham_scan)
- [Convex Hull](https://en.wikipedia.org/wiki/Convex_hull)
- [L'aire d'un polygone](https://byjus.com/maths/convex-polygon/#:~:text=Area%20of%20convex%20polygon%20can,triangle%20and%20summing%20up%20them.)
