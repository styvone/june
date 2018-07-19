function ParticleObject(geometry, color, size) {
  var particleMat = new THREE.PointsMaterial({size: size, color: color, transparent: true});
  var particleGlobe = new THREE.Points(geometry, particleMat);

  this.mesh = particleGlobe;
  this.speed = 1;
  this.invFlag = false;

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

function getBass(listener, analyser) {
    var freqPerBin = listener.context.sampleRate / 32;
    var length = 350 / freqPerBin;
    var values = 0;
    var average;
    var arr = analyser.getFrequencyData();
    for(var i = 0; i < length; i++){
      values += arr[i];
    }
    average = values / length;
    return average;
}

function getTreble(listener, analyser) {
    var freqPerBin = listener.context.sampleRate / 32;
    var start = Math.floor(3000 / freqPerBin);
    var values = 0;
    var average;
    var arr = analyser.getFrequencyData();
    for(var i = start; i < 16; i++){
      values += arr[i];
    }
    average = values / (16 - start);
    return average;
}