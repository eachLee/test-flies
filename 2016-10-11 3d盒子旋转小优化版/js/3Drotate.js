~function (){

	var box = document.getElementById("box");
	var x = -60;
	var y = 45;

	// startX 为绕Y轴(水平方向)旋转的初始速度
	// startY 为绕X轴(垂直方向)旋转的初始速度
	var startX = 0;
	var startY = 0;

	//x方向的速度ispeedX
	//y方向的速度ispeedY
	var ispeedX=0;
	var ispeedY=0;
	var timer = null;

	box.addEventListener("mousedown",function (ev){
//		if ( timer ) return;
		var ev = ev || event;
		var disX = ev.clientX - x;
	  	var disY = ev.clientY - y;

	  	function moveMove(ev){
	  		var ev = ev || event;
	  		x = ev.clientX - disX;
	  	  	y = ev.clientY - disY;

	  	  	ispeedX = x - startY;
	  	  	ispeedY = y - startX;
	  	  	startX = y;
	  	  	startY = x;
	  	  	box.style.transform = 'perspective(800px) rotateX('+(-y)+'deg) rotateY('+x+'deg)';
	  	}

	  	function moveUp(){
	  		document.removeEventListener("mousemove",moveMove,false);
	  	  	document.removeEventListener("mouseup",moveUp,false);
	  	  	clearInterval(timer);
	  	  	boxRotate();
	  	}

	  	document.addEventListener("mousemove",moveMove,false);
	  	document.addEventListener("mouseup",moveUp,false);
	  	ev.preventDefault();

	},false);

	function boxRotate(){
		timer = setInterval(function(){
			console.log(ispeedX,ispeedY);
			//console.log(1);
			//绕Y轴方向
			var xDeg = x + ispeedX;
			//绕X轴方向
	        var yDeg = y + ispeedY;	

	        ispeedY *= 0.97;
			ispeedX *= 0.97;
		    
		    x = xDeg;
		    y = yDeg; 

			//减少细微的小运动
			if(Math.abs(ispeedX)<1) ispeedX = 0;
			if(Math.abs(ispeedY)<1) ispeedY = 0;

			//横向速度纵向速度为0，清除定时器
			if(ispeedX==0&&ispeedY==0){
				clearInterval(timer); 
				timer = null;
			}

			box.style.transform = 'perspective(800px) rotateX('+(-y)+'deg) rotateY('+x+'deg)';
			 	 
		},30); 
	} 
}();