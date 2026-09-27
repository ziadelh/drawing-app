function starDrawTool()
{
    this.name = "starStamp";
    this.icon = "assets/star.jpg";
    this.image = loadImage(this.icon);
    
    // Sliders setup
    this.starSizeSlider = createSlider(5 , 50 , 20);
    this.nStarSlider = createSlider(1 ,15 ,3);
    this.starSizeSlider.position(500 ,10);
    this.nStarSlider.position(700,10);    
    this.starSizeSlider.hide();
    this.nStarSlider.hide();
    
this.draw = function()
{
    // Show the slider when the tool is being used
    this.starSizeSlider.show();
    this.nStarSlider.show();
    
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
         for(var i = 0; i < this.nStarSlider.value() ; i++)
            {
                  var starSize = this.starSizeSlider.value();
                  var starX = random((mouseX - starSize/2)-10 , (mouseX - starSize/2) + 10);
                  var starY = random((mouseY - starSize/2)-10 , (mouseY - starSize/2) + 10);
                  currentDrawing.image (this.image , starX , starY ,  starSize, starSize );
                  image (this.image , starX , starY ,  starSize, starSize );
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
        this.starSizeSlider.hide();
        this.nStarSlider.hide();
      }
}
