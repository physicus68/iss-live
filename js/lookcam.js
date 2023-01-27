// composant permettant qu ' un objet regarde vers la caméra


AFRAME.registerComponent("lookcam", {
  schema: { },
  init: function () {
       
  },
  update: function () {},
  tick: function () {  
    this.el.object3D.lookAt(this.el.sceneEl.camera.position);    
  },
  remove: function () {},
  pause: function () {},
  play: function () {},
});
