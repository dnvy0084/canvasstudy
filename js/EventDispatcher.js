var EventDispatcher = function(){};

EventDispatcher.prototype = 
{
    map: {},
    
    addEventListener: function( type, listener, thisObj )
    {
        if( !this.hasEventListener( type ) )
            this.map[ type ] = [];
            
        this.map[ type ].push( { listener: listener, thisObj: thisObj } );
    },
    
    removeEventListener: function( type, listener, thisObj )
    {
        
    },
    
    dispatchEvent: function( type )
    {
        if( !this.hasEventListener( type ) ) return;
        
        var event = null,
            e = null;
        
        for( var i = 0; i < this.map[type].length; i++ )
        {
            event = this.map[type];
            
            e = { type: type, target: this };
            
            event.listener.apply( event.thisObj, [ e ] );
        }
    },
    
    hasEventListener: function( type )
    {
        return this.map.hasOwnProperty( type );
    }
}