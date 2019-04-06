function colorStyle(gridType) {
  if (gridType === "canvas") {
    rFill = 255;
    gFill = 255;
    bFill = 255;
    rBorder = 0;
    gBorder = 0;
    bBorder = 0;
  }

  if (gridType === "palette") {
    rFill = Math.floor(Math.random() * 256);
    gFill = Math.floor(Math.random() * 256);
    bFill = Math.floor(Math.random() * 256);
    rBorder = rFill;
    gBorder = gFill;
    bBorder = bFill;
  }

  let rgbFill = "rgb(" + rFill + ", " + gFill + ", " + bFill + ")";
  let rgbBorder = "rgb(" + rBorder + ", " + gBorder + ", " + bBorder + ")";
  let rgbObj = {
    fillColor: rgbFill,
    borderColor: rgbBorder
  };

  return rgbObj;
}

function makeGrid(height, width = height, gridType) {
  let appendTo;
  let borderType;
  if (gridType === "canvas") {
    appendTo = pixelPainter;
    borderType = " 1px dotted";
  }
  if (gridType === "palette") {
    appendTo = paletteBox;
    borderType = " 3px solid";
  }

  const newElem = document.createElement("div");
  newElem.id = gridType;
  appendTo.appendChild(newElem);
  for (let i = 1; i <= height; i++) {
    let newCol = document.createElement("div");
    newCol.id = "row" + i;
    newCol.className = gridType + "GridRow";
    newElem.appendChild(newCol);

    for (let j = 1; j <= width; j++) {
      let newCell = document.createElement("div");
      newCell.id = gridType + "-row" + i + "-col" + j;
      newCell.className = gridType + "GridCell";
      newCol.appendChild(newCell);
      let coloring = colorStyle(gridType);
      newCell.style.backgroundColor = coloring.fillColor;
      newCell.style.border = newCell.style.border =
        coloring.borderColor + borderType;
      newCell.dataset.row = i;
      newCell.dataset.col = j;
    }
  }
}

const paletteBox = document.createElement("div");
paletteBox.id = "paletteArea";
pixelPainter.appendChild(paletteBox);

function makeColorPalette(height, width = height) {
  makeGrid(height, width, "palette");
}

function addDefaults() {
  const defaultBox = document.createElement("div");
  defaultBox.id = "defaultArea";
  palette.appendChild(defaultBox);
  // black box
  const black = document.createElement("div");
  black.id = "blacks";
  black.className = "defaults";
  defaultBox.appendChild(black);
  black.style.backgroundColor = "rgb(200, 200, 200)";
  // black's children
  const blackIcon = document.createElement("img");
  const blackText = document.createElement("span");
  blackIcon.id = "blackImg";
  blackText.id = "blackTxt";
  blackIcon.src =
    "https://img.pngio.com/black-circlepng-circle-png-600_600.png";
  blackText.innerHTML = "Black";
  black.appendChild(blackIcon);
  black.appendChild(blackText);

  // eraser box
  const eraser = document.createElement("div");
  eraser.id = "erasers";
  eraser.className = "defaults";
  defaultBox.appendChild(eraser);
  // eraser's children
  const eraserIcon = document.createElement("img");
  const eraserText = document.createElement("span");
  eraserIcon.id = "eraserImg";
  eraserText.id = "eraserTxt";
  eraserText.innerHTML = "Eraser";
  eraserIcon.src =
    "https://lh4.ggpht.com/lcydxe9aTLvDT5flQ4PldQQswbnrC0tR4IIpTQjPr5PI2fSSvHhlc3ENf2B6DyGZOIY";
  eraser.appendChild(eraserIcon);
  eraser.appendChild(eraserText);

  // fill box
  const fill = document.createElement("div");
  fill.id = "fills";
  fill.className = "defaults";
  defaultBox.appendChild(fill);
  // fill's children
  const fillIcon = document.createElement("img");
  const fillText = document.createElement("span");
  fillIcon.id = "fillImg";
  fillText.id = "fillTxt";
  fillText.innerHTML = "Fill";
  fillIcon.src =
    "https://cdn4.iconfinder.com/data/icons/design-tools-outline-icons-set/144/Paint_Bucket-512.png";
  fill.appendChild(fillIcon);
  fill.appendChild(fillText);

  // clearAll box
  const clearAll = document.createElement("div");
  clearAll.id = "clearAlls";
  clearAll.className = "defaults";
  defaultBox.appendChild(clearAll);
  // clearAll's children
  const clearAllIcon = document.createElement("img");
  const clearAllText = document.createElement("span");
  clearAllIcon.id = "clearAllImg";
  clearAllText.id = "clearAllTxt";
  clearAllText.innerHTML = "WIPE";
  clearAllIcon.src =
    "https://sustainingourworld.com/wp-content/uploads/2013/07/bleach-bottle.png";
  clearAll.appendChild(clearAllIcon);
  clearAll.appendChild(clearAllText);
}

