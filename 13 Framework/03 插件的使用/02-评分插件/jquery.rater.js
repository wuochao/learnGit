(function ( window ) {

jQuery.fn.rater = function ( options ) {
    // max: 几颗星星
    // after_click: 点击后触发事件, 参数, 记录分数
    var max = options && options.max || 5;
    var func = options && options.after_click;

    var  innerHTMLString = '';
    for ( var i = 0; i < max; i++ ) {
        innerHTMLString += '<span title="'+ i +'">☆</span>';
    }

    this.html( innerHTMLString );
    var i = 0;
    // var isClick;
    $( 'span', this ).css({
        cursor: 'pointer'
    }).each(function () {
        // this.title = i++;
    }).hover(function () {
        if ( $( this ).parent().attr( 'isClick') ) return;
        $( this ).text( '★' ).prevAll().text( '★' ).end().nextAll().text( '☆' );
    }, function () {
        if ( $( this ).parent().attr( 'isClick') ) return;
        $( this ).text( '☆' ).siblings().text( '☆' );
    }).click( function () {
        if ( $( this ).parent().attr( 'isClick') ) return;
        // isClick = this;

        $( this ).parent().attr( 'isClick', this.title - 0 + 1 );

        if ( typeof func == 'function' ) {
            func( $( this ).parent().attr( 'isClick')  - 0 );
        }
    });

}


})( window );