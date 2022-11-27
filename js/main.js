$(document).ready(function(){
	 
	 var rand = parseInt(Math.random()*5);
	 document.body.style.backgroundImage = `url("bg/bg${rand}.png")`;
	 
	 class player{
		   
		   constructor(name, hp, defense, id,superpower=[], currentplayer){ 
			    this.hpi = hp;
			    this.name = name;
			    this.superpower = superpower;
			    this.hp = this.hpi;
			    this.dfi = defense;
			    this.df = this.dfi;
			    this.target = undefined;
			    this.id = id;
			    this.nheal = 0;
			    this.currentplayer = currentplayer;
			    this.img = $("#"+id);
			    this.comboimg = $("#combo"+id.replace("player", ""));
			    this.status = "normal";
			    this.notif  = $("#notif"+id.replace("player", ""));
			    this.nametag = $("#"+this.id+"-"+"name .value");
			    this.hptag = $("#"+this.id+"-"+"hp .value");
			    this.dftag = $("#"+this.id+"-"+"defense .value");
			    
			    this.nametag.text(name);
			    this.notif.css({"top": this.getTop()+"px", "left": this.getLeft()+"px", "right": this.getRight()+"px"});
			    this.checkStatus();
			    var thIs = this;
			    
			    if(this.currentplayer){
						    this.superpower.map(function(val){
									  var li = $(`<li id="${val}"></li>`);
									  li.text(val);
									  li.appendTo($("#attacklist"));
									  li.click(function(){
											 thIs.attack(val);
											 thIs.showmenu();
											 thIs.hideattack();
										});
								});
						  }
							
					    if(currentplayer){
					    this.img.click(function(event){
								  if(thIs.currentplayer){
									  thIs.showmenu(event.clientX, event.clientY);
									  thIs.hideattack();
									}
							});
					    
					    $("#attack").click(function(event){
								   thIs.showattack(event.clientX, event.clientY);
							});
							
							$("#heal").click(function(event){
								   thIs.heal();
								   $("#action").hide();
								   thIs.hideattack();
							});
					    
				   }
		   }
		   showmenu(x=0, y=0){
				  var action = $("#action");
				  action.css({"top": y+"px", "left": x+"px"});
				  action.toggle();
				  
			 }
			 
			 showattack(x=0, y=0){
				  var list = $("#attacklist");
				  list.css({"top": y+"px", "left": x+"px"});
				  list.show();
			 }
			 
			 hideattack(){
				  var list = $("#attacklist");
				  list.hide();
			 }
			 
		   getLeft(){
		      return parseInt(this.img.position().left);
	     }
		   
		   getRight(){
		      return parseInt(this.img.position().right);
	     }
		   
		   getTop(){
		      return parseInt(this.img.position().top);
	     }
	     
	     checkStatus(){
				  
				  this.hptag.text(this.hp);
			    this.dftag.text(this.df);
			    var p = this.hp/this.hpi;
			    
			    if(p<=0.2 && p>0){
						  this.status = "sick";
					}else if(p<=0){
						  this.status = "die";
					}else{ 
						  this.status = "stand";
					}
					
					var allstates = ["stand","sick","die"];
			    var src = "";
			    if(allstates.includes(this.status)){
						  src = this.status;
					}else{
						  src = "stand";
					}
					
					this.img.attr("src",`${this.id}/${src}.png`);
			    return true;
	    }
	     
	     sick(){
		   
				   this.status = "sick";
			     this.checkStatus();
				   return true;
			 }
	 
			 die(){
			 	   this.status = "sick";
			     this.checkStatus();
				   return true;
			 }
			 
			 changeHp(data)
			 {
				   console.log(data);
				   if(this.hp==0){
						  th.checkStatus();
						  return false;
					 }
				   var cl = "";
				   var s = "-";
				   var notif = this.notif;
				   var newhp = data.hp ? data.hp:this.hp;
				   var newdef = data.def ? data.def:this.df;
				   var val = (newhp-this.hp)+(newdef-this.df);
				   
				   if(val>0){
						  cl = "text-success";
						  s = "+";
					 }else if(val<0)
					 {
						 cl = "text-danger";
						 s = "";
					 }else{
						 cl = "text-secondary";
						 s = "";
					 }
					 
					 notif.show();
					 notif.attr("class", cl);
					 notif.text(`${s}${val}`);
					 this.hp = newhp>0 ? newhp:0;
					 this.df = newdef>0 ? newdef:0;
					 
					 notif.animate({"top":"-150px", "font-size":"100%"}, 1000, "swing", function(){
						   notif.hide();
						   notif.css({"top":"0","font-size":"180%"});
					 });
					 
			}
			 
			 touched(){
				   if(this.hp==0){
						  this.checkStatus();
						  return false;
					 }
				   this.img.attr("src",`${this.id}/touched.png`);
				   
				   var th = this;
				   var x = setTimeout(function(){
						  th.checkStatus();
				   }, 1000);
				   return true;
			 }
			 
			 combo(type, callback=undefined){
				  
				   if(this.hp==0){
						  this.checkStatus();
						  return false;
					 }
				   var img = this.img;
				   img.attr("src",`${this.id}/magic-attack.png`);
				   var th = this;
				   var max = 0;
				   var target = this.target;
				   var targetimg = target.comboimg;
					 
					 switch(type)
					 { 
						 case "fire":
						    max = 3;
						    target = this.target;
				        targetimg = target.comboimg;
						    break;
						    
						    
						 case "thunder":
						    max = 1;
						    target = this.target;
				        targetimg = target.comboimg;
						    ptop -= Math.abs(target.img.height()-targetimg.height());
						    break;
						 case "thunder1":
						    max = 2;
						    target = this.target;
				        targetimg = target.comboimg;
						    ptop -= Math.abs(target.img.height()-targetimg.height());
						    break;
						 case "atomic":
						    max = 4;
						    //ptop += target.height();
						    target = this.target;
				        targetimg = target.comboimg;
						    ptop -= Math.abs(target.img.height()-targetimg.height());
						    break;
						 case "heal":
						    max = 4;
						    target = this;
						    targetimg = this.comboimg;
						    ptop -= Math.abs(target.img.height()-targetimg.height());
						    break;
					 }
					 
					 var left = target.getLeft();
					 var right = target.getRight();
					 var ptop = target.getTop();
					 var width = "";
					 
					 targetimg.attr("src",`attack/${type}/${type}0.png`);
					 
					 var i = 1;
					 var j = 0;
					 
					 var interval = setInterval(function(){
						  targetimg.attr("src",`attack/${type}/${type}${i}.png`);
						  th.checkStatus();
						  
								if(i==max){
									 i =0;
									 j +=1;
									 if(type!="heal"){
									   target.touched();
									 }
								}else{
									 i +=1;
								}
								
								if(j==3){
									 clearInterval(interval);
									 targetimg.attr("src",``);
								}
								
							
					 }, 300);
					 
				   targetimg.css({"left":left+"px", "right":right+"px", "top":ptop+"px", "width":width});
				   var x = setTimeout(function(){
						  th.checkStatus();
						  target.checkStatus();
						  if(callback){ callback()};
				   }, 1000);
			 }
	     
	     heal(){
				  //if(this.hp==0 || this.hp==this.hpi){ this.checkStatus(); return false;}
				  var thIs = this;
				  thIs.combo("heal", function(){
							 thIs.changeHp({"hp":120});
					});
				  /*this.healreq().then(function(data){
						  
						  thIs.combo("heal", function(){
								  thIs.changeHp(data);
							});
							
					});*/
			 }
	     
	     attack(type){
				  var thIs = this;
				  if(this.hp==0){ this.checkStatus(); return false;}
				  
				  this.attackreq(type).then(function(data){
						    
						    thIs.combo(type, function(){
									  thIs.target.changeHp(data);
								});
						  
					});
				  
			 }
      
      healreq(){
				  return new Promise((resolve, reject)=>{
						    
						    var header = {url:"players.php", type:"post", data:{"action":"heal"}, success:function(result,status){
										     var response = JSON.parse(result);
										     var data = response.data;
										     resolve(data);
										}
								};
									
								jQuery.ajax(header);
						    
					});
			}
			
      attackreq(type){
			    return new Promise((resolve, reject)=>{
						    
						    var header = {url:"players.php", type:"post", data:{"action":"attack","type":type, "to":this.target.name, "from":this.name}, success:function(result,status){
										     var response = JSON.parse(result);
										     var data = response.data;
										     resolve(data);
										 }
								};
									
									jQuery.ajax(header);
						    
					});	
			}
			
       
      
       
   }
	 
	 class game{
       	 
		   constructor(){
				   
				   this.getPlayer().then((result)=>{
						    
						    if(result){
									 var data = result;
									 
									 player0 = new player(data.player0.name, data.player0.hp, data.player0.def, "player0", data.player0.superpower, data.current=="player0");
									 player1 = new player(data.player1.name, data.player1.hp, data.player1.def, "player1", data.player1.superpower, data.current=="player1");
									 
									 player0.target = player1;
									 player1.target = player0;
									 
									 this.currentplayer = (player0.currentplayer) ? player0 : player1;
									 this.adv = (player0.currentplayer) ? player1 : player0;
									 
							}
					 });
				   
			 }
			 
			 getPlayer(){
				 
				 return new Promise((resolve,reject)=>{
						      
						      var header = {url:"players.php", type:"post", data:{"action":"players"}, success:function(result,status){
										     var response = JSON.parse(result);
										     var data = response.data;
										     resolve(data);
										 }
									};
									
									jQuery.ajax(header);
				 });
				  
			 }	 
	 }
	 
	 var app = new game(); 
});
