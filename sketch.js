//global variables that will store the toolbox colour palette
//and the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;
var fillColor = null;
var drawingStack = [];
var currentDrawing = null; 

// variables for scissors tool
var selectMode = 0;
var selectedArea = { x: 0, y: 0, w: 100, h: 100 };
var selectedPixels;
var isSelecting = false;

function setup() {

	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("content");

	//create helper functions and the colour palette
	helpers = new HelperFunctions();
	colourP = new ColourPalette();
    fillColor = color(0);
    

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new SprayCanTool());
	toolbox.addTool(new mirrorDrawTool());
    toolbox.addTool(new starDrawTool());
    toolbox.addTool(new eraserTool());
    toolbox.addTool(new TextTool());
    toolbox.addTool(new drawingTools());

    //Setup helpers
    helpers.setup(canvasContainer, drawingStack, currentDrawing, redrawCanvas);

    //Initial background color
	background(255);
}

function draw() {
    // This is for normal drawing
    if (selectMode == 0 && toolbox.selectedTool.hasOwnProperty("draw")) {
        toolbox.selectedTool.draw();
    } 
    
    // This is to show the selection rectangle
     if (selectMode == 1) {
        updatePixels();
        noStroke();
        fill(255, 0, 0, 100);
        rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
        // Reset graphic settings to default
        stroke(fillColor); 
        fill(fillColor);
        strokeWeight(0);
    }
}

// True when the mouse is over the drawing canvas (not the buttons, toolbar or palette)
function mouseOnCanvas() {
    return mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height;
}

function mousePressed() {
    if (!mouseOnCanvas()) {
        return;
    }
    if (selectMode == 1) {
        selectedArea.x = mouseX;
        selectedArea.y = mouseY;
        isSelecting = true;
    } else if (selectMode == 2) {
        image(selectedPixels, mouseX, mouseY);
        // Save the paste as its own layer so it can be undone
        var pasteLayer = createGraphics(width, height);
        pasteLayer.image(selectedPixels, mouseX, mouseY);
        drawingStack.push(pasteLayer.get());
        pasteLayer.remove();
    }
}

function mouseReleased() {
    if (selectMode == 1 && isSelecting) {
        // Keep the selection inside the canvas and allow dragging in any direction
        var endX = constrain(mouseX, 0, width);
        var endY = constrain(mouseY, 0, height);
        selectedArea.w = abs(endX - selectedArea.x);
        selectedArea.h = abs(endY - selectedArea.y);
        selectedArea.x = min(selectedArea.x, endX);
        selectedArea.y = min(selectedArea.y, endY);
        // A click without dragging selects a default 100x100 area
        if (selectedArea.w < 1 || selectedArea.h < 1) {
            selectedArea.w = 100;
            selectedArea.h = 100;
        }
        isSelecting = false;
    }
}