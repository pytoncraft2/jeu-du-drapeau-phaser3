function Maison(scene) {

scene.add.group([
{
    key: 'interieur-maison',
    // frame: [0, 1, 2, 3, 4],
    setXY:
    {
        x: -135,
        y: 40,
        // stepX: -64,
        // stepY: 64
    }
},
{
    key: 'plafond',
    // frame: [0, 1, 2, 3, 4],
    setXY:
    {
        x: -135,
        y: -245,
        // stepX: -64,
        // stepY: 64
    }
},
{
    key: 'facade',
    // frame: [0, 1, 2, 3, 4],
    setXY:
    {
        x: -135,
        y: 106,
        // stepX: 64,
        // stepY: 64
    }
},

]);


  };

  export default Maison;
