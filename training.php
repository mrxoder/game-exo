<?php 

session_start();
include("autoloader.php");
$db = new sql();

if(empty($_SESSION["playername"]) || !$db->playerExist("", $_SESSION["playername"]))
{
	header("location: index.php");
}


if(!empty($_GET["advid"]) || !empty($_GET["invitation"]) || !empty($_GET["sentInvitation"])){
	
	if(!empty($_GET["advid"])){
		
	  $advdata = $db->getPlayerInTraining($_GET["advid"]);
	  if(!$advdata){ header("location: lobby.php");}
	  $_SESSION["advname"] = $advdata[0]["name"];
	  
	}elseif(!empty($_GET["invitation"]) || !empty($_GET["sentInvitation"]) ){
    		
		$invid = null;
		if(empty($_GET["invitation"])){ 
			 $invid = $_GET["sentInvitation"]; 
		}else{ 
			 $invid = $_GET["invitation"];
		}
		
		$advdata = $db->getInvitation("",$invid);
		if(!$advdata){ location("location: lobby.php");}
		
		$advName = null;
		if(empty($_GET["invitation"])){ 
			$advName = $advdata["rname"]; 
		}else{
			$advName = $advdata["name"];
			$db->accept($_GET["invitation"]);
		}
		$_SESSION["advname"] = $advName;
		
	}
}

if(empty($_SESSION["advname"]))
{
	header("location: lobby.php");
}

$name = $_SESSION["playername"];
$adv =  $_SESSION["advname"];


if(!empty($_POST["action"])){
	
	   if($_POST["action"]=="update"){
				 
				 $data = json_decode($_POST["data"]);
				 if(!empty($data->$adv)){
			     if($db->update($data->$adv, $adv)){ echo("ok1");}else{echo("failed");}
			   }
			   if(!empty($data->$name)){
			     if($db->update($data->$name, $name)){ echo("ok2");}else{echo("failed");}
			   }
			   
			   $db->updateTime($name);
			   
			   
		 }elseif($_POST["action"]=="getinfo"){
			   $player0 = $db->getplayers($_SESSION["playername"]);
			   $player1 = $db->getplayers($_SESSION["advname"]);
			   $ret = [];
			   $ret["player0"] = ["hp"=>$player0["vie"], "def" => $player0["bouclier"]];
			   $ret["player1"] = ["hp"=>$player1["vie"], "def" => $player1["bouclier"]];
			   $db->updateTime($_SESSION["playername"]);
			   echo(json_encode($ret));
		 }
  
}else{
	$playerdata = $db->getplayers($name);	
	$advdata = $db->getplayers($adv);	
	if(!$playerdata){ header("location: index.php");}
	if(!$advdata){ header("location: lobby.php");}
	$json = json_encode($playerdata);
	$json_adv = json_encode($advdata);

?>


<!DOCTYPE html>
<html lang="en">
	
<head>
<meta charset="utf-8"/>
<title><?php echo($_SESSION["playername"]); ?></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="b0ot/css/bootstrap.min.css" />
<link rel="stylesheet" href="play.css" />
</head>


<body>
<script src="js/jquery.js"></script>

<script>
	 var data = JSON.parse('<?php echo($json); ?>');
	 var adv = JSON.parse('<?php echo($json_adv); ?>');
	 
</script>

<script src="js/train.js"></script>

<div class="container">
	
   <div class="row" id="battlefield">
		   <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" id="col0"> <span id="notif0" class=""></span> <img id="player0" /> <img id="combo0" /> </div> 
		   <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6"></div> 
		   <div class="col-lg-3 col-sm-3 col-md-3 col-xs-3" id="col1"> <span id="notif1" class=""></span> <img id="player1" /> <img id="combo1" /> </div> 
   </div>
   
   <div class="row" id="information">
       <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
         <table class="table-striped infotab">
					   <tr id="player0-name"> <td class="label" >Name </td> <td class="value"></td></tr>
					   <tr id="player0-hp"><td class="label" >Hp </td>   <td class="value"></td></tr>
					   <tr id="player0-defense"></td> <td class="label">Defense </td> <td class="value"></td></tr>
         </table>
       </div>
       
       <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6"></div>
       
       <div class="col-lg-3 col-sm-3 col-md-3 col-xs-3">
				  <table class="infotab table-striped">
					   <tr id="player1-name"><td class="label">Name </td> <td class="value"></td></tr>
					   <tr id="player1-hp"> <td class="label">Hp </td>   <td class="value"></td></tr>
					   <tr id="player1-defense"><td class="label" >Defense </td> <td class="value"></td></tr>
					   
         </table>
       </div>
      
   </div>
   
</div>
<ul id="action">
<li id="heal">Heal <span class="value"></span> </li>
<li id="attack">Attack</li>
</ul>
<ul id="attacklist">
</ul>
</body>
</html>
<?php 
}
?>
