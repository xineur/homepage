// load font
(async function () {
  let font = new FontFace(
    "zpix",
    "url(https://zpix.now.sh/zpix.woff2?v2021-03-21)"
  );

  const nowTime = new Date().getTime();
  await font.load().then(function (loadedFont) {
    document.fonts.add(loadedFont);

    document.documentElement.style.setProperty(
      "--zpixFontFamily",
      "ZpixReviewLocal, ZpixReviewOnline, sans-serif"
    );
  });

  const delayTime = new Date().getTime() - nowTime;

  if (delayTime > 500) {
    await sleep(delayTime - 500);
  }

  $(".su-shade").style.opacity = 0;
  await sleep(300);
  $(".su-shade").style.display = "none";
})();

// read and set yaml;
(async function () {
  const yaml = window.jsyaml;

  try {
    const source = await (await fetch("data.yaml")).text();
    const data = yaml.load(source);
    console.log(data);
    if (data["title"].name)
      $('[data-name="title"]').innerText = data["title"].name;

    // background
    const background = data["background"];
    if (background) {
      if (background.url) {
        $(
          ".su-wrapper"
        ).style.backgroundImage = `linear-gradient(var(--bg), var(--bg)), url("${background.url}")`;
      }
    }
  } catch (e) {
    // i know
    throw e;
  }
})();

// monitor and set title color
(function () {
  const getTextColor = (hex) => {
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) {
      throw new Error("Invalid hexadecimal color code");
    }

    let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5), 16);

    let colorArray = [];

    for (let i = 0; i < 4; i++) {
      let newR = Math.floor(r + ((255 - r) / 4) * i),
        newG = Math.floor(g + ((255 - g) / 4) * i),
        newB = Math.floor(b + ((255 - b) / 4) * i);

      let color =
        "#" +
        ((1 << 24) | (newR << 16) | (newG << 8) | newB).toString(16).slice(1);
      colorArray.push(color);
    }

    return colorArray;
  };

  const root = document.querySelector(":root");
  const rootStyle = getComputedStyle(root);

  let initialValue = rootStyle.getPropertyValue("--bg").trim();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "style"
      ) {
        let newValue = rootStyle.getPropertyValue("--bg").trim();
        if (newValue !== initialValue) {
          initialValue = newValue;
          const textColor = getTextColor(initialValue);
          document.documentElement.style.setProperty(
            "--titleColor",
            textColor.join(", ")
          );
        }
      }
    });
  });

  observer.observe(root, { attributes: true });
})();

// Get current time and format
(function () {
  function getTime() {
    let date = new Date(),
      min = date.getMinutes(),
      sec = date.getSeconds(),
      hour = date.getHours();

    return (
      "" + (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min)
    );
  }

  // Set up the clock
  document.getElementById("clock").innerHTML = getTime();
  // Set clock interval to tick clock
  setInterval(() => {
    document.getElementById("clock").innerHTML = getTime();
  }, 10000);
})();

// search
(function () {
  document.addEventListener("keyup", (event) => {
    if (
      "search-menu" ===
      document.activeElement.attributes["data-name"]?.nodeValue
    )
      return;
    if (event.keyCode == 32) {
      // Spacebar code to open search
      document.getElementById("search").style.display = "flex";
      $('.search-field[data-name="search-global"]').focus();
    } else if (event.keyCode == 27) {
      $('.search-field[data-name="search-global"]').value = "";
      $('.search-field[data-name="search-global"]').blur();
      document.getElementById("search").style.display = "none";
    }
  });
})();

// Search on enter key event
function search(e) {
  const searchUrl = "https://google.com/search?q=";
  if (e.keyCode == 13) {
    var val = $('.search-field[data-name="search-global"]').value;
    window.open(searchUrl + val);
  }
}
