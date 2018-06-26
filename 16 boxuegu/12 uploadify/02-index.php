<?php
	// print_r( $_FILES );
	$filename = $_FILES[ 'Filedata' ][ 'name' ];
	$tmp_name = $_FILES[ 'Filedata' ][ 'tmp_name' ];

	move_uploaded_file($tmp_name, './uploads/' . $filename); 
	// 将上传的临时文件. 移动到当前multi

	echo './uploads/' . $filename;
?>