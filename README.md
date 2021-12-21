### Table of Contents

*   [invisible][1]
    *   [Parameters][2]
    *   [Examples][3]
*   [tirer][4]
    *   [Parameters][5]
*   [agrandissement][6]
    *   [Parameters][7]
*   [toupie][8]
    *   [Parameters][9]
*   [saut][10]
    *   [Parameters][11]
*   [recevoirDegat][12]
    *   [Parameters][13]
*   [attaque][14]
    *   [Parameters][15]
*   [interactionTonneauDrapeau][16]
    *   [Parameters][17]
*   [interactionTirolienne][18]
    *   [Parameters][19]
*   [gestionVie][20]
    *   [Parameters][21]
*   [gestionTonneaux][22]
    *   [Parameters][23]
*   [socleJoueur][24]
*   [attacked][25]
*   [right][26]
*   [canonMaintenu][27]
    *   [Parameters][28]
*   [x][29]
*   [changementVieEquipe][30]
    *   [Parameters][31]
*   [changementVie][32]
    *   [Parameters][33]
*   [finDeVie][34]
    *   [Parameters][35]
*   [finDeVie][36]
    *   [Parameters][37]

## invisible

Rendre invisible un joueur

### Parameters

*   `scene` **[Object][38]** Scene du jeu
*   `player` **[Object][38]** le joueur qui est a rendre invisible
    Solves equations of the form a \* x = b

### Examples

```javascript
// returns 2
invisible({tween}, player);
```

## tirer

Charger et tirer une boule (pouvoir de Naruto) llll

### Parameters

*   `scene` **[Object][38]** Scene du jeu
*   `player` **[Object][38]** le joueur qui tire la boule
*   `relache` **[Boolean][39]** indique si le joueur maintient ou relache le bouton

## agrandissement

Change la taille du joueur (pouvoir)

### Parameters

*   `scene` **[Object][38]** Scene du jeu
*   `player` **[Object][38]** joueur qui s'aggrandis

## toupie

Effectuer plusieurs rotation sur le joueur pendant 2secondes

### Parameters

*   `tweens` **[Object][38]** gestion de l'animation pour le décompte
*   `player` **[Object][38]** joueur qui effectue la rotation

## saut

Effectuer un saut sur un joueur

### Parameters

*   `chargeSaut` **[Boolean][39]** indique si le joueur maintient ou relache le bouton
*   `scene` **[Object][38]** Scene du jeu
*   `player` **[Object][38]** joueur qui effectue un saut

## recevoirDegat

Recevoir des dégats pour un joueur

### Parameters

*   `scene` **[Object][38]** Scene du jeu
*   `player` **[Object][38]** joueur qui recoit les dégats

## attaque

Effectuer une attaque ou/et un repoussement sur un objet|joueur

### Parameters

*   `charge` **[Boolean][39]** indique si le joueur maintient ou relache le bouton
*   `scene` **[Object][38]** Scene du jeu
*   `player` **[Object][38]** joueur qui effectue une attaque

## interactionTonneauDrapeau

Interactions avec un tonneau|drapeau le plus proche du joueur
celon la direction du joueur (droite|gauche)

si le joueur ne tient pas de tonneau|drapeau: attrape le tonneau|drapeau le plus proche
sinon détache le tonneau du joueur

créer un rectangle de zone d'attaque à droite ou a gauche du joueur (celon sa direction)
recupere et filtre les objets à l'interieur du rectangle et interagit avec eux

### Parameters

*   `player` **[Object][38]** joueur qui interagie avec l'objet (tonneau|drapeau)
*   `scene` **[Object][38]** Scene du jeu

## interactionTirolienne

Utiliser la tirolienne quand le joueur est proche de celle ci

### Parameters

*   `player` **[Object][38]** joueur qui utilise la tirolienne
*   `scene` **[Object][38]** Scene du jeu

## gestionVie

Diminuer la vie d'un joueur ou faire perdre le joueur

### Parameters

*   `vie` **[Number][40]** vie du joueur qui est attaqué
*   `id` **[String][41]** id du joueur qui est attaqué
*   `tween` **[Object][38]** animation pour la fin de vie
*   `superAttaque` **[Boolean][39]** indique si le joueur qui attaque a chargé au maximum son attaque
*   `direction` **[String][41]** direction du joueur qui attaque (droite|gauche)

## gestionTonneaux

pousser un tonneau celon la puissance émis par le joueur

### Parameters

*   `puissance` **[Number][40]** charge du joueur
*   `rotation` **[Boolean][39]** position du joueur face au tonneau (droite|gauche)
*   `tonneau` **[Object][38]** tonneau ciblé

## socleJoueur

COLISION GROUPE
1: platforme
2: joueur

## attacked

INTERACTION AVEC LES AUTRES PERSONNAGES

## right

DROITE-GAUCHE

## canonMaintenu

TIROLIENNE
QUAND LE JOUEUR EST PROCHE DE LA TIROLIENNE
LE JOUEUR SUIT LA BALLE DE LA TIROLIENNE
SINON IL S'EN DETACHE

### Parameters

*   `constraints` **[Object][38]** attache des joueurs
*   `constraints` **[Object][38]** \['bullet'] attache de la balle correspondant au joueur

## x

ROTATION CANON

## changementVieEquipe

DIMINUTION VIE EQUIPE SELON LA PUISSANCE DE L'ATTAQUE DU JOUEUR

### Parameters

*   `equipe` **[String][41]** nom de l'equipe (A|B)
*   `puissance` **[Number][40]** Puissance du joueur qui a attaqué
*   `puissanceDeBase` **[Number][40]** Puissance de base du joueur qui a attaqué

## changementVie

DIMINUTION VIE DU JOUEUR: NOMBRE DE VIE -1

### Parameters

*   `id`  
*   `tween`  
*   `superAttaque`  
*   `direction`  

## finDeVie

REMISE A 5 DE LA VIE DU JOUEUR
RESPAWN AVEC ANIMATION

### Parameters

*   `id`  

## finDeVie

Fin de vie d'un joueur
Retour au spawn

### Parameters

*   `id` **[String][41]** id du joueur ciblé

[1]: #invisible

[2]: #parameters

[3]: #examples

[4]: #tirer

[5]: #parameters-1

[6]: #agrandissement

[7]: #parameters-2

[8]: #toupie

[9]: #parameters-3

[10]: #saut

[11]: #parameters-4

[12]: #recevoirdegat

[13]: #parameters-5

[14]: #attaque

[15]: #parameters-6

[16]: #interactiontonneaudrapeau

[17]: #parameters-7

[18]: #interactiontirolienne

[19]: #parameters-8

[20]: #gestionvie

[21]: #parameters-9

[22]: #gestiontonneaux

[23]: #parameters-10

[24]: #soclejoueur

[25]: #attacked

[26]: #right

[27]: #canonmaintenu

[28]: #parameters-11

[29]: #x

[30]: #changementvieequipe

[31]: #parameters-12

[32]: #changementvie

[33]: #parameters-13

[34]: #findevie

[35]: #parameters-14

[36]: #findevie-1

[37]: #parameters-15

[38]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[39]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[40]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[41]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
