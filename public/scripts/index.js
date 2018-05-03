var id=0;
var prefix =['Mr.','Mrs.','Miss '];
var Aname =['John','Jane.','Smith','Joe','Ann'];
var treates =['Require Extra care','Prefer more private','Be gently'];
var btype =['A','B','O','AB'];
var condition = ['less activity','normal','heavy duty','always on'];
// var stat = ['less activity','normal','heavy duty'];
function regist(){
	var div = document.createElement("div");
	div.className='patients';
	var ppre = prefix[rand(3)];
	var pname = Aname[rand(5)];
	var treate = treates[rand(3)];
	var cond = rand(4);
	div.title=ppre+pname+'\n'+rand(80)+' years '+btype[rand(4)]+'\n'+treates[rand(3)]+'\non bed = '+randtime()+'\nout bed = '+randtime()+'\n'+condition[cond];
	var span =document.createElement('span');
	id=id+1;
	span.innerHTML='patient'+(id);
	var img = document.createElement('img');
	switch(rand(1)){
		//case 0:
			//img.src='css/image/bed.svg';
			//break;
		case 0:
			img.src ='css/image/bed.svg';
			if (cond==3) {
				span.style.color='white';
				span.style.fontFamily = "sans-2bold";
				div.style.background='red';
				div.style.borderRadius='25px';
			}
			break;
		default:
			console.log('error');
	}
	div.appendChild(span);
	div.appendChild(img);
    document.getElementById('content').appendChild(div);
}
function rand(variable){
	return Math.floor(Math.random() *(variable));
}
function randtime(){
	return rand(23).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+':'+rand(60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
}