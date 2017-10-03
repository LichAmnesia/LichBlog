/*
 * @Author: Lich_Amnesia
 * @Date:   2017-09-17 21:28:53
 * @Last Modified by:   Lich_Amnesia
 * @Last Modified time: 2017-10-03 00:33:50
 */

// set sky background 
$("canvas").filter(".sky").css("overflow", "hidden");

noise.seed(Math.random());

// = 1000;
var pointsArr = [];

function drawing(density) {
    var $myCanvas = $('#myCanvas');
    var c = myCanvas;
    var ctx = c.getContext('2d');
    var xMax = c.width = window.screen.availWidth;
    var yMax = c.height = window.screen.availHeight;

    var hmTimes = density;

    for (var i = 0; i <= hmTimes; i++) {
        var randomX = Math.floor((Math.random() * xMax) + 1);
        var randomY = Math.floor((Math.random() * yMax) + 1);
        var randomSize = Math.floor((Math.random() * 3) + 1);
        var randomOpacityOne = Math.floor((Math.random() * 9) + 1);
        var randomOpacityTwo = Math.floor((Math.random() * 9) + 1);
        var randomHue = Math.floor((Math.random() * 360) + 1);

        pointsArr.push({
            x: randomX,
            y: randomY,
            a: 0
        });
        pointsArr.push({
            x: randomX,
            y: randomY,
            a: TAU / 2
        });

        if (randomSize > 1) {
            ctx.shadowBlur = Math.floor((Math.random() * 15) + 5);
            ctx.shadowColor = "white";
        }
        ctx.fillStyle = "hsla(" + randomHue + ", 30%, 80%, ." + randomOpacityOne + randomOpacityTwo + ")";
        ctx.beginPath(); //Start path
        ctx.arc(randomX, randomY, randomSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
        ctx.fill();
    }

}

var TAU = 2 * Math.PI;
var period = 1 / 1000;

var $myCanvas = $('#myCanvas');


// Color generator for background
patternArr = ["OrRd", "PuBu", "BuPu", "Oranges", "BuGn", "YlOrBr", "YlGn", "Reds", "RdPu", "Greens", "YlGnBu", "Purples", "GnBu", "Greys", "YlOrRd", "PuRd", "Blues", "PuBuGn", "Viridis", "Spectral", "RdYlGn", "RdBu", "PiYG", "PRGn", "RdYlBu", "BrBG", "RdGy", "PuOr", "Set2", "Accent", "Set1", "Set3", "Dark2", "Paired", "Pastel2", "Pastel1", "orrd", "pubu", "bupu", "oranges", "bugn", "ylorbr", "ylgn", "reds", "rdpu", "greens", "ylgnbu", "purples", "gnbu", "greys", "ylorrd", "purd", "blues", "pubugn", "viridis", "spectral", "rdylgn", "rdbu", "piyg", "prgn", "rdylbu", "brbg", "rdgy", "puor", "set2", "accent", "set1", "set3", "dark2", "paired", "pastel2", "pastel1"]
var pattern = chroma.brewer[patternArr[Math.floor(Math.random() * patternArr.length)]]
var color1 = chroma(pattern[0]).lch()[2];
var color2 = chroma(pattern[pattern.length - 1]).lch()[2];

if (isNaN(color1) || isNaN(color2)) {
    color1 = chroma.random().lch()[2];
    color2 = chroma.random().lch()[2];
}

function drawNebulae() {
    var $myCanvas = $('#myCanvas');
    var ctx = myCanvas.getContext('2d');
    arrLen = pointsArr.length;
    for (_i = 0; _i < arrLen; _i++) {
        var p = pointsArr[_i];
        v = noise.perlin2(p.x * period, p.y * period);
        var my_gradient = ctx.createLinearGradient(0, 0, 800, 800);
        // chroma.random();
        my_gradient.addColorStop(0, "hsla(" + (Math.floor(color1)) + ", 90%, 50%, 0.06)");
        my_gradient.addColorStop(1, "hsla(" + (Math.floor(color2)) + ", 90%, 50%, 0.06)");
        ctx.fillStyle = my_gradient;
        // ctx.fillStyle = "hsla(" + (Math.floor(v * 50 + 220)) + ", 50%, 20%, 0.05)";
        ctx.fillRect(p.x, p.y, 2.7, 2.7);
        p.h++;
        a = v * 2 * Math.PI + p.a;
        p.x += Math.cos(a);
        p.y += Math.sin(a);
    }
}

$(document).ready(function() {
    drawing(Math.round(Math.random() * 50) + 100);
    window.setTimeout(delay, 1000);

});

function delay(argument) {
    setInterval(drawNebulae, 1);
}


$("#start").click(function() {
    $("canvas").animate({
        left: '250px',
        opacity: '0.5',
        height: '150px',
        width: '150px'
    });
});

$("#stop").click(function() {
    $("canvas").animate({
        left: '250px',
        opacity: '1',
        height: '800px',
        width: '1440px'
    });
});