function triangleDrawTool() {
    this.icon = "assets/triangle.png";
    this.name = "triangle";

    let x1 = -1;
    let y1 = -1;
    let x2 = -1;
    let y2 = -1;
    let x3 = -1;
    let y3 = -1;

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
            if (x1 == -1) 
            {
                x1 = mouseX;
                y1 = mouseY;
                y2 = mouseY;
                drawing = true;
                loadPixels();
            } 
            else {
                if (currentDrawing === null) 
                {
                    currentDrawing = createGraphics(width, height);
                    currentDrawing.stroke(fillColor);

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

                x2 = mouseX;
                y3 = mouseY;
                x3 = (x1 + x2) / 2;

                currentDrawing.triangle(x1, y1, x2, y2, x3, y3);
                currentDrawing.stroke(fillColor);
                currentDrawing.strokeWeight(1);

                if (this.shouldFill) 
                {
                    fill(fillColor);
                } 
                else {
                    noFill();
                }
                stroke(fillColor);
                strokeWeight(1);
                triangle(x1, y1, x2, y2, x3, y3);
            }
        } 
        else {
            if (currentDrawing !== null) 
            {
                drawingStack.push(currentDrawing.get());
                currentDrawing.remove();
                currentDrawing = null;
            } 
            else if (drawing) {
                loadPixels();
                drawing = false;
                x1 = -1;
                y1 = -1;
                x2 = -1;
                y2 = -1;
                x3 = -1;
                y3 = -1;
            }
        }

        // Reset graphic settings to default
        stroke(fillColor);
        fill(fillColor);
        strokeWeight(0);
    }
}
