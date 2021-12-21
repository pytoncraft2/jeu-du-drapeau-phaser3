/**
 * DIMINUTION VIE EQUIPE SELON LA PUISSANCE DE L'ATTAQUE DU JOUEUR 2
 * @param  {String} equipe          nom de l'equipe (A|B)
 * @param  {Number} puissance       Puissance du joueur qui a attaqué
 * @param  {Number} puissanceDeBase Puissance de base du joueur qui a attaqué
 * Solves equations of the form a * x = b
 * @example
 * // returns 2
 * test("A", 0.88, 10);
 */

function test(equipe, puissance, puissanceDeBase) {
  this.vieEquipe[equipe] -= puissance * puissanceDeBase;
  if (this.vieEquipe[equipe] <= 0) {
    if (equipe == "A" && fontainezone2.active) {
      fontainezone2.active = false;
      io.to("Naruto").emit("drapeau_debloque", equipe);
    } else if (equipe == "B" && fontainezone.active){
      fontainezone.active = false;
      io.to("Naruto").emit("drapeau_debloque", equipe);
    }
  }
  io.to("Naruto").emit("changement_vie_equipe", equipe, this.vieEquipe[equipe]);
}
