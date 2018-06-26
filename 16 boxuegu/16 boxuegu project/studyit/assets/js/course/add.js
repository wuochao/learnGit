
define(['tools', 'jquery', 'validate', 'form'],function(tools, $){
	//展开对应的菜单
	tools.expandMenu();

	//添加表单验证
	$('#addCourseNameId').validate();


	//添加点击事件
	$('#addCourseNameId :button').submit(function(){
		$(this).ajaxSubmit({
			url: '/api/course/create',
			type: 'post',
			success: function(info){
				if(info.code == 200){
					//注意：返回课程id，同时跳转到 add_step1种
					//在step1中添加课程描述，也需要课程id号，涉及到传递id号，考虑使用cookie、localStorage、url
					//cookie、localStorage有保留时间，在操作课程时不可能把每个id都记录下来，记下来还需要及时清空
					//所以不选择使用cookie、localStorage传递，而选择url带参数传递（带id号）方式实现
					//形式如： /course/add_step1?cs_id=xxx
					alert('课程添加成功');
					location.href = '/course/add_step1?cs_id=' + info.result.cs_id;
				}
			}
		});

		return false;
	});



});

