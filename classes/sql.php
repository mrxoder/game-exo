<?php



class sql{
	
	  function __construct($host="localhost", $user="root", $pwd="", $dbname="game"){
				  $this->host = $host;
				  $this->user = $user;
				  $this->pwd = $pwd;
				  $this->dbname = $dbname;
				  $this->sql = $this->connect();
				  
	  }
			
	public function connect(){
				
		    $host = "mysql:host={$this->host};dbname={$this->dbname}";
			  
			  
			  try{
				  $sql = new PDO($host, $this->user, $this->pwd);
			    return $sql;
			  }catch(PDOException $e){
				  return Null;
			  }
    }
	  
	  public function getavatar($id)
	  {
			  $prep = $this->sql->prepare("select * from personnages where id=?");
			  $prep->execute([$id]);
			  return $prep->fetch();
		}
	  
	  public function getpower($id){
			  $prep = $this->sql->prepare("select * from superpower where id=?");
			  $prep->execute([$id]);
			  return $prep->fetch();
		}
		
		public function getPlayerInTraining($id=""){
			  $prep = null;
			  
			  if($id==""){
			    $prep = $this->sql->prepare("select * from players");
			    $prep->execute();
			  }else{
					$prep = $this->sql->prepare("select * from players where id=?");
					$prep->execute([$id]);
				}
			  
			  $res = $prep->fetchAll();
			  			 
			  for($i=0;$i<count($res);$i++){
				  $item = $res[$i];
				  if((time()-$item["time"])>(60*3)){
						 if($this->deleteP($item["id"])){
						   unset($res[$i]);
						 }
					}
			 }
			 $res = array_values($res);
			 return $res;
		}
		
		public function playerExist($id="", $name=""){
			 
			 if($id!=""){
				 $prep = $this->sql->prepare("select * from players where id=?");
				 $prep->execute([$id]);
				 $res = $prep->fetch();
				 if($res){ return true;}
			 }elseif($name!=""){
				 $prep = $this->sql->prepare("select * from players where nom=?");
				 $prep->execute([$name]);
				 $res = $prep->fetch();
				 
				 if($res){ return true;}
			 }
			 
			 return false;
		}
		
		public function updateTime($name){
			  $prep = $this->sql->prepare("update players set time=? where nom=?");
			  
			  return $prep->execute([time(), $name]);
		}
		
	  public function newplayer($pseudo, $avatarid, $type)
	  {
			  $this->getPlayerInTraining();
			  $avatar = $this->getavatar($avatarid);
			  if(!$avatar){ return false;}
			  $power = $this->getpower($avatar["pwid"]);
			  if(!$power){ return false;}
			  $prep = $this->sql->prepare("INSERT INTO players(type, nom, vie, attaque, bouclier, avatar,time) value(?,?,?,?,?,?,?)");
			  return $prep->execute([$type, $pseudo, $avatar["vie"], $power["name"], $avatar["bouclier"], $avatar["img"], time()]);
			  
	  }
		
		public function getplayers($playername){
			  
			  $prep = $this->sql->prepare("select nom,vie,attaque,type,bouclier from players where nom=?");
			  $prep->execute([$playername]);
			  $ret = $prep->fetch();
			  
			  return $ret;
		}
		
    public function personnages(){
			  $prep = $this->sql->prepare("select * from personnages");
			  $prep->execute();
			  return $prep->fetchAll();
		}
		
		public function update($data, $name){
			  
			  $prep = $this->sql->prepare("update players set vie=?,bouclier=? where nom=?");
			  return $prep->execute([$data->hp, $data->def, $name]);
			  
		}
		
		public function invite($name, $rname){
			 $this->deleteI("",$name);
			 $prep = $this->sql->prepare("INSERT INTO invitation(name, rname, time) value(?,?, ?)");
			 $prep->execute([$name, $rname, time()]);
			 $prep = $this->sql->prepare("select max(id) from invitation");
			 $prep->execute();
			 $d = $prep->fetch();
			 return ["id" => $d["max(id)"]];
			 
		}
		
		public function accept($id){
			 $prep = $this->sql->prepare("update invitation set status=? where id=?");
			 return $prep->execute(["accept", $id]);
		}
		
		public function decline($id){
			 $prep = $this->sql->prepare("update invitation set status=? where id=?");
			 return $prep->execute(["declined", $id]);
		}
		
		public function deleteI($id, $name=""){
			 if($id=="" && $name){ 
				 $prep = $this->sql->prepare("delete from invitation where name=?");
				 return $prep->execute([$name]);
			 }else{
					 $prep = $this->sql->prepare("delete from invitation where id=?");
					 return $prep->execute([$id]);
			 }
		}
		
		public function deleteP($id, $name=""){
			 
			 if(!empty($id)){
			   $prep = $this->sql->prepare("delete from players where id=?");
			   return $prep->execute([$id]);
			 }elseif(!empty($name)){
				 $prep = $this->sql->prepare("delete from players where name=?");
				 return $prep->execute([$name]);
			 }
			 
			 
			 
		}
		
		public function getInvitation($name, $id=""){
			 $res = null;
			 if($name && $id==""){
			   $prep = $this->sql->prepare("select * from invitation where rname=?");
			   $prep->execute([$name]);
			   $res = $prep->fetchAll();
			   
			   for($i=0;$i<count($res);$i++){
					  $item = $res[$i];
					  
					  $time = time()-$item["time"];
					  if($time>(60*2)){
							 if($this->deleteI($item["id"]) && $item["status"]=="pending"){
							    $res["status"] = "timedout";
							 }
						}
			   }
			   $res = array_values($res); 
			 }elseif($name=="" && $id){
			   $prep = $this->sql->prepare("select * from invitation where id=?");
			   $prep->execute([$id]);
			   $res = $prep->fetch();
			   if((time()-$res["time"])>(60*2)){
					  $del = $this->deleteI($id);
					  
						if($del){
							 $res["status"] = "timedout";
						}
				 }
			   
			 }
			 
			 return $res;
		}
		
		public function waitResponse($name, $id){
			$prep = $this->sql->prepare("select * from invitation where rname=? and id=?");
			$prep->execute([$name, $id]);
			return $prep->fetch();
		}
		
			
}


?>
