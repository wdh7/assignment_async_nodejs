var fs = require('fs');

// 1
var p = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('Hello Promise!');
  }, 1000);
})

p.then(function(msg) {
  console.log(msg);
});



// 2
function delay(seconds) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(seconds);
    }, seconds)
  });
}

function countDown(seconds) {
  var current = seconds;

  if (current === 0) {
    return console.log('Done!');
  }

  if (current) {
    console.log(current);

    return current -= 100;
  }
}

delay(1000)
  .then(countDown) //=> 1000
  .then(countDown) //=> 900
  .then(countDown) //=> 800
  .then(countDown) //=> 700
  .then(countDown) //=> 600
  .then(countDown) //=> 500
  .then(countDown) //=> 400
  .then(countDown) //=> 300
  .then(countDown) //=> 200
  .then(countDown) //=> 100
  .then(countDown); //=> Done!



// 3
function foo(num) {
  return new Promise(function(resolve, reject) {
    if (typeof(num) !== 'number') {
      reject('Need a number');
    } else if (typeof(num) === 'number') {
      resolve(num * num);
    }
  })
}

var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var newNumbers = numbers.map(foo)

Promise.all(newNumbers).then(function(arr) {
  console.log(arr);
})




// 4
function doBadThing(forRealz) {
  return new Promise(function(resolve, reject) {
    if (!forRealz) {
      resolve('Yay!');
    } else {
      reject('forRealz is truthy');
    }
  })
}

doBadThing(0)
  .then(function(res) {
    console.log(res);
  })
  .catch(function(err) {
    console.error(err);
  })

doBadThing(1)
  .then(function(res) {
    console.log(res);
  })
  .catch(function(err) {
    console.error(err);
  })


// 5
var fsp = {
  readFile: function(file) {
    // readFile
    return new Promise(function(resolve, reject) {
      fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    })
  },
  writeFile: function(file, text) {
    // writeFile
    return new Promise(function(resolve, reject) {
      fs.writeFile(file, text, 'utf8', function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(text);
        }
      })
    })
  },
  appendFile: function(file, text) {
    // appendFile
    return new Promise(function(resolve, reject) {
      fs.appendFile(file, text, 'utf8', function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(text)
        }
      })
    })
  }
}


fsp.readFile('./data/lorem.txt')
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.error(err);
  })

fsp.writeFile('./data/test.txt', 'Hello World!')
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  })

fsp.appendFile('./data/test.txt', 'Hello World, again.')
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.error(err);
  })
