// 定义一个模块，用于个人中心
define(['jquery', 'template', 'CKEDITOR', 'uploadify', 'region', 'validate', 'zhcn', 'form'], function($, template, CKEDITOR){


	//请求数据，加载页面
	$.ajax({
		url: '/api/teacher/profile',
		type: 'get',
		success: function(info){
			if(info.code == 200){
				// console.log(info);
				//渲染模版
				var html = template('settingsFormTpl', info.result);
				$('.body .settings').html(html);

				//渲染结束后才会有标签，才会上传图片
				$('#upfile').uploadify({
					swf: '/assets/lib/uploadify/uploadify.swf',
					uploader: '/api/uploader/avatar',
					fileObjName: 'tc_avatar',
					onUploadSuccess: function( _, filename ){
						$('#upfileView').attr('src', JSON.parse(filename).result.path);
					},
					itemTemplate: '<span></span>',
					buttonText: '',
					width: '120px',
					height: '120px'
				});

				//初始化 省市县的三级联动选择
				$('.hometown').region({
					url: '/assets/lib/jquery-region/region.json',

				});

				//使用CKEDITOR处理表单
				CKEDITOR.replace('tc_introduce');

			}
		}
	});

	//绑定 submit事件
	$('.body .settings').on('submit', '#profileForm', function(){
		// 手动更新CKEDITOR
		for(var k in CKEDITOR.instances){
			CKEDITOR.instances[k].updateElement();
		}

		// 获得用户选择的省市县数据，用竖线连接起来，获得select标签中所有的含有selected属性的option标签
		// 1 在this中查找select标签（理论上先找hometown里面的select）
		// 2 取它的子元素中选中的子元素
		//console.log( $('select', this).find(':selected')); 
		// 3 将3个option中的text取出来，考虑使用map方法
		var tc_hometown = $('select', this).find(':selected').map(function(){
			// this在回调函数中，表示dom对象
			return $(this).text();
		}).toArray().join('|');


		$(this).ajaxSubmit({
			url: './api/teacher/modify',
			type: 'post',
			data: {
				tc_hometown: tc_hometown
			},
			success: function(info){
				//console.log(info);
				if(info.code == 200){
					alert('保存成功');
				}
			}
		});

		return false;
	});	




});

