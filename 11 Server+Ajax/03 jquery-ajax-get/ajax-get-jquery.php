<?php 
	$un = $_GET['un'];
	$pw = $_GET['pw'];

	if($un == 'admin' && $pw == '123' )
	{
		echo 'good';
	}
	else
	{
		echo 'bad';
	}

 ?>