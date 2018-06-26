// 定义模块 add_step2
define(['jquery', 'template', 'tools', 'CKEDITOR', 'uploadify', 'validate', 'form', 'Jcrop'], 
	function($, template, tools, CKEDITOR){
	// 1 处理菜单展开
	tools.expandMenu();

	// 2 当前菜单高亮显示
	tools.setMenu('/course/add');

	// 3 利用tools里面的getSearch方法获取url地址
	var searchObj = tools.getSearch();

	// 4 请求数据，编写模版，渲染页面
	$.ajax({
		url: '/api/course/picture',
		type: 'get',
		data: {
			cs_id: searchObj.cs_id
		},
		success: function(info){
			if(info.code == 200){
				// console.log(info.result);
				var html = template('sete2Tpl', info.result);
				$('.steps').html(html);

				// 处理上传图片 和 裁切图片的 按钮，思路如下：
				// 如果是第一次进来，裁切按钮是不允许点击的，上传图片按钮允许上传图片，等到图片上传完后，预览图片，处于裁切状态，
				// 裁切按钮可以点击
				
				// 如果不是第一次进来，裁切按钮可以点击，启用裁切，上传图片按钮用于再次上传图片，和第一次进来一样，上传图片以后，
				// 还能再裁切
				handleUploadImage( info.result );
				if( info.result.cs_cover_original){
					jcropImage();
				}
			}
		}
	});

	// 封装一个处理上传图片的函数
	function handleUploadImage( result ){
		// 处理图片上传按钮
		$('#btn_upload').uploadify({
			swf: '/assets/lib/uploadify/uploadify.swf',
			uploader: '/api/uploader/cover',
			fileObjName: 'cs_cover_original',
			buttonClass:'btn btn-success btn-sm',
			onUploadSuccess: function( _, filename ){
				// 清空图片预览，再添加图片文件，并设置src属性值
				$('.preview').html('').append($('<img />').attr('src', JSON.parse(filename).result.path));
				// 使裁切图片按钮 disabled属性 改成 false，变成 可点击状态
				$('#btn_selectarea').prop('disabled', false);
				// 调用图片裁切、预览功能
				jcropImage();
				
			},
			itemTemplate: '<span></span>',
			buttonText: '选择图片',
			width: '70',
			height: 'auto',
			formData: {
				cs_id: result.cs_id
			},
			onInit: function(){
				$('#btn_upload').css({
					overflow: 'hidden'
				}).find('div').removeClass('uploadify-button');
			}
	}

	// 封装图片裁切的函数
	function jcropImage(){
		// 开始准备预览图片
		$('.preview img').Jcrop({
			aspectRatio: 2
		}, function(){
			// 配置预览区域，这里应该也可以实现 setSelect
			var jcrop_api = this;
			//console.log(this);  //打印this找出可利用的属性、方法
			// 计算选区的尺寸
			var w = jcrop_api.ui.stage.width;
			var h = jcrop_api.ui.stage.width/2;
			var x = 0;
			var y = (jcrop_api.ui.stage.height - h)/2;

			//预览功能
			jcrop_api.newSelection();
			jcrop_api.setSelect([x, y, w, h]);
			jcrop_api.initComponent('Thumbnailer', { 
				width: 240, 
				height: 120, 
				target: '.thumb' 
			});

		});
	}

});




