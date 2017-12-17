window.onload = () => {
  const cityName = document.querySelector("#city");
  const button = document.querySelector("#submit");
  const weather = document.querySelector('#weather');
  const weatherData = document.querySelector(".weatherData");
  const top = document.querySelector(".top");
  const bottom = document.querySelector(".bottom");
  const bar = document.querySelector(".bar");
  const degrees = document.querySelector(".degrees");
  let jsonData;

  //Updates url when user submits their city
  const city = () => {
    weather.innerHTML = '';
    const api = "https://api.openweathermap.org/data/2.5/weather?q=";
    const units = "&units=metric&APPID=a3c1886f5eb76ddfb52f47c56366e0e3"
    const url = api + cityName.value + units;
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
        const location = jsonData.name;
        const temp = Math.round(jsonData.main.temp, 2);
        const liText = document.createTextNode(temp);
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
