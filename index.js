function $(name) {
  return document.querySelector(name);
}

// read and set yaml;
(async function () {
  const yaml = window.jsyaml;

  try {
    const source = await (await fetch("data.yaml")).text();
    const data = yaml.load(source);
    console.log(data);
    if (data["title"].name) $('[data-name="title"]').innerText = data["title"].name;
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
          console.log(textColor);
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
