$(document).ready(function(){
	 
	 var rand = parseInt(Math.random()*5);
	 document.body.style.backgroundImage = `url("bg/bg${rand}.png")`;
	 
	 var superpower = {
		   "fire":10,
		   "thunder":10,
		   "thunder1":20,
		   "atomic":30,
		   
	 };
	 
class player{
		   
		   constructor(name, hp, defense, id,superpower=[], currentplayer, bot=false){
				  
			    this.hpi = 100;
			    this.name = name;
			    this.superpower = superpower;
			    this.hp = hp;
			    this.med = 3;
			    this.dfi = 30;
			    this.df = defense;
			    this.target = undefined;
			    this.id = id;
			    this.targetact = [];//0 = missing attack, 1 = success attack, 3 = heal
			    this.myact  = [];//0 = missing attack, 1 = success attack, 3 = heal
			    this.nheal = 0;
			    this.currentplayer = currentplayer;
			    this.img = $("#"+id);
			    this.comboimg = $("#combo"+id.replace("player", ""));
			    this.status = "normal";
			    this.notif  = $("#notif"+id.replace("player", ""));
			    this.nametag = $("#"+this.id+"-"+"name .value");
			    this.hptag = $("#"+this.id+"-"+"hp .value");
			    this.dftag = $("#"+this.id+"-"+"defense .value");
			    this.bot = bot;
			    this.nametag.text(name);
			    this.notif.css({"top": this.getTop()+"px", "left": this.getLeft()+"px", "right": this.getRight()+"px"});
			    this.comboimg.css({"left":this.getLeft()+"px", "right":this.getRight+"px"});
			    var thIs = this;
			    
			    if(this.currentplayer){
				        var val = this.superpower;
							  var li = $(`<li id="${val}"></li>`);
							  li.text(val);
							  li.appendTo($("#attacklist"));
							  li.click(function(){
									 thIs.attack(val);
									 thIs.showmenu();
									 thIs.hideattack();
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
		   
		   move(type){
           switch(type){
						   case "right":
						      
						      var i = 0;
						      var thIs = this;
						      var int = [];
						      var interval = setInterval(function(){
										  
										  if(!int.includes(interval)){ 
												int.push(interval);
											}
										  
										  thIs.img.attr('src', `${thIs.id}/walk${i}.png`);
										  thIs.img.css({"left":(thIs.getLeft()+thIs.img.width()/4)+"px"});
										  i = i==3 ? 0:i+1;
										  if(i==0){
												int.map(function(e){
													clearInterval(e);
												});
												thIs.checkStatus();
												return true;
											}
											
									},0);
						      
						      break;
						   case "left":
						      var i = 0;
						      var thIs = this;
						      var int = [];
						      var interval = setInterval(function(){
										  
										  if(!int.includes(interval)){ 
												int.push(interval);
											}
										  
										  thIs.img.attr('src', `${thIs.id}/walk${i}.png`);
										  thIs.img.css({"left":(thIs.getLeft()-thIs.img.width()/4)+"px"});
										  i = i==3 ? 0:i+1;
										  if(i==0){
												int.map(function(e){
													clearInterval(e);
												});
												thIs.checkStatus();
												return true;
											}
											
									},0);
						      
						      break;
						   
				   }				   
			 }
			 
		   showmenu(x=0, y=0){
				  var action = $("#action");
				  action.css({"top": y+"px", "left": x+"px"});
				  var heal = $("#heal .value");
				  heal.text(` ${this.med}/3`);
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
			    
			    if(p<=0.3 && p>0){
						  this.status = "sick";
					}else if(this.hp<=0){
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
					
					if(this.status=="die"){
						 var isbot = (this.bot||this.target.bot) ? "isbot=1":"";
						 if(this.currentplayer){ 
								document.location = "lose.php?"+isbot;
						 }else{
							  document.location = "win.php?"+isbot;
						 }
					}
					
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
				  var thIs = this;
				  return new Promise(function(resolve, reject){
				  
				   
				   if(thIs.hp==0){
						  thIs.checkStatus();
						  return false;
					 }
				   var cl = "";
				   var s = "-";
				   var notif = thIs.notif;
				   var newhp = data.hp!=undefined ? data.hp:thIs.hp;
				   var newdef = data.def!=undefined ? data.def:thIs.df;
				   var val = (newhp-thIs.hp)+(newdef-thIs.df);
				   
				   if(val>0){
						  cl = "text-success";
						  s = "+";
					 }else if(val<0)
					 {
						 cl = "text-danger";
						 s = "";
					 }else{
						 cl = "text-primary";
						 s = "";
					 }
					 
					 if(val==0){
						  val = "miss"; 
					 }
					 notif.show();
					 notif.attr("class", cl);
					 notif.text(`${s}${val}`);
					 thIs.hp = newhp>0 ? newhp:0;
					 thIs.df = newdef>0 ? newdef:0;
					 
					 var d = {};
				   d[thIs.name] = {
							"hp":thIs.hp,
							"def":thIs.df
			 	   };
			 	   console.log("Update... to :", d);
			 	   var Data = {"action":"update","data":JSON.stringify(d)};
				   var header = {url:"training.php", type:"post", data:Data, success:(res, status)=>{ console.log(res);}};
					 $.ajax(header);
					 
					 
					 notif.animate({"top":"-150px", "font-size":"100%"}, 1000, "swing", function(){
						   notif.hide();
						   notif.css({"top":"0","font-size":"180%"});
						   
					 });
					 
					 resolve(true);
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
					 
					 new Promise( function(resolve, rejec){
						 var xi = [];
						 var interval = setInterval(function(){
							 
							if(!xi.includes(interval)){
								 xi.push(interval);
							}
							
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
									 
									 xi.map(function(interval_id){
										  clearInterval(interval_id);
									 });
									 
									 targetimg.attr("src",``);
									 resolve(true);
								}
								targetimg.css({"left":left+"px", "right":right+"px", "top":ptop+"px", "width":width});
							
					    }, 300);
					 }).then(function(){
						 
							  th.checkStatus();
							  target.checkStatus();
							  if(callback){ callback()};
							   
				   });
			 }
	     
	     heal(nwhp=undefined){
				  if(this.hp===0 || this.hp==this.hpi || this.med==0){ this.checkStatus(); return false;}
				  var thIs = this;
				  return new Promise(function(resolve, reject){
						  
						  var medx = thIs.hpi*0.3;
						  var hp = thIs.hp + medx;
						  hp = hp>thIs.hpi ? thIs.hpi : hp;
						  thIs.med = thIs.med-1;
						  thIs.med = thIs.med<0 ? 0:thIs.med;
						  thIs.combo("heal", function(){
									 thIs.changeHp({"hp":(nwhp!=undefined) ? nwhp : hp });
							});
							thIs.myact.push(3);
							thIs.target.targetact.push(3);
						  
							
							if(thIs.target.bot){
								 thIs.botdecision();
							}
							
							resolve(true);
				  });
			 }
	     
	     attack(type, newdata=undefined){
				  var thIs = this;
				  return new Promise(function(resolve, reject){
				      var hp = thIs.target.hp;
							var def = thIs.target.df;
							var n = 0;
							var x = 1;
							if(newdata==undefined){ 
								x = Math.random()*3;
								n = parseInt(superpower[type]*x);
								if(def>0){ 
								 def -= n;
						    }else{
								 hp  -= n;
							  }
							  def = def<=0 ? 0 : def;
					      hp = hp<=0 ? 0 : hp;
							}
					     
					    var data = {
								 "hp": (newdata==undefined) ? hp : newdata.hp,
								 "def":(newdata==undefined)  ? def : newdata.def
							};
							
							
							
						  if(thIs.hp==0){ thIs.checkStatus(); return false;}
						  
							thIs.combo(type, function(){
								  
								  thIs.target.changeHp(data).then(function(res){
										    
												if(thIs.target.bot){
													 thIs.target.botdecision();
												}
												resolve(true);
									});
							});
							
							
				  });
			 }
       
			 
       botdecision(){
				  
				  
				  var thIs = this;
				  return new Promise(function(resolve, reject){
				      
						  if(thIs.hp<=30 && thIs.med>0)
						  {
								 console.log("Heal..");
								 thIs.heal();
								 
							}else{
								 
								 var item = ["fire","thunder","thunder1","atomic"];
								 var n = [];
								 
								 item.map(function(type){
									   n[type] = Math.ceil(thIs.target.hp/superpower[type]);
								 });
								 var min = item[parseInt(Math.random()*item.length)];
								 
								 setTimeout(function(){
								    thIs.attack(min);}, 1500);
						  }	 
				      
				      resolve(true);
				  });
			 }
			 
       
   }
	 
class game{
       	
		   constructor(){
				        
				        
				        
						    if(data && adv){
									 
									 
									 player0 = new player(data.nom, parseInt(data.vie), parseInt(data.bouclier), "player0", data.attaque, true, data.type=="bot");
									 player1 = new player(adv.nom, parseInt(adv.vie), parseInt(adv.bouclier), "player1", adv.attaque, false, adv.type=="bot");
									 
									 player0.target = player1;
									 player1.target = player0;
									 player0.checkStatus();
									 player1.checkStatus();
									 
									 this.player0 = player0;
									 this.player1 = player1;
									 
									 var currentplayer = player0;
									 this.adv = player1;
									 
									 $(document).keydown(function(event){
										  
										  switch(event.which){
												 case 39: case 68:
												    currentplayer.move("right");
												    break;
												 case 37: case 65:
												    currentplayer.move("left");
												    break;
												 case 32:
												    currentplayer.attack(currentplayer.superpower);
												    break;
												 case 72:
												    currentplayer.heal();
												    break;  
											}
									 });
									 
									 
									 var thIs = this;
									 thIs.update(player0, player1);
									 var up = setInterval(function(){
										 
										 thIs.update(player0, player1);
										 
									 }, 900);
									 
							}
			 }
			 
			 update(player0, player1){
					 var Data = { "action":"getinfo"};
					 
					 var header = {url:"training.php", type:"post", dataType:"json", data:Data, success:(res,status)=>{
							  
							  if(!player1.bot){
								    
								    if(player0.hp>res.player0.hp || player0.df>res.player0.def){
											
										  player1.attack(player1.superpower, res.player0).then(function(){
												  player0.hp = res.player0.hp;
												  player0.df = res.player0.def;
												  player1.hp = res.player1.hp;
												  player1.df = res.player1.def;
												  
											});
									  }else if(player1.hp<res.player1.hp){
											player1.heal(res.player1.hp).then(function(){
												  player0.hp = res.player0.hp;
												  player0.df = res.player0.def;
												  player1.hp = res.player1.hp;
												  player1.df = res.player1.def;
												  
										  });
									  }
									  
									  
								}
								
							  player0.checkStatus();
								player1.checkStatus();
							  
						  }
						};
						 
					  $.ajax(header);
			 }
			 
	 }
	 
	 var app = new game(); 
});
