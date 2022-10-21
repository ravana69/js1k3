var {sin,cos,floor,min,round}=Math;

function rgb(col){

	var r = parseInt((0.5+sin(col)*0.5)*256);
	var g = parseInt((0.5+cos(col)*0.5)*256);
	var b = parseInt((0.5-sin(col)*0.5)*256);
	return "#"+("0" + r.toString(16) ).slice (-2)+("0" + g.toString(16) ).slice (-2)+("0" + b.toString(16) ).slice (-2);
}

function draw(){
	
	f++;
	x=floor(mx*.16);
	y=floor(my*.12);
	for(i=0;i<128;++i){
		for(j=0;j<72;++j){
			gd[x][y].a=lb?100000:3;
			a1=gd[i][j].a;
			a2=gd[i?i-1:127][j].a;
			a3=gd[i<127?i+1:0][j].a;
			a4=gd[i][j?j-1:71].a;
			a5=gd[i][j<71?j+1:0].a;
			gd[i][j].a=(a1+a2+a3+a4+a5)/5;
			gd[i][j].a/=1.1-(lb?.12:0);
			gd[i][j].a=min(gd[i][j].a,20);
		}
	}

	ctx.globalAlpha=.075;
	ctx.fillStyle="#000";
	ctx.fillRect(0,0,800,600);
	
	for(i=0;i<128;++i){
		for(j=0;j<72;++j){
			x=6.25*i;
			y=8.333*j;
			ctx.fillStyle=rgb(gd[i][j].a/2.5+f/18);
			ctx.globalAlpha=min(gd[i][j].a,1);
			ctx.fillRect(x,y,6,8);
		}
	}	
	requestAnimationFrame(draw);
}

c.addEventListener("mousemove", function(e){
	r = c.getBoundingClientRect();
	mx = round((e.clientX-r.left)/(r.right-r.left)*c.width);
	my = round((e.clientY-r.top)/(r.bottom-r.top)*c.height);
});

c.addEventListener("mousedown", function(e){
	if(e.which==1)lb=1;
});

c.addEventListener("mouseup", function(e){
	if(e.which==1)lb=0;
});


c.addEventListener("touchstart", function(e){lb=1;});
c.addEventListener("touchend", function(e){lb=0;});
c.addEventListener("touchmove", function(e){
	e.preventDefault();
	var r = c.getBoundingClientRect();
	mx = round((e.changedTouches[0].pageX-r.left)/(r.right-r.left)*c.width);
	my = round((e.changedTouches[0].pageY-r.top)/(r.bottom-r.top)*c.height);
});


ctx=c.getContext("2d");
c.width=800;
c.height=600;
mx=my=lb=f=0;

gd=new Array(128);
for(i=0;i<128;++i){
	gd[i]=[];
	for(j=0;j<72;++j){
		tile={};
		tile.a=0;
		tile.color=1;
		gd[i].push(tile);
	}
}
draw();