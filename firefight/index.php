<html>
<body>
<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin:*");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
?>
<form action="insert.php" method="post">
PersonID: <input type="text" name="PersonID">
BeaconID: <input type="text" name="BeaconID">
StartTime: <input type="text" name="StartTime">
EndTime: <input type="text" name="EndTime">
FireFighter: <input type="text" name="FireFighter">
Emergency: <input type="text" name="Emergency">

<input type="submit">
</form>

</body>
</html>