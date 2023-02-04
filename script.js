let canvas = document.querySelector(".canvas");
const layout = canvas.getContext("2d");
const input = document.querySelector(".input_file");
let img = new Image();
let copyImg;
let latime;
let inaltime;
let Xinceput;
let Xsfarsit;
let Yinceput;
let Ysfarsit;
let img_exist = false;

//INPUT FROM PC
input.addEventListener("change", (e) => {
  let reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.addEventListener("loadend", (e) => {
    img = new Image();
    img.src = e.target.result;

    //SALVARE COPIE IMAGINE
    copyImg = new Image();
    copyImg.src = e.target.result;

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;

      while (canvas.width > 700 || canvas.height > 700) {
        canvas.width = canvas.width * 0.9;
        canvas.height = canvas.height * 0.9;
      }

      //DESENAM IMAGINEA PE CANVAS
      layout.drawImage(img, 0, 0, canvas.width, canvas.height);

      //SCOATERE BORDER PENTRU CANVAS
      canvas.classList.remove("active");

      //DESENARE SELECTIE INITIALA IMAGINE
      layout.strokeStyle = "red";
      layout.lineWidth = 3;
      layout.strokeRect(0, 0, canvas.width, canvas.height);

      Xinceput = 0;
      Yinceput = 0;
      Xsfarsit = canvas.width;
      Ysfarsit = canvas.height;
      latime = Xsfarsit - Xinceput;
      inaltime = Ysfarsit - Yinceput;
    };
  });
  //IN CAZUL IN CARE NU EXISTA DEJA O IMAGINE, AFISEAZA BUTOANELE PENTRU EFECTE
  if (!img_exist) {
    document.querySelector(".container_settings").classList.toggle("hidden");
    document.querySelector(".reset_photo").classList.toggle("hidden");
    document.querySelector(".button_descarcare").classList.toggle("hidden");
    document.querySelector(".canvas").classList.toggle("active");
  }
  img_exist = true;
});
///////////////////////////////////////////////////////////////////////////

//DRAG AND DROP
canvas.addEventListener("dragenter", (e) => {
  e.preventDefault();
  canvas.classList.add("active");
});

canvas.addEventListener("dragleave", (e) => {
  e.preventDefault();
  canvas.classList.remove("active");
});

canvas.addEventListener("dragover", (e) => {
  e.preventDefault();
});

canvas.addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener("loadend", () => {
    img = document.createElement("img");
    img.src = reader.result;

    copyImg = new Image();
    copyImg.src = img.src;

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;

      while (canvas.width > 700 || canvas.height > 700) {
        canvas.width = canvas.width * 0.9;
        canvas.height = canvas.height * 0.9;
      }

      layout.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.classList.remove("active");
      layout.strokeStyle = "red";
      layout.lineWidth = 3;
      layout.strokeRect(0, 0, canvas.width, canvas.height);

      Xinceput = 0;
      Yinceput = 0;
      Xsfarsit = canvas.width;
      Ysfarsit = canvas.height;
      latime = Xsfarsit - Xinceput;
      inaltime = Ysfarsit - Yinceput;
    };
  });
  if (!img_exist) {
    document.querySelector(".container_settings").classList.toggle("hidden");
    document.querySelector(".reset_photo").classList.toggle("hidden");
    document.querySelector(".button_descarcare").classList.toggle("hidden");
    document.querySelector(".canvas").classList.toggle("active");
  }
  img_exist = true;
});
//////////////////////////////////////////////////////////////////////////

//DESCARCARE IMAGINE
document.querySelector(".button_descarcare").addEventListener("click", () => {
  document.querySelector(".link_descarcare").href = img.src;
});
///////////////////////////////////////////////////////////////////////////

