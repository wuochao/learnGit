<?php 
	$uname = $_GET['un'];
	$pw = $_GET['pw'];

	if($uname == 'admin' && $pw == '123' )
	{
		echo 'good';
	}
	else
	{
		echo 'bad';
	}
	

 ?>