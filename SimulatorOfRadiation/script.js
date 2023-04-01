const socket = io()
var side = 25;


function setup() {
    createCanvas(40 * side, 40 * side);

}
function changeColor(matrix, grassArr, grassEaterArr) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green")
                for (let i in grassArr) {
                    if (grassArr[i].x == x && grassArr[i].y == y) {
                        if (grassArr[i].mutated) {
                            fill("lime")
                            break;
                        }
                    }
                }
            } else if (matrix[y][x] == 2) {
                fill("yellow")
                for (let i in grassEaterArr) {
                    if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                        if (grassEaterArr[i].mutated) {
                            fill("orange")
                            break;
                        }
                    }
                }
            } else if (matrix[y][x] == 3) {
                fill("red")
            } else if (matrix[y][x] == 4) {
                fill("blue")
            }else if(matrix[y][x] == 5){
                fill ("purple")
            }
            else {
                fill(77,44,44)
            }
            rect(x * side, y * side, side, side)

        }
    }



}

socket.on("send matrix", changeColor)


function keyboard(a, b, c, player){
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

}

socket.on("send player", keyboard)

