/**
 * Created by Administrator on 2017/7/25.
 */
(function (window) {
    // ע��: ���ں���ģ��Ӧ������ִ��, ��������� Itcast ���캯��, I �����ȿ���ֱ��ʹ��
    var arr = [],
        push = arr.push,
        slice = arr.slice;
    var Itcast = window.Itcast,
        I = Itcast;

    // ��ʵ��on �� off ������Ȼ����ʵ����������
    Itcast.fn.extend({
        on: function( eventName, callback ){
            //����this����ÿ��domԪ�ض����¼�
            return this.each(function(){
                this.addEventListener( eventName, callback );
            });
        },
        off: function( eventName, callback ){
            //����this����ÿ��domԪ�ض����¼�
            return this.each(function(){
                this.removeEventListener( eventName, callback );
            });
        }
    });

    // ����ͨ����ҳ�洴��div��������divԭ���ϵ��¼�������ȡ�����¼�������
    var div = document.createElement( 'div' );
    var res = [];
    // ����div��ȡdivԭ���ϵ������¼�����������
    for( var k in div){
        if( k.slice(0,2) === 'on' ){
            res.push(k.slice(2));
        }
    }
    // ����̨��ӡ�������е��¼�������ɵ�����res
    console.log( res );
    // ����res���飬���� on ���¼�����Ļص�����
    Itcast.each( res, function( index, item ){
        Itcast.fn[item] = function( callback ){
            return this.on( item, callback );
        };


    });



})(window);
























