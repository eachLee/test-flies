function $(selector,context){
	var firstChar = selector.charAt(0);
	context = context || document;
	if( firstChar === "#" ){
		return document.getElementById(selector.substring(1));
	}else if(firstChar === "."){
		return context.getElementsByClassName(selector.substring(1));
	}else{
		return context.getElementsByTagName(selector);
	}	
}
function duang(obj1,obj2){
	var obj1Style = obj1.getBoundingClientRect(obj1);
	var obj2Style = obj2.getBoundingClientRect(obj2);
	
	var obj1L = obj1Style.left;
	var obj1R = obj1Style.right;
	var obj1T = obj1Style.top;
	var obj1B = obj1Style.bottom;
	
	var obj2L = obj2Style.left;
	var obj2R = obj2Style.right;
	var obj2T = obj2Style.top;
	var obj2B = obj2Style.bottom;
	if(obj1L>obj2R || obj1R<obj2L || obj1T >obj2B ||obj1B<obj2T){
		return false;
	}else{
		return true;
	}
}
function getStyle(obj,attr){
    return getComputedStyle(obj)[attr];   
}
