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

// class Player {
//     @type("x")
//     width: number;
//
//     @type("y")
//     height: number;
// }
//
// class MyState extends Schema {
//     @type({ map: Player })
//     players = new MapSchema<Player>();
// }

export class Input extends Schema {
  @type("boolean") left: boolean = false
  @type("boolean") right: boolean = false
  @type("boolean") up: boolean = false
  @type("boolean") down: boolean = false
}

// export class JoueurIndex extends Schema {
//   @type("string") joueurIndex = new ArraySchema<string>();
// }

export class LobbyState extends Schema {
  //@ts-ignore
  @type({ map: Joueur }) joueurs = new MapSchema<Joueur>()
  // @type({ map: ListeJoueurIndex }) joueurIndexs = new MapSchema<ListeJoueurIndex>();
  @type([ "string" ]) listeJoueurIndex = new ArraySchema<string>();

  // @type({ map: JoueurIndex }) joueurIndexs = new MapSchema<JoueurIndex>();
}
