<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin:*");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

$con=mysqli_connect("localhost","root","","firefight");

// Check connection
if (mysqli_connect_errno())
{
echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$result = mysqli_query($con,"SELECT * FROM Person");


while($row = mysqli_fetch_array($result))
{
$statement = sprintf("SELECT CoOrdinate FROM ibeacon where iBeaconID ='%s'",$row['BeaconID']);
$coordinates_result= mysqli_query($con,$statement);
while($corow = mysqli_fetch_array($coordinates_result))
{$arr = array('PersonID' => $row['PersonID'],'CoOrdinate' => $corow['CoOrdinate'],'StartTime' => $row['StartTime'], 'EndTime' => $row['EndTime'],'FireFighter'=>$row['FireFighter'],'Emergency'=>$row['Emergency']);
}
echo json_encode($arr);
}

mysqli_close($con);
?>