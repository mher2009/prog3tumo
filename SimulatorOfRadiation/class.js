class Grass {
    constructor(x, y, mutated) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.mutated = mutated;
        this.directions = [];
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
    }

    chooseCell(char) {
        this.getNewCoordinates()
        var found = [];

        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }

        }
        return found;
    }

    mul() {
        var gen = false
        var rand = random(4)
        if (rand == 4) {
            gen = this.mutated
        }

        var tact = 20;
        if (this.mutated == true) {
            tact = 1
        }
        this.multiply++
        var emptyCell = this.chooseCell(0);
        var newCell = random(emptyCell);
        if (newCell && this.multiply >= tact) {

            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = 1;

            var gr = new Grass(newX, newY, gen);

            grassArr.push(gr);

            this.multiply = 0;
        }
    }

}


class GrassEater {
    constructor(x, y, mutated) {
        this.x = x;
        this.y = y;
        this.energy = 40;
        this.multiply = 0
        this.directions = [];
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        var gen = false
        var rand = random(2)
        if (rand == 1) {
            gen = this.mutated
        }
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

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
        var newCell = random(emptyCell)

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
        var newCell = random(emptyCell)

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
        var rand = random(1);
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

class Radiation {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
        this.multiply = 0;
        this.energy = 8

    }
    chooseCell(char, char1) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char || matrix[y][x] == char1) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    infect() {
        this.multiply++
        var emptyCells = this.chooseCell(1, 2);
        var newCell = random(emptyCells);
        if (newCell && this.multiply >= 5) {
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
        var newCell = random(emptyCells)
        if (this.energy > 0) {
            if (newCell && this.multiply >= 7) {
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


var player = {
    healing: 3,
    energy: 7,
    multiply: 0,
    directions: [
        [this.x - 1, this.y - 1],
        [this.x, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y],
        [this.x + 1, this.y],
        [this.x - 1, this.y + 1],
        [this.x, this.y + 1],
        [this.x + 1, this.y + 1]
    ],
    chooseMyDirec: function(){
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
    },
    chooseMe: function () {
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[0].length; j++) {
                if (matrix[i][j] == 4) {
                    this.x = j;
                    this.y = i;
                }
            }
        }
    },
    chooseCell(char, char1) {
        this.chooseMyDirec()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char || matrix[y][x] == char1) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    },

    up: function () {
        this.chooseMe()
        if (this.y - 1 >= 0 && this.y - 1 < matrix.length) {
            let newX = this.x;
            let newY = this.y - 1;
            if (matrix[newY][newX] == 0) {
                matrix[this.y][this.x] = 0;
                this.y--;
                matrix[this.y][this.x] = 4;
            }
        }
    },
    down: function () {
        this.chooseMe()
        if (this.y + 1 >= 0 && this.y + 1 < matrix.length) {
            let newX = this.x;
            let newY = this.y + 1;
            if (matrix[newY][newX] == 0) {
                matrix[this.y][this.x] = 0;
                this.y++;
                matrix[this.y][this.x] = 4;
            }
        }
    },
    left: function () {
        this.chooseMe()
        if (this.x - 1 >= 0 && this.x - 1 < matrix[0].length) {
            let newX = this.x - 1;
            let newY = this.y;
            if (matrix[newY][newX] == 0) {
                matrix[this.y][this.x] = 0;
                this.x--;
                matrix[this.y][this.x] = 4;
            }
        }
    },
    rigth: function () {
        this.chooseMe()
        if (this.x + 1 >= 0 && this.x + 1 < matrix[0].length) {
            let newX = this.x + 1;
            let newY = this.y;
            if (matrix[newY][newX] == 0) {
                matrix[this.y][this.x] = 0;
                this.x++;
                matrix[this.y][this.x] = 4;
            }
        }
    },
    eat: function(){
        var emptyCells = this.chooseCell(2, 2)
        var newCell = random(emptyCells)
        if(newCell){
            var newX = newCell[0]
            var newY = newCell[1]
            for(var i in grassEaterArr){
            if(grassEaterArr[i].x == newX && grassEaterArr[i].y == newY){
                this.energy++;
                console.log("Your Hp: " + this.energy)
                matrix[newY][newX] = 0;
                grassEaterArr[i].die()
                break;
            }   
            }
        }


        
    },
    hit: function () {
        this.multiply++;
        var emptyCells = this.chooseCell(3, 3)
        var newCell = random(emptyCells)
     
        if(newCell && this.multiply >=2){
            var newX = newCell[0]
            var newY = newCell[1]
            for(var i in radiationArr){
                if(radiationArr[i].x == newX && radiationArr[i].y == newY){
                    if(radiationArr[i].energy>0){
                    radiationArr[i].energy--;
                    console.log("Hit: " + radiationArr[i].energy)
                    this.multiply = 0;
                    break;
                    }
                }
            }

        }       
    },
    get: function(){
        var emptyCells = this.chooseCell(5, 5);
        var newCell = random(emptyCells);
        if(newCell){
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = 0;
            console.log("Heal count: " + this.healing)
            this.healing++
        }
    },
    heal: function(){
        var emptyCells = this.chooseCell(1, 2)
        var newCell = random(emptyCells);
        if(newCell){
            var newX = newCell[0]
            var newY = newCell[1]
            for(let i in grassArr){
                if(grassArr[i].x == newX && grassArr[i].y == newY){
                    if(grassArr[i].mutated){
                        if(this.healing>0){
                        grassArr[i].mutated = false;
                        this.healing--;
                        this.energy+=5;
                        console.log("You heal" + " heal: " + this.healing)
                        }
                    }
                }
            }
        }
    },
    die: function () {
        matrix[this.y][this.x] = 0;
        this.x = undefined;
        this.y = undefined;
        alert("You losed! reload for try")
    }

};

document.addEventListener('keydown', function (event) {
    if (event.code == "KeyW") {
        player.up()
    }
    if (event.code == "KeyS") {
        player.down()
    }
    if (event.code == "KeyA") {
        player.left()
    }
    if (event.code == "KeyD") {
        player.rigth()
    }
    if(event.code == "KeyQ"){
        player.hit()
    }   
    if(event.code == "KeyE"){
        player.eat()
    }
    if(event.code == "KeyG"){
        player.get()
    }
    if(event.code == "KeyH"){
        player.heal()
    }
})  


