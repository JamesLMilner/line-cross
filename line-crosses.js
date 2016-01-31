console.log(checkLinesGeoJSON(lines1)); //Should be true
console.log(checkLinesGeoJSON(lines2)); //Should be false
console.log(checkLinesGeoJSON(lines3)); //Should be true
console.log(checkLinesGeoJSON(lines4)); //Should be false
console.log(checkLinesGeoJSON(lines5)); //Should be true


function toWebMercator(aX, aY) {
    if ((Math.abs(aX) > 180 || Math.abs(aY) > 90)) {
        return;
    }

    var num = aX * 0.017453292519943295;
    var x = 6378137.0 * num;
    var a = aY * 0.017453292519943295;

    wmX = x;
    wmY = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));

    return [wmX, wmY];
}


function checkLinesGeoJSON(lines) {
    // Check two lines in the same GeoJSON feature collection
    var l1 = lines.features[0];
    var l2 = lines.features[1];

    return checkLines(l1, l2);

}

function checkLines(l1, l2) {
    // Check two GeoJSON lines against each otehr

    var c1 = l1.geometry.coordinates;
    var c2 = l2.geometry.coordinates;

    var aWm = toWebMercator(c1[0][0], c1[0][1]);
    var aX = aWm[0];
    var aY = aWm[1];

    var bWm = toWebMercator(c1[1][0], c1[1][1]);
    var bX = bWm[0];
    var bY = bWm[1];

    var cWm = toWebMercator(c2[0][0], c2[0][1]);
    var cX = cWm[0];
    var cY = cWm[1];

    var dWm = toWebMercator(c2[1][0], c2[1][1]);
    var dX = dWm[0];
    var dY = dWm[1];
    console.log(aX, aY, bX, bY, cX, cY, dX, dY);
    return linesIntersect(aX, aY, bX, bY, cX, cY, dX, dY);

}

function linesIntersect(aX, aY, bX, bY, cX, cY, dX, dY) {


    // Based off of - http://ideone.com/PnPJgb
    var CmPX = cX - aX;
    var CmPY = cY - aY;

    var rX = bX - aX;
    var rY = bY - aY;

    var sX = dX - cX;
    var sY = dY - cY;

    var CmPxr = CmPX * rY - CmPY * rX;
    var CmPxs = CmPX * sY - CmPY * sX;
    var rxs   = rX * sY - rY * sX;

    // Check to see if lines are collinear
    if (CmPxr === 0.0) {
        var t1 = ((cX - aX < 0.0) != (cX - bX < 0.0));
        var t2 = ((cY - aY < 0.0) != (cY - bY < 0.0));
        return  t1 || t2 ;
    }

    // Check to see if lines are parallel
    if (rxs === 0.0) {
        return false;
    }

    var rxsr = 1.0 / rxs;
    var t    = CmPxs * rxsr;
    var u    = CmPxr * rxsr;

    return (t >= 0.0) && (t <= 1.0) && (u >= 0.0) && (u <= 1.0);

}
