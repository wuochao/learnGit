(function ( window ) {

 jQuery.storage = function ( key, value ) {
    if (  value === undefined  ) {
        // 要取数据
        return window.localStorage[ key ];
    } else {
        // 要存数据
        window.localStorage[ key ] = value;
    }
}
jQuery.storage.clear = function () {
    window.localStorage.clear();
}

})( window );