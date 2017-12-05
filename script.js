window.onload = () => {
  let cityName = document.querySelector("#city");
  let button = document.querySelector("#submit");
  let weather = document.querySelector('#weather');
  // Checks value type and displays property and value.
  let logLi = (k, j) => {
    const liAppend = (x, y) => {
      x.appendChild(y);
      weather.appendChild(x);
    }
    if (typeof j === 'object') {
      isObject(j);
    } else if (k == 'temp' || k == 'name') {
      let li = document.createElement('LI');
      li.style.gridColumn = "3/-1"

      if (isNaN(j)) {
        let liText = document.createTextNode(j);
        liAppend(li, liText);
      } else {
        let bar = document.createElement("div");
        let temp = Math.round(j, 2);
        if (temp < 0) {
          let liText = document.createTextNode(temp);
          bar.style.transformOrigin = "0%";
          bar.style.transform = `rotate(180deg)`;
          temp = -temp;
          bar.style.width = temp * 20 + "px";
          bar.style.height = "50px";
          bar.style.backgroundColor = 'black';
          li.appendChild(liText);
          li.appendChild(bar);
          weather.appendChild(li);
        } else {
          let liText = document.createTextNode(temp);
          // bar.style.transformOrigin = "100%";
          bar.style.transform = `rotate(0deg)`;
          // temp != -temp;
          bar.style.width = temp * 20 + "px";
          bar.style.height = "50px";
          bar.style.backgroundColor = 'black';
          li.appendChild(liText);
          li.appendChild(bar);
          weather.appendChild(li);
        }
      }

      // let liText = document.createTextNode(Math.round(j,2));
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
