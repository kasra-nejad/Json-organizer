$(document).ready(function() {
  let location = 'http://api.openweathermap.org/data/2.5/weather?q=Tehran&units=metric&APPID=37b3bd6754246ed9f8c27d7b9ab81a8e';
  $.getJSON(location, function(data) {

    let sort = function(x) {
      let output = '';
      for (let k in x) {
        if (typeof x[k] == 'number' || typeof x[k] == 'string') {
            logIt(k, x[k]);
        }
        else if (Array.isArray(x[k])){
            sort(x[k]);
        }
        else if (typeof x[k] == 'object') {
            isObject(x[k]);
            output += '<ul>'+k+'</ul>';
        }
       // console.log(output);
       document.querySelector('body').innerHTML = output;
      }
    }
    sort(data);
  });
});

let logIt = function(k, j) {
  console.log(k + " : " + j);
}

let isObject = function(x) {
  for (let i in x) {
    logIt(i, x[i]);
  }
};
