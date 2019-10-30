// const canvasArea = document.querySelector('#midBracesAnimation');
const canvasBraces = document.querySelectorAll('.braces');
const canvas = document.querySelector('canvas');
const loader = document.querySelector('#midBracesAnimation .loader');
const c = canvas.getContext('2d');
const hidden = document.querySelectorAll('.hidden');
const sectionsArea = document.querySelector('main');
const navArea = document.querySelector('nav');
const sectionEntries = document.querySelectorAll('.sectionEntry');

canvas.width = 150;
canvas.height = 150;

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

  colors = ['#6dcb67', '#983667', '#689fac', '#38495b', '#c0d1ca'];

  constructor(lineY: number) {
    this.lineY = lineY;
  }

  static randomIntFromRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static randomColor(colors: string[]): string {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  lineInit() {
    let codeElesTotalWidth: number = 0;
    let newCodeEleX = 0;
    while (codeElesTotalWidth < this.lineWidth) {
      let newCodeEleWidth = CodeLine.randomIntFromRange(10, 150);
      if (codeElesTotalWidth + newCodeEleWidth > this.lineWidth) {
        break;
      } else {
        let newCodeEleColor = CodeLine.randomColor(this.colors);
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
    canvasBraces.forEach(braces => braces.classList.add('braces-show'));
    canvas.classList.add('animated');
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        this.drawNewLine();
      }, i * 100);
    }
  }

  canvasHide() {
    setTimeout(() => {
      this.codeLines.length = 0;
      this.codeLinesTotalHeight = 0;
      this.newCodeLineY = 0;
      c.clearRect(0, 0, canvas.width, canvas.height);
      canvas.classList.remove('animated');
      canvasBraces.forEach(braces => braces.classList.remove('braces-show'));
    }, 2500);
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

  linesIntervalToggling() {
    this.canvasInit();
    this.canvasHide();
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
}

let canvasRows = new Canvas();
let canvasInterval: number;

function startCanvas() {
  canvasInterval = setInterval(() => canvasRows.linesIntervalToggling(), 4000);
}

function stopCanvas() {
  clearInterval(canvasInterval);
}

function mainMenuInit() {
  navArea.classList.remove('contentSelected');
  loader.classList.add('hidden');
  setTimeout(() => {
    hidden.forEach(ele => ele.classList.remove('hidden'));
    canvasBraces.forEach(braces => braces.classList.remove('braces-show'));
    setTimeout(() => canvasRows.linesIntervalToggling(), 400);
  }, 600);
}

function onSelectView(section: string) {
  stopCanvas();
  navArea.classList.add('contentSelected');
  hidden[1].classList.add('menu-hide');
  hidden.forEach(ele => {
    if (!ele.classList.contains('item')) ele.classList.add('hidden')
  });
  setTimeout(() => {
    sectionsArea.classList.remove('unselected');
    sectionEntries.forEach(entry => {
      entry.classList.add('hidden');
      if (entry.classList.contains(section)) {
        entry.classList.remove('hidden');
      }
    })
  }, 600);
  setTimeout(() => {
    sectionEntries.forEach(entry => {
      if (entry.classList.contains(section)) {
        entry.classList.add('selected');
      }
    })
  }, 800);
}

function onSwitchView() {

}

function hideHeaderAndSectionContent() {
  hidden[1].classList.remove('menu-hide');
  sectionsArea.classList.add('unselected');
  sectionEntries.forEach(entry => {
    entry.classList.add('hidden');
    entry.classList.remove('selected');
  })
}

function onBackToMenu() {
  hideHeaderAndSectionContent();
  stopCanvas();
  mainMenuInit();
  startCanvas();
}

window.onload = () => {
  mainMenuInit();
  startCanvas();
};










