$(document).ready(function(){
	 
	 function send(to){
	    return new Promise(function(resolve, reject){
					console.log("send ", to);
					header = {url:"lobby.php", type:"post",dataType:"json",data:{"get":"1", "action":"send", "name":to}, async:false, success:(res,status)=>{
							
							if(res.status=="ok"){
								resolve(res.id);
							}
					
				    }
				  };
				 
				  $.ajax(header);
			});
	 }
	 
	 function waitResponse(id){
	    return new Promise(function(resolve, reject){
					
					header = {url:"lobby.php", type:"post", dataType:"json",data:{"get":"1", "action":"waitresponse", "id":id}, success:(res,status)=>{ 
						
						resolve(res);}
				  };
				 
				  $.ajax(header);
			});
	 }
	 
	 function wait(){
	    return new Promise(function(resolve, reject){
					
					header = {url:"lobby.php", type:"post", dataType:"json",data:{"get":"1", "action":"wait"}, async:false, success:(response,status)=>
					{
						   
						   var prec = $("#invitation").html();
							 if(response){
								 
								 html = "";
								 response.map(function(res){
							     html +="<div>"+res.name+" invite you to play.<a href='training.php?invitation="+res.id+"'><button>Accept</button></a> <button>Decline</button></div>";
							   });
							   if(html!=prec){
									 $("#invitation").html("");
								   $("#invitation").html(html);
								 }
							 }
				    }
				  };
				 
				  $.ajax(header);
			});
	 }
	 
	 function list(){
		  return new Promise(function(resolve, reject){
					 header = {url:"lobby.php", type:"post", dataType:"json",data:{"get":"1"}, async:false, success:(res,status)=>{
						   var prec = $("#list").html();
						   
							 var html = "";
						   res.map(function(e){
								   var name = e.name;
								   
								   if(name != yourname){
									   html += "<div class='player' value='"+name+"'> "+name+" actif "+ parseInt(e.time/60) +"min - Invite to play.</div>";
									 }else{
										 html += "<div><span> "+name+" actif "+ parseInt(e.time/60) +"min </span></div>";
									 }
									 
									 
							 });
							 
							 
							 
							 
							 if(html!=prec){
								 $("#list").html("");
							   $("#list").html(html);
							 }
							 resolve(true);
					 }};
					 
					 $.ajax(header);
			});
   }
   
	 
	 var idr=undefined;
	 var waitr = false;
	 
	 var int = setInterval(function(){
	     
	     list();
	     
	     if(waitr && idr !=undefined){
					 console.log("waiting response...  ");
					 waitResponse(idr).then(function(res)
					 {
						  console.log(res);
						  
						  if(res.status!="pending"){
								 if(res.status=="accept"){
									  document.location = "training.php?sentInvitation="+res.id;
								 }
								 idr=undefined;
								 waitr = false;
							}
					 }); 
			 }
	     wait();
	     
	     $('.player').click(function(){
						  
						  to = this.getAttribute("value");
						  if(idr!=undefined){ return null;}else{
						  send(to).then(function(id){
								  idr = id;
								  waitr = true;
							});}
	     });
	     
	 }, 2000);
	 
	 
	   
	 
	 
});
