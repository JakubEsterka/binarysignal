var generate = function () {
    var bites = null;

    if (document.getElementById("switch").checked) {
        bites = ABC.toBinary(document.getElementById('bites').value, false);

        document.getElementById("switch").checked = false;
        document.getElementById('bites').value = bites;

    } else {
        bites = document.getElementById('bites').value;
    }

    var lastBit = null;

    var x = 5;
    var y = 5;
    var step = parseInt(document.getElementById('step').value);
    var height = parseInt(document.getElementById('height').value);

    var canvasWidth = bites.length * step * 1.01;
    var canvasHeight = height + 50;

    var c = document.getElementById("canvas");

    c.width = canvasWidth;
    c.height = canvasHeight;

    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = parseInt(document.getElementById('line').value);
    ctx.beginPath();
    ctx.moveTo(x, y);

    var next = function () {
        x = x + step;
    }

    var calc = function (current, last) {
        if (!last) {
            calcY(current);

            ctx.moveTo(x, y);
            next();
            ctx.lineTo(x, y);

            return;
        }

        if (current === last) {
            paint();
        } else {
            calcY(current);
            paint();
        }
    }

    var calcY = function (current) {
        if (current === "0") {
            y = height;
        } else {
            y = 5;
        }
    }

    var paint = function () {
        ctx.lineTo(x, y);
        next();
        ctx.lineTo(x, y);
        ctx.moveTo(x, y);
    }

    for (i = 0; i < bites.length; ++i) {
        var bit = bites.charAt(i);

        if (bit !== "0" && bit !== "1") {
            alert('Bit data can only contain bits - 1 or 0. \nNo other letter, numbers or white spaces. Use Text input.');
            return;
        }

        calc(bit, lastBit)
        lastBit = bit;
    }

    ctx.stroke();
}

var reset = function () {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    document.getElementById('bites').value = "";
    document.getElementById('height').value = "";
    document.getElementById('step').value = "";
    document.getElementById('line').value = "";
}

var convertBites = function (input) {
    var output = "";
    for (var i = 0; i < input.length; i++) {
        output += input[i].charCodeAt(0).toString(2);
    }

    return output;
}

// ABC - a generic, native JS (A)scii(B)inary(C)onverter.
// (c) 2013 Stephan Schmitz <eyecatchup@gmail.com>
// License: MIT, http://eyecatchup.mit-license.org
// URL: https://gist.github.com/eyecatchup/6742657
var ABC = {
    toAscii: function (bin) {
        return bin.replace(/\s*[01]{8}\s*/g, function (bin) {
            return String.fromCharCode(parseInt(bin, 2))
        })
    },
    toBinary: function (str, spaceSeparatedOctets) {
        return str.replace(/[\s\S]/g, function (str) {
            str = ABC.zeroPad(str.charCodeAt().toString(2));
            return !1 == spaceSeparatedOctets ? str : str + " "
        })
    },
    zeroPad: function (num) {
        return "00000000".slice(String(num).length) + num
    }
};