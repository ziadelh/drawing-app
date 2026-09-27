function SprayCanTool(){
	
	this.name = "sprayCanTool";
	this.icon = "assets/sprayCan.jpg";

	var points = 13;
	var spread = 10;
    
    // Slider setup
    this.sprayCanSlider = createSlider(2 , 20 , 2);
    this.sprayCanSlider.position(500 ,10);
    this.sprayCanSlider.hide();

	this.draw = function()
    {
        // Show the slider when the tool is being used
        this.sprayCanSlider.show();
        var spraySize = this.sprayCanSlider.value();
        
		if(mouseIsPressed &&
           mouseX >= 10 &&
           mouseX <= 50 + canvasContainer.size().width &&
           mouseY >= 10 &&
           mouseY <= 50 + canvasContainer.size().height)
        {
        strokeWeight(spraySize);
            if (currentDrawing == null) 
              {
               currentDrawing = createGraphics(width, height); 
               currentDrawing.strokeWeight(spraySize);
               currentDrawing.stroke(fillColor); 
               currentDrawing.fill(fillColor); 
              }
            for(var i = 0; i < points; i++)
              {
               currentDrawing.point(random(mouseX-spread, mouseX + spread)
                                    , random(mouseY-spread, mouseY+spread));
               point(random(mouseX-spread, mouseX + spread)
                     , random(mouseY-spread, mouseY+spread));
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
	   } 
        // Reset graphic settings to default
        stroke(fillColor); 
        fill(fillColor); 
        strokeWeight(0);
    };
        // Function to handle tool deselection
        this.unselectTool = function () 
        {
          select(".options").html("");
          this.sprayCanSlider.hide();
        }
}