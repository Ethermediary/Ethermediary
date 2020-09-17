// Animate the background created using delaunay.js

class DelaunayBackground {
  constructor() {
    this.going = false;
    this.colorA = "#252c65";
    this.colorB = "#4ec3d2";
    this.delay = 50; // ms
    this.nbPoints = 100;
    this.mesh;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    svgbg.setAttribute("width", this.width);
    svgbg.setAttribute("height", this.height);

    this.circleSwitch = document.getElementById("circle");
    this.circleInfo = document.getElementById("clickme");

    localStorage.setItem("ethermediary-bg", false);

    // erase background
    window.svgbg = document.getElementById("svgbg");
    while (svgbg.firstChild) {
      svgbg.removeChild(svgbg.firstChild);
    }
  }

  reset() {
    this.mesh = new Mesh(
      this.nbPoints,
      this.width,
      this.height,
      this.colorA,
      this.colorB
    );

    // draw triangles from those points (heavy computation)
    this.mesh.makeTriangles();

    // insert mesh of triangles into the DOM
    for (let i = 0; i < this.mesh.triangleObjs.length; i++) {
      svgbg.appendChild(this.mesh.triangleObjs[i].DOM);
    }

    this.mesh.update(); // display fixed background

    if (this.going) {
      // animate eventually
      var t = this;
      window.updateInterval = setInterval(function () {
        t.mesh.update();
      }, this.delay);
      this.circleSwitch.style.backgroundColor = "#262F67";
    } else {
      this.circleSwitch.style.backgroundColor = "rgb(145, 230, 250)";
    }
  }

  /** Enable or disable the background animation as needed */
  switch() {
    this.going = !this.going;

    localStorage.setItem("ethermediary-bg", this.going);

    if (this.going) {
      var t = this;
      window.updateInterval = setInterval(function () {
        t.mesh.update();
      }, this.delay);
    } else {
      clearInterval(window.updateInterval);
    }

    if (!this.circleSwitch) return;
    if (this.going) {
      this.circleSwitch.style.backgroundColor = "#262F67";
      this.circleInfo.style.display = "none";
    } else {
      this.circleSwitch.style.backgroundColor = "rgb(145, 230, 250)";
      this.circleInfo.style.display = "block";
    }
  }

  /** Reset background if window is resized */
  resize() {
    this.reset();

    if (window.updateInterval) {
      clearInterval(window.updateInterval);
    }

    if (this.going) {
      var t = this;
      window.updateInterval = setInterval(function () {
        t.mesh.update();
      }, this.delay);
    }
  }
}

/** A mesh of triangles with respective directions */
class Mesh {
  /** get mesh of nbPoints points */
  constructor(nbPoints, maxWidth, maxHeight, colorA, colorB) {
    this.nbPoints = nbPoints;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.colorA = colorA;
    this.colorB = colorB;

    this.points = [];
    this.homePoints = [];
    this.directions = [];
    this.radiuses = [];
    this.velocity = [];
    this.triangles = [];
    this.colors = [];
    this.triangleObjs = [];

    /** get a 2D random point in the window */
    for (let i = 0; i < this.nbPoints; i++) {
      let x = (Math.random() - 0.1) * (this.maxWidth * 1.2);
      let y = (Math.random() - 0.1) * (this.maxHeight * 1.2);
      this.points.push([x, y]);
    }
  }

  /** build triangles using Delaunay triangulation */
  makeTriangles() {
    // get list of triangle coordinates
    this.triangles = Delaunay.triangulate(this.points);

    // to triangle objects
    for (let i = 0; i < this.triangles.length; i += 3) {
      this.triangleObjs.push(
        new Triangle(
          this.points[this.triangles[i]],
          this.points[this.triangles[i + 1]],
          this.points[this.triangles[i + 2]],
          getRandomColor(this.colorA, this.colorB)
        )
      );
    }

    // create DOM element for each triangle
    this.triangleObjs.forEach((t) => t.makeDOM());

    // assign random directions to points in mesh
    for (let i = 0; i < this.points.length; i++) {
      this.directions.push(Vector.random());
      this.velocity.push([0, 0]);
      this.radiuses.push(Math.random() * 1);
    }

    this.homePoints = this.points.map((p) => [p[0], p[1]]);
  }

