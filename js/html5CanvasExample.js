
var CanvasApp = function()
{
    this.canvas = undefined;
    this.context = undefined;
    this.finalizer = null;
    
    this.firstCase = "gravityTest";
}

CanvasApp.prototype = 
{
    
    /**
     *
     * initializer
     *  canvas element瑜�諛쏆븘 context��canvas element瑜�
     *  CanvasApp instance 蹂�닔����옣. 
     * 
     **/
    init: function( canvas )
    {
        this.canvas = canvas;
        this.context = canvas.getContext( "2d" );
        this.context.save();
        
        this.makeTestCaseList();
        this.excuteFunc( this.firstCase );
    },
    
    /**
     * test case function name���ы븿��listitem��html��異붽�
     * */
    makeTestCaseList: function()
    {
        var container = document.getElementById( "functionList" ),
            listItem;
        
        var appContext = this;    
        
        function onclick( e )
        {
            appContext.excuteFunc( e.target.innerHTML.toString() );
        }
            
        for( var s in this )
        {
            if( typeof( this[s] ) != "function" || 
                s.indexOf( "$" ) == -1 ) continue;
                
            listItem = document.createElement( "LI" );
            listItem.innerHTML = "<a href='#'>" + s.replace( "$", "" ) + "</a>";
            listItem.addEventListener( "click", onclick );
            container.appendChild( listItem );
        }
    },
    
    /**
     * �쇱そ �곷떒���꾩옱 test case瑜��뚯닔 �덈룄濡�title �쒖떆
     * */
    setTitle: function( title )
    {
        this.context.save();
        
        this.context.font = "9pt NanumGothic bold";
        this.context.fillStyle = "#96969;";
        this.context.fillText( title, 8, 15 );
        
        this.context.restore();
    },
    
    /**
     * 異붽���listItem click���대떦 listItem紐낆쓽 �⑥닔瑜��몄텧. 
     * */
    excuteFunc: function( funcName )
    {
        if( this.finalizer !== null )
        {
            this.finalizer();
            this.finalizer = null;
        }
        
        if( !(/^\$/).test( funcName ) )
            funcName = "$" + funcName;
            
        if( this[ funcName ] === undefined ) return;
        
        this[ funcName ]();
    },
    
    
    /**
     * canvas �붾㈃ �대━�� 
     * */
    clear: function()
    {
        this.context.clearRect( 
            0, 0, this.canvas.width, this.canvas.height );
    },
    
     /**
     * 
     * Test Case Function List
     * 
     **/
     
     // �덉젣 1.1 
    $helloCanvas: function()
    {
        this.clear();
        this.setTitle( "hello, canvas" );
        
        this.context.save();
        
        this.context.font = "38pt NanumGothic";
        this.context.fillStyle = "cornflowerblue";
        this.context.strokeStyle = "blue";
        
        var text = "hello, canvas";
        var measuredInfo = this.context.measureText( text );
        
        this.context.fillText( text, 
            ( this.canvas.width - measuredInfo.width ) / 2, this.canvas.height / 2 );
        this.context.strokeText( text, 
            ( this.canvas.width - measuredInfo.width ) / 2, this.canvas.height / 2 );
        
        this.context.restore();
    },
    
    $drawClock: function()
    {
        this.clear();
        this.setTitle( "draw clock" );
        
        var clock = new Clock();
        clock.x = this.canvas.width / 2;
        clock.y = this.canvas.height / 2;
        
        clock.__render( this.context );
        
        var appContext = this;
        var clockTimer = setInterval( 
            function()
            {
                appContext.context.clearRect( 
                    0, 100, appContext.canvas.width, appContext.canvas.height );
                clock.__render( appContext.context );
            }, 1000
        )
        
        this.finalizer = function()
        {
            clearInterval( clockTimer );
        }
    },
    
    $howToDrawLine: function()
    {
        this.clear();
        this.setTitle( "howToDrawLine" );
        this.context.save();
        
        this.context.lineWidth = 2;
        this.context.strokeStyle = "#cc0000";
        
        var numPolygons = 5,
            radius = 200,
            cx = this.canvas.width / 2,
            cy = this.canvas.height / 2;
            
        var t = - Math.PI / 2,
            x = cx + radius * Math.cos( t ), 
            y = cy + radius * Math.sin( t );
            
        this.context.beginPath();
        this.context.moveTo( x, y );
            
        for( var i = 1; i < numPolygons + 1; i++ )
        {
            t = i * ( 2 * Math.PI ) / numPolygons - Math.PI / 2;
            
            x = cx + radius * Math.cos( t );
            y = cy + radius * Math.sin( t );
            
            this.context.lineTo( x, y );
        }
        
        this.context.stroke();
        
        this.context.lineWidth = 1;
        this.context.strokeStyle = "#0000ff";
        
        t = -Math.PI / 2;
        x = cx + radius * Math.cos( t ), 
        y = cy + radius * Math.sin( t );
        
        this.context.beginPath();
        this.context.moveTo( x, y );
        
        for( var i = 2; i <= numPolygons * 2; i += 2 )
        {
            t = ( 2 * Math.PI ) * ( i % numPolygons ) / numPolygons - Math.PI / 2;
            
            x = cx + radius * Math.cos( t );
            y = cy + radius * Math.sin( t );
            
             this.context.lineTo( x, y );
        }
        
        this.context.stroke();
        this.context.restore();
    },
    
    $mouseEvent: function()
    {
        this.clear();
        this.setTitle( "MouseEvent test" );
        
        this.canvas.addEventListener( "click", 
            function( e )
            {
                console.log( e, e.clientX, e.clientY );
            }
        );
        
        var r = this.canvas.getBoundingClientRect();
        
        console.log( r );
    },
    
    $eventDispatcherTest: function()
    {
        var e = new EventDispatcher();
        
        e.addEventListener( "test", function(e){ console.log(e);}, this );
        
        e.dispatchEvent( "test" );
    },
    
    $shapeTest: function()
    {
        this.clear();
        this.setTitle( "Shape Test" );
        
        var s = new Shape();
        
        s.x = 123;
        console.log( s.x );
        
        s.addEventListener( "update", function( e )
        {
            console.log( e.type, e, this.init );
        }, this );
        
        s.dispatchEvent( "update" );
        
        
        s.x = 100;
        s.y = 50;
        
        s.__render( this.context );
    },
	
	$gravityTest: function()
	{
		var stage = new Stage( this.context );
		var g = 0.3;
		var scope = this;
		
		function onEnter( e )
		{
			var b = e.target;
			
			b.vy += g;
			
			b.x += b.vx;
			b.y += b.vy;
			
			if( b.y > scope.context.canvas.height )
			{
				stage.removeChild( b );
				b.removeEventListener( "enterframe", onEnter );
			}
		}
		
		function onStageClick( e )
		{
			var b = new Shape();
			b.x = e.x;
			b.y = e.y;
			b.vx = 0;
			b.vy = 0;
			b.addEventListener( "enterframe", onEnter );
			
			stage.addChild( b );
		}
		
		stage.addEventListener( "click", onStageClick );
		
		this.finalizer = function()
		{
			stage.stopRender();
		}
	},
    
    $renderTest: function()
    {
        var n = 100;
        var stage = new Stage( this.context );
        
        function onEnter( e )
        {
            var tx = e.target.x + e.target.vx;
            var ty = e.target.y + e.target.vy;
            
            if( tx < 0 ) 
            {
                tx = 0;
                e.target.vx *= -1;
            }
            else if( tx > this.context.canvas.width )
            {
                tx = this.context.canvas.width;
                e.target.vx *= -1;
            }
            
            if( ty < 0 )
            {
                ty = 0;
                e.target.vy *= -1;
            }
            else if( ty > this.context.canvas.height )
            {
                ty = this.context.canvas.height;
                e.target.vy *= -1;
            }
            
            e.target.x = tx;
            e.target.y = ty;
        }
        
        for( var i = 0; i < n; i++ )
        {
            var s = new Shape();
            
            s.x = this.context.canvas.width * Math.random();
            s.y = this.context.canvas.height * Math.random();
            
            s.vx = Math.random() * 4 + 1;
            s.vy = Math.random() * 4 + 1;
            
            s.name = "Shape" + i;
            
            s.addEventListener( "enterframe", onEnter, this );
            stage.addChild( s );
        }
        
        this.finalizer = function()
        {
            for( var i = stage.numChildren; i--; )
            {
                var child = stage.getChildAt( i );
                stage.removeChild( child );
                
                child.removeEventListener( "enterframe", onEnter );
            }
            
            stage.stopRender();
        }
    }
}

