//a tool for drawing straight lines to the screen. Allows the user to preview
//the a line to the current mouse position before drawing the line to the 
//pixel array.
function LineToTool(){
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;
    this.lineThickness = 5;
    
    // Slider setup
    this.lineSizeSlider = createSlider(5 , 50 , 10);
    this.lineSizeSlider.position(500 ,10);
    this.lineSizeSlider.hide();

	//draws the line to the screen 
	this.draw = function(){
        // Show the slider when the tool is being used
        this.lineSizeSlider.show();
        var lineSize = this.lineSizeSlider.value();

		//only draw when mouse is clicked
		if(mouseIsPressed &&
           mouseX >= 10 &&
           mouseX <= 50 + canvasContainer.size().width &&
           mouseY >= 10 &&
           mouseY <= 50 + canvasContainer.size().height)
        {    
        strokeWeight(lineSize);
			//if it's the start of drawing a new line
			if(startMouseX == -1)
            {
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//save the current pixel Array
				loadPixels();
			}
			else
            {
                 if (currentDrawing == null) 
                 {
                    currentDrawing = createGraphics(width, height); 
                    currentDrawing.strokeWeight(lineSize);
                    currentDrawing.stroke(fillColor); 
                    currentDrawing.fill(fillColor);
                 }
                 currentDrawing.clear();
				 //update the screen with the saved pixels to hide any previous
				 //line between mouse pressed and released
				 updatePixels();
                 currentDrawing.line(startMouseX, startMouseY, mouseX, mouseY);
				 //draw the line
				 line(startMouseX, startMouseY, mouseX, mouseY);  
			}
		}
          else 
          {
            if (currentDrawing != null) 
            {
                drawingStack.push(currentDrawing.get()); 
                currentDrawing.remove(); 
                currentDrawing = null;
            }
		    else if(drawing)
            {
			//save the pixels with the most recent line and reset the
			//drawing bool and start locations
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
    	// Function to handle tool deselection
        this.unselectTool = function () {
        select(".options").html("");
        this.lineSizeSlider.hide();
    }
}