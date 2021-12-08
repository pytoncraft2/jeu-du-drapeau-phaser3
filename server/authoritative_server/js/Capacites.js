export const Capacites = (tween, player) => {
  invisible(tween, player) {
       tween.addCounter({
         duration: 5000,
         onComplete: () => (player.active ? (player.setAlpha(1), player.ombre.setAlpha(1)) : null)
       })
       tween.add({
         targets: player,
         alpha: 0,
         duration: 500
       })
       player.ombre.setAlpha(0)
    // ...do something here
  },
  agrandissement(params) {
    // ...do something here
  },
  nestedObj: {
    myNestedMethod(params) {
      // ...do something here
    }
  }
};
