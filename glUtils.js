(function(global){

    var glUtils = {
      VERSION : '0.0.1',
      checkWebGL: function(canvas) {
        var contexts = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"], gl;
        for (var i=0; i < contexts.length; i++) {
          try {
            gl = canvas.getContext(contexts[i], {alpha: true}); //bisa ditambah specify misal alpha -> dipakai di semua render object
          } catch(e) {}
          if (gl) {
            break; 
          }
        }
        if (!gl) {
          alert("WebGL tidak tersedia");
        }
        return gl;
      },
  
      createProgram: function(gl, vertexShader, fragmentShader) {
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          var error = gl.getProgramInfoLog(program);
          console.log('Failed to link program: ' + error);
          gl.deleteProgram(program);
          gl.deleteShader(fragmentShader);
          gl.deleteShader(vertexShader);
          return null;
        }
        
        console.log(gl.isShader(vertexShader));
        console.log(gl.isProgram(program));
        
        console.log(gl.getAttachedShaders(program));
        var shaders = gl.getAttachedShaders(program);
        for (var i=0; i<shaders.length; i++) {
          console.log(gl.getShaderSource(shaders[i]));
        }
  
        gl.validateProgram(program)
        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
          var error = gl.getProgramInfoLog(program);
          console.log('Failed to link program: ' + error);
          gl.deleteProgram(program);
          gl.deleteShader(fragmentShader);
          gl.deleteShader(vertexShader);
          return null;
        }
  
        return program;
      },
  
      getShader: function(gl,type,source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.log("An error occurred compiling the shaders:" + gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      }
    };
  
    // Expose glUtils globally
    global.glUtils = glUtils;
  
  }(window || this));