window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");

//window.setInterval(tick, 1);

var lines = [];
var linePitches = [];
var lineOffsets = [];
var lineDirections = [];
var lineTimers = [];

canvas.style.position = "absolute";
canvas.style.left = document.body.clientWidth / 2 - 250 + "px";
canvas.style.top = window.innerHeight / 2 - 250 + "px";

for (var i = 0; i < 10; i++) {
    lines[i] = i / 10;
    lineOffsets[i] = Math.random();
    linePitches[i] = Math.random();
    lineTimers[i] = Math.random();
    lineDirections[i] = {
        x: Math.random(),
        y: Math.random()
    };
}

function tick() {
    var grd = ctx.createRadialGradient(250, 250, 50, 250, 250, 100);
    grd.addColorStop(0, "purple");
    grd.addColorStop(1, "orange");
    ctx.strokeStyle = grd;

    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.arc(250, 250, 245, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.arc(250, 250, 45, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.lineCap = "round";
    for (var i = 0; i < lines.length; i++) {
        var sinOffset = Math.sin(2 * Math.PI * lineOffsets[i]) / 2;
        var pitchM = Math.sin(2 * Math.PI * linePitches[i]);
        var grd = ctx.createRadialGradient(250, 250, Math.abs(50 * pitchM), 250, 250, Math.abs(100 * pitchM));
        grd.addColorStop(0, "purple");
        grd.addColorStop(1, "magenta");
        ctx.strokeStyle = grd;
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.moveTo(250 + Math.cos(2 * Math.PI * lines[i]) * 45 * pitchM, 250 + Math.sin(2 * Math.PI * lines[i]) * 45 * pitchM);
        ctx.quadraticCurveTo(250 + Math.cos(2 * Math.PI * lines[i] + sinOffset / 2) * 200 * pitchM, 250 + Math.sin(2 * Math.PI * lines[i] + sinOffset / 2) * 200 * pitchM, 250 + Math.cos(2 * Math.PI * lines[i]) * 245 * pitchM, 250 + Math.sin(2 * Math.PI * lines[i]) * 245 * pitchM);
        //ctx.lineTo(250+Math.cos(2 * Math.PI*lines[i])*245,250+Math.sin(2 * Math.PI*lines[i])*245);
        ctx.stroke();
        lineDirections[i].x = Math.min(Math.max(lineDirections[i].x, 0), 1);
        lineDirections[i].y = Math.min(Math.max(lineDirections[i].y, 0), 1);
        lines[i] += (lineDirections[i].x - 0.5) * 0.003;
        lines[i] = lines[i] % 1;

        linePitches[i] += (lineDirections[i].y - 0.5) * 0.003;
        linePitches[i] = linePitches[i] % 1;
        lineOffsets[i] += (Math.random() - 0.5) * 0.1;
        lineOffsets[i] = lineOffsets[i] % 1;
        for (var j = 0; j < lines.length; j++) {
            if (j != i) {
                if (Math.abs(lines[i] - lines[j]) > 0.7 || Math.abs(lines[i] - lines[j]) < 0.3) {

                }
            }
        }
        lines[i] = lines[i] % 1;
        lineDirections[i].x += Math.random() / 10 - 0.05;
        lineDirections[i].y += Math.random() / 10 - 0.05;
    }
}
(function animloop() {
    requestAnimFrame(animloop);
    tick();
})();
