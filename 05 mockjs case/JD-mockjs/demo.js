$(function(){
    var xhrUrl = "http://192.168.0.1:3000/jdapi";
    $.ajax({
        type:'get',
        async: false,
        url: xhrUrl,
        cache: false,
        dataType: "jsonp",
        success: function(json){
            console.log(json);
            var html = '';
            $('#js_climit_li').html('');
            $(json.categorys).each(function(i, categorys){
                html += '<li class="appliance js_toggle relative">'
                      +     '<div class="category-info list-nz">'
                      +         '<h3 class="category-name b-category-name">'
                      +             '<i></i>'
                      +             '<a id="s-category-' + categorys.categoryID + '" ' +
                                        'href="#" target="_blank" ' +
                                        'class="ml-22" ' +
                                        'title="'+categorys.categoryName+'">\'+categorys.categoryName+\'</a>'
                      +         '</h3>';
                html += '<p class="c-category-list limit-24">';
                $(categorys.categoryItems).each(function(i, categoryItems){
                    html += '<a href="#" target="_blank" ' +
                            'title="' + categoryItems.cname + '" ' +
                            'id="s-goods-category-' + categoryItems.cid + '">' +
                            categoryItems.cname+ '</a>';
                });
            });
            console.log(html);
            $('#js_climit_li').html(html);
        },
        error: function(e){
            alert('error');
        }
    });
});