  /** Animate background through time & update DOM */
  update() {
    for (let i = 0; i < this.points.length; i++) {
      var point = this.points[i];
      var home = this.homePoints[i];
      var distance = Vector.distanceSquared(point, home);

      if (distance > this.radiuses[i]) {
        var randomPoint = Vector.random();
        //randomPoint = mesh.homePoint[i] + randomPoint;
        randomPoint = Vector.add(randomPoint, this.homePoints[i]);
        //normalize(randomPoint - point);
        var vector = Vector.normalize(Vector.substract(randomPoint, point));
        this.directions[i] = vector;
      }

      var vect = this.directions[i];
      var vel = this.velocity[i];
      vel[0] += vect[0] * (1 / 60.0);
      vel[1] += vect[1] * (1 / 60.0);

      var velLength = Vector.length(vel);
      if (velLength > 10) {
        velLength = Math.sqrt(velLength);
        Vector.multiply(vel, 1.0 / velLength);
      }

      point[0] += vel[0];
      point[1] += vel[1];
    }

    this.triangleObjs.forEach((t) => t.updateDOM());
  }
}

/** Draw a triangle in the DOM using 3 points */
class Triangle {
  constructor(p1, p2, p3, color) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.color = color;
    this.DOM;
  }

  toString() {
    return (
      this.p1[0] +
      "," +
      this.p1[1] +
      " " +
      this.p2[0] +
      "," +
      this.p2[1] +
      " " +
      this.p3[0] +
      "," +
      this.p3[1]
    );
  }

  /** create a DOM element for the triangle */
  makeDOM() {
    var element = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    element.setAttribute("points", this.toString());
    element.style = "fill:" + this.color + ";stroke:black;stroke-width:2";
    this.DOM = element;
  }

  /** update DOM element content with current triangle */
  updateDOM() {
    this.DOM.setAttribute("points", this.toString());
  }
}

/** get random color between A & B */
function getRandomColor(colorA, colorB) {
  return lerpColor(colorA, colorB, Math.random());
}

var Vector = (function () {
  return {
    normalize: function (v) {
      let length = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
      v[0] /= length;
      v[1] /= length;
      return v;
    },

    distanceSquared: function (p1, p2) {
      var diff = [p2[0] - p1[0], p2[1] - p1[1]];
      return diff[0] * diff[0] + diff[1] * diff[1];
    },

    length: function (v) {
      return v[0] * v[0] + v[1] * v[1];
    },

    multiply: function (v, val) {
      v[0] *= val;
      v[1] *= val;
    },

    add: function (v1, v2) {
      v1[0] = v1[0] + v2[0];
      v1[1] = v1[1] + v2[1];
      return v1;
    },

    substract: function (v1, v2) {
      return [v1[0] - v2[0], v1[1] - v2[1]];
    },

    random: function () {
      return Vector.normalize([Math.random(), Math.random()]);
    },
  };
})();

/** Linearly interpolate between two colors by the given amount */
function lerpColor(a, b, amount) {
  var ah = parseInt(a.replace(/#/g, ""), 16),
    ar = ah >> 16,
    ag = (ah >> 8) & 0xff,
    ab = ah & 0xff,
    bh = parseInt(b.replace(/#/g, ""), 16),
    br = bh >> 16,
    bg = (bh >> 8) & 0xff,
    bb = bh & 0xff,
    rr = ar + amount * (br - ar),
    rg = ag + amount * (bg - ag),
    rb = ab + amount * (bb - ab);

  return (
    "#" + (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1)
  );
}

var delaunayBackground = new DelaunayBackground();

window.addEventListener("resize", delaunayBackground.resize());
window.addEventListener("load", delaunayBackground.reset());
