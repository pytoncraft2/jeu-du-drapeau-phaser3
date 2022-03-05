
/**
 * deepEqual - verifie les boutons à l'appuie
 *
 * @param  {Object} x:any x
 * @param  {Object} y:any y
 * @return {Object}       Valide la verification
 */
export function deepEqual(x:any, y:any): Object {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y
  return x && y && tx === "object" && tx === ty
    ? ok(x).length === ok(y).length &&
        ok(x).every((key) => deepEqual(x[key], y[key]))
    : x === y
}
