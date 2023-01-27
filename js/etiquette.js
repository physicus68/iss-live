// comosant affichant le nom de l'ISS 
// - légèrement au dessus de la station



AFRAME.registerComponent("etiquette", {
  
  schema: {
    texte: { type: "string", default: "Hello, World!" },
    decalage: { type: "number", default: 10 },
  },

  init: function () {
    var element = this.el.sceneEl.canvas;
    this.width = window.getComputedStyle(element, "").width.replace("px", "");
    this.height = window.getComputedStyle(element, "").height.replace("px", "");
    this.widthHalf = this.width / 2;
    this.heightHalf = this.height / 2;
  },

  update: function () {},

  tick: function () {
    var pos = this.el.object3D.position.clone();
    pos.project(this.el.sceneEl.camera); 
    pos.x = pos.x * this.widthHalf + this.widthHalf;
    pos.y = -(pos.y * this.heightHalf) + this.heightHalf;
    document.getElementById("label").style.left = pos.x + "px";
    document.getElementById("label").style.top =
      pos.y - this.data.decalage + "px";
  },

  remove: function () {},

  pause: function () {},

  play: function () {},
});
