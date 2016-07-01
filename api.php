<?php
$con=mysql_connect("us-cdbr-azure-southcentral-e.cloudapp.net","be7fc4952115f9","9636eb39");

if(!$con)
{
        die('Connection Failed'.mysql_error());
}

mysql_select_db("bollynuA2SWI92qG",$con);

$sql = "select * from wp_posts where post_title = 'Expectations this week' ";

$result =mysql_query($sql) ;

 while($row=mysql_fetch_array($result))
 {
 	$content = $row['post_content'];

 }

 $d = array('content' => $content);



echo json_encode($d);
?>