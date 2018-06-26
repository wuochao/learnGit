<?php

	// file_get_contents(  ) 把整个文件读入一个字符串中。
	// 语法：file_get_contents(path,include_path,context,start,max_length)
	$result = file_get_contents('http://api.botue.com/login?tc_name=前端学院&tc_pass=123456');
	echo $result;

?>