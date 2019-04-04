


function makeColorPalette(height, width = height) {

  // keeping height as parameter in case i want to make a gradient
  function colorStyle(rgbParamNbr, height) {
    let r = 255;
    let g = 255;
    let b = 255;

    // commented code would make a gradient
    if (rgbParamNbr === 1) {
      g = Math.floor(Math.random() * 256);
      b = Math.floor(Math.random() * 256);
      //   g = Math.floor((255 / height)*(height-1));
      //   b = Math.floor((255 / height)*(height-1));
    }

    if (rgbParamNbr === 2) {
      r = Math.floor(Math.random() * 256);
      b = Math.floor(Math.random() * 256);
      //   r = Math.floor((255 / height)*(height-1));
      //   b = Math.floor((255 / height)*(height-1));
    }

    if (rgbParamNbr === 3) {
      r = Math.floor(Math.random() * 256);
      g = Math.floor(Math.random() * 256);
      //   r = Math.floor((255 / height)*(height-1));
      //   g = Math.floor((255 / height)*(height-1));
    }

    let strRGB = "rgb(" + r + ", " + g + ", " + b + ")";

    return strRGB;
  }

  const paletteBox = document.createElement('div');
  paletteBox.id = 'paletteArea';
  pixelPainter.appendChild(paletteBox);
  const newElem = document.createElement('div');
  newElem.id = 'palette';
  paletteBox.appendChild(newElem);
  for (let i = 1; i <= height; i++) {
    let newCol = document.createElement('div');
    newCol.id = 'row' + i;
    newCol.className = 'paletteGridRow';
    newElem.appendChild(newCol);
    for (let j = 1; j <= width; j++) {
      let newCell = document.createElement('div');
      newCell.id = 'palette-row' + i + '-col' + j;
      newCell.className = 'paletteGridCell';
      newCol.appendChild(newCell);
      newCell.style.backgroundColor = colorStyle((j % 3) + 1, i);
      newCell.style.border = "3px solid " + newCell.style.backgroundColor;

    }
  }
}

function addDefaults() {
  const defaultBox = document.createElement('div');
  defaultBox.id = 'defaultArea';
  palette.appendChild(defaultBox);
  // black box
  const black = document.createElement('div');
  black.id = 'blacks';
  black.className = 'defaults';
  defaultBox.appendChild(black);
  black.style.backgroundColor = "rgb(200, 200, 200)";
  // black's children
  const blackIcon = document.createElement('img');
  const blackText = document.createElement('span');
  blackIcon.id = 'blackImg';
  blackText.id = 'blackTxt';
  blackIcon.src = 'https://img.pngio.com/black-circlepng-circle-png-600_600.png';
  blackText.innerHTML = "Black"
  black.appendChild(blackIcon);
  black.appendChild(blackText);

  // eraser box
  const eraser = document.createElement('div');
  eraser.id = 'erasers';
  eraser.className = 'defaults';
  defaultBox.appendChild(eraser);
  // eraser's children
  const eraserIcon = document.createElement('img');
  const eraserText = document.createElement('span');
  eraserIcon.id = 'eraserImg';
  eraserText.id = 'eraserTxt';
  eraserText.innerHTML = "Eraser";
  eraserIcon.src = 'https://lh4.ggpht.com/lcydxe9aTLvDT5flQ4PldQQswbnrC0tR4IIpTQjPr5PI2fSSvHhlc3ENf2B6DyGZOIY';
  eraser.appendChild(eraserIcon);
  eraser.appendChild(eraserText);

  // fill box
  const fill = document.createElement('div');
  fill.id = 'fills';
  fill.className = 'defaults';
  defaultBox.appendChild(fill);
  // fill's children
  const fillIcon = document.createElement('img');
  const fillText = document.createElement('span');
  fillIcon.id = 'fillImg';
  fillText.id = 'fillTxt';
  fillText.innerHTML = "Fill";
  fillIcon.src = 'https://cdn4.iconfinder.com/data/icons/design-tools-outline-icons-set/144/Paint_Bucket-512.png';
  fill.appendChild(fillIcon);
  fill.appendChild(fillText);

  // clearAll box
  const clearAll = document.createElement('div');
  clearAll.id = 'clearAlls';
  clearAll.className = 'defaults';
  defaultBox.appendChild(clearAll);
  // clearAll's children
  const clearAllIcon = document.createElement('img');
  const clearAllText = document.createElement('span');
  clearAllIcon.id = 'clearAllImg';
  clearAllText.id = 'clearAllTxt';
  clearAllText.innerHTML = "WIPE";
  clearAllIcon.src = 'https://sustainingourworld.com/wp-content/uploads/2013/07/bleach-bottle.png';
  clearAll.appendChild(clearAllIcon);
  clearAll.appendChild(clearAllText);

}


