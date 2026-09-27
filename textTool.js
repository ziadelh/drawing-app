function TextTool() {
    this.icon = "assets/text.png";
    this.name = "text";

    this.startX = -1;
    this.startY = -1;
    this.inputField = null;
    
    // Slider setup
    this.textSlider = createSlider(15 , 50 , 5);
    this.textSlider.position(500 ,10);
    this.textSlider.hide();

    this.startInput = function(x, y) 
    {
        this.startX = mouseX;
        this.startY = mouseY;

        // Input setup
        this.inputField = createInput();
        this.inputField.position(this.startX, this.startY);
        this.inputField.elt.focus();

        this.blurHandler = this.handleTextCompletion.bind(this);
        this.keydownHandler = (event) => 
        {
            if (event.key === 'Enter') 
            {
                this.handleTextCompletion();
            }
        };

        this.inputField.elt.addEventListener('blur', this.blurHandler);
        this.inputField.elt.addEventListener('keydown', this.keydownHandler);
    }

    this.handleTextCompletion = function() 
    {
        const textValue = this.inputField.value();
        textSize(this.textSize);
        
        if (textValue) 
        {
            if (currentDrawing == null) 
            {
                currentDrawing = createGraphics(width, height);
            }
            // Apply text to drawing
            currentDrawing.textSize(this.textSize);
            currentDrawing.fill(fillColor);
            currentDrawing.text(textValue, this.startX, this.startY - 25);
            fill(fillColor);
            text(textValue, this.startX, this.startY - 25);
            
            drawingStack.push(currentDrawing.get());
            currentDrawing.remove();
            currentDrawing = null;
        }
        
        if (this.inputField) 
        {
            this.inputField.elt.removeEventListener('blur', this.blurHandler);
            this.inputField.elt.removeEventListener('keydown', this.keydownHandler);

            if (this.inputField.elt.parentNode) 
            {
                this.inputField.remove();
                this.inputField = null;
            }
        }
    }

    this.draw = function() 
    {
        // Show the slider when the tool is being used
         this.textSlider.show();
         this.textSize = this.textSlider.value();
        
        if (mouseIsPressed &&
            mouseX >= 10 &&
            mouseX <= 50 + canvasContainer.size().width &&
            mouseY >= 10 &&
            mouseY <= 50 + canvasContainer.size().height) 
        {  
            if (!this.inputField) 
            {
                this.startInput(mouseX, mouseY);
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
        this.textSlider.hide();
      }
}
