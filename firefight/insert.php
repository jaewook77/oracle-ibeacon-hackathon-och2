<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin:*");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

$con=mysqli_connect("localhost","root","","firefight");
// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
// escape variables for security
$PersonID = mysqli_real_escape_string($con, $_POST['PersonID']);
$BeaconID = mysqli_real_escape_string($con, $_POST['BeaconID']);
$StartTime = mysqli_real_escape_string($con, $_POST['StartTime']);
$EndTime = mysqli_real_escape_string($con, $_POST['EndTime']);
$FireFighter = mysqli_real_escape_string($con, $_POST['FireFighter']);
$Emergency = mysqli_real_escape_string($con, $_POST['Emergency']);


$sql = sprintf("UPDATE person SET BeaconID='%s', StartTime='%s',EndTime='%s',Emergency='%s',FireFighter='%s' WHERE PersonID='%s'",$BeaconID,$StartTime,$EndTime,$Emergency,$FireFighter,$PersonID);


if (!mysqli_query($con,$sql)) {
  die('Error: ' . mysqli_error($con));
}
echo "1 record added";
http_response_code(200);
mysqli_close($con);
?>