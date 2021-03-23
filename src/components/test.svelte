

async function recursive() {
    let x = 1;
    let y = 1;
    let i = 0;
    let tileN = 1;
    let fullStack = [];
    let fsN = 1
    $maze.forEach(tile => {
    fullStack = {...fullStack, [fsN]: tile}
    fsN++
})

    console.log({fullStart: fullStack})

    $maze[findId(1, 1)].visited = true;


    do {
    let tempStack = [];
    let currentTile = $maze[findId(x, y)];
    //console.log({current: currentTile})

    let leftTile = $maze[findId(x - 1, y)]
    let rightTile = $maze[findId(x + 1, y)]
    let topTile = $maze[findId(x, y - 1)]
    let bottomTile = $maze[findId(x, y + 1)]

    if (x - 1 >= 1 && leftTile !== undefined && leftTile.visited === false) {
    tempStack.push({direction: 'left', tile: leftTile});
}

    if (x + 1 <= $width && rightTile !== undefined && rightTile.visited === false) {
    tempStack.push({direction: 'right', tile: rightTile});
}

    if (y - 1 >= 1 && topTile !== undefined && topTile.visited === false){
    tempStack.push({direction: 'top', tile: topTile});
}

    if (y + 1 <= $height && bottomTile !== undefined && bottomTile.visited === false){
    tempStack.push({direction: 'bottom', tile: bottomTile});
}

    if (tempStack.length >= 1) {
    let randomArray = [];
    randomArray.push(Math.ceil(Math.random() * tempStack.length - 1));
    let random = randomArray[0];

    let selectedStack = tempStack[random];
    let direction = selectedStack.direction;
    let reverseDirection = reverse(direction);
    let nextTile = selectedStack.tile;

    nextTile[reverseDirection] = false;
    currentTile[direction] = false;
    nextTile.visited = true;
    currentTile.data = tileN;
    tileN++

    delete fullStack[findId(x, y) + 1];
    //console.log({full: fullStack});
    //console.log({from: currentTile, to: nextTile});


    x = nextTile.x;
    y = nextTile.y;

} else {
    let lostTile = fullStack[Object.keys(fullStack)[0]]

    x = lostTile.x;
    y = lostTile.y;
    tempStack = [];

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

    //console.log({cur: currentTile, tempStack})

    let randomArray = [];
    randomArray.push(Math.ceil(Math.random() * tempStack.length - 1));
    let random = randomArray[0];

    let selectedStack = tempStack[random];
    let direction = selectedStack.direction;
    console.log({iam: currentTile, go: direction})
    let reverseDirection = reverse(direction);
    let nextTile = selectedStack.tile;

    //console.log({from: currentTile, to: nextTile});

    nextTile[reverseDirection] = false;
    currentTile[direction] = false;
    currentTile.visited = true;
    nextTile.visited = true;
    delete fullStack[findId(x, y) + 1];


}

    i++

} while (i < 2500)

    console.log($maze);
}