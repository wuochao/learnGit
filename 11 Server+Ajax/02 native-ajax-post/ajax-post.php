<?php 
	$uname = $_POST['un'];
	$pw = $_POST['pw'];

	if($uname == 'admin' && $pw == '456')
	{
		echo 'good';
	}
	else
	{
		echo 'bad';
	}


 ?>