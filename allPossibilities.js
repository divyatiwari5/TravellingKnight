let POSSIBLE_STEPS = [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2,-1], [-2, 1], [-2, -1]];
let cordChildTree = null;
let initialCordString = null;
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
    let cordTree = {};
    let queue = [];
    let parentPath = new Set([initialCordString]);
    initialCordString = initialCord.toString();

    // Travelling initial coordinate
    if(isValidCoordinate(initialCord, n)) {
        queue.push(initialCord);
        cordChildTree = getAllChild(initialCord, n);
    }else {
        return new Set();
    }

    let allPossiblePaths = traverseChild(initialCord, parentPath);
    return new Set(allPossiblePaths);
}

/**
 * Traverse on the child from current coordinate
 * @param currCord Current coordinate
 * @param parentPath parent path to prevent loop
 */
function traverseChild(currCord, parentPath) {
    let allPaths = [];
    currCordString = currCord.toString();

    // Create a new parent path to keep a watch on cyclic loop
    let newParentPath = new Set(parentPath);
    newParentPath.add(currCordString);
    let childs = cordChildTree[currCord.toString()].childs;
    // Traverse on each child
    childs.forEach((child) =>
    {
        if (!newParentPath.has(child.toString())) {
            // If child does not exist already in newParentPath, call traverse from child node along with modified
            // parent path
            allPaths = allPaths.concat(traverseChild(child, newParentPath));
        } else {
            // If the child already exists in parent path, dn't
            allPaths.push(Array.from(newParentPath).join("|"));
        }
    });
    if (allPaths.length === 0) {
        // If there are no childs and array of the allaths
        return [Array.from(newParentPath).join("|")];
    }
    return allPaths;
}

/**
 * Gets all child in coord (csv): {childs: []} format
 * @param initialCord
 * @param size
 */
function getAllChild(initialCord, size) {
    let childTree = {}
    let queue = [initialCord];
    // While there is an element in queue
    while (queue.length > 0) {
        let currentCord = queue.pop();
        let currentCordString = currentCord.toString();

        // If element already exists, no need to recalculate
        if (currentCordString in childTree) {
            continue;
        }

        // Create a ref in child tree
        childTree[currentCordString] = {
            childs: []
        }
        let currentCordChild = childTree[currentCordString].childs;

        // For each step of knight
        POSSIBLE_STEPS.forEach((step) => {
            let stepDestination = travel(currentCord, step);
            let stepDestinationString = stepDestination.toString();

            // Travelling to stepDestination if it is a valid coordinate and is not already travelled
            if (isValidCoordinate(stepDestination, size)) {
                currentCordChild.push(stepDestinationString);
                queue.push(stepDestination);
            }
        });
    }

    console.log(childTree);
    return childTree;
}

/**
 * Passing the current position of knight as (1,1) & size of chess board as 8
 */
let travelPlan = travellingKnight(0, 0, 3);
console.log(travelPlan);
