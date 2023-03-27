let LivingCreature = require("./LivingCreature")

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, mutated) {
        super(x, y)
        this.energy = 40;
        this.mutated = mutated;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(char) {
        this.getNewCoordinates()
        return super.chooseCell(char)
    }

    mul() {
        var gen = false
        var rand = Math.floor(Math.random() * 2)
        if (rand == 1) {
            gen = this.mutated
        }
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = Math.floor(Math.random() * emptyCells.length);

        if (newCell && this.multiply >= 40) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var grEat = new GrassEater(newX, newY, gen);
            grassEaterArr.push(grEat);
            this.multiply = 0;

        }
        this.energ()
    }

    move() {
        this.energy--
        var emptyCell = this.chooseCell(0)
        var newCell = Math.floor(Math.random() * emptyCell.length)

        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }

    eat() {
        var emptyCell = this.chooseCell(1)
        var newCell = emptyCell(Math.floor(Math.random() * emptyCell.length))

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break;
                }
            }
        }
        else {
            this.move()
        }
    }
    energ() {
        var rand = Math.floor(Math.random() * 2);
        if (this.mutated) {
            if (rand == 5) {
                this.energy *= 2
            } else {
                this.energy *= 0.8
            }
        }
    }
    die() {
        
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
    }
    }
}