// const paletteElem = document.getElementById('palette');

// document.paletteElem.appendChild(black);
// document.paletteElem.appendChild(eraser);

function makeCanvas(height, width = height) {

  const newElem = document.createElement('div');
  newElem.id = 'canvas';
  pixelPainter.appendChild(newElem);
  for (let i = 1; i <= height; i++) {
    let newCol = document.createElement('div');
    newCol.id = 'row' + i;
    newCol.className = 'canvasGridRow';
    newElem.appendChild(newCol);
    for (let j = 1; j <= width; j++) {
      let newCell = document.createElement('div');
      newCell.id = 'canvas-row' + i + '-col' + j;
      newCell.className = 'canvasGridCell';
      newCell.style.backgroundColor = "rgb(255, 255, 255)";
      newCell.dataset.row = i;
      newCell.dataset.col = j;
      newCol.appendChild(newCell);
    }
  }
}

// invoke to create palette, settings, and canvas
makeColorPalette(5, 3);
makeCanvas(25, 25);
addDefaults();


let paletteClass = document.getElementsByClassName('paletteGridCell');
let canvasClass = document.getElementsByClassName('canvasGridCell');

function wipeCanvas() {
  for (let i = 0; i < canvasClass.length; i++) {
    canvasClass[i].style.backgroundColor = "rgb(255, 255, 255)";
  }
}

clearAlls.addEventListener('click', wipeCanvas);

let storedColor = "rgb(0, 0, 0)";

function setBlack() {
  storedColor = "rgb(0, 0, 0)";
  for (let i = 0; i < paletteClass.length; i++) {
    paletteClass[i].style.border = "3px solid " + paletteClass[i].style.backgroundColor;
  }
  blacks.style.backgroundColor = "rgb(200, 200, 200)";
  erasers.style.backgroundColor = "rgb(255, 255, 255)";
}

function setWhite() {
  storedColor = "rgb(255, 255, 255)";
  for (let i = 0; i < paletteClass.length; i++) {
    paletteClass[i].style.border = "3px solid " + paletteClass[i].style.backgroundColor;
  }
  blacks.style.backgroundColor = "rgb(255, 255, 255)";
  erasers.style.backgroundColor = "rgb(200, 200, 200)";
  fills.style.backgroundColor = "rgb(255, 255, 255)";
}

blacks.addEventListener('click', setBlack);
erasers.addEventListener('click', setWhite);

function setColor() {
  storedColor = this.style.backgroundColor;
  for (let i = 0; i < paletteClass.length; i++) {
    paletteClass[i].style.border = "3px solid " + paletteClass[i].style.backgroundColor;
  }
  //let rgb = storedColor.substring(4, storedColor.length-1).replace(/ /g, '').split(',');
  //let offsetColor = "rgb("+(255-rgb[0])+", "+(255-rgb[1])+", "+(255-rgb[2])+")";
  this.style.border = "3px solid black";
  blacks.style.backgroundColor = "rgb(255, 255, 255)";
  erasers.style.backgroundColor = "rgb(255, 255, 255)";
  if (filler) fills.style.backgroundColor = storedColor;
}

for (let i = 0; i < paletteClass.length; i++) {
  paletteClass[i].addEventListener('click', setColor);
}

let allowDrag = false;

function mousedownColor() {
  if (filler) return;
  allowDrag = true;
  this.style.backgroundColor = storedColor;
}
for (let i = 0; i < canvasClass.length; i++) {
  canvasClass[i].addEventListener('mousedown', mousedownColor);
}

function mouseoverColor() {
  if (allowDrag) this.style.backgroundColor = storedColor;
}
for (let i = 0; i < canvasClass.length; i++) {
  canvasClass[i].addEventListener('mouseover', mouseoverColor);
}

function mouseupColor() {
  allowDrag = false;
}

document.body.addEventListener('mouseup', mouseupColor);


