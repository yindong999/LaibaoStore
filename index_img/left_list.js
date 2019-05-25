// JavaScript Document
var layer_1 = new Array();
var myThis, index=0;
var myTimecloseID;
function myTimeclose(){
	clearTimeout(myTimecloseID);
	closeMyThis();
}
function closeMyThis(){
	layer_1[index].style.display='none';
	myThis.style.color="#3b69bd";
	myThis.style.textDecoration="none";
	myThis.style.padding="9px 0 0 40px";
	myThis.style.border="none";
	myThis.style.borderBottom="dashed #e5eaf4 1px";
	myThis.style.color="#252322";
	myThis.style.fontWeight="normal";
	myThis.style.backgroundColor="";
	myThis.style.backgroundImage="";
	myThis.style.backgroundRepeat="";
	myThis.parentNode.style.position="";
	myThis.parentNode.style.zIndex="99";
	myThis.style.width="177px";
	myThis.style.height="25px";
}
function returnIndex(obj){
	var thisParentRens = obj.parentNode.parentNode.children;
	for(i=0;i<thisParentRens.length-1;i++){
		if(thisParentRens[i].children[0] == obj){
			return i;
		};
	}
	return -1;
}
function showList(){
	var left_list = document.getElementById('left_list');
	if(!left_list)	return false;
	var left_list_li = left_list.children[1].children;
	for(i=0;i<left_list_li.length-1;i++){
		var ll=left_list_li[i].children;
		layer_1[i] = ll[1];
		ll[0].style.textDecoration="none";
		ll[0].style.padding="9px 0 0 40px";
		ll[0].style.border="none";
		ll[0].style.borderBottom="dashed #e5eaf4 1px";
		ll[0].style.color="#252322";
		ll[0].style.fontWeight="normal";
		ll[0].style.backgroundColor="";
		ll[0].style.backgroundImage="";
		ll[0].style.backgroundRepeat="";
		ll[0].style.backgroundPosition="3px "+i*-40+"px";
		ll[0].parentNode.style.position="";
		ll[0].parentNode.style.zIndex="99";
		ll[0].style.width="177px";
		ll[0].style.height="25px";

		ll[0].onmouseover=function(){
			clearTimeout(myTimecloseID);
			if(myThis!=null){
				closeMyThis();
			}
			
			index = returnIndex(this);
			myThis = this;
			this.style.color="#252322";
			this.style.textDecoration="none";
			this.style.padding="7px 0 0 38px";
			this.style.border="solid #3b69bd 2px";
			this.style.borderRight="none"
			this.style.color="#1D4488"
			this.style.fontWeight="bold";
			this.style.backgroundColor="#FFF8EC";
			this.style.backgroundImage="url(images/left_p_list2.gif)";
			this.style.backgroundRepeat="no-repeat";
			this.style.backgroundPosition="2px "+(i*-40-1)+"px";
			this.parentNode.style.position="relative";
			this.parentNode.style.zIndex="100";
			this.style.width="180px";
			this.style.height="23px";
			layer_1[index].style.display='block';
		}
		ll[0].onmouseout=function(){
			clearTimeout(myTimecloseID);
			myTimecloseID = setTimeout("myTimeclose()",100);
		}
		ll[1].onmouseover=function(){
			clearTimeout(myTimecloseID);
		}
		ll[1].onmouseout=function(){
			clearTimeout(myTimecloseID);
			myTimecloseID = setTimeout("myTimeclose()",100);
		}
	}
	left_list_li[left_list_li.length-1].onmouseover=function(){
		if(myThis!=null) closeMyThis();
	}
}