(function createElementsInBody() {
  var mainDiv = document.createElement("DIV");
  mainDiv.style.display = "flex";
  mainDiv.style.justifyContent = "center";
  mainDiv.style.alignItems = "center";

  var cnv = document.createElement("CANVAS");
  cnv.width = "600";
  cnv.height = "600";
  ctx = cnv.getContext("2d");
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

  getContent(ctx);
})();

function getContent(ctx) {
  function addScript(src) {
    var elem = document.createElement("script");
    elem.src = src;
    elem.async = true;
    document.head.appendChild(elem);
  }

  addScript("http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=ru&jsonp=parseQuote");

  var collectionNum = 1160919;
  for (var k = 0; k < 4; k++) {
    var img = new Image();
    img.src = "https://source.unsplash.com/collection/" + collectionNum + "/300x300";

    img.onload = (function(img, k) {
      return function() {
        ctx.drawImage(img, (k % 2) * 300, parseInt(k / 2) * 300);
      };
    })(img, k);
    
    collectionNum++;
  }
}

function parseQuote(response) {
  console.log(response.quoteText);
}
