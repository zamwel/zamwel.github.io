<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cc_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, list_CARD_BRAND, list_CARD_NUMBER, list_CVV_CVV2, list_MONEY_RANGE, list_PRICE, list_AVAILABILITY FROM unicc";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    
  echo "<tr>
    <td>". $row["id"] ."</td>
    <td>" .$row["list_CARD_NUMBER"] . "</td>
    <td>" .$row["list_CARD_BRAND"] . "</td>
    <td>". $row["list_CVV_CVV2"] ."</td>
    <td>". $row["list_MONEY_RANGE"] ."</td>
    <td>". $row["list_AVAILABILITY"] ."</td>
    <td>". $row["list_PRICE"] ."</td>
    <td>".BUY."</td>
  </tr>";
  }

} else {
  echo "0 results";
}
$conn->close();
?>
