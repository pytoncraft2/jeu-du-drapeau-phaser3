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
  @type("boolean") pret: boolean = false
  @type("number") indexConfirmation?: number
}

// export class Input extends Schema {
//   @type("boolean") left: boolean = false
//   @type("boolean") right: boolean = false
//   @type("boolean") up: boolean = false
//   @type("boolean") down: boolean = false
//   @type("boolean") space: boolean = false
// }

export class LobbyState extends Schema {
  //@ts-ignore
  @type({ map: Joueur }) joueurs = new MapSchema<Joueur>()
  @type([ "string" ]) joueursPret = new ArraySchema<string>();
}
