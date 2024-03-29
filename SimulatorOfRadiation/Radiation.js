let LivingCreature = require("./LivingCreature")

module.exports = class Radiation extends LivingCreature{
    constructor(x, y) {
        super(x, y)
        this.energy = 8
    }
    chooseCell(char, char1) {
        var found = [true];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char || matrix[y][x] == char1) {
                    found.push(this.directions[i]);
                    found[0] = false;
                }
            }
        }
        return found;
    }
    infect() {
        this.multiply++
        var emptyCells = this.chooseCell(1, 2);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (this.multiply >= 5 && emptyCells[0]) {
            var newX = newCell[0];
            var newY = newCell[1];
            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY && grassArr[i].mutated == false) {
                    this.energy++;
                    grassArr[i].mutated = true
                    break;
                }
            }
            for (var j in grassEaterArr) {
                if (grassEaterArr[j].x == newX && grassEaterArr[j].y == newY && grassEaterArr[j].mutated == false) {
                    this.energy++;
                    grassEaterArr[j].mutated = true;
                    break;
                }
            }
            this.multiply = 0;

        }

    }

    hit() {
        this.multiply++;
        var emptyCells = this.chooseCell(4, 4)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (this.energy > 0) {
            if (emptyCells[0] && this.multiply >= 7) {
                if(player.energy>0){
                player.energy--;
                console.log("Your Hp:" + player.energy);
                this.multiply = 0;
                }else{
                    player.die()
                }
            }
        } else {
            if (this.energy <= 0) {
                player.energy+=15
                this.die()
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in radiationArr) {
            if (this.x == radiationArr[i].x && this.y == radiationArr[i].y) {
                radiationArr.splice(i, 1);
                break;
            }
        }
    }
}