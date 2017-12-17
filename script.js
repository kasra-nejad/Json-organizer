window.onload = () => {
  let cityName = document.querySelector("#city");
  let button = document.querySelector("#submit");
  let weather = document.querySelector('#weather');
  let weatherData = document.querySelector(".weatherData");
  let top = document.querySelector(".top");
  let bottom = document.querySelector(".bottom");
  let bar = document.querySelector(".bar");
  let degrees = document.querySelector(".degrees");
  let jsonData;

  //Updates url when user submits their city
  let city = () => {

    weather.innerHTML = '';
    const api = "https://api.openweathermap.org/data/2.5/weather?q=";
    const units = "&units=metric&APPID=a3c1886f5eb76ddfb52f47c56366e0e3"
    let url = api + cityName.value + units;
    const plus = () => {
      degrees.innerHTML = '';
      degrees.classList.add("space-left");
      degrees.classList.remove("space-right");
      bar.classList.add("reverse");
    }
    const minus = () => {
      degrees.innerHTML = '';
      degrees.classList.add("space-right");
      degrees.classList.remove("space-left");
      bar.classList.remove("reverse");
    }

    //Breaks down the JSON
    $(document).ready(function() {
      $.getJSON(url, function(data) {
        jsonData = data;
        let location = jsonData.name;
        let temp = Math.round(jsonData.main.temp, 2);
        let liText = document.createTextNode(temp);
        top.innerHTML = location;
        top.classList.add('location');
        if (temp < 0) {
          temp = -temp;
          minus();
        } else {
          plus();
         }

        degrees.appendChild(liText);
        bar.style.width = temp * 20 + "px";
        bar.appendChild(degrees);
        bar.classList.add("active-bar");
        bottom.appendChild(bar);
        weather.appendChild(weatherData);
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
