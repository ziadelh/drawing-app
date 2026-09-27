function rectangleDrawTool() {
    this.icon = "assets/rectangleimg.png";
    this.name = "rectangle";

    let startMouseX = -1;
    let startMouseY = -1;
    let drawing = false;
    this.shouldFill = false;

    // Toggle fill state
    this.toggleFill = function() {
        this.shouldFill = !this.shouldFill;
    };

    this.draw = function() 
    {
        if (mouseIsPressed &&
            mouseX >= 10 &&
            mouseX <= 50 + canvasContainer.size().width &&
            mouseY >= 10 &&
            mouseY <= 50 + canvasContainer.size().height) {
            if (startMouseX == -1) 
            {
                startMouseX = mouseX;
                startMouseY = mouseY;
                drawing = true;
                loadPixels();
            } 
            else {
                if (currentDrawing == null) 
                {
                    currentDrawing = createGraphics(width, height);
                    currentDrawing.stroke(fillColor);
                    stroke(fillColor);

                    if (this.shouldFill) 
                    {
                        currentDrawing.fill(fillColor);
                    } 
                    else {
                        currentDrawing.noFill();
                    }
                }

                currentDrawing.clear();
                updatePixels();
                currentDrawing.rect(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
                currentDrawing.strokeWeight(1);
                currentDrawing.stroke(fillColor);

                if (this.shouldFill) 
                {
                    fill(fillColor);
                } 
                else {
                    noFill();
                }
                
                stroke(fillColor);
                strokeWeight(1);
                rect(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
            }
        } 
        else {
            if (currentDrawing != null) 
            {
                drawingStack.push(currentDrawing.get());
                currentDrawing.remove();
                currentDrawing = null;
            } 
            else if (drawing) 
            {
                loadPixels();
                drawing = false;
                startMouseX = -1;
                startMouseY = -1;
            }
        }

        // Reset graphic settings to default
        stroke(fillColor);
        fill(fillColor);
        strokeWeight(0);
    };
}
