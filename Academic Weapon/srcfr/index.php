<?php
// Create database connection
$db = mysqli_connect("74l.h.filess.io", "academic_tonemoment", "f63cac515ed7ee4c2fc21a58e2d8cbe13161c374", "academic_tonemoment", 3307);

function id($base) {
    $doc = array("pdf", "doc", "docx", "ocx", "odt");
    $id_final = "";

    if (in_array(strtolower(pathinfo($base, PATHINFO_EXTENSION)), $doc)) {
        $id_final .= "1";
    } else {
        $id_final .= "0";
    }
    
    for ($i = 0; $i < 7; $i++) {
        $id_final .= strval(rand(0, 9));
    }
    
    return $id_final;
}

// Check connection
if (mysqli_connect_errno()) {
    echo "Error" . mysqli_connect_error();
    exit();
}

// Initialize message variable
$msg = "";

// If upload button is clicked ...
if (isset($_POST['upload'])) {
    // Get image name
    $image = $_FILES['image']['name'];
    // Get text
    $image_text = mysqli_real_escape_string($db, $_POST['image_text']);

    $desc = mysqli_real_escape_string($db, $_POST['desc']);

    // Check if image already exists in database
    $check_query = "SELECT * FROM images WHERE image='$image' AND image_text='$image_text'";
    $check_result = mysqli_query($db, $check_query);
    if (mysqli_num_rows($check_result) > 0) {
        $msg = "Image already exists in the database";
    } else {
        // Generate ID
        $id = id($image);

        // Construct file name with ID
        $target = "images/".$id."_".basename($image);

        // Prepare an insert statement
        $sql = $db->prepare("INSERT INTO images (id, image, image_text) VALUES (?, ?, ?)");
        $sql->bind_param("sss", $id, $target, $image_text); // "sss" means three strings are being bound

        // Execute query
        if ($sql->execute()) {
            if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
                $msg = "Image uploaded successfully";
                // Redirect after successful upload
                header('Location: index.php');
                exit();
            } else {
                $msg = "Failed to upload image";
            }
        } else {
            $msg = "Failed to save image information to database";
        }
    }
}

$result = mysqli_query($db, "SELECT * FROM images");
?>

<!DOCTYPE html>
<html>
<head>
<title>Image Upload</title>
<link rel="stylesheet" type="text/css" href="hub4.css" />
</head> 

<body>
  <div class="search">
    <form aria-placeholder="Search by name and/or by topics" action=""></form>
    <img src="search.png"  height="50px">
  </div>
  
  <div class="add" id="add" onclick="show('uploading')">
    <p id="addText" style="padding-left: 20px;">Upload content</p>  
        <img src="upload.png" id="imgUpload" height="50px" style="padding-left: 20px">
  </div>

  <div class="uploading" id="uploading"> 
    <p id="close" onclick="hide('uploading')">X</p>
    <form method="POST" action="index.php" enctype="multipart/form-data">
          <input type="hidden" name="size" value="1000000">
          <div>
            <input type="file" name="image">
          </div>
          <div>
        <textarea 
          id="text" 
          cols="40" 
          rows="4" 
          name="image_text" 
          placeholder="Title"></textarea>
                  
        <textarea 
          id="text" 
          cols="40" 
          rows="4" 
          name="desc" 
          placeholder="Enter a short description"></textarea>
          </div>
          <div>
                  <button type="submit" name="upload" id="UploadButton">Upload</button>
          </div>
    </form>
  </div>

  <script src="script_note.js"></script>

  <div id="content">
    <h3> recently Uploaded files</h3>
<?php
while ($row = mysqli_fetch_array($result)) {
    if ($row['id'][0] === "1") {
        echo "<div id='img_div' onclick='location.href=\"".$row['image']."\"'>";
        echo "<p style='padding-left: 40px; padding-right: 20px; color: #fff;'>".$row["image_text"]."</p>";
        echo "<img style='float: right;' src='open.png' height='30px'>";
        echo "<img style='float: right;' src='download.png' height='30px'>";
        echo "<object id='preview' type='application/pdf' width='100px' height='100px' data='".$row['image']."'></object>";
        echo "</div>";

    } else {
        echo "<div id='img_div' onclick='location.href=\"".$row['image']."\"'>";
        echo "<p style='padding-left: 40px; padding-right: 20px; color: #fff;'>".$row["image_text"]."</p>";
        echo "<img style='float: right;' src='open.png' height='30px'>";
        echo "<img style='float: right;' src='download.png' height='30px'>";
        echo "<img id='preview' src='".$row['image']."'>";
        echo "</div>";
    }
}
?>
</div>

</body>
</html>