//SELECTARE TOTALA
document.querySelector(".btn_select_all").addEventListener("click", () => {
  layout.drawImage(img, 0, 0, canvas.width, canvas.height);

  Xinceput = 0;
  Yinceput = 0;
  latime = canvas.width;
  inaltime = canvas.height;

  layout.strokeStyle = "red";
  layout.lineWidth = 3;
  layout.strokeRect(0, 0, canvas.width, canvas.height);
});
///////////////////////////////////////////////////////////////////////

//SELECTARE PARTIALA
let canvasDimensiuni = canvas.getBoundingClientRect();
let mouseApasat = false;

canvas.addEventListener("mousedown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  canvasDimensiuni = canvas.getBoundingClientRect();
  Xinceput = Number.parseFloat(e.clientX - canvasDimensiuni.left);
  Yinceput = Number.parseFloat(e.clientY - canvasDimensiuni.top);
  mouseApasat = true;
});

canvas.addEventListener("mouseup", (e) => {
  e.preventDefault();
  e.stopPropagation();
  Xsfarsit = Number.parseFloat(e.clientX - canvasDimensiuni.left);
  Ysfarsit = Number.parseFloat(e.clientY - canvasDimensiuni.top);
  mouseApasat = false;

  //in cazul in care se selectaza de jos in sus
  if (Xsfarsit < Xinceput) {
    aux = Xsfarsit;
    Xsfarsit = Xinceput;
    Xinceput = aux;
    latime = (Xinceput - Xsfarsit) * -1;
  }
  if (Ysfarsit < Yinceput) {
    aux = Ysfarsit;
    Ysfarsit = Yinceput;
    Yinceput = aux;
    inaltime = (Yinceput - Ysfarsit) * -1;
  }
});

canvas.addEventListener("mousemove", (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (mouseApasat === false) {
    return;
  }
  Xsfarsit = Number.parseFloat(e.clientX - canvasDimensiuni.left);
  Ysfarsit = Number.parseFloat(e.clientY - canvasDimensiuni.top);
  layout.strokeStyle = "red";
  layout.lineWidth = 3;

  layout.drawImage(img, 0, 0, canvas.width, canvas.height);

  //Latimea si inaltimea selectiei
  latime = Xsfarsit - Xinceput;
  inaltime = Ysfarsit - Yinceput;
  layout.strokeRect(Xinceput, Yinceput, latime, inaltime);
});
//////////////////////////////////////////////////////////////////////////

//RESETARE IMAGINE
document.querySelector(".reset_photo").addEventListener("click", (e) => {
  //NE FOLOSIM DE COPIA CREATA LA INCEPUT
  img.src = copyImg.src;
  img.width = copyImg.width;
  img.height = copyImg.height;

  canvas.width = img.width;
  canvas.height = img.height;

  while (canvas.width > 700 || canvas.height > 700) {
    canvas.width = canvas.width * 0.9;
    canvas.height = canvas.height * 0.9;
  }

  layout.drawImage(img, 0, 0, canvas.width, canvas.height);
  layout.strokeStyle = "red";
  layout.lineWidth = 3;
  layout.strokeRect(0, 0, canvas.width, canvas.height);

  Xinceput = 0;
  Yinceput = 0;
  Xsfarsit = canvas.width;
  Ysfarsit = canvas.height;
  latime = Xsfarsit - Xinceput;
  inaltime = Ysfarsit - Yinceput;
});
/////////////////////////////////////////////////////////////////////

//CROP
document.querySelector(".btn_crop").addEventListener("click", (e) => {
  if (latime < 100 && inaltime < 100) {
    alert("Selectia este prea mica");
    return;
  }
  //SELECTAM ZONA
  zonaSelectata = layout.getImageData(Xinceput, Yinceput, latime, inaltime);

  //PENTRU A SCOATE DIN IMAGINE, BORDURA FACUTA DE SELECTIE
  canvas.width = latime - 6;
  canvas.height = inaltime - 6;

  //INCARCAM IMAGINEA IN CANVAS
  layout.putImageData(zonaSelectata, 0, 0);

  //SALVAM NOUA IMAGINE
  img.src = canvas.toDataURL();
  img.height = canvas.height;
  img.width = canvas.width;
});
//////////////////////////////////////////////////////////////////////////

