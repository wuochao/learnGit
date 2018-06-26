<?php 
    /*
    省市县后台数据接口
    接口调用规则：
    1、参数一：flag，用来区分请求的是省市县标记位（1：省，2：市；3：县）
    2、参数二：选择省的时候传递pId，选择市的时候传递cId
    http://localhost/select.php?flag=1
    http://localhost/select.php?flag=2&pId=23
    http://localhost/select.php?flag=3&cId=2345
    */
    // 引入数据文件，有2种方式：
    // 方式一：使用include方法：   include('selectdata.php');
    // 方式二：使用require方法：   require('selectdata.php');
    // 此时用方式二为例，省市县数据来自selectdata.php文件
    require('selectdata.php');
    
    //获取省市县的标记位
    $flag = $_GET['flag'];
    
    if($flag == 1)
    {   // 省级数据
        echo json_encode($provinceJson);
    }
    else if($flag == 2)
    {   // 市级数据
        $pId = $_GET['pId'];
        $cityData = array();
        foreach ($cityJson as $value) 
        {
            if($value->id == $pId)
            {   // 直辖市
                array_push($cityData,$value);
                break;
            }
            else if($value->parent == $pId)
            {   // 非直辖市
                array_push($cityData,$value);
            }
        }
        echo json_encode($cityData);
    }
    // 县级数据
    else if($flag == 3)
    {
        $cId = $_GET['cId'];
        $countyData = array();
        foreach ($countyJson as $value) 
        {
            if($value->parent == $cId)
            {
                array_push($countyData,$value);
            }
        }
        echo json_encode($countyData);
    }
?>