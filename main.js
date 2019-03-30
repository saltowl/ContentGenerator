(function createElementsInBody() {
  var mainDiv = document.createElement("DIV");
  mainDiv.style.display = "flex";
  mainDiv.style.justifyContent = "center";
  mainDiv.style.alignItems = "center";

  var cnv = document.createElement("CANVAS");
  cnv.style.width = "500px";
  cnv.style.height = "500px";
  ctx = cnv.getContext("2d");
  ctx.fillRect(0, 0, cnv.width, cnv.height);
  mainDiv.appendChild(cnv);

  var btns = document.createElement("DIV");
  btns.style.display = "flex";
  btns.style.flexDirection = "column";
  btns.style.justifyContent = "center";
  btns.style.alignItems = "center";
  mainDiv.appendChild(btns);

  var save = document.createElement("BUTTON");
  save.innerHTML = "SAVE";
  save.style.margin = "5px";
  btns.appendChild(save);

  var next = document.createElement("BUTTON");
  next.innerHTML = "NEXT";
  next.style.margin = "5px";
  btns.appendChild(next);

  document.body.appendChild(mainDiv);
})();