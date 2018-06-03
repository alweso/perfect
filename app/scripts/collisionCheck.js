function colCheck(shapeA, shapeB, goesThroughWalls) {
    // get the vectors to check against
    var goesThroughWalls = goesThroughWalls;
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
    vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
        oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                if(!goesThroughWalls) {
                    // console.log(goesThroughWalls);
                   shapeA.y += oY; 
                }
                
            } else {
                colDir = "b";

                if(!goesThroughWalls) {
                shapeA.y -= oY;
            } 
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                if(!goesThroughWalls) {
                    // console.log(goesThroughWalls);
                    shapeA.x += oX;
                }
            } else {
                colDir = "r";
                if(!goesThroughWalls) {
                    // console.log(goesThroughWalls);
                    shapeA.x -= oX;
                }
            }
    }
        }
    return colDir;
}