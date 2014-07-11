function Point(x, y, radius) {
    this.xCord = x;
    this.yCord = y;
    this.r = radius;
}

var point1 = new Point(100, 0, 90);
var point2 = new Point(0, 100, 40);
var point3 = new Point(0, 0, 160);

function calculate_Intersection(point1, point2, point3) {

    var x0 = point1.xCord;
    var y0 = point1.yCord;
    var r0 = point1.r;

    var x1 = point2.xCord;
    var y1 = point2.yCord;
    var r1 = point2.r;

    var x2 = point3.xCord;
    var y2 = point3.yCord;
    var r2 = point3.r;

    var dx = x1 - x0;
    var dy = y1 - y0;

    var d = Math.sqrt((dx * dx) + (dy * dy));

    if (d > (r0 + r1)) {
        return 0;
    }

    if (d < Math.abs(r0 - r1)) {
        return 0;
    }

    var a = ((r0 * r0) - (r1 * r1) + (d * d)) / (2.0 * d);

    var point2_x = x0 + (dx * a / d);
    var point2_y = y0 + (dy * a / d);

    var h = Math.sqrt((r0 * r0) - (a * a));

    var rx = (-(dy)) * (h / d);
    var ry = (dx) * (h / d);

    var intersectionPoint1_x = point2_x + rx;
    var intersectionPoint2_x = point2_x - rx;
    var intersectionPoint1_y = point2_y + ry;
    var intersectionPoint2_y = point2_y + ry;

    var dx1 = intersectionPoint1_x - x2;
    var dy1 = intersectionPoint1_y - y2;

    var d1 = Math.sqrt((dx1 * dx1) + (dy1 * dy1));

    var dx2 = intersectionPoint2_x - x2;
    var dy2 = intersectionPoint2_y - y2;

    var d2 = Math.sqrt((dx2 * dx2) + (dy2 * dy2));

    if (Math.abs(d1 - r2) < .1) {

        var myArray = new Array(2);
        myArray[0] = dx1;
        myArray[1] = dy1;
        return myArray;
    } else if (Math.abs(d2 - r2) < .1) {
        var myArray = new Array(2);
        myArray[0] = dx2;
        myArray[1] = dy2;
        return myArray;
    } else {
        var myArray = new Array(2);
        myArray[0] = (dx1+dx2)/2;
        myArray[1] = (dy2+dy2)/2;
        return myArray;
    }

}

console.log(calculate_Intersection(point1, point2, point3));
