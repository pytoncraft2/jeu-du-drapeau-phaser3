// function Maison(scene, interieur, plafond, facade, platforme) {

export const Maison = (scene, interieur, plafond, facade, platforme) => scene.add.group([
  {
  key: 'platforme',
  setXY: {
    x: platforme[0],
    y: platforme[1]
  }
},

{
    key: 'interieur-maison',
    // frame: [0, 1, 2, 3, 4],
    setXY:
    {
        x: interieur[0],
        y: interieur[1]
        // stepX: -64,
        // stepY: 64
    }
},
{
    key: 'plafond',
    // frame: [0, 1, 2, 3, 4],
    setXY:
    {
        x: plafond[0],
        y: plafond[1],
        // stepX: -64,
        // stepY: 64
    }
},
{
    key: 'facade',
    // frame: [0, 1, 2, 3, 4],
    setXY:
    {
        x: facade[0],
        y: facade[1],
        // stepX: 64,
        // stepY: 64
    }
}

]);


  // };

  export default Maison;
