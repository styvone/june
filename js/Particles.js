function ParticleObject(geometry, color, size) {
  var particleMat = new THREE.PointsMaterial({size: size, color: color, transparent: true});
  var particleGlobe = new THREE.Points(geometry, particleMat);
  
  var vertices = geometry.vertices
  var angles = [];
  for (var i=0; i<vertices.length; i++){
    angles[i] = Math.random() * 2 * Math.PI; //assign random angle
  }

  this.mesh = particleGlobe;
  this.angles = angles;
  this.speed = 1;

  this.highlight = function(color) {
    this.mesh.material.color.r = color.r;
    this.mesh.material.color.g = color.g;
    this.mesh.material.color.b = color.b;
  }

  this.spin = function() {
    this.mesh.rotation.y += 0.0025*this.speed;
    this.mesh.rotation.z += 0.0025*this.speed;
  }
}