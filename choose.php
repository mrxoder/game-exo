<?php

session_start();

include("autoloader.php");

$db = new sql();



if(!empty($_SESSION["playername"])){
	 header("location:lobby.php");
	 
}

if(!empty($_SESSION["playername"]) && $db->playerExist("", $_SESSION['playername'])){
	 header("location: lobby.php");
}


if(!empty($_POST["pseudo"]) &&  !empty($_POST["a"])){
	 var_dump($_POST);
	 $create = $db->newplayer($_POST["pseudo"], $_POST["a"], "player");
	 if($create){
		  
		  $_SESSION["playername"] = $_POST["pseudo"];
		  header("location:lobby.php");
		  
	 }else{
		  
		 echo("location:choose.php");
	 }
}else{
   
   $personnages = $db->personnages();
   
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="b0ot/css/bootstrap.css">
    <link rel="stylesheet" href="style.css">
    <title>personnage</title>
</head>
<body>

<h2>SELECT YOUR PERSONNAGE</h2>

    <div class="container">
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <form action="" id="form" method="POST">
                    <input  type="text" id="pseudo" class="form-control" placeholder="PSEUDO" name="pseudo" style="margin-top: 0.6vw;" required>
                    <input  type="hidden" class="form-control" name="a" id="data" value="" required>
                    <button type="button" id="send" class="btn btn-primary btn-block" style="margin-top: 0.6vw;"> SEND </button>
                </form>
            </div>
        </div>
    </div>
    
   <div class="container">
     <div class="row">
        
        
        <?php
            foreach($personnages as $avatar)
            {
							  $id = $avatar["id"];
							  $img = $avatar["img"];
        ?>
        <div class="img" id="<?php echo($id);?>">
            <img src="pers/<?php echo($img);?>" class="avatar" />
        </div>
        <?php
					  }
        ?>

        
    </div>
   <div id="pop"></div>
<script src="js/jquery.js" ></script>
<script src="js/alert.js" ></script>
<script src="js/choose.js" > </script>
</body>
</html>



<?php 
}
?>
