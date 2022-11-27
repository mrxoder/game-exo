<?php

require("autoloader.php");

session_start();
$sql = new sql();



if(empty($_SESSION["playername"]) || !$sql->playerExist("", $_SESSION["playername"])){
	 header("location: index.php");
}

if(!empty($_POST["get"])){
	 $sql->updateTime($_SESSION["playername"]);
	 
	 if(empty($_POST["action"])){
	 
	 
			 $res = $sql->getPlayerInTraining();
			 
			 $time = time();
			 $ret = [];
			 
			 foreach($res as $item){
				  if(($time-$item["time"])<=(60*5)){
				     array_push($ret, ["name" => $item["nom"], "time" => ($time-$item["time"]) ]);
				  }
			 }
			 
			 echo(json_encode($ret));
	 }elseif($_POST["action"]=="wait"){
		   
		   $invitation = $sql->getInvitation($_SESSION["playername"], "");
		   
		   echo(json_encode($invitation));
		   
	 }elseif($_POST["action"]=="waitresponse" || !empty($_POST["id"])){
		   
		   $status = $sql->getInvitation("", $_POST["id"]);
		   echo(json_encode($status));
		   
	 
	 }elseif($_POST["action"]=="send"){
		   
		   if(empty($_POST["name"])){  echo(json_encode(["status"=>"failed"])); return 0;}
		   
		   $send= $sql->invite($_SESSION["playername"], $_POST["name"]);
		   
		   if($send){
				  echo(json_encode(["status"=>"ok", "id"=>$send["id"]]));
			 }
		   
	 } 
	 
}elseif(!empty($_GET["withBot"])){
   
   $sql = new sql();
   $i = 0;
   
	 if($sql->newplayer("bot$i", 6, "bot")){
			$_SESSION["advname"] = "bot$i";
			header("location: training.php");
			
	}else{
			$i +=1;
	}
	
   
}else{

?>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="utf-8" />
<title><?php echo(htmlentities($_SESSION["playername"])); ?></title>
<meta name="generator" content="geany" />

<style>

.player, .row{
	margin: 2% 0 0 0;
	background-color: #CECFD1;
	padding: 1% 0 1% 0;
	width: 60%;
}

.player:hover, .row:hover{
	cursor: pointer;
}

</style>

</head>

<body>
<script src="js/jquery.js"></script>

<script>
	var yourname = <?php echo("\"{$_SESSION["playername"]}\";");?>
</script>

<script src="js/training-lobby.js"></script>

<center>

<div class="container" id="list">
</div>
<div class="row" value="bot"><a  href="lobby.php?withBot=1">Play with a Bot</a></div>
<div id="invitation"></div>
</center>
</body>

</html>
<?php
}
?>
