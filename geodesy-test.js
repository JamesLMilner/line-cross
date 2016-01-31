function checkLatLng(lines) {
    var l1 = lines.features[0];
    var l2 = lines.features[1];
    var c1 = l1.geometry.coordinates;
    var c2 = l2.geometry.coordinates;

    var aX = c1[0][0];
    var aY = c1[0][1];
    var bX = c1[1][0];
    var bY = c1[1][1];

    var cX = c2[0][0];
    var cY = c2[0][1];
    var dX = c2[1][0];
    var dY = c2[1][1];

    var latlon1 = new LatLon(aX, aY);
    var latlon2 = new LatLon(bX, bY);
    var latlon3 = new LatLon(cX, cY);
    var latlon4 = new LatLon(dX, dY);

    return LatLon.intersection(latlon1, latlon2, latlon3, latlon4);
}

console.log(checkLatLng(lines1)); //Should be true
console.log(checkLatLng(lines2)); //Should be false
console.log(checkLatLng(lines3)); //Should be false
console.log(checkLatLng(lines4)); //Should be false
console.log(checkLatLng(lines5)); //Should be false
