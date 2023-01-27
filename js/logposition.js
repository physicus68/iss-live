


AFRAME.registerComponent("logposition", {
  schema: { },
  init: function () {
       
  },
  update: function () {},
  tick: function () {  
    //console.log( this.el.sceneEl.camera.position );  
    this.el.object3D.position.x = this.el.sceneEl.camera.position.x;  
    this.el.object3D.position.y = this.el.sceneEl.camera.position.y;  
    this.el.object3D.position.z = this.el.sceneEl.camera.position.z;  

    this.el.object3D.rotation.x =  this.el.sceneEl.camera.rotation.x ;   
    this.el.object3D.rotation.y =  this.el.sceneEl.camera.rotation.y ;   
    this.el.object3D.rotation.z =  this.el.sceneEl.camera.rotation.z ;   
    
  },
  remove: function () {},
  pause: function () {},
  play: function () {},
});
