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

//The background switch button
function bgSwitch(){
  var id = document.getElementById('circle');
  style = window.getComputedStyle('circle'),
  bgcolor = style.getPropertyValue('background-color');

  if(bgcolor == 'rgb(38, 47, 103)')
    id.style.backgroundColor = 'rgb(145, 230, 250)';
  else
    id.style.backgroundColor = '#262F67';
};

//Initial background switch button
function initialSwitch(){
  var going = localStorage.getItem("ethermediary-bg") == "true";
  if(going)
    document.getElementById("circle").style.backgroundColor = '#262F67';
  else
    document.getElementById("circle").style.backgroundColor = 'rgb(145, 230, 250)';
}
initialSwitch();
