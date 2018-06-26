//讲师列表的页面

define(['jquery', 'template', 'bootstrap', 'form'], function($, template){
	//alert("测试讲师列表的模块！");
	//页面一加载就需要请求数据，ajax
	$.ajax({
		url: '/api/teacher',
		type: 'get',
		success: function(info){
			console.log(info);
			if(info.code == 200){
				//利用模版引擎渲染
				var html = template('tableTeacherInfoListTpl', {list: info.result});
				$("#tableTeacherInfoList tbody").html(html);
			}
		}
	});

	//定义模版过滤器，对家乡信息进行格式化处理，去掉中间的竖线“|”
	var rhometown = /\|/g;
	template.defaults.imports.formatHomeTown = function(hometown){
		return hometown.replace(rhometown, ' ');
	};


	//添加查看信息的点击事件（注意 ajax异步加载）
	//因此要么写在success回调函数中，渲染页面完成后，再添加事件
	//要么使用on 事件委托来增加事件
	$('#tableTeacherInfoList').on('click', '.showInfo', function(){
		var tc_id = $(this).parent('td').attr('data-tc-id');
		//console.log(tc_id);
		//通过id查找用户数据
		$.ajax({
			url: '/api/teacher/view',
			type:'get',
			data: {tc_id: tc_id},
			success: function(info){
				if(info.code == 200){
					//console.log(info.result);
					// 渲染模版，显示模态框
					var html = template('teacherInfoTpl', info.result);
					$('#modalTeacherInfo').html(html);
					$('#teacherModal').modal('show');
				}
			}
		});
	});

	//提供讲师状态修改按钮
	var statusValues = ['启 用','注 销'];
	$('#tableTeacherInfoList').on('click', '.status', function(){
		//发送请求，获得状态
		//1 获得id
		//2 获取当前状态
		//3 发送请求
		//4 拿到请求的结果
		//5 修改页面中的值
		var tc_id     = $(this).parent('td').attr('data-tc-id');
		var tc_status = $(this).attr('data-tc-status');
		var that = this;
		$.ajax({
			url: '/api/teacher/handle',
			type: 'post',
			data: {
				tc_id: tc_id,
				tc_status: tc_status 
			},
			success: function(info){
				if(info.code == 200){
					//console.log(info.result);
					$(that).attr('data-tc-status', info.result.tc_status)
						   .text(statusValues[info.result.tc_status]);
				}
			}
		});

		return false;
	});

});






