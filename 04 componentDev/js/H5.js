/* 内容管理对象 */
var H5 = function (){
    this.id =('h5_' + Math.random()).replace('.', '_');
    this.el = $('<div class="h5" id="'+ this.id +'"></div>').hide();
    this.page = [];
    $('body').append(this.el);

    //定义方法： 添加page 和 添加component
    /**
     * 新增一个页
     * @param {string} name 对象的名称，会加入到className中
     * @param {string} text 页面内的默认文本
     * @return {H5} H5对象，可以重复使用H5对象，实现链式编程
     */
    this.addPage = function (name, text){
        var page = $('<div class="h5_page section"></div>');
        if( name != undefined ){
            page.addClass('h5_page_' + name);
        }
        if( text != undefined ){
            page.text(text);
        }
        this.el.append(page);
        this.page.push(page);

        // 判断是否需要新增一个slide_up组件
        if( typeof this.whenAddPage === 'function'){
            this.whenAddPage();
        }
        return this;
    };

    /**
     * 新增一个组件
     * @param {string} name 组件的名称，会加入到className中
     * @param {string} text 组件内的默认文本
     * @return {H5} H5组件，可以重复使用H5组件，实现链式编程
     */
    this.addComponent = function (name, cfg){
        var cfg = cfg || {};
        cfg = $.extend({type: 'base'}, cfg);
        var component; //定义一个变量，存储组件元素
        var page = this.page.slice(-1)[0];
        switch (cfg.type){
            case 'base':
                component = new H5ComponentBase(name, cfg);
                break;
            case 'point':
                component = new H5ComponentPoint(name, cfg);
                break;
            case 'polyline':
                component = new H5ComponentPolyline(name, cfg);
                break;
            case 'bar':
                component = new H5ComponentBar(name, cfg);
                break;
            case 'bar_v':
                component = new H5ComponentBar_v(name, cfg);
                break;
            case 'pie':
                component = new H5ComponentPie(name, cfg);
                break;
            case 'ring':
                component = new H5ComponentRing(name, cfg);
                break;
            case 'radar':
                component = new H5ComponentRadar(name, cfg);
                break;
            default:
                break;
        }
        page.append(component);
        return this;
    };

    this.loader = function (firstPage){
        this.el.fullpage({
            onLeave: function(index, nextIndex, direction){
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad: function(anchorLink, index){
                $(this).find('.h5_component').trigger('onLoad');
            },
        });
        this.page[0].find('.h5_component').trigger('onLoad');
        this.el.show();
        // 跳转到第几页
        if(firstPage){
            $.fn.fullpage.moveTo(firstPage);
        }

    };
    this.loader = typeof H5_loading == 'function'? H5_loading : this.loader;

    return this;


};
