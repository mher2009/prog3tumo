let LivingCreature = require("./LivingCreature") 

module.exports = class Grass extends LivingCreature {
    constructor(x, y, mutated) {
        super(x, y)
        this.mutated = mutated;
    }
    getNewCoordinates() {
        if (this.mutated) {
            this.directions = [
                [this.x - 1, this.y - 1],
                [this.x - 1, this.y + 1],
                [this.x - 2, this.y - 2],
                [this.x - 2, this.y + 1],
                [this.x + 1, this.y - 1],
                [this.x + 1, this.y + 1],
                [this.x + 2, this.y - 2],
                [this.x + 2, this.y + 2]
            ]
        }
        else {
            this.directions = super.directions
        }
    }



    mul() {

        var tact = 20;
        if (this.mutated) {
            tact = 1
        }
        this.multiply++
        var emptyCell = this.chooseCell(0);
        var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.multiply >= tact) {

            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = 1;

            var gr = new Grass(newX, newY, this.mutated);

            grassArr.push(gr);

            this.multiply = 0;
        }
    }

}

