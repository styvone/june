function ParticleObject(geometry, color, size){
  var geom = geometry;
  var mat = new THREE.MeshBasicMaterial();
  var globe = new THREE.Mesh(geom, mat);

  var particleMat = new THREE.PointsMaterial({size: size, color: color, transparent: true});
  var particleGlobe = new THREE.Points(geometry, particleMat);
  
  var vertices = geometry.vertices
  var angles = [];
  for (var i=0; i<vertices.length; i++){
    angles[i] = Math.random() * 2 * Math.PI; //assign random angle
  }

  this.mesh = particleGlobe;

  this.angles = angles;
  this.tick = Math.PI / 180;
  this.speed = 1;
  this.autoHover = false;

  this.hoverPoints = function(){
      if(!this.autoHover)
        return;

      var vertices = this.mesh.geometry.vertices;
      var p, angle, tick = this.tick;
      for (var i=0; i<vertices.length; i++){
        this.angles[i]+= this.speed*2*tick;
        p = vertices[i];
        p.x += this.speed*.0025*Math.cos(this.angles[i]);
        p.y += this.speed*.0025*Math.sin(this.angles[i]);
        p.z += this.speed*.0025*Math.sin(this.angles[i]);
        this.mesh.geometry.verticesNeedUpdate = true;
      }
  }

  this.highlight = function(color){
    var _this = this;

    var rgbCur = this.mesh.material.color;

    _this.mesh.material.color.r = color.r;
    _this.mesh.material.color.g = color.g;
    _this.mesh.material.color.b = color.b;

    // var tween = new TWEEN.Tween(rgbCur).to(rgbTarget, 150);
    // tween.onUpdate(function(){
    // });
    // tween.start();
  }

  this.update = function(){
    this.hoverPoints();
    this.mesh.rotation.y += .0025*this.speed*this.speed*this.speed;
    this.mesh.rotation.x += .0025*this.speed*this.speed*this.speed;
  }
}