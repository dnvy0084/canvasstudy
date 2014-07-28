var canvas, context;

function printTitle( context )
{
    context.save();
    
    context.font = "10pt Dotum";
    context.fillStyle = "#505050";
    context.fillText( document.title, 10, 10 );
    
    context.restore();
}

function init()
{
    canvas = document.getElementById( "canvas" ),
    context = canvas.getContext( "2d" );
    
    context.font = "38pt NanumGothic";
    context.fillStyle = "cornflowerblue";
    context.strokeStyle = "blue";
    
    context.fillText( "hello, canvas", canvas.width / 2 - 150, canvas.height / 2 + 15 );
    context.strokeText( "hello, canvas", canvas.width / 2 - 150, canvas.height / 2 + 15 );
    
    printTitle( context );
}

window.onload = init;



/**
 * Canvas Context Properties Document
 * 
 * 
 * 1. Color, Styles, and Shadows
 * 
 * ------------------ properties ------------------
 * fillStyle:       Sets or returns the color, gradient, or pattern used to fill the drawing    - e.g( context.fillStyle="#FF0000"; )
 * strokeStyle:     Sets or returns the color, gradient, or pattern used for strokes            - e.g( context.strokeStyle="#FF0000"; ) 
 * shadowColor:	    Sets or returns the color to use for shadows                                - e.g( context.shadowColor="black"; )
 * shadowBlur:	    Sets or returns the blur level for shadows                                  - e.g( context.fillStyle="#FF0000"; )
 * shadowOffsetX:	Sets or returns the horizontal distance of the shadow from the shape    - e.g( context.shadowOffsetX=20; )
 * shadowOffsetY:	Sets or returns the vertical distance of the shadow from the shape      - e.g( context.shadowOffsetY=20; )
 * 
 * ------------------ methods ------------------
 * createLinearGradient( x0, y0, x1, y1 ): GradientObject	Creates a linear gradient (to use on canvas content)
 * createPattern( image, repeat ): PatternObject	        Repeats a specified element in the specified direction
 * createRadialGradient()	Creates a radial/circular gradient (to use on canvas content)
 * addColorStop()	        Specifies the colors and stop positions in a gradient object
 * 
 * 
 * 2. Line Styles
 * 
 * ------------------ properties ------------------
 * lineCap	Sets or returns the style of the end caps for a line
 * lineJoin	Sets or returns the type of corner created, when two lines meet
 * lineWidth	Sets or returns the current line width
 * miterLimit	Sets or returns the maximum miter length
 * 
 * 
 * 3. Rectangles
 * 
 * ------------------ methods ------------------
 * rect()	Creates a rectangle
 * fillRect()	Draws a "filled" rectangle
 * strokeRect()	Draws a rectangle (no fill)
 * clearRect()	Clears the specified pixels within a given rectangle
 * 
 * 
 * 4. Paths
 * 
 * ------------------ methods ------------------
 * fill()	Fills the current drawing (path)
 * stroke()	Actually draws the path you have defined
 * beginPath()	Begins a path, or resets the current path
 * moveTo()	Moves the path to the specified point in the canvas, without creating a line
 * closePath()	Creates a path from the current point back to the starting point
 * lineTo()	Adds a new point and creates a line from that point to the last specified point in the canvas
 * clip()	Clips a region of any shape and size from the original canvas
 * quadraticCurveTo()	Creates a quadratic Bézier curve
 * bezierCurveTo()	Creates a cubic Bézier curve
 * arc()	Creates an arc/curve (used to create circles, or parts of circles)
 * arcTo()	Creates an arc/curve between two tangents
 * isPointInPath()	Returns true if the specified point is in the current path, otherwise false
 * 
 * 
 * 5. Transformations
 * 
 * ------------------ methods ------------------
 * scale()	Scales the current drawing bigger or smaller
 * rotate()	Rotates the current drawing
 * translate()	Remaps the (0,0) position on the canvas
 * transform()	Replaces the current transformation matrix for the drawing
 * setTransform()	Resets the current transform to the identity matrix. Then runs transform()
**/