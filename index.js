document.getElementById("city").addEventListener("input", async (e) => {
  //go get the long lat from the city name
  const { data } = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${e.target.value}&limit=1&appid=17a3e02a9cc47ed1eac90bc2f9c0012a`
  );

  //get the weather from the long/lat
  if (data[0] && data[0]) {
    //defensive check
    const { lat, lon } = data[0];
    const { data: weather } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=50&APPID=17a3e02a9cc47ed1eac90bc2f9c0012a`
    );

    const html = weather.list.map((item) => {
      return `<div>
                <h1>${new Date(item.dt * 1000).toLocaleString()}</h1>
                <p>${item.main.temp - 273.15}c</p>
      </div>`;
    });

    document.getElementById("root").innerHTML = html.join("");
  }
});
