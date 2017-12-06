// All about elastic movement
anime({ // Only when the user load the page
  targets: '.button_left',
  scaleY: [
    { value: 1, delay: 0},
    { value: 1.2, duration: 120, easing: 'easeOutExpo' },
    { value: 1, duration: 1500, elasticity:850}
  ]
});

anime({ // Only when the user load the page
  targets: '.button_right',
  scaleY: [
    { value: 1, delay: 0},
    { value: 1.2, duration: 120, easing: 'easeOutExpo' },
    { value: 1, duration: 1500, elasticity:850}
  ]
});

function blob(x){
  var id = document.getElementById(x);
  anime({
    targets: id,
    scaleY: [
      {value: 1.2, duration: 150, easing: 'easeOutExpo'},
      {value: 1, duration: 1500, elasticity:850}
    ],
  });
};

// All about color over
function color_over(x){
  var cla = document.getElementsByClassName(x);
  anime({
    targets: cla,
    backgroundColor: [{value: '#91E6FA'}],
    color: [{value: '#112266'}],
    easing: 'linear',
    duration: 400
  });
};

function color_over_red(x){
  var cla = document.getElementsByClassName(x);
  anime({
    targets: cla,
    backgroundColor: [{value: '#FFA0A7'}],
    color: [{value: '#C12A34'}],
    easing: 'linear',
    duration: 400
  });
};

function color_over_green(x){
  var cla = document.getElementsByClassName(x);
  anime({
    targets: cla,
    backgroundColor: [{value: '#8DE599'}],
    color: [{value: '#009113'}],
    easing: 'linear',
    duration: 400
  });
};

// All about color leave
function color_leave(x){
  var cla = document.getElementsByClassName(x);
  anime({
    targets: cla,
    backgroundColor: [{value: '#112266'}],
    color: [{value: '#FFFFFF'}],
    easing: 'linear',
    duration: 400
  });
};

function color_leave_red(x){
  var cla = document.getElementsByClassName(x);
  anime({
    targets: cla,
    backgroundColor: [{value: '#C12A34'}],
    color: [{value: '#FFFFFF'}],
    easing: 'linear',
    duration: 400
  });
};

function color_leave_green(x){
  var cla = document.getElementsByClassName(x);
  anime({
    targets: cla,
    backgroundColor: [{value: '#009113'}],
    color: [{value: '#FFFFFF'}],
    easing: 'linear',
    duration: 400
  });
};

//Initial background switch button
function initialSwitch(){
  var elem = document.getElementById("circle");
  if(!elem)
    return;
  var going = localStorage.getItem("ethermediary-bg") == "true";
  if(going)
    elem.style.backgroundColor = '#262F67';
  else
    elem.style.backgroundColor = 'rgb(145, 230, 250)';
}
initialSwitch();

// loading animation
function loading(){

  var b1 = anime({
    targets: '.b1',
    translateY: [
      { value: 120, duration: 1000},
      { value: 120, duration: 500},
      { value: 180, duration: 1000},
      { value: 180, duration: 500},
    ],
    scale: [
      {value: 50, duration: 500, easing: 'linear'},
      {value: 50, duration: 400, elasticity:1000}
    ],
    rotate: {
      value: 360,
      duration: 900,
      easing: 'easeOutSine'
    },
    easing: 'easeInOutSine',
    duration: 2000,
    loop: true
  });

  var b2 = anime({
    targets: '.b2',
    translateY: [
      { value: 0, duration: 1000},
      { value: 0, duration: 500},
      { value: 60, duration: 1000},
      { value: 60, duration: 500},
    ],
    easing: 'easeInOutSine',
    duration: 2000,
    loop: true
  });

  var b3 = anime({
    targets: '.b3',
    translateY: [
      { value: 0, duration: 1000},
      { value: 0, duration: 500},
      { value: 60, duration: 1000},
      { value: 60, duration: 500},
    ],
    scaleX: [
      {value: 1, duration: 2400},
      {value: 1.2, duration: 50, easing: 'easeInOutSine'},
      {value: 1, duration: 550, elasticity:1000000}
    ],
    easing: 'easeInOutSine',
    duration: 2000,
    loop: true
  });

  var b4 = anime({
    targets: '.b4',
    scaleX: [
      {value: 1, duration: 2400},
      {value: 1.2, duration: 50, easing: 'easeInOutSine'},
      {value: 1, duration: 550, elasticity:1000}
    ],
    easing: 'easeInOutSine',
    duration: 2000,
    loop: true
  });
}
