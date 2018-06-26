// add.js文件 也是一个模块，用于处理用户添加 和 修改
define(['jquery', 'template', 'form', 'zhcn', 'validate'],function($, template){

	// 由于这个页面是添加与修改 共享的页面， 因此需要考虑判断进来的时候是什么操作
	// 通过 location.search 来判断是不是有参数传入
	// 如果不记得 location的 属性, 可以利用调试工具来输入 location 来观察判断
	// 可以使用 location.search.length > 0 或者 location.search.charAt( 0 ) == '?'	来判断是否有参数


	//用于截取 tc_id
	var rtcId = /tc_id=(\d+?)/;

	var search = location.search;
	if(search.length>0){
		// alert('编辑讲师页面');
		modifyTeacher();
	} else {
		// alert('新增讲师界面');
		addTeacher();
	}

	//功能1：新增讲师
	function addTeacher(){
		// 页面展示
		var html = template('addTeacherTpl', {
			tc_way: '讲师添加',
			tc_btn_value: '添 加'
		});
		$('#addTeacher').html(html);

		//增加validate表单验证
		$('#addTeacherForm').validate({
			description: {
				required: {
					required: '请填写完整信息'
				}
			}
		});

		//绑定事件
		$('#addTeacher').on('submit', '#addTeacherForm', function(){
			var formData = $(this).serialize();

			//开始提交数据
			$.ajax({
				url: '/api/teacher/add',
				type: 'post',
				data: formData,
				success: function(info){
					if( info.code == 200){
						//添加数据成功，弹出提示，并跳转到teacher的list页面展示
						alert('添加成功');
						location.pathname = '/teacher/list';
					}
				}
			});

			return false; //阻止默认跳转
		});


	}



	//功能2：修改讲师
	function modifyTeacher(){
		//1 先要获取修改的讲师的id
		var tc_id = rtcId.exec(search)[1];
		//console.log(tc_id)

		//2 查询用户数据
		$.ajax({
			url: '/api/teacher/view',
			type: 'post',
			data: {
				tc_id: tc_id
			},
			success: function(info){
				if( info.code == 200){
					// console.log(info.result);
					info.result.tc_way = "讲师编辑";
					info.result.tc_btn_value = "编 辑";

					// 渲染页面
					$('#addTeacher').html(template('addTeacherTpl', info.result));

					// 表单验证validate
					$('#addTeacherForm').validate({
						description: {
							required: {
								required: '请填写完整信息'
							}
						}
					});


					// 编写修改的代码
					$('#addTeacher').on('submit', '#addTeacherForm', function(){
						var formData = $(this).serialize();
						$.ajax({
							url: '/api/teacher/update',
							type: 'post',
							data: formData,
							success: function(info){
								if(info.code == 200){
									// console.log(info);
									alert('修改成功');
									location.pathname = '/teacher/list';									
								}
							}
						});

						return false;
					})
				}
			}
		});

	}

});

