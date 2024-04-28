const getWeathers = async () => {
  // const response = await fetch("https://weather.cma.cn/api/weather/view?stationid=");
  // console.log(response);
  const iframe = document.querySelector("#if");
  // const temperature = iframe.contentWindow.document.querySelector(".temperatrue").innerText;
  // const city = iframe.contentWindow.document.querySelector(".city_name .text-left").innerText;
  
  // console.log(city, "-", temperature);
  console.log(iframe)
  // https://v2.jinrishici.com/one.json?client=browser-sdk/1.2&X-User-Token=Rvx0jYST6SR0e0RGEpDsRkHfQ4RJb7zv
  // https://widget-api.qweather.net/s6/plugin/location?key=e188fb70724d40348d7be2cb429be3ad&qweather_mark=piPgnFjjUCQIwUSkCDl0O66UOD3rxP4P&lang=zh
};

getWeathers();
