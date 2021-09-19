<?php

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES)) {


    $path = "uploads/";

    for ($i = 0; $i < count($_POST["folder"]); $i++) {
        $folder = dirname($_POST["folder"][$i]);
        $full_path = $path . $folder;

        if (!file_exists($full_path)) {
            mkdir($full_path, 777, true);
        }

        $temp_file = $_FILES["file"]["tmp_name"][$i];
        $name = $_FILES["file"]["name"][$i];

        move_uploaded_file($temp_file, $full_path . "/" . $name);
    }

    echo "success";
}
