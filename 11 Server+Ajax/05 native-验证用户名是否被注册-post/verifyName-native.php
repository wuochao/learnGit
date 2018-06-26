<?php 
	header("Content-Type","application/x-www-form-urlencoded");
/*方法一，推荐使用*/
	$arr = array('zhang1','zhang2','zhang3','雷锋');
	$val = $_POST['username'];
	
	$flag = 1;
	foreach($arr as $value)
	{
		if($val == $value)
		{
			$flag = 1;
			break;
		}
		else
		{
			$flag = 0;
		}
	}
	echo $flag;

/*方法二：使用函数*/
/*	function fun()
	{
		$arr = array('zhang1','zhang2','zhang3');
		$val = $_POST['username'];
		for($i = 0; $i< count($arr); $i++)
		{
			if( $val == $arr[$i] )
				return 1;
		}
		return 0;
	}

	echo fun();*/

	
	
 ?>







