function eraserTool(){
    this.name = "eraser";
    this.icon = "assets/eraserimg.png";
    
    // Slider setup
    this.eraserSlider = createSlider(10 , 100 , 10);
    this.eraserSlider.position(500 ,10);
    this.eraserSlider.hide();

    this.draw = function()
    {
    // Show the slider when the tool is being used
    this.eraserSlider.show();
    this.size = this.eraserSlider.value();
        
	if(mouseIsPressed &&
       mouseX >= 10 &&
       mouseX <= 50 + canvasContainer.size().width &&
       mouseY >= 10 &&
       mouseY <= 50 + canvasContainer.size().height)
    {
        if (currentDrawing == null) 
            {
               currentDrawing = createGraphics(width, height); 
            }
        
            {
               currentDrawing.noStroke();
               currentDrawing.fill(255); 
               currentDrawing.ellipse(mouseX , mouseY , this.size , this.size);
               noStroke();
               fill(255);
               ellipse(mouseX , mouseY , this.size , this.size);
            }
    }
    else {
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
    }
    // Function to handle tool deselection
    this.unselectTool = function () 
      {
        select(".options").html("");
        this.eraserSlider.hide();
      }
}
        