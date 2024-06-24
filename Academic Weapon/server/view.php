<?php

$db = mysqli_connect("localhost", "lorpep_academic", "305UVcDgo^", "lorpep_academic", 3307);


// Retrieve the argument from the URL
if(isset($_GET['data'])) {
    // Store the argument in a variable
    $received_data = $_GET['data'];
} 
$result = mysqli_query($db, "SELECT * FROM images WHERE id = $received_data");
$row = mysqli_fetch_array($result);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View</title>
    <link rel="stylesheet" type="text/css" href="view.css" />
</head>
<body>
    <div class="main">
        <div class="container">
            <div class="top">
                <h2 onclick="location.href='index.php'"> <</h2>
                <div class="title">
                    <?php                
                    echo "<h1>".$row['image_text']."</h1>"
                    ?>
                    <!-- <h1>Maths Notes on Exponential</h1>-->
                </div>
                <div class="topLeft" id="topLeft">
                    <?php                    
                    echo "<img src='".$row['image']."' id='doc'>"
                    ?>
                    <!--  <img src="testimg.jpg" id="doc">-->
                    <img src="eye.png" style="position: absolute;">
                </div>


            </div>
            <div class="center">
                <div class="topics">
                    <?php                    
                    echo "<p id='txtTopics'>".$row['topics']."</p> "
                    ?>
                    <!-- <p id="txtTopics">Maths</p>        -->            
                </div>  

                <?php                    
                    echo "<p id='description'>".$row['description']."</p> "
                    ?>
                <!--
                <p id="description">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                     dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
                     . Excepteur sint occaecat
                     cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>-->
            </div>
        </div>
    </div>
    
</body>
</html>