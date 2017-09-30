var jsonfile = require('jsonfile')

//module.exports = monitor

//process.on('cleanup',callback);

// do app specific cleaning before exiting
process.on('exit', function () {
 process.stdin.resume();
  logwrite();
  process.emit('cleanup');
})

// catch ctrl+c event and exit normally
process.on('SIGINT', function () {
  process.stdin.resume();
  logwrite();
  console.log('Ctrl-C...');
  process.exit(2);
})

//catch uncaught exceptions, trace, then exit normallylogwrite()

process.on('uncaughtException', function(e) {
  process.stdin.resume();
  logwrite();
  console.log('Uncaught Exception...');
  console.log(e.stack);
  process.exit(99);
})

function logload(){
  console.log('Loading monitoring file ...')
  //File exist ?
  //If not create

  //Today date exist ?
  //If yes load variables
  //And create related objects
}

function logwrite(){
  console.log('Writing monitoring file ...')

  var file = 'data.json';
  var obj = {name: 'JP'};

  jsonfile.writeFile(file, obj, {flag: 'a'}, function (err) {
    console.error(err)
    if(err){console.log('Erreur !!!');}
  });

  jsonfile.readFile(file, function(err, obj) {
    console.log(obj)
  });
}
