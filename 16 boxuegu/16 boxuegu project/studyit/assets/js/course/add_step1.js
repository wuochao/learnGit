// 定义模块 add_step1
define(['jquery', 'template', 'tools', 'CKEDITOR', 'validate', 'form'], function($, template, tools, CKEDITOR){
	// 1 处理菜单展开
	tools.expandMenu();

	// 2 当前菜单高亮显示
	tools.setMenu('/course/add');

	// 3 利用tools里面的getSearch方法获取url地址
	var searchObj = tools.getSearch();

	// 4 请求数据，编写模版，渲染页面
	$.ajax({
		url: '/api/course/basic',
		type: 'get',
		data: {
			cs_id: searchObj['cs_id'] // 或者写成 searchObj.cs_id 也行
		},
		success: function(info){
			if(info.code == 200){
				// console.log( info );
				// 渲染页面
				var html = template('step1Tpl', info.result);
				$('.steps').html(html);

				// 使用富文本编辑器
				CKEDITOR.replace('cs_brief');

			}
		}

	});

	// 5 绑定change事件，选择顶级分类，通过请求获得子分类，并更新
	$('.steps').on('change', '#cs_cg_pid', function(){
		// 利用数据去请求子分类
		$.ajax({
			url: '/api/category/child',
			type: 'get',
			data: {
				cg_id: this.value
			},
			success: function(info){
				if(info.code == 200){
					// 处理返回数据
					var ret = info.result.map(function( item ){
						return '<option value="'+ item.cg_id +'">'+ item.cg_name +'</option>';
					});
					//console.log(ret);
					ret.unshift('<option value="">请选择</option>');

					$('#cs_cg_id').html(ret.join(''));
				}
			}
		});
	});

	// 6 为表单添加submit事件，并阻止表单默认行为
	$('.steps').on('submit', '#add_step1_form', function(){
		// 6.1 更新 CKEDITOR
		for(var k in CKEDITOR.instances){
			CKEDITOR.instances[k].updateElement();
		}

		// 6.2 ajaxSubmit
		$(this).ajaxSubmit({
			url: '/api/course/update/basic',
			type: 'post',
			success: function(info){
				if(info.code == 200){
					//console.log(info);
					location.href = '/course/add_step2?cs_id=' + info.result.cs_id;

				}
			}
		});

		return false;
	});

});




