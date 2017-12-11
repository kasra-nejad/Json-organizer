window.onload = () => {
  let cityName = document.querySelector("#city");
  let button = document.querySelector("#submit");
  let weather = document.querySelector('#weather');
  // Checks value type and displays property and value.
  const logLi = (k, j) => {
    const li = document.createElement('LI');

    const displayCity = (x, y) => {
      x.appendChild(y);
      x.style.gridColumn = "4/6";
      x.classList.add("location");
      weather.appendChild(x);
    }

    const displayTemp = (x) => {
      let bar = document.createElement("div");
      let temp = Math.round(x, 2);
      let liText = document.createTextNode(temp);
      let degrees = document.createElement("div");
      const project = () => {
        degrees.appendChild(liText);
        bar.style.width = temp * 20 + "px";
        bar.appendChild(degrees);
        bar.classList.add("bar");
        li.appendChild(bar);
        li.classList.add("tempBar");
        li.style.gridColumn = "5/-1";
        weather.appendChild(li);
      }
      if (temp < 0) {
        temp = -temp;
        degrees.classList.add("space-right");
        project();
      } else {
        degrees.classList.add("space-left");
        bar.classList.add("reverse");
        project();
      }
    }

    if (typeof j === 'object') {
      isObject(j);
    } else if (k == 'temp' || k == 'name') {
      if (isNaN(j)) {
        let liText = document.createTextNode(j);
        displayCity(li, liText);
      } else {
        displayTemp(j);
      }
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
              sort(x[k]);
            } else if (typeof x[k] == 'object') {
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
