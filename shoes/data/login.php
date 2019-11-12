<?php
    
    $u = "admin";
    $p = "123456";

    $user = @$_REQUEST["user"];
    $pass = @$_REQUEST["pass"];

    if($u == $user && $p == $pass){
        echo '{"msg":"成功","statu":0,"userMsg":{}}';
    }else if($u == $user && $p != $pass){
        echo '{"msg":"密码错误","statu":1}';
    }else{
        echo '{"msg":"该用户名不存在","statu":2}';
    }

?>