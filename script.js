window.onload = () => {
  let cityName = document.querySelector("#city");
  let button = document.querySelector("#submit");
  let weather = document.querySelector('#weather');
  let weatherData = document.querySelector(".weatherData");
  let top = document.querySelector(".top");
  let bottom = document.querySelector(".bottom");
  let jsonData;

  //Updates Query url when user submits their city
  let city = () => {

    weather.innerHTML = '';
    let api = "https://api.openweathermap.org/data/2.5/weather?q=";
    let units = "&units=metric&APPID=a3c1886f5eb76ddfb52f47c56366e0e3"
    let url = api + cityName.value + units;
    let bar = document.createElement("div");
    let degrees = document.createElement("div");

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
          bottom.innerHTML = '';
          temp = -temp;
          degrees.classList.add("space-right");
        } else {
          bottom.innerHTML = '';
          degrees.classList.add("space-left");
          bar.classList.add("reverse");
        }
        degrees.appendChild(liText);
        bar.style.width = temp * 20 + "px";
        bar.appendChild(degrees);
        bar.classList.add("bar");
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
