anime({ // Only when the user load the page
  targets: '.button_left',
  scaleY: [
    { value: 1, delay: 25},
    { value: 1.2, duration: 120, easing: 'easeOutExpo' },
    { value: 1, duration: 1500, elasticity:850}
  ],
});

anime({ // Only when the user load the page
  targets: '.button_right',
  scaleY: [
    { value: 1, delay: 25},
    { value: 1.2, duration: 120, easing: 'easeOutExpo' },
    { value: 1, duration: 1500, elasticity:850}
  ],
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

function color_over(x){
  var cla = document.getElementsByClassName(x);
  anime({
    targets: cla,
    backgroundColor: [{value: '#91E6FA'}],
    easing: 'linear',
    duration: 400
  });
  anime({
    targets: cla,
    color: [{value: '#112266'}],
    easing: 'linear',
    duration: 400
  });
};

function color_leave(x){
  var cla = document.getElementsByClassName(x);
  anime({
    targets: cla,
    backgroundColor: [{value: '#112266'}],
    easing: 'linear',
    duration: 400
  });
  anime({
    targets: cla,
    color: [{value: '#FFFFFF'}],
    easing: 'linear',
    duration: 400
  });
};
