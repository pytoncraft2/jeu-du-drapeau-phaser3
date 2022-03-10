//@ts-nocheck

/**
 * Schema Colyseus
 */
import {
  Schema,
  MapSchema,
  ArraySchema,
  CollectionSchema,
  type,
} from "@colyseus/schema"

export class Joueur extends Schema {
  @type("boolean") pret: boolean
  @type("number") indexConfirmation: number
  @type("number") ancienIndexConfirmation: number
  @type("string") ancienTexte : string;
}

export class JoueurPret extends Schema {
  @type("boolean") pret: boolean = false
}

export class LobbyState extends Schema {
  //@ts-ignore
  @type({ map: Joueur }) joueurs = new MapSchema<Joueur>()
  // @type({ map: JoueurPret }) joueursPret = new ArraySchema<string>();
}
