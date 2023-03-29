module.exports = class Player{
    constructor(){
    this.x;
    this.y;
    this.healing = 3
    this.energy = 7
    this.multiply = 0
    this.directions = [
        [this.x - 1, this.y - 1],
        [this.x, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y],
        [this.x + 1, this.y],
        [this.x - 1, this.y + 1],
        [this.x, this.y + 1],
        [this.x + 1, this.y + 1]
    ]
    }
    chooseMyDirec (){
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
    chooseMe () {
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[0].length; j++) {
                if (matrix[i][j] == 4) {
                    this.x = j;
                    this.y = i;
                }
            }
        }
    }
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
    }

    up () {
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
    }
    down () {
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
    }
    left () {
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
    }
    rigth () {
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
    }
    eat (){
        var emptyCells = this.chooseCell(2, 2)
        var newCell = Math.floor(Math.random() * emptyCells.length)
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
  
    }
    hit () {
        this.multiply++;
        var emptyCells = this.chooseCell(3, 3)
        var newCell = Math.floor(Math.random() * emptyCells.length)
     
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
    }
    get (){
        var emptyCells = this.chooseCell(5, 5);
        var newCell = Math.floor(Math.random() * emptyCells.length)
        if(newCell){
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = 0;
            console.log("Heal count: " + this.healing)
            this.healing++
        }
    }
    heal (){
        var emptyCells = this.chooseCell(1, 2)
        var newCell = Math.floor(Math.random() * emptyCells.length)
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
    }
    die () {
        matrix[this.y][this.x] = 0;
        this.x = undefined;
        this.y = undefined;
        alert("You losed! reload for try")
    }

};
// document.addEventListener('keydown', function (event) {
//     if (event.code == "KeyW") {
//         player.up()
//     }
//     if (event.code == "KeyS") {
//         player.down()
//     }
//     if (event.code == "KeyA") {
//         player.left()
//     }
//     if (event.code == "KeyD") {
//         player.rigth()
//     }
//     if(event.code == "KeyQ"){
//         player.hit()
//     }   
//     if(event.code == "KeyE"){
//         player.eat()
//     }
//     if(event.code == "KeyG"){
//         player.get()
//     }
//     if(event.code == "KeyH"){
//         player.heal()
//     }
// })  


