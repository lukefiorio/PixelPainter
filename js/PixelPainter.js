


// function createGridElem(parentId, colNum, rowNum = 0) {
//   let newElem = document.createElement('div');
//   parentId.appendChild(newElem);
//   if (rowNum === 0) {
//     newElem.id = 'col' + colNum;
//     newElem.className = parentId.id+'-gridColumn';
//   }
//   if (rowNum > 0) {
//     newElem.id = parentId.id+'col' + colNum + '-row' + rowNum;
//     newElem.className = 'gridCell';
//   }
// }

// function makeGrid(parentId, self, width, height = width) {
//   let newElem = document.createElement('div');
//   newElem.id = self;
//   parentId.appendChild(newElem);
//   for (let i = 1; i <= height; i++) {
//     createGridElem(newElem, i);
//     for (let j = 1; j <= width; j++) {
//       createGridElem(document.getElementById('col' + i), j, i);
//     }
//   }
// }

// //makeGrid(8, 6);
// makeGrid(pixelPainter, 'palette', 3, 3);
// makeGrid(pixelPainter, 'canvas', 8, 6);



function makeColorPalette(height, width = height) {

  // keeping height as parameter in case i want to make a gradient
  function colorStyle(rgbParamNbr, height) {
    let r = 255;
    let g = 255;
    let b = 255;

    // if (rgbParamNbr === 1) {
    //   g = Math.floor((255 / height)*(height-1));
    //   b = Math.floor((255 / height)*(height-1));
    // }

    // if (rgbParamNbr === 2) {
    //   r = Math.floor((255 / height)*(height-1));
    //   b = Math.floor((255 / height)*(height-1));
    // }

    // if (rgbParamNbr === 3) {
    //   r = Math.floor((255 / height)*(height-1));
    //   g = Math.floor((255 / height)*(height-1));
    // }

    if (rgbParamNbr === 1) {
      g = Math.floor(Math.random()*256);
      b = Math.floor(Math.random()*256);
    }

    if (rgbParamNbr === 2) {
      r = Math.floor(Math.random()*256);
      b = Math.floor(Math.random()*256);
    }

    if (rgbParamNbr === 3) {
      r = Math.floor(Math.random()*256);
      g = Math.floor(Math.random()*256);
    }

    let strRGB = "rgb("+r+", "+g+", "+b+")";
    
    return strRGB;
  }

  const newElem = document.createElement('div');
  newElem.id = 'palette';
  pixelPainter.appendChild(newElem);
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
      newCell.style.backgroundColor = colorStyle((j%3) + 1,i);
      
    }
  }
  const black = document.createElement('div');
  const eraser = document.createElement('div');
  black.className = 'defaults';
  eraser.className = 'defaults';
  newElem.appendChild(black);
  newElem.appendChild(eraser);
  black.innerHTML = "Default"
  eraser.innerHTML = "Eraser";

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
      newCol.appendChild(newCell);
    }
  }
}

makeColorPalette(5, 3);
makeCanvas(25, 25);

let paletteClass = document.getElementsByClassName('paletteGridCell');
let canvasClass = document.getElementsByClassName('canvasGridCell');

let storedColor = "rgb(0, 0, 0)";
function setColor() {
  storedColor = this.style.backgroundColor;
}

for (let i = 0; i < paletteClass.length; i++) {
  paletteClass[i].addEventListener('click', setColor);
}

let allowDrag = false;

function mousedownColor() {
  allowDrag = true;
  this.style.backgroundColor = storedColor;
}

function mouseoverColor() {
  if (allowDrag) this.style.backgroundColor = storedColor;
}

function mouseupColor() {
  allowDrag = false;
}

for (let i = 0; i < canvasClass.length; i++) {
  canvasClass[i].addEventListener('mousedown', mousedownColor);
}

for (let i = 0; i < canvasClass.length; i++) {
  canvasClass[i].addEventListener('mouseover', mouseoverColor);
}

for (let i = 0; i < canvasClass.length; i++) {
  canvasClass[i].addEventListener('mouseup', mouseupColor);
}