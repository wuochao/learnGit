//页面公共代码：所有页面共用，如：页面登录

// console.log('测试公共代码是否执行？');

//改写原来的代码为模块形式
define(['jquery', 'template', 'NProgress', 'tools','cookie'], function($, template, NProgress, tools){
	
	//页面初始化，齿轮隐藏
	$('.loading').hide();

	// 二级菜单展开
	$('.aside a + ul').prev().click(function(){
		//展开ul标签
		$(this).next().toggle();

	});

	//处理页面发送ajax请求加载数据时，显示齿轮动画效果
	$(document).ajaxStart(function(){
		$('.loading').show();
		NProgress.start();
	});
	$(document).ajaxStop(function(){
		$('.loading').fadeOut(500);
		NProgress.done();
	});




	/* section 1: 验证用户是否登录 */
	//算法：判断是否存在 PHPSESSID 值，如果存在，表示已经登录；否则就是没有登录

	var php_session_id = $.cookie('PHPSESSID');
	// console.log(php_session_id);
	if(!php_session_id && location.pathname != '/login'){
		// 如果不存在php_session_id，那么就跳转到登录页面 /login (php路由实现)
		location.pathname = '/login';
	} 

	/* section 2: 页面加载，从cookie中取出userInfo，得到用户的头像和用户名 */  
	if(location.pathname != '/login'){
		var userInfo = $.cookie('userInfo');
		//console.log(userInfo);
		//为了确保即使是undefined，也返回一个对象， userInfo || '{}'
		var userInfoObj = JSON.parse(userInfo || '{}');

		//拿到数据后，需要更新页面中的用户名与头像
		//准备模版
		// var format = '<div class="avatar img-circle">' +
		// 				'<img src="'+ (userInfoObj.tc_avatar || './images/default.png') +'" >'+
		//              '</div>' +
		//              '<h4>'+ (userInfoObj.tc_name || '匿名用户') +'</h4>';

		var format = template('userProfileTplId', userInfoObj);
		console.log('渲染完成！')

		$('.aside .profile').html(format);
	}

	//退出登录的代码
	$('#btn_logout').click(function(){
		$.ajax({
			url: '/api/logout',
			type: 'post',
			success: function(info){
				if(info.code == 200){
					//console.log(info);
					location.pathname = '/';
				}
			}
		});
	});

	// 打印当前路径
	tools.setMenu();

});








