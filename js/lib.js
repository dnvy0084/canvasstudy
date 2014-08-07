
//***************************************************
//
// Simple Extend util
//
//***************************************************

function extend( base, sub )
{
    for( var  s in base.prototype )
    {
        sub.prototype[s] = base.prototype[s];
    }
}




//***************************************************
//
// EventDispatcher
//
//***************************************************

var EventDispatcher = function(){};

EventDispatcher.prototype.map = {};

EventDispatcher.prototype.addEventListener = function( type, listener, thisObj )
{
    if( !this.hasEventListener( type ) )
        this.map[ type ] = [];
        
    this.map[ type ].push( { listener: listener, thisObj: thisObj } );
}

EventDispatcher.prototype.removeEventListener = function( type, listener, thisObj )
{
    if( !this.hasEventListener(type) ) return;
    
    for( var i = this.map[type].length; i--; )
    {
        if( this.map[type].listener == listener )
            this.map[type].splice( i, 1 );
    }
}

EventDispatcher.prototype.dispatchEvent = function( type )
{
    if( !this.hasEventListener( type ) ) return;
    
    var event = null,
        e = null;
    
    for( var i = 0; i < this.map[type].length; i++ )
    {
        event = this.map[type][i];
        
        e = { type: type, target: this };
        
        event.listener.apply( event.thisObj, [ e ] );
    }
}

EventDispatcher.prototype.hasEventListener = function( type )
{
    return this.map.hasOwnProperty( type );
}





//***************************************************
//
// Stage
//
//***************************************************
var Stage = function( context )
{
    extend( EventDispatcher, Stage );
    
    this.context = context;
    this.children = [];
    this.fps = 60;
    this.delay = 1000 / this.fps;
    
    this.init();
    this.enterframeID = this.startRender();
}

Stage.prototype.init = function()
{
    this.__defineGetter__( "numChildren", 
        function() 
        {
            return this.children.length;
        }
    );
    
    this.__defineGetter__( "frameRate", 
        function()
        {
            return this.fps;
        }
    );
    
    this.__defineSetter__( "frameRate", 
        function( value ) 
        {
            this.fps = value;
            this.delay = 1000 / this.fps;
            
            clearInterval( this.enterframeID );
            this.enterframeID = this.startRender();
        }
    );
}

Stage.prototype.addChild = function( child )
{
    if( this.contains( child ) )
        this.removeChild( child );
        
    this.children.push( child );
}

Stage.prototype.removeChild = function( child )
{
    var i = this.chidren.indexOf( child );
    
    if( i == -1 ) return null;
    
    this.children.splice( i, 1 )[0];
}

Stage.prototype.contains = function( child )
{
    return this.children.indexOf( child ) > -1;
}

Stage.prototype.startRender = function()
{
    var scope = this;
    
    return setInterval( 
        function()
        {
            scope.__render();
        }, 
    this.delay );
}

Stage.prototype.__render = function()
{
    this.context.clearRect( 
        0, 0, this.context.canvas.width, this.context.canvas.height );
        
    for( var i = 0; i < this.children.length; i++ )
    {
        this.children[i].dispatchEvent( "enterframe" );
        
        if( this.children[i].__render )
            this.children[i].__render( this.context );
    }
    
    console.log( "render" );
}




//***************************************************
//
// Shape
//
//***************************************************
var Shape = function()
{
    extend( EventDispatcher, Shape );
    
    this.x = 0;
    this.y = 0;
}

Shape.prototype.__render = function( context )
{
    context.save();
    
    context.beginPath();
    context.filleStyle = "#cc0000";
    
    context.translate( this.x, this.y );
    
    context.arc( 0, 0, 20, 0, 2 * Math.PI );
    context.fill();
    context.stroke();
    
    context.translate( -this.x, -this.y );
    context.restore();
}

