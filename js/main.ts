function randomIntFromRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors: string[]): string {
  return colors[Math.floor(Math.random() * colors.length)];
}

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 150;
canvas.height = 150;

const colors = ['#6dcb67', '#983667', '#689fac', '#38495b', '#c0d1ca'];

class CodeEle {
  rectX: number;
  rectY: number;
  rectWidth: number;
  rectHeight: number = 5;
  cornerRadius: number = 1;
  color: string;


  constructor(rectX: number, rectY: number, rectWidth: number, color: string) {
    this.rectX = rectX;
    this.rectY = rectY;
    this.rectWidth = rectWidth;
    this.color = color;
  }

  draw() {
    c.fillStyle = this.color;
    c.strokeStyle = this.color;
    c.strokeRect(this.rectX + (this.cornerRadius / 2),
      this.rectY + (this.cornerRadius / 2),
      this.rectWidth - this.cornerRadius,
      this.rectHeight - this.cornerRadius);
    c.fillRect(this.rectX + (this.cornerRadius / 2),
      this.rectY + (this.cornerRadius / 2),
      this.rectWidth - this.cornerRadius,
      this.rectHeight - this.cornerRadius);
  }

  // TODO: When i finally find how to adjust line adding time and position...
  //
  // updateEle() {
  //   this.rectY -= 1;
  //   this.draw();
  // }
}

class CodeLine {
  codeEles: CodeEle[] = [];
  lineWidth: number = 150;
  lineY: number;
  eleMargin: number = 4;


  constructor(lineY: number) {
    this.lineY = lineY;
  }

  lineInit() {
    let codeElesTotalWidth: number = 0;
    let newCodeEleX = 0;
    while (codeElesTotalWidth < this.lineWidth) {
      let newCodeEleWidth = randomIntFromRange(10, 150);
      if (codeElesTotalWidth + newCodeEleWidth > this.lineWidth) {
        break;
      } else {
        let newCodeEleColor = randomColor(colors);
        this.codeEles.push(new CodeEle(newCodeEleX, this.lineY, newCodeEleWidth, newCodeEleColor));
        codeElesTotalWidth += (newCodeEleWidth + this.eleMargin);
        newCodeEleX = codeElesTotalWidth;
      }
    }
  }


}

class Canvas {
  codeLines: CodeLine[] = [];

  codeLinesHeight: number = 5;
  codeLinesYMargin: number = 5;

  codeLinesTotalHeight: number = 0;
  newCodeLineY = 0;

  constructor() {
  }

  canvasInit() {
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        this.drawNewLine();
      }, i * 100);
    }
  }

  drawNewLine() {
    let newCodeLine: CodeLine = new CodeLine(this.newCodeLineY);
    this.codeLines.push(newCodeLine);
    newCodeLine.lineInit();
    for (let i = 0; i < newCodeLine.codeEles.length; i++) {
      setTimeout(() => {
        newCodeLine.codeEles[i].draw();
      }, i * 100)
    }
    this.codeLinesTotalHeight += (this.codeLinesHeight + this.codeLinesYMargin);
    this.newCodeLineY = this.codeLinesTotalHeight;


  }

  //TODO: When i finally find how to adjust line adding time and position...
  //
  // codelinesClear() {
  //   let linesToDelete: number[] = [];
  //   this.codeLines.forEach(line => {
  //     if (line.codeEles[0].rectY < -20) {
  //       linesToDelete.push(this.codeLines.indexOf(line));
  //     }
  //   });
  //   let minLineToDelete = Math.min(...linesToDelete);
  //   let maxLineToDelete = Math.max(...linesToDelete);
  //   this.codeLines.splice(minLineToDelete, maxLineToDelete);
  // }
}

//TODO: When i finally find how to adjust line adding time and position...
//
// function animate() {
//
//   let lines = canvasRows.codeLines;
//   animation = requestAnimationFrame(animate);
//   c.clearRect(0, 0, canvas.width, canvas.height);
//   lines.forEach(line => {
//     line.codeEles.forEach(ele => {
//       ele.updateEle();
//     });
//   });
//
// }

const canvasArea = document.querySelector('#midBracesAnimation');
const canvasBraces = document.querySelectorAll('.braces');

function linesIntervalToggling() {

  canvasBraces.forEach(braces => braces.classList.add('braces-show'));
  canvasRows.canvasInit();
  canvasArea.classList.add('animated');
  setTimeout(() => {
    canvasRows.codeLines.length = 0;
    canvasRows.codeLinesTotalHeight = 0;
    canvasRows.newCodeLineY = 0;
    c.clearRect(0, 0, canvas.width, canvas.height);
    canvasArea.classList.remove('animated');
    canvasBraces.forEach(braces => braces.classList.remove('braces-show'));
  }, 2500);
}

let canvasRows = new Canvas();
setTimeout(() => linesIntervalToggling(), 700);
setInterval(() => linesIntervalToggling(), 4000);