window.onload = function()
{
    new CanvasApp().init( document.getElementById( "canvas" ) );
}


/**
 * 
 * CLOCK Instance
 * 
 * */

var Clock = function()
{
    this.radius = 200;
    
    this.numerals = 
    [ 
        "I", "II", "III", "IV",
        "V", "VI", "VII", "VIII",
        "IX", "X", "XI", "XII"
    ];
    
    this.x = 0;
    this.y = 0;
};

Clock.prototype = 
{
    time: function( time )
    {
        var date = new Date();
        
        console.log( date );
    },
    
    drawCircle: function( context )
    {
        context.beginPath();
        
        context.lineWidth = 2;
        context.strokeStyle = "#303030";
        context.arc( this.x, this.y, this.radius, 0, 2 * Math.PI );
        context.stroke();
    },
    
    alignNumerals: function( context )
    {
        var r = this.radius + 20, 
            t, x, y, textWidth;
        
        context.font = "12pt NanumGothic bold";
        
        for( var i = 0; i < this.numerals.length; i++ )
        {
            t = Math.PI * ( i / 6 - 1 / 3 );
            x = this.x + r * Math.cos( t );
            y = this.y + r * Math.sin( t );
            
            textWidth = context.measureText( this.numerals[i] ).width;
            context.fillText( this.numerals[i], x - textWidth / 2, y + 5 );
        }
    },
    
    drawHands: function( context )
    {
        var date = new Date(),
            sec = date.getSeconds(),
            min = date.getMinutes() + sec / 60,
            hour = date.getHours() + min / 60,
            t, x, y;
            
        var a = 
        [ 
            hour, 12, 4, "#0000cc", 0.65,
            min, 60, 2, "#cc0000", 0.85, 
            sec, 60, 1, "#222222", 0.9,
        ];    
        
        for( var i = 0; i < a.length; i += 5 )
        {
            context.beginPath();
            
            t = 2 * Math.PI * a[i] / a[i+1] - Math.PI / 2;
            x = this.x + a[i+4] * this.radius * Math.cos( t );
            y = this.y + a[i+4] * this.radius * Math.sin( t ); 
            
            context.lineWidth = a[ i + 2 ];
            context.strokeStyle = a[ i + 3 ];
            context.moveTo( this.x, this.y );
            context.lineTo( x, y );
            
            context.stroke();
        }
        
        context.beginPath();
        
        context.fillStyle = "#ff0000";
        context.arc( this.x, this.y, 5, 0, 2 * Math.PI );
        context.fill();
    },
    
    __render: function( context )
    {
        context.save();
        
        this.drawCircle( context );
        this.alignNumerals( context );
        this.drawHands( context );
        
        context.restore();
    },
}


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
 * function createLinearGradient( x0, y0, x1, y1 ){}: GradientObject	Creates a linear gradient (to use on canvas content)
 * function createPattern( image, repeat ){}: PatternObject	        Repeats a specified element in the specified direction
 * function createRadialGradient(){}	Creates a radial/circular gradient (to use on canvas content)
 * function addColorStop(){}	        Specifies the colors and stop positions in a gradient object
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
 * quadraticCurveTo()	Creates a quadratic B챕zier curve
 * bezierCurveTo()	Creates a cubic B챕zier curve
 * arc( cx, cy, radius, sAngle, eAngle, CCW )	Creates an arc/curve (used to create circles, or parts of circles)
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
 * 
 * 
 * 6. Text
 * 
 * ------------------ properties -----------------
 * font	Sets or returns the current font properties for text content
 * textAlign	Sets or returns the current alignment for text content
 * textBaseline	Sets or returns the current text baseline used when drawing text
 * 
 * ------------------ methods ------------------
 * function fillText( text, x, y ){}	Draws "filled" text on the canvas
 * strokeText()	Draws text on the canvas (no fill)
 * measureText( text ): { width: actual text width }	Returns an object that contains the width of the specified text
 * 
 * 
 * 7. Image Drawing
 * 
 * ------------------ methods ------------------
 * drawImage()	Draws an image, canvas, or video onto the canvas
 * 
 * 
 * 8. Pixel Manipulation
 * 
 * ------------------ properties -----------------
 * width	Returns the width of an ImageData object
 * height	Returns the height of an ImageData object
 * data	Returns an object that contains image data of a specified ImageData object
 * 
 * ------------------ methods ------------------
 * createImageData()	Creates a new, blank ImageData object
 * getImageData()	Returns an ImageData object that copies the pixel data for the specified rectangle on a canvas
 * putImageData()	Puts the image data (from a specified ImageData object) back onto the canvas
 * 
 * 
 * 9. Compositing
 * 
 * ------------------ properties -----------------
 * globalAlpha	Sets or returns the current alpha or transparency value of the drawing
 * globalCompositeOperation	Sets or returns how a new image are drawn onto an existing image
 * 
 * 
 * 10. Other
 * ------------------ methods ------------------
 * save()	Saves the state of the current context
 * restore()	Returns previously saved path state and attributes
 * createEvent()	 
 * getContext()	 
 * toDataURL()
 * 
**/