// invoke to create palette, settings, and canvas
makeColorPalette(5, 3);
makeGrid(25, 25, "canvas");
addDefaults();

let paletteClass = document.getElementsByClassName("paletteGridCell");
let canvasClass = document.getElementsByClassName("canvasGridCell");

function wipeCanvas() {
  for (let i = 0; i < canvasClass.length; i++) {
    canvasClass[i].style.backgroundColor = "rgb(255, 255, 255)";
  }
}

clearAlls.addEventListener("click", wipeCanvas);

let storedColor = "rgb(0, 0, 0)";

function setBlack() {
  storedColor = "rgb(0, 0, 0)";
  for (let i = 0; i < paletteClass.length; i++) {
    paletteClass[i].style.border =
      "3px solid " + paletteClass[i].style.backgroundColor;
  }
  blacks.style.backgroundColor = "rgb(200, 200, 200)";
  erasers.style.backgroundColor = "rgb(255, 255, 255)";
}

function setWhite() {
  storedColor = "rgb(255, 255, 255)";
  for (let i = 0; i < paletteClass.length; i++) {
    paletteClass[i].style.border =
      "3px solid " + paletteClass[i].style.backgroundColor;
  }
  blacks.style.backgroundColor = "rgb(255, 255, 255)";
  erasers.style.backgroundColor = "rgb(200, 200, 200)";
  fills.style.backgroundColor = "rgb(255, 255, 255)";
}

blacks.addEventListener("click", setBlack);
erasers.addEventListener("click", setWhite);

let filler = false;

function setColor() {
  storedColor = this.style.backgroundColor;
  for (let i = 0; i < paletteClass.length; i++) {
    paletteClass[i].style.border =
      "3px solid " + paletteClass[i].style.backgroundColor;
  }
  this.style.border = "3px solid black";
  blacks.style.backgroundColor = "rgb(255, 255, 255)";
  erasers.style.backgroundColor = "rgb(255, 255, 255)";
  if (filler) fills.style.backgroundColor = storedColor;
}

for (let i = 0; i < paletteClass.length; i++) {
  paletteClass[i].addEventListener("click", setColor);
}

let allowDrag = false;

function mousedownColor() {
  if (filler) return;
  allowDrag = true;
  this.style.backgroundColor = storedColor;
}
for (let i = 0; i < canvasClass.length; i++) {
  canvasClass[i].addEventListener("mousedown", mousedownColor);
}

function mouseoverColor() {
  if (allowDrag) this.style.backgroundColor = storedColor;
}
for (let i = 0; i < canvasClass.length; i++) {
  canvasClass[i].addEventListener("mouseover", mouseoverColor);
}

function mouseupColor() {
  allowDrag = false;
}

document.body.addEventListener("mouseup", mouseupColor);

