function HelperFunctions() {
  // Pass the necessary variables and functions from the setup function    
  this.setup = function (canvasContainer, stack, index, redrawCanvas) {
     // Scissors tool setup
        select("#cutButton").mousePressed(function() {
            
            if (selectMode == 0) {
                selectMode++;
                this.html("Cut");
                loadPixels();
            } else if (selectMode == 1) {
                selectMode++;
                this.html("End paste");
                updatePixels();
                selectedPixels = get(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
                fill(255);
                noStroke();
                rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
                // Save the cut as its own layer so it can be undone
                var cutLayer = createGraphics(width, height);
                cutLayer.noStroke();
                cutLayer.fill(255);
                cutLayer.rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
                drawingStack.push(cutLayer.get());
                cutLayer.remove();
                // Reset graphic settings to default
                stroke(fillColor);
                fill(fillColor);
                strokeWeight(0);
            } else if (selectMode == 2) {
                selectMode = 0;
                loadPixels();
                selectedArea = { x: 0, y: 0, w: 100, h: 100 };
                this.html("Select Area");
            }
        });
  }

        // Event handler for the undo button. Undoes the last drawing action
        select("#undoButton").mouseClicked(function() {
            if (currentDrawing >= 0) {
                drawingStack.pop();
                redrawCanvas();
                // Refresh the saved pixels so tools that restore them don't bring the undone step back
                loadPixels();
            }
        });

        // Event handler for the clear button. Clears the canvas
        select("#clearButton").mouseClicked(function() {
            background(255, 255, 255);
            loadPixels(); 
            drawingStack = []; 
        });

        // Event handler for the save image button. Saves the current canvas state
        select("#saveImageButton").mouseClicked(function() {
            saveCanvas("myPicture", "jpg");
        });
    }

// Function to redraw the canvas
function redrawCanvas() {
    background(255);
    for (let i = 0; i < drawingStack.length; i++) {
        image(drawingStack[i], 0, 0);
    }
}
