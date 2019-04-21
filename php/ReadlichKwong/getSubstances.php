<?php
    include_once("../connection.php");
    // -> This is a comment
    // Building the query
    $query = "SELECT id, name FROM substance";
    // Answer of request
    $ans = array();

    if($records = mysqli_query($link, $query)) {
        // Successful
        $ans["status"] = 1;
        $ans["message"] = "Substances found";
        // Array with content
        $ans["substances"] = array();
        while($record = mysqli_fetch_assoc($records)) {
            $substance = array();
            $substance["id"] = $record["id"];
            $substance["name"] = $record["name"];
            array_push($ans["substances"], $substance);
        }
    }
    else {
        // Error
        $ans['status'] = 0;
        $ans['message'] = "Substances not found";
    }

    echo json_encode($ans, JSON_UNESCAPED_UNICODE);
    // Closing the connection
    mysqli_close($link);
?>
