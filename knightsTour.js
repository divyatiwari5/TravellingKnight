/**
 * Checks if the coordinates lie inside the bounds of the board
 * @param {Array.<Number>} coords represents the coordinates
 * @param {Number} n represents the size of the chess board
 * @return {Boolean} true if the coordinates lie inside the bounds of the board and false if not
 */
function isValidCoordinate(coords, n) {    
    return (0 <= coords[0]) && (coords[0] < n) && (0 <= coords[1]) && (coords[1] < n)
}

/**
 * Calculates possible step to be travelled by knight
 * @param {Array.<Number>} coordinate 
 * @param {Array.<Number>} step 
 * @return {Array.<Number>} possible step to be travelled by knight
 */
function travel(coordinate, step) {
    let destination = [coordinate[0]+step[0], coordinate[1]+step[1]]
    return destination;
}

/**
 * Returns ordered data structure
 * @param {*} x represents x-axis coordinate
 * @param {*} y represents y-axis coordinate
 * @param {*} n represents the size of the chess board
 */
function travellingKnight(x, y, n) {
    let initialCord = [x, y];
    // Defining 8 possible steps that a knight can travel
    let possibleSteps = [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2,-1], [-2, 1], [-2, -1]];

    // FIFO Queue to store untraversed travelled coordinates in an ordered manner
    let fifoQueue = [];

    let cordTree = {};

    let travelledCord = [];

    // Travelling initial coordinate
    if(isValidCoordinate(initialCord, n)) {
        // traverse(n, new Set([initialCord.toString()]), initialCord, cordTree);
       fifoQueue.push(initialCord);
       cordTree[initialCord.toString()] = {
           childs: []
       };
       travelledCord.push(initialCord.toString());
    }

    // Travelling next moves for each coordinates in FIFO Queue
    while(fifoQueue.length > 0) {
        var currentCoordinate = fifoQueue.pop();
        let currentCordChild = cordTree[currentCoordinate.toString()].childs;

        possibleSteps.forEach((step) => {
            let stepDestination = travel(currentCoordinate, step);
            let stepDestinationString = stepDestination.toString();

            // Travelling to stepDestination if it is a valid coordinate and is not already travelled
            if (isValidCoordinate(stepDestination, n) && !(stepDestinationString in cordTree)) {
                fifoQueue.push(stepDestination);
                currentCordChild.push(stepDestinationString);
                cordTree[stepDestinationString] = {
                    childs: []
                };
                travelledCord.push(stepDestinationString);
            }
        });
    }

    console.log(cordTree);
    console.log(travelledCord.length);

    return {initial: initialCord.toString(), tree: cordTree}
}

/**
 * Passing the current position of knight as (1,1) & size of chess board as 8
 */
travellingKnight(0, 0, 8);