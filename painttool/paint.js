let canvas;
let ctx;
let savedImageData;
let canvasWidth = 600;
let canvasHeight = 600;
let dragging = false;
let strokeColor = 'blue';
let fillColor = 'black';
let line_Width = 4 ;
let currentTool = 'brush';
let usingBrush = false;
let brushXPoints = new Array();
let brushYPoints = new Array();
let brushDownPos = new Array();
class ShapeBoundingBox{
    constructor(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
}
class mousepos{
    constructor(x,y) {
        this.x = x,
        this.y = y;
    }
}
class Location{
    constructor(x,y) {
        this.x = x,
        this.y = y;
    }
}
let shapeBoundingBox = new ShapeBoundingBox(0,0,0,0);
let mousedown = new mousepos(0,0);
let loc = new Location(0,0);
document.addEventListener('DOMContentLoaded', setcanvas);
function setcanvas(){
    canvas = document.getElementById('mycanvas');
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = line_Width;
    canvas.addEventListener("mousedown", mouseeventdown); 
    canvas.addEventListener("mousemove", mouseeventmove);
    canvas.addEventListener("mouseup", mouseeventup);
}
function switchtool(toolClicked){
    document.getElementById("brush").className = "";
    document.getElementById("line").className = "";
    document.getElementById("rectangle").className = "";
    document.getElementById("circle").className = "";
    document.getElementById(toolClicked).className = "selected";
    currentTool = toolClicked;
}
function GetMousePosition(x,y){
    let canvasSizeData = canvas.getBoundingClientRect();
    return { x: (x - canvasSizeData.left) * (canvas.width  / canvasSizeData.width),
        y: (y - canvasSizeData.top)  * (canvas.height / canvasSizeData.height)
      };
}
function SaveCanvasImage(){
    savedImageData = ctx.getImageData(0,0,canvas.width,canvas.height);
}
function RedrawCanvasImage(){
    ctx.putImageData(savedImageData,0,0);
}
function updatetool(loc){
    shapeBoundingBox.width = Math.abs(loc.x - mousedown.x);
    shapeBoundingBox.height = Math.abs(loc.y - mousedown.y);
    if(loc.x > mousedown.x){
        shapeBoundingBox.left = mousedown.x;
    } else {
        shapeBoundingBox.left = loc.x;
    }if(loc.y > mousedown.y){shapeBoundingBox.top = mousedown.y;
    } else {shapeBoundingBox.top = loc.y;
    }
}
 function drawtool(loc){
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;
    if(currentTool === "brush"){
        DrawBrush();
    } else if(currentTool === "line"){
        ctx.beginPath();
        ctx.moveTo(mousedown.x, mousedown.y);
        ctx.lineTo(loc.x, loc.y);
        ctx.stroke();
    } else if(currentTool === "rectangle"){
        ctx.strokeRect(shapeBoundingBox.left, shapeBoundingBox.top, shapeBoundingBox.width, shapeBoundingBox.height);
    } 
}
function updatemove(loc){
    updatetool(loc);
    drawtool(loc);
}
function AddBrushPoint(x, y, mouseDown){
    brushXPoints.push(x);
    brushYPoints.push(y);
    brushDownPos.push(mouseDown);
}
function DrawBrush(){
    for(let i = 1; i < brushXPoints.length; i++){
        ctx.beginPath();
        if(brushDownPos[i]){
            ctx.moveTo(brushXPoints[i-1], brushYPoints[i-1]);
        } else {
            ctx.moveTo(brushXPoints[i]-1, brushYPoints[i]);
        }
        ctx.lineTo(brushXPoints[i], brushYPoints[i]);
        ctx.closePath();
        ctx.stroke();
    }
}
function mouseeventmove(e){
    canvas.style.cursor = "crosshair";
    loc = GetMousePosition(e.clientX, e.clientY);
    if(currentTool === 'brush' && dragging && usingBrush){
        if(loc.x > 0 && loc.x < canvasWidth && loc.y > 0 && loc.y < canvasHeight){
            AddBrushPoint(loc.x, loc.y, true);
        }
        RedrawCanvasImage();
        DrawBrush();
    } else {
        if(dragging){
            RedrawCanvasImage();
            updatemove(loc);
        }
    }
};
function mouseeventdown(e){
    canvas.style.cursor = "crosshair";
    loc = GetMousePosition(e.clientX, e.clientY);
    SaveCanvasImage();
    mousedown.x = loc.x;
    mousedown.y = loc.y;
    dragging = true;
    if(currentTool === 'brush'){
        usingBrush = true;
        AddBrushPoint(loc.x, loc.y);
    }
};
function mouseeventup(e){
    canvas.style.cursor = "default";
    loc = GetMousePosition(e.clientX, e.clientY);
    RedrawCanvasImage();
    updatemove(loc);
    dragging = false;
    usingBrush = false;
}