//STERGERE SELECTIE
document
  .querySelector(".btn_delete_selection")
  .addEventListener("click", (e) => {
    layout.drawImage(img, 0, 0, canvas.width, canvas.height);

    zonaSelectata = layout.getImageData(Xinceput, Yinceput, latime, inaltime);

    //SETAM FIECARE PIXEL DE CULOARE LA VALOAREA MAXIMA
    for (let i = 0; i < zonaSelectata.data.length; i += 4) {
      zonaSelectata.data[i + 0] = 256;
      zonaSelectata.data[i + 1] = 256;
      zonaSelectata.data[i + 2] = 256;
    }

    layout.putImageData(zonaSelectata, Xinceput, Yinceput);
    img.src = canvas.toDataURL();
  });
////////////////////////////////////////////////////////////

//GRAYSCALING
document.querySelector(".btn_grayscale").addEventListener("click", (e) => {
  layout.drawImage(img, 0, 0, canvas.width, canvas.height);
  console.log(Xinceput, Yinceput, latime, inaltime);
  zonaSelectata = layout.getImageData(Xinceput, Yinceput, latime, inaltime);

  for (let i = 0; i < zonaSelectata.data.length; i += 4) {
    let gray =
      (zonaSelectata.data[i] +
        zonaSelectata.data[i + 1] +
        zonaSelectata.data[i + 2]) /
      3;
    zonaSelectata.data[i + 0] = gray;
    zonaSelectata.data[i + 1] = gray;
    zonaSelectata.data[i + 2] = gray;
  }

  layout.drawImage(img, 0, 0, canvas.width, canvas.height);
  layout.putImageData(zonaSelectata, Xinceput, Yinceput);
  img.src = canvas.toDataURL();
});
////////////////////////////////////////////////////////////////

//INVERT
document.querySelector(".btn_invert").addEventListener("click", (e) => {
  layout.drawImage(img, 0, 0, canvas.width, canvas.height);

  zonaSelectata = layout.getImageData(Xinceput, Yinceput, latime, inaltime);

  for (let i = 0; i < zonaSelectata.data.length; i += 4) {
    zonaSelectata.data[i + 0] = 255 - zonaSelectata.data[i];
    zonaSelectata.data[i + 1] = 255 - zonaSelectata.data[i + 1];
    zonaSelectata.data[i + 2] = 255 - zonaSelectata.data[i + 2];
  }

  layout.drawImage(img, 0, 0, canvas.width, canvas.height);
  layout.putImageData(zonaSelectata, Xinceput, Yinceput);
  img.src = canvas.toDataURL();
});
///////////////////////////////////////////////////////////////////////////////

//ADD TEXT
document.querySelector(".btn_add_text").addEventListener("click", (e) => {
  let text = document.querySelector(".text").value;
  if (text.length === 0) {
    alert("Textul este gol");
    return;
  }

  let x_text = document.querySelector(".X_position").value;
  let y_text = document.querySelector(".Y_position").value;

  if (
    x_text <= 0 ||
    x_text > canvas.width ||
    y_text <= 0 ||
    y_text > canvas.height
  ) {
    alert("Nu este corecta pozitia textului");
    return;
  }

  let color_text = document.querySelector(".color_text").value;
  let size_text = document.querySelector(".size_text").value;

  //   layout.drawImage(img, 0, 0, canvas.width, canvas.height);

  layout.font = `${size_text}px Sans-serif`;
  layout.fillStyle = color_text;
  layout.fillText(text, x_text, y_text);

  img.src = canvas.toDataURL();
});

document.querySelector(".size_text").addEventListener("input", (e) => {
  document.querySelector(".p_size").textContent = `${
    document.querySelector(".size_text").value
  } px`;
});
/////////////////////////////////////////////////////////////////////////////
