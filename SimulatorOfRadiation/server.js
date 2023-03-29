var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs")

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
const port = 3000
server.listen(port, () => {
    console.log("Server connected")
});

function matrixGenerator(matrixSize, grassCount, grEatCount, radCount, healingCount) {
    let matrix = [];

    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = []

        for (let j = 0; j < matrixSize; j++) {
            matrix[i][j] = 0;
        }
    }

    for (let i = 0; i < grassCount; i++) {

        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
        } else {
            i--;
        }

    }

    for (let i = 0; i < grEatCount; i++) {

        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
        } else {
            i--;
        }

    }

    for (let i = 0; i < radCount; i++) {

        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        } else {
            i--;
        }

    }



    for (let i = 0; i < healingCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
        } else {
            i--;
        }
    }

    let x = Math.floor(Math.random() * matrixSize)
    let y = Math.floor(Math.random() * matrixSize)

    matrix[y][x] = 4;

    io.emit("send matrix", matrix)
    return matrix;

}

matrix = matrixGenerator(40, 30, 12, 80, 20);

grassArr = []
grassEaterArr = []
radiationArr = []

const Grass = require("./Grass")
const GrassEater = require("./GrassEater")
const Radiation = require("./Radiation")
const Player = require("./Player")
var player  = new Player()
function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, false)

                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                var grEat = new GrassEater(x, y, false)

                grassEaterArr.push(grEat)
            } else if (matrix[y][x] == 3) {
                var rad = new Radiation(x, y)

                radiationArr.push(rad)
            }
        }
    }
    io.emit("send matrix ", matrix)
    io.emit("send grassArr", grassArr)
    io.emit("send grassArr", grassEaterArr)
}

createObject()

function gameMove() {

    for (let i in grassArr) {
        grassArr[i].mul()
    }

    for (let j in grassEaterArr) {
        grassEaterArr[j].eat()
    }

    for (let j in radiationArr) {
        radiationArr[j].infect()
        radiationArr[j].hit()
    }
    io.emit("send matrix", matrix)
    io.emit("send grassArr", grassArr)
    io.emit("send grassArr", grassEaterArr)
}

setInterval(gameMove, 200)