<?php

session_start();
include("autoloader.php");



if(!empty($_SESSION["playername"])){
	 $db = new sql();
	 if($db->playerExist($name=$_SESSION["playername"])){
		 header("location: lobby.php");
	 }else{
		 $_SESSION["playername"] = "";
		 header("location: choose.php");
	 }
}else{
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
	<title></title>
	<meta http-equiv="content-type" content="text/html;charset=utf-8" />
	<meta name="viewport" content="width=device-width" />
	<link rel="stylesheet" href="b0ot/css/bootstrap.min.css" />
  <link rel="stylesheet" href="index.css" />
  
</head>
<body>
	<script src="js/jquery.js"></script>
  <script src="js/index.js"></script>
  
	<div class="container">
		<div align="center">
			
			<form action='' id="mode" method='post'>
				
				<input type="hidden" name="mode" id="data" value=""/>
				
				
			  
			  <div class="dvbtn row">
					<div class="col-md-4 col-sm-4 col-lg-4"> </div>
				  <div class="col-md-4 col-sm-4 col-lg-4"> <a href="choose.php"><div class="bt btn" id="trn">Play</div></a></div>
				  <div class="col-md-2 col-sm-2 col-lg-2"> </div>
			  </div>
			  
			  <div class="dvbtn row">
					 <div class="col-md-4 col-sm-4 col-lg-4"> </div>
				   <div class="col-md-4 col-sm-4 col-lg-4"> <div class="bt btn" id="about">About</div </div>
				   <div class="col-md-2 col-sm-2 col-lg-2"> </div> 
			  </div>
			  
			</form>
			
		</div>
		
	</div>
	
	
</body>
</html>

<?php } ?>
