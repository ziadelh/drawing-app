// Wrapper for Drawing Tools
function drawingTools() {
    this.icon = "assets/drawingTools.png";
    this.name = "drawingTools";
    this.goDrop = true;
    this.selectedToolName = "rectangle";

    // Dropdown Menu
    this.dropdown = createSelect();
    this.dropdown.option('Rectangle', 'rectangle');
    this.dropdown.option('Ellipse', 'ellipse');
    this.dropdown.option('Triangle', 'triangle');
    this.dropdown.position(5, 505);
    this.dropdown.hide();

    this.dropdown.changed(() => {
        this.dropdown.hide();
        this.setActiveTool(this.dropdown.value());
    });

    // Tools configuration
    this.tools = {
        rectangle: 
        {
            tool: new rectangleDrawTool(),
            icon: "assets/rectangleimg.png"
        },
        ellipse: 
        {
            tool: new ellipseDrawTool(),
            icon: "assets/ellipseimg.png"
        },
        triangle: 
        {
            tool: new triangleDrawTool(),
            icon: "assets/triangle.png"
        }
    };

    // Set initial tool
    this.activeTool = this.tools.rectangle;

    this.setActiveTool = function(toolName) 
    {
        if (this.tools[toolName]) 
        {
            this.selectedToolName = toolName;
            this.activeTool = this.tools[toolName];
            this.icon = this.tools[toolName].icon;
            
            this.updateToolIcon();
        }
    };

    this.updateToolIcon = function() 
    {
        if (this.elementRef) 
        {
            let imgElem = this.elementRef.child()[0];
            if (imgElem) 
            {
                imgElem.src = this.icon;
            }
        }
    };

    this.draw = function() 
    {
        this.activeTool.tool.draw();
    };

    this.unselectTool = function() 
    {
        // Clear options
        select(".options").html("");
    };

    this.populateOptions = function() 
    {
        select(".options").html("<button id='toggleFill'>Fill</button>");

        let toggleFillButton = select('#toggleFill');
        toggleFillButton.mousePressed(() => {
            if (this.activeTool) {
                this.activeTool.tool.toggleFill();
                if (this.activeTool.tool.shouldFill) 
                {
                    toggleFillButton.html('noFill');
                } 
                else {
                    toggleFillButton.html('Fill');
                }
            }
        });
    };
}
