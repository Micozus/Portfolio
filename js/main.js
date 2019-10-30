"use strict";
var canvasBraces = document.querySelectorAll('.braces');
var canvas = document.querySelector('canvas');
var loader = document.querySelector('#midBracesAnimation .loader');
var c = canvas.getContext('2d');
var hidden = document.querySelectorAll('.hidden');
var sectionsArea = document.querySelector('main');
var navArea = document.querySelector('nav');
var sectionEntries = document.querySelectorAll('.sectionEntry');
var sectionNavigateButton = document.querySelector('.sectionNavigate');
var selectedView;
canvas.width = 150;
canvas.height = 150;
var CodeEle = (function () {
    function CodeEle(rectX, rectY, rectWidth, color) {
        this.rectHeight = 5;
        this.cornerRadius = 1;
        this.rectX = rectX;
        this.rectY = rectY;
        this.rectWidth = rectWidth;
        this.color = color;
    }
    CodeEle.prototype.draw = function () {
        c.fillStyle = this.color;
        c.strokeStyle = this.color;
        c.strokeRect(this.rectX + (this.cornerRadius / 2), this.rectY + (this.cornerRadius / 2), this.rectWidth - this.cornerRadius, this.rectHeight - this.cornerRadius);
        c.fillRect(this.rectX + (this.cornerRadius / 2), this.rectY + (this.cornerRadius / 2), this.rectWidth - this.cornerRadius, this.rectHeight - this.cornerRadius);
    };
    return CodeEle;
}());
var CodeLine = (function () {
    function CodeLine(lineY) {
        this.codeEles = [];
        this.lineWidth = 150;
        this.eleMargin = 4;
        this.colors = ['#6dcb67', '#983667', '#689fac', '#38495b', '#c0d1ca'];
        this.lineY = lineY;
    }
    CodeLine.randomIntFromRange = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    CodeLine.randomColor = function (colors) {
        return colors[Math.floor(Math.random() * colors.length)];
    };
    CodeLine.prototype.lineInit = function () {
        var codeElesTotalWidth = 0;
        var newCodeEleX = 0;
        while (codeElesTotalWidth < this.lineWidth) {
            var newCodeEleWidth = CodeLine.randomIntFromRange(10, 150);
            if (codeElesTotalWidth + newCodeEleWidth > this.lineWidth) {
                break;
            }
            else {
                var newCodeEleColor = CodeLine.randomColor(this.colors);
                this.codeEles.push(new CodeEle(newCodeEleX, this.lineY, newCodeEleWidth, newCodeEleColor));
                codeElesTotalWidth += (newCodeEleWidth + this.eleMargin);
                newCodeEleX = codeElesTotalWidth;
            }
        }
    };
    return CodeLine;
}());
var Canvas = (function () {
    function Canvas() {
        this.codeLines = [];
        this.codeLinesHeight = 5;
        this.codeLinesYMargin = 5;
        this.codeLinesTotalHeight = 0;
        this.newCodeLineY = 0;
    }
    Canvas.prototype.canvasInit = function () {
        var _this = this;
        canvasBraces.forEach(function (braces) { return braces.classList.add('braces-show'); });
        canvas.classList.add('animated');
        for (var i = 0; i < 15; i++) {
            setTimeout(function () {
                _this.drawNewLine();
            }, i * 100);
        }
    };
    Canvas.prototype.canvasHide = function () {
        var _this = this;
        setTimeout(function () {
            _this.codeLines.length = 0;
            _this.codeLinesTotalHeight = 0;
            _this.newCodeLineY = 0;
            c.clearRect(0, 0, canvas.width, canvas.height);
            canvas.classList.remove('animated');
            canvasBraces.forEach(function (braces) { return braces.classList.remove('braces-show'); });
        }, 2500);
    };
    Canvas.prototype.drawNewLine = function () {
        var newCodeLine = new CodeLine(this.newCodeLineY);
        this.codeLines.push(newCodeLine);
        newCodeLine.lineInit();
        var _loop_1 = function (i) {
            setTimeout(function () {
                newCodeLine.codeEles[i].draw();
            }, i * 100);
        };
        for (var i = 0; i < newCodeLine.codeEles.length; i++) {
            _loop_1(i);
        }
        this.codeLinesTotalHeight += (this.codeLinesHeight + this.codeLinesYMargin);
        this.newCodeLineY = this.codeLinesTotalHeight;
    };
    Canvas.prototype.linesIntervalToggling = function () {
        this.canvasInit();
        this.canvasHide();
    };
    return Canvas;
}());
var canvasRows = new Canvas();
var canvasInterval;
function startCanvas() {
    canvasInterval = setInterval(function () { return canvasRows.linesIntervalToggling(); }, 4000);
}
function stopCanvas() {
    clearInterval(canvasInterval);
}
function mainMenuInit() {
    sectionNavigateButton.classList.remove('contentSelected');
    navArea.classList.remove('contentSelected');
    loader.classList.add('hidden');
    selectedView = null;
    setTimeout(function () {
        hidden.forEach(function (ele) { return ele.classList.remove('hidden'); });
        canvasBraces.forEach(function (braces) { return braces.classList.remove('braces-show'); });
        setTimeout(function () { return canvasRows.linesIntervalToggling(); }, 400);
    }, 600);
}
function onSelectView(section) {
    selectedView = section;
    stopCanvas();
    sectionNavigateButton.classList.add('contentSelected');
    navArea.classList.add('contentSelected');
    hidden[1].classList.add('menu-hide');
    hidden.forEach(function (ele) {
        if (!ele.classList.contains('item'))
            ele.classList.add('hidden');
    });
    setTimeout(function () {
        sectionsArea.classList.remove('unselected');
        sectionEntries.forEach(function (entry) {
            entry.classList.add('hidden');
            if (entry.classList.contains(section)) {
                entry.classList.remove('hidden');
            }
        });
    }, 600);
    setTimeout(function () {
        sectionEntries.forEach(function (entry) {
            if (entry.classList.contains(section)) {
                entry.classList.add('selected');
            }
        });
    }, 800);
}
function onSwitchView() {
    sectionNavigateButton.firstChild.parentElement.style.pointerEvents = 'none';
    var currentlySelectedView = document.querySelector('#sectionAreaWrapper .selected');
    var newView;
    switch (selectedView) {
        case 'about':
            newView = sectionEntries[1];
            selectedView = 'skills';
            break;
        case 'skills':
            newView = sectionEntries[2];
            selectedView = 'portfolio';
            break;
        case 'portfolio':
            newView = sectionEntries[0];
            selectedView = 'about';
            break;
    }
    currentlySelectedView.classList.add('hideToLeft');
    setTimeout(function () {
        currentlySelectedView.classList.remove('selected');
        currentlySelectedView.classList.add('hidden');
        newView.classList.remove('hidden');
    }, 400);
    setTimeout(function () {
        currentlySelectedView.classList.remove('hideToLeft');
        newView.classList.add('selected');
        sectionNavigateButton.firstChild.parentElement.style.pointerEvents = 'all';
    }, 600);
}
function hideHeaderAndSectionContent() {
    hidden[1].classList.remove('menu-hide');
    sectionsArea.classList.add('unselected');
    sectionEntries.forEach(function (entry) {
        entry.classList.add('hidden');
        entry.classList.remove('selected');
    });
}
function onBackToMenu() {
    hideHeaderAndSectionContent();
    stopCanvas();
    mainMenuInit();
    startCanvas();
}
window.onload = function () {
    mainMenuInit();
    startCanvas();
};
//# sourceMappingURL=main.js.map