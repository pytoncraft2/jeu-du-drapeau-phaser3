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
}

export class ListeJoueurIndex extends Schema {
  @type("string") liste: string
}

export class Proprietaire extends Schema {
  @type("string") proprietaire: string
}

export class LobbyState extends Schema {
  //@ts-ignore
  @type({ map: Joueur }) joueurs = new MapSchema<Joueur>()
  @type([ "string" ]) listeJoueurIndex = new ArraySchema<string>()
  @type([ "string" ]) proprietaire = new ArraySchema<string>()
}
