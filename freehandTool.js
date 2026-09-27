function FreehandTool(){
	//set an icon and a name for the object
	this.icon = "assets/freehand.jpg";
	this.name = "freehand";

	//to smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;
    
    // Slider setup
    this.freehandSizeSlider = createSlider(5 , 50 , 10);
    this.freehandSizeSlider.position(500 ,10);
    this.freehandSizeSlider.hide();
    
	this.draw = function(){
        // Show the slider when the tool is being used
        this.freehandSizeSlider.show();
        var freehandSize = this.freehandSizeSlider.value();
        
		//if the mouse is pressed
		if(mouseIsPressed &&
           mouseX >= 10 &&
           mouseX <= 50 + canvasContainer.size().width &&
           mouseY >= 10 &&
           mouseY <= 50 + canvasContainer.size().height)
        {
        strokeWeight(freehandSize);

			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			} else {
               
                if (currentDrawing == null)
                {
                    currentDrawing = createGraphics(width, height);
                    currentDrawing.strokeWeight(freehandSize);
                    currentDrawing.stroke(fillColor); 
                    currentDrawing.fill(fillColor); 
                }

                currentDrawing.line(previousMouseX, previousMouseY, mouseX, mouseY);
                line(previousMouseX, previousMouseY, mouseX, mouseY);

                // Update the previous mouse position
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
        } else {
            if (currentDrawing != null) {
                drawingStack.push(currentDrawing.get()); 
                currentDrawing.remove(); 
                currentDrawing = null; 
            }
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
            previousMouseX = -1;
            previousMouseY = -1;
        }
        
        // Reset graphic settings to default
        stroke(fillColor);  
        fill(fillColor);  
        strokeWeight(0);
    };
    	// Function to handle tool deselection
        this.unselectTool = function () {
        select(".options").html("");
        this.freehandSizeSlider.hide();
    }
}