function fillShape() {
  if (!filler) return;
  if (this.style.backgroundColor !== "rgb(255, 255, 255)") return;

  const height = document.getElementsByClassName("canvasGridRow").length;
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
      let elemToFill = document.getElementById(
        "canvas-row" + rowInc + "-col" + colInc
      );

      if (elemToFill.style.backgroundColor !== "rgb(255, 255, 255)")
        keepFilling = 0;
      if (elemToFill.style.backgroundColor === "rgb(255, 255, 255)") {
        elemToFill.style.backgroundColor = storedColor;
        rowInc++;
      }
    }
    rowInc = rowNum;
    keepFilling = 1;
    if (colInc < width) colInc++;

    elemToFill = document.getElementById(
      "canvas-row" + rowInc + "-col" + colInc
    );
    if (elemToFill.style.backgroundColor !== "rgb(255, 255, 255)")
      keepFilling = 0;
  }

  // down & left
  // loop through rows, for each column
  rowInc = rowNum;
  colInc = colNum - 1;
  keepFilling = 1;

  while (keepFilling === 1 && colInc > 0) {
    while (keepFilling === 1 && rowInc <= height) {
      let elemToFill = document.getElementById(
        "canvas-row" + rowInc + "-col" + colInc
      );
      if (elemToFill.style.backgroundColor !== "rgb(255, 255, 255)")
        keepFilling = 0;
      if (elemToFill.style.backgroundColor === "rgb(255, 255, 255)") {
        elemToFill.style.backgroundColor = storedColor;
        rowInc++;
      }
    }
    rowInc = rowNum;
    keepFilling = 1;
    if (colInc > 1) colInc--;

    elemToFill = document.getElementById(
      "canvas-row" + rowInc + "-col" + colInc
    );
    if (elemToFill.style.backgroundColor !== "rgb(255, 255, 255)")
      keepFilling = 0;
  }

  // up & left
  rowInc = rowNum - 1;
  colInc = colNum - 1;
  keepFilling = 1;

  while (keepFilling === 1 && colInc > 0) {
    while (keepFilling === 1 && rowInc > 0) {
      let elemToFill = document.getElementById(
        "canvas-row" + rowInc + "-col" + colInc
      );
      if (elemToFill.style.backgroundColor !== "rgb(255, 255, 255)")
        keepFilling = 0;
      if (elemToFill.style.backgroundColor === "rgb(255, 255, 255)") {
        elemToFill.style.backgroundColor = storedColor;
        rowInc--;
      }
    }
    rowInc = rowNum - 1;
    keepFilling = 1;
    if (colInc > 1) colInc--;

    elemToFill = document.getElementById(
      "canvas-row" + rowInc + "-col" + colInc
    );
    if (elemToFill.style.backgroundColor !== "rgb(255, 255, 255)")
      keepFilling = 0;
  }

  // up & right
  rowInc = rowNum - 1;
  colInc = colNum;
  keepFilling = 1;

  while (keepFilling === 1 && colInc <= width) {
    while (keepFilling === 1 && rowInc > 0) {
      let elemToFill = document.getElementById(
        "canvas-row" + rowInc + "-col" + colInc
      );
      if (elemToFill.style.backgroundColor !== "rgb(255, 255, 255)")
        keepFilling = 0;
      if (elemToFill.style.backgroundColor === "rgb(255, 255, 255)") {
        elemToFill.style.backgroundColor = storedColor;
        rowInc--;
      }
    }
    rowInc = rowNum - 1;
    keepFilling = 1;
    if (colInc < width) colInc++;

    elemToFill = document.getElementById(
      "canvas-row" + rowInc + "-col" + colInc
    );
    if (elemToFill.style.backgroundColor !== "rgb(255, 255, 255)")
      keepFilling = 0;
  }
}

for (let i = 0; i < canvasClass.length; i++) {
  canvasClass[i].addEventListener("click", fillShape);
}

function toggleFill() {
  filler = !filler;

  if (filler) {
    // eraser
    if (storedColor === "rgb(255, 255, 255)") {
      fills.style.backgroundColor = "rgb(200, 200, 200)";
      storedColor = "rgb";
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
    if (
      storedColor !== "rgb(255, 255, 255)" &&
      storedColor !== "rgb(0, 0, 0)"
    ) {
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

fills.addEventListener("click", toggleFill);
