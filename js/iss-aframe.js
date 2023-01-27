// composant AFrame.io permettant d'afficher l'objet à la position 
// de l'ISS (longitude, latitude)


let positionISS = {
    LAT: 0.0,
    LON: 0.0
};

AFRAME.registerComponent('iss', {
    
    schema: {
        R: { default: '1.5' }
    },

    init: function () {
        console.log("ISS init ...");
        this.el.object3D.position.set(1, 0, 0);
        console.log(positionISS);
        var lat = positionISS.LAT;
        var lon = positionISS.LON;
        console.log(lat + "   " + lon);
        var y = this.data.R * Math.sin(lat * Math.PI / 180.0);
        var x = this.data.R * Math.cos(lat * Math.PI / 180.0) * Math.cos(lon * Math.PI / 180.0);
        var z = this.data.R * Math.cos(lat * Math.PI / 180.0) * Math.sin(lon * Math.PI / 180.0);
        this.el.object3D.position.set(x, y, z);
        console.log(this.data.R);
    },
    
    update: function () { },
    
    tick: function () {
        var lat = positionISS.LAT;
        var lon = positionISS.LON;
        var y = this.data.R * Math.sin(lat * Math.PI / 180.0);
        var x = this.data.R * Math.cos(lat * Math.PI / 180.0) * Math.cos(-lon * Math.PI / 180.0);
        var z = this.data.R * Math.cos(lat * Math.PI / 180.0) * Math.sin(-lon * Math.PI / 180.0);
        this.el.object3D.position.set(x, y, z);
    },
    
    remove: function () { },
    
    pause: function () { },
    
    play: function () { }
});