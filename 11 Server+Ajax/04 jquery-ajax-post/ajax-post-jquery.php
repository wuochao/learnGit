<?php 
	$un = $_POST['un'];
	$pw = $_POST['pw'];

	if($un == 'admin' && $pw == '456')
	{
		echo 'good';
	}
	else
	{
		echo 'bad';
	}


 ?>