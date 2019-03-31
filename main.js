(function createElementsInBody() {
  var mainDiv = document.createElement("DIV");
  mainDiv.style.display = "flex";
  mainDiv.style.justifyContent = "center";
  mainDiv.style.alignItems = "center";

  var cnv = document.createElement("CANVAS");
  cnv.id = "cnv";
  cnv.width = "600";
  cnv.height = "600";
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

  getContent();
})();

function getContent() {
  function addScript(src) {
    var elem = document.createElement("script");
    elem.src = src;
    elem.async = true;
    document.head.appendChild(elem);
  }

  addScript("http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=ru&jsonp=parseQuote");

  getImages();
}

function getImages() {
  var cnv = document.getElementById("cnv");
  var ctx = cnv.getContext("2d");

  var collectionNum = 1160919;
  for (var k = 0; k < 4; k++) {
    var img = new Image();

    img.onload = (function(img, k) {
      return function() {
        ctx.drawImage(img, (k % 2) * 300, parseInt(k / 2) * 300);
        if (k === 3) {
          setTimeout(drawText, 1000);
        }
      };
    })(img, k);
    
    img.crossOrigin = "anonymous";
    img.src = "https://source.unsplash.com/collection/" + collectionNum + "/300x300?" + Math.random();

    collectionNum++;
  }
}

function parseQuote(response) {
  quote = response.quoteText;
}

function drawText() {
  var cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  ctx.font = "26px Arial";

  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  ctx.fillStyle = "white";
  var margin = 20;
  var lineHeight = 30;
  wrapText(ctx, quote, cnv.height, cnv.width, lineHeight, margin);
}

function wrapText(ctx, text, height, maxWidth, lineHeight, margin) {
  var words = text.split(" ");

  var line = "";
  var lines = [];

  for (var i = 0; i < words.length; i++) {
    var testLine = line + words[i] + " ";
    var testWidth = ctx.measureText(testLine).width;
    if (testWidth > maxWidth - margin) {
      lines.push(line);
      line = words[i] + " ";
      marginTop += lineHeight;
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  var marginTop = (height - lines.length * lineHeight) / 2 + margin;
  for (var i = 0; i < lines.length; i++) {
    var marginLeft = (maxWidth - ctx.measureText(lines[i]).width) / 2;
    ctx.fillText(lines[i], marginLeft, marginTop);
    marginTop += lineHeight;
}
}



var quote;
