window.addEventListener("load", init);

function Triangle(p1, p2, p3){
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;

    this.toString = function(){
        return p1[0] + "," + p1[1] + " " + p2[0] + "," + p2[1] + " " + p3[0] + "," + p3[1];
    }

    this.getColor = function(){
        return lerpColor("#252c65", "#4ec3d2", Math.random());
    }
}

function Mesh(){
    this.points = [];
    this.triangles = [];

    this.toTriangles = function(){
        var tri = [];
        for(let i = 0; i < this.triangles.length; i += 3){
            tri.push(new Triangle(
                this.points[this.triangles[i]],
                this.points[this.triangles[i+1]],
                this.points[this.triangles[i+2]]
            ));
        }
        return tri;
    }
}


function init()
{
    window.svgbg = document.getElementById("svgbg");
    svgbg.setAttribute("width", window.outerWidth);
    svgbg.setAttribute("height", window.outerHeight);

    var mesh = new Mesh();
    for(let i = 0; i < 200; i++){
        mesh.points.push(getRandomPoint());
    }
    mesh.triangles = Delaunay.triangulate(mesh.points);

    var alltris = mesh.toTriangles();
    for(let i = 0; i < alltris.length; i++){
        svgbg.appendChild(makeTriangle(alltris[i]));
    }
}

function getRandomPoint(){
    let x = (Math.random()-0.1) * (window.outerWidth*1.2);
    let y = (Math.random()-0.1) * (window.outerHeight*1.2);
    return [x, y];
}

function makeTriangle(triangle){
    //console.log(triangle);
    var element = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    element.setAttribute("points", triangle.toString());
    element.style = "fill:" + triangle.getColor() + ";stroke:black;stroke-width:2";
    return element;
}

function lerpColor(a, b, amount) {
    var ah = parseInt(a.replace(/#/g, ''), 16),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ''), 16),
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}
