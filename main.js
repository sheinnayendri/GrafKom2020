(function(){
    var canvas = document.getElementById("canvas_main");
    var gl = glUtils.checkWebGL(canvas);

    // console.log(gl);
    // console.log(gl.getContextAttributes());

    var vshader =
        'void main() {\n' +
        ' gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' + 
        ' gl_PointSize = 10.0;\n' +
        '}\n';

    var fshader =
        'void main() {\n' +
        ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
        '}\n';
    
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, vshader);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, fshader);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    //gl.colorMask(false, true, true, true); //utk me-non-aktifkan unsur RGB-A, scope-nya cuma di color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 10);
})();