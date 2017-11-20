window.onload = () => {
  let cityName = document.querySelector("#city");
  let button = document.querySelector("#submit");
  let weather = document.querySelector('#weather');
  // Checks value type and displays property and value.
  let logLi = function(k, j) {
    if (typeof j === 'object') {
      isObject(j);
    } else {
      let li = document.createElement('LI');
      let liText = document.createTextNode('\u00A0\u00A0\u00A0\u00A0' + k + ": " + j);
      li.appendChild(liText)
      weather.appendChild(li);
    }
  }
  // Checks Object's name type, and displays name of object or Array
  let logUl = (x) => {
    if (isNaN(x)) {
      let output = document.createElement('UL');
      let outputText = document.createTextNode(x);
      output.appendChild(outputText);
      weather.appendChild(output);
    }
  }

  // Calls logLi on every value in object
  let isObject = (x) => {
    for (let i in x) {
      logLi(i, x[i]);
    }
  };

  //Updates Query url when user submits their city
  let city = () => {
    weather.innerHTML = '';
    let api = "https://api.openweathermap.org/data/2.5/weather?q=";
    let units = "&units=metric&APPID=a3c1886f5eb76ddfb52f47c56366e0e3"
    let url;
    url = api + cityName.value + units;

    //Breaks down the JSON
    $(document).ready(function() {
      $.getJSON(url, function(data) {
        let sort = (x) => {
          for (let k in x) {
            if (typeof x[k] == 'number' || typeof x[k] == 'string') {
              logLi(k, x[k]);
            } else if (Array.isArray(x[k])) {
              logUl(k);
              sort(x[k]);
            } else if (typeof x[k] == 'object') {
              logUl(k);
              isObject(x[k]);
            }
          }
        }
        sort(data);

      });
    });
  }
  //Submition
  button.onclick = city;
  cityName.addEventListener('keypress', function(e) {
    if (e.keyCode == 13) {
      city();
    }
  });

};
