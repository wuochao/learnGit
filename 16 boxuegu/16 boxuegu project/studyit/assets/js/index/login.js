
define(['jquery', 'cookie'], function($){

	$('#formId').on('submit', function(){
	    // 1 收集数据
	    var formData = $(this).serialize();

	    // 2 发送ajax请求
	    $.ajax({
	        url: '/api/login',
	        type: 'post',
	        data: formData,
	        success: function(info){
	            // console.log(info);
	            if(info.code == 200){
	                alert('登录成功');
	                //保存登录的数据（用户名、密码）到login页面的cookie中，但是期望其他页面也能使用到，
	                //因此需要提供一个对象{path: '/'} 确保网站所有的页面都可以使用到这个cookie
	                $.cookie('userInfo', JSON.stringify(info.result), { path: '/' });
	                location.pathname = '/';
	            }
	        }
	    });
	    return false;
	});

});



