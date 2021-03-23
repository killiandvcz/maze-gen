<script>
    import {height, maze, width} from "../stores/stores";

    let temph = 5;
    let tempw = 5;

    const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

    function findId(x,y){
        let id = ( y - 1 ) * $width + x
        return id - 1
    }

    function reverse(direction){
        let dir = {
            left: 'right',
            right: 'left',
            top: 'bottom',
            bottom: 'top'
        }
        return dir[direction]
    }

    function recursive() {
        let x = 1;
        let y = 1;
        let i = 0

        let fullStack = [];
        let stackN = 1

        $maze.forEach(tile => {
            fullStack = {...fullStack, [stackN]: tile}
            stackN++
        })

        do{
            let tempStack = [];
            let currentTile = $maze[findId(x,y)];

            let leftTile = $maze[findId(x - 1, y)]
            let rightTile = $maze[findId(x + 1, y)]
            let topTile = $maze[findId(x, y - 1)]
            let bottomTile = $maze[findId(x, y + 1)]

            if (x - 1 >= 1 && leftTile !== undefined && leftTile.visited === false){
                tempStack.push({direction: 'left', tile: leftTile});
            }

            if (x + 1 <= $width && rightTile !== undefined && rightTile.visited === false){
                tempStack.push({direction: 'right', tile: rightTile});
            }

            if (y - 1 >= 1 && topTile !== undefined && topTile.visited === false){
                tempStack.push({direction: 'top', tile: topTile});
            }

            if (y + 1 <= $height && bottomTile !== undefined && bottomTile.visited === false){
                tempStack.push({direction: 'bottom', tile: bottomTile})
            }

            if(tempStack.length >= 1){
                currentTile.visited = true;

                let randomArray = [];
                randomArray.push(Math.ceil(Math.random() * tempStack.length - 1));
                let random = randomArray[0];

                let selectedStack = tempStack[random];
                let direction = selectedStack.direction;
                let reverseDirection = reverse(direction);
                let nextTile = selectedStack.tile;

                currentTile[direction] = false;
                nextTile[reverseDirection] = false;

                delete fullStack[findId(x, y) + 1]


                x = nextTile.x;
                y = nextTile.y;
            }else if(tempStack.length === 0){

                tempStack = []

                currentTile.visited = true;
                delete fullStack[findId(x, y) + 1];
                let lostTile = fullStack[Object.keys(fullStack)[0]]
                console.log({lostTile : lostTile});

                if (lostTile === undefined){
                    break
                }

                x = lostTile.x;
                y = lostTile.y;

                currentTile = $maze[findId(x,y)];
                leftTile = $maze[findId(x - 1, y)]
                rightTile = $maze[findId(x + 1, y)]
                topTile = $maze[findId(x, y - 1)]
                bottomTile = $maze[findId(x, y + 1)]

                if (x - 1 >= 1 && leftTile !== undefined && leftTile.visited === true){
                    tempStack.push({direction: 'left', tile: leftTile});
                }

                if (x + 1 <= $width && rightTile !== undefined && rightTile.visited === true){
                    tempStack.push({direction: 'right', tile: rightTile});
                }

                if (y - 1 >= 1 && topTile !== undefined && topTile.visited === true){
                    tempStack.push({direction: 'top', tile: topTile});
                }

                if (y + 1 <= $height && bottomTile !== undefined && bottomTile.visited === true){
                    tempStack.push({direction: 'bottom', tile: bottomTile})
                }

                console.log({templost: tempStack})


                currentTile.visited = true;

                console.log({cur: currentTile})
                let randomArray = [];
                randomArray.push(Math.ceil(Math.random() * tempStack.length - 1));
                let random = randomArray[0];

                let selectedStack = tempStack[random];
                let direction = selectedStack.direction;
                let reverseDirection = reverse(direction);
                let nextTile = selectedStack.tile;

                currentTile[direction] = false;
                nextTile[reverseDirection] = false;

                delete fullStack[findId(x, y) + 1]
            }
            i++


        }while (fullStack.length !== 0)

        $maze[findId(1,1)].top = false

        $maze[findId($width,$height)].bottom = false




    }

    function generate() {
        let temp = []

        for (let i = 1; i <= $height * $width; i++){
            let y = Math.ceil(i/$width);
            let x = i - ($width * (y - 1))
            temp.push({
                i,
                x,
                y,
                visited: false,
                top: true,
                right: true,
                bottom: true,
                left: true,
                data: '',
            })
        }

        maze.set(temp);
        height.set(temph);
        width.set(tempw);

        recursive();



    }


</script>

<div class="board">

    <label class="child">
        Height {temph}
        <input type=number bind:value={temph} min=5 max=25>
    </label>

    <label class="child">
        Width {tempw}
        <input type=number bind:value={tempw} min=5 max=25>
    </label>

    <button class="child" on:click={generate}>Générer</button>



</div>



<style type="text/scss">

    .board{
      padding: 50px;
      display: flex;
      align-items: center;
      justify-content: center;

      .child{
        margin-right: 25px;
      }
    }


</style>