function fillShape() {
  if (!filler) return;
  if (this.style.backgroundColor !== "rgb(255, 255, 255)") return;

  const height = document.getElementsByClassName('canvasGridRow').length;
  const width = canvasClass.length / height;
  const rowNum = this.dataset.row;
  const colNum = this.dataset.col;

  // down & right
  // loop through rows, for each column
  let rowInc = rowNum;
  let colInc = colNum;
  let keepFilling = 1;

  while (keepFilling === 1 && colInc <= width) {

    while (keepFilling === 1 && rowInc <= height) {

      let elemToFill = document.getElementById('canvas-row' + rowInc + '-col' + colInc);

      if (elemToFill.style.backgroundColor !== "rgb(255, 255, 255)") keepFilling = 0;
      if (elemToFill.style.backgroundColor === "rgb(255, 255, 255)") {
        elemToFill.style.backgroundColor = storedColor;
        rowInc++;
      }
    }
    rowInc = rowNum;
    keepFilling = 1;
    if (colInc < width) colInc++;

    elemToFill = document.getElementById('canvas-row' + rowInc + '-col' + colInc);
    if (elemToFill.style.backgroundColor !== "rgb(255, 255, 255)") keepFilling = 0;
  }

  // down & left
  // loop through rows, for each column
  rowInc = rowNum;
  colInc = colNum - 1;
  keepFilling = 1;

  while (keepFilling === 1 && colInc > 0) {
    while (keepFilling === 1 && rowInc <= height) {
      let elemToFill = document.getElementById('canvas-row' + rowInc + '-col' + colInc);
      if (elemToFill.style.backgroundColor !== "rgb(255, 255, 255)") keepFilling = 0;
      if (elemToFill.style.backgroundColor === "rgb(255, 255, 255)") {
        elemToFill.style.backgroundColor = storedColor;
        rowInc++;
      }
    }
    rowInc = rowNum;
    keepFilling = 1;
    if (colInc > 1) colInc--;

    elemToFill = document.getElementById('canvas-row' + rowInc + '-col' + colInc);
    if (elemToFill.style.backgroundColor !== "rgb(255, 255, 255)") keepFilling = 0;
  }

  // up & left
  rowInc = rowNum - 1;
  colInc = colNum - 1;
  keepFilling = 1;

  while (keepFilling === 1 && colInc > 0) {
    while (keepFilling === 1 && rowInc > 0) {
      let elemToFill = document.getElementById('canvas-row' + rowInc + '-col' + colInc);
      if (elemToFill.style.backgroundColor !== "rgb(255, 255, 255)") keepFilling = 0;
      if (elemToFill.style.backgroundColor === "rgb(255, 255, 255)") {
        elemToFill.style.backgroundColor = storedColor;
        rowInc--;
      }
    }
    rowInc = rowNum - 1;
    keepFilling = 1;
    if (colInc > 1) colInc--;

    elemToFill = document.getElementById('canvas-row' + rowInc + '-col' + colInc);
    if (elemToFill.style.backgroundColor !== "rgb(255, 255, 255)") keepFilling = 0;
  }

  // up & right
  rowInc = rowNum - 1;
  colInc = colNum;
  keepFilling = 1;

  while (keepFilling === 1 && colInc <= width) {
    while (keepFilling === 1 && rowInc > 0) {
      let elemToFill = document.getElementById('canvas-row' + rowInc + '-col' + colInc);
      if (elemToFill.style.backgroundColor !== "rgb(255, 255, 255)") keepFilling = 0;
      if (elemToFill.style.backgroundColor === "rgb(255, 255, 255)") {
        elemToFill.style.backgroundColor = storedColor;
        rowInc--;
      }
    }
    rowInc = rowNum - 1;
    keepFilling = 1;
    if (colInc < width) colInc++;

    elemToFill = document.getElementById('canvas-row' + rowInc + '-col' + colInc);
    if (elemToFill.style.backgroundColor !== "rgb(255, 255, 255)") keepFilling = 0;
  }

}

for (let i = 0; i < canvasClass.length; i++) {
  canvasClass[i].addEventListener('click', fillShape);
}

let filler = false;

function toggleFill() {
  filler = !filler;

  if (filler) {
    // eraser
    if (storedColor === "rgb(255, 255, 255)") {
      fills.style.backgroundColor = "rgb(200, 200, 200)";
      storedColor = "rgb"
      blacks.style.backgroundColor = "rgb(200, 200, 200)";
      erasers.style.backgroundColor = "rgb(255, 255, 255)";
    }
    // black
    if (storedColor === "rgb(0, 0, 0)") {
      fills.style.backgroundColor = "rgb(200, 200, 200)";
      storedColor = "rgb(0, 0, 0)";
      blacks.style.backgroundColor = "rgb(200, 200, 200)";
    }
    // something from palette
    if (storedColor !== "rgb(255, 255, 255)" && storedColor !== "rgb(0, 0, 0)") {
      fills.style.backgroundColor = storedColor;
    }
  }
  if (!filler) {
    if (storedColor !== "rgb(0, 0, 0)") {
      fills.style.backgroundColor = "rgb(255, 255, 255)";
    }

    if (storedColor === "rgb(0, 0, 0)") {
      fills.style.backgroundColor = "rgb(255, 255, 255)";
      storedColor = "rgb(0, 0, 0)";
      blacks.style.backgroundColor = "rgb(200, 200, 200)";
    }

  }
}

fills.addEventListener('click', toggleFill);
