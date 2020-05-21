	/** 2013 rev 2019 by thk, www.thkoehler.de 
Feel free to reuse this code provided this header remains intact.
**/

var anleitung=
"<b>Implementierte Befehle</b><br />"+
"aufxy(50,200) &rarr; Position (x,y) {oben ist y=0}<br />"+
"vw(100) &rarr; Vorw&auml;rtsschritte in aktuelle Richtung; rw(100) ~ <br />"+
"re(45) bzw. li(45) &rarr; Drehung um 45 Grad; re() dreht um 90 Grad <br />"+
"richtung(90) oder sr(90) &rarr; nach oben erzwingen {0° zeigt nach rechts}<br />"+
"sh() &rarr; Stift hoch (bewegen ohne zu malen) ; sa() &rarr; Stift ab<br />"+
"dx(50) &rarr; 50 px nach rechts bewegen ohne zu malen ; dy(-20) &rarr; 20 px nach oben<br />"+
"stift(255,0,0) oder stift(\"red\") oder stift(\"#ff0000\") &rarr; Linienfarbe rot; allgemein (rot, gruen, blau) <br />"+
"dicke(2) &rarr; Liniendicke <br />"+
"lmuster(2) &rarr; Strichlinie ab (2), gr&ouml;&szlig;ere Zahlen f&uuml;r feinere Strichelung, <b>nicht bei Opera 12, IE, ...?</b> <br />"+
"vws(100,2) &rarr; Strichlinie Länge 100, ab (...,2), gr&ouml;&szlig;ere Zahlen f&uuml;r feinere Strichelung  <br />"+
"vwzs(100,2) &rarr; analog vws(...)  <br />"+
"pinsel(0,128,0) oder pinsel(\"darkgreen\") oder pinsel(\"#008000\") &rarr; auch Schrift<br />"+
"schreibe(\"blabla\",15,\"Arial\") oder schreibe(\"blabla\") Text an akt. Position<br />"+
"<br /><b>Verwendung</b><br>schreibe deine Befehle in die function meineFunktion() unten in turtle.js",

NAV=navigator.appVersion, IEp=NAV.indexOf("MSIE"), 
		IE=((IEp>0)&&(Number(NAV.substr(IEp+5,2))<=9)), // IE tickt anders

Xw=900, Yw=600, // canvas Breite, Hoehe
		Xc=Xw/2, Yc=Yw/2, // cursor pos
		Richtg=0, // 0=Osten (rechts)
		Neigg=0,
		Stift=1, // 0=Stift ohne zu malen bewegen, 1=normal zeichnen
		HG="#f0f0f0",  // Hintergrundfarbe
		Sgroesse=16, SFarbe="black",
		Xm,Ym,Rm,Nm,
		pi=Math.PI, P180=pi/180;

function sin(x){return Math.sin(x);} function cos(x){return Math.cos(x);} function sqrt(x){return Math.sqrt(x);}
function gsin(x){return Math.sin(x*pi/180);} function gcos(x){return Math.cos(x*pi/180);}
function sincos(a){return [Math.sin(a),Math.cos(a)];}
function runden(x){return Math.round(x*1E+5)/1E+5;}; 
function init(){ // Standardwerte
	HG="#f0f0f0"; SFarbe="black"; Xc=Xw/2; Yc=Yw/2; Richtg=0;
	}
	
function aufxy(x,y){Xc=x; Yc=y;} // Zeichenposition setzen
function li(a){if(!a&&a!=0) Richtg+=90; else Richtg+=a;}
function re(a){if(!a&&a!=0) Richtg-=90; else Richtg-=a;}
function richtung(a){Richtg=a;} function sr(a){Richtg=a;}

function vw(s){
var co=document.getElementById("c1").getContext("2d");
  co.beginPath();
  co.moveTo(Math.round(Xc)+0.5, Math.round(Yc)+0.5);
  Xc+=s*Math.cos(Richtg*P180);
  Yc-=s*Math.sin(Richtg*P180);  
  if(Stift==1) co.lineTo(Math.round(Xc)+0.5, Math.round(Yc)+0.5);
  else co.moveTo(Math.round(Xc)+0.5, Math.round(Yc)+0.5);
  co.stroke();
  return true;
}
function rw(s){return vw(-s);}

function vwz(s){ // Kavalierpersp.
var co=document.getElementById("c1").getContext("2d"),
	a,b,sp,cp,hi, U=sincos(Neigg*P180);
  co.beginPath(); co.moveTo(Math.round(Xc)+0.5, Math.round(Yc)+0.5);
  a=U[1]*s; b=U[0]*s;
  U=sincos(Richtg*P180); sp=U[0]; cp=U[1];
  hi=a*sp*Math.sqrt(0.125);
  Xc=Xc+a*cp+hi; Yc=Yc-b-hi;
  if(Stift==1) co.lineTo(Math.round(Xc)+0.5, Math.round(Yc)+0.5);
	else co.moveTo(Math.round(Xc)+0.5, Math.round(Yc)+0.5);
  co.stroke();
  return true;
}

function dx(s){Xc+=s;} function dy(s){Yc+=s;}

function sh(){Stift=0;} function sa(){Stift=1;}

function stift(r,g,b,a){
	if(g==undefined) document.getElementById("c1").getContext("2d").strokeStyle=r; else
	if(a==undefined) document.getElementById("c1").getContext("2d").strokeStyle="rgb("+r+","+g+","+b+")"; else
	document.getElementById("c1").getContext("2d").strokeStyle="rgba("+r+","+g+","+b+","+a+")";
	}

function pinsel(r,g,b){
	if(g==undefined){ document.getElementById("c1").getContext("2d").fillStyle=r; SFarbe=r;}
	else{ document.getElementById("c1").getContext("2d").fillStyle="rgb("+r+","+g+","+b+")"; SFarbe="rgb("+r+","+g+","+b+")";}
	HG=SFarbe;
	}

function dicke(d){document.getElementById("c1").getContext("2d").lineWidth=d;}

function lmuster(a){
	document.getElementById("c1").getContext("2d").setLineDash((a>3)?[5,5]:((a>2)?[10,10]:((a>1)?[20, 10]:[])));
	} 

function vws(s,a){ // Strichlinie
	if(!a) a=3; var x=0, p=(a>3)?5:((a>2)?10:((a>1)?20:s));
	if(Stift>0){
		while(x<s){vw((p+x>s)? s-x: p); Stift=0; vw(p); Stift=1; x+=2*p;}
		}
	}

function vwzs(s,a){
	if(!a) a=3; var x=0, p=(a>3)?5:((a>2)?10:((a>1)?20:s));
	if(Stift>0){
		while(x<s){vwz((p+x>s)? s-x: p); Stift=0; vwz(p); Stift=1; x+=2*p;}
		}
	}

function kreis(r,w){ // w=360 für Vollkreis
	if(!w){w=r; r=50;}
	var v=pi/180*r;
	for(var i=0;i<w;i++){vw(v); re(1);} // vw(1) liefert u = 360=2pi*r, r=180/pi
	}
	
function bogen(r,w){return kreis(r,w);}

function neck(r,n){if(!n){n=r; r=100;} for(var c=0;c<n;c++){vw(r);li(360/n);}}

function merke(){Xm=Xc,Ym=Yc;Rm=Richtg;Nm=Neigg;}
function erinnere(){Xc=Xm,Yc=Ym;Richtg=Rm;Neigg=Nm;}

function schreibe(t,g,f){
	if(!g) g=Sgroesse; if(!f) f="Arial";
	var co=document.getElementById("c1").getContext("2d");
	co.fillStyle=SFarbe;
	co.font = g+"pt "+f;
	if(IE) co.font="normal "+g+"pt sans-serif";
	co.fillText(t,Math.round(Xc)-0.5,Math.round(Yc)-0.5);
	}

function zeichne(){  // Beim Laden ausgefuehrt
init();
var canvas = document.getElementById("c1");
if(canvas.getContext){	
	var co = canvas.getContext("2d");
	co.fillStyle = HG; //"rgb(255, 0, 255)";
	co.fillRect(0, 0, canvas.width, canvas.height);
	meineFunktion();  //  <-- dein Code unten
	reset=0;
	}
}

function getCanvasPos(el){
    var canvas=document.getElementById(el),
		x=canvas.offsetLeft, y=canvas.offsetTop;
    while(canvas=canvas.offsetParent){
        x+=canvas.offsetLeft-canvas.scrollLeft;
        y+=canvas.offsetTop-canvas.scrollTop;
			}
    return {left : x, top : y}
}

function mousePos(e){
if(!e) e=window.event; //IE
	if (document.all){ // IE
		var mouseX=e.x+0*document.body.scrollLeft-getCanvasPos("c1").left;
		var mouseY=e.y+0*document.body.scrollTop-getCanvasPos("c1").top-canvas.offsetTop-1;
		}else{
    var mouseX=e.clientX-getCanvasPos("c1").left+0*window.pageXOffset;
    var mouseY=e.clientY-getCanvasPos("c1").top+0*window.pageYOffset;
	 }
    return {x : mouseX, y : mouseY};
}

function warte(ms) {
        var start = new Date().getTime();
        while((new Date().getTime() - start) < ms) ;
      }

//********* Fraktale ********

function schnecke (r){ // 10
 vw(30); re(r);
  if (r<100) schnecke(r*1.003);
}

function baum(l,w,t){
	vw(l); re(w); if(t>1) baum(l*0.7,w,t-1);
	li(2*w); if(t>1) baum(l*0.7,w,t-1);
	re(w); rw(l); stift(12*t,Math.max(0,255-30*t),5*t);
	}

function rdreieck(l,t){
for (var i=0; i<3; i++){
	vw(l); li(120); if(t>1) rdreieck(l/2,t-1);
	}
}

//*********** Malereien

function herz(r){
	vw(2*r); kreis(r,180); li(); kreis(r,180); vw(2*r);
	}	

function klee(r){for(var c=0;c<4;c++){herz(r); re(180);}}

function prisma(a,h,n){ // Grundseite, Höhe, Ecken
for(var c=0; c<n; c++){
	vwz(a); 
	merke(); sr(90); vw(h); erinnere(); 
	li(360/n);
	}
	dy(-h); for(var c=0; c<n; c++){vwz(a); li(360/n);}
	dy(h);
 } // prisma


//************ sinnlose Funks

function fact(x){return (x==0)?1:x*fact(x-1);}

function fact2(x){
var m=1;
for (var c=x;c>1;c--) m*=c;
return m;
}

function  max(a,b){return (a>b)? a:b;}

function istDreieck(a,b,c){ // Dreiecks-Ungleichung
var h=max(max(a,b),c); 
return (a+b+c-h>h);
}

/** 
schreibe deinen Code in die nachfolgende function hinein, 
zwischen die geschweiften Klammern { ...und ...}  
**/

// zum einzeiligen Auskommentieren (deaktivieren) von Code

var LEV=1,
SP=new Array();
SP[0]="Boah mitten rein!";
SP[1]="Das kann jeder.";
SP[2]="Du bist gar nicht soo langsam.";
SP[3]="Das war doch Zufall, oder?";
SP[4]="Echt nicht schlecht.";
SP[5]="voll ins Rote getroffen!";
SP[6]="Wow kann ich dich heiraten? Du bist so genial <3";
SP[7]="Bis du fRANKENSTEIN??? ECHT (T)OLLE NUMMER!!!";
SP[8]="So sehen Gewinner aus ^^!";

var a=300,h=200,n=5;

function meineFunktion(cx,cy){
var co=document.getElementById("c1").getContext("2d"),
rand_y=cy<200||cy>Yw-200;
co.fillRect(0,0,Xw,Yw); stift(128,0,255);
dy(200); dx(-200); 
if(!rand_y){ if(cx>Xw-200) re(1); if(cx<200) li(1);}
else{
	if(cx>Xw-200){n++; a=300*5/n;} else if(cx<100){n--; a=300*5/n;}
	else if(cy<100) h+=5; if(cy>Yw-100) h-=2;
	}
prisma(a,h,n);
dy(-200); dx(200); 
}


function meineFunktion$(cx,cy){ // Maus-Pos
var canx=getCanvasPos("c1").left, cany=getCanvasPos("c1").top, // canvas-Pos im Dokument (für Feinjustierungen)
	sm=document.getElementById("sm"), sms=sm.style, // Bild.Style-Eigenschaften
	groesse=104, wdh=1; // Voreinstellung, ändern mit sms.width=...+"px"

stift(255,0,0);

if(cx){ // nicht "undefined", also geklickt (nicht getroffen)
	sm.src="smilie.png"; // wieder gelbes sm
	aufxy(cx,cy-10); kreis(10,360);
	alert("Du hast mich verfehlt @ ("+cx+" , "+cy+")\n auf Level "+LEV+"? C'mon...");
	wdh=0;
	}

sms.left=canx+Xw*Math.random()+"px"; // Bildpos; Xw Canvas-Breite s.o.
sms.top=cany+Yw*Math.random()+"px"; 
if(wdh) setTimeout("meineFunktion()",1500*Math.pow(0.9,LEV)); // Delay; 0,9^LEV


//###############################
//aufxy(10,550); rdreieck(600,8);
//aufxy(550,600); li(); baum(180,29,16);
//stift("#A05020"); aufxy(300,20); schnecke(10);
//aufxy(300,400); schreibe(10+"! = "+fact(10));

// alert(istDreieck(5,9,5)+"\n"+fact(5)+" = "+fact2(5));
	// richtung(135); stift(255,32,128); klee(60);

/*
aufxy(350,550); stift(96,0,255); dicke(2); li(winkel); // lmuster(1); // nur FF, ...?
for(var i=0;i<5;i++){vwz(300); merke(); sr(90); vw(300); erinnere(); li(360/5);}
dy(-300);
for(var i=0;i<5;i++){vwz(300); li(360/5);}
*/	

// dy(200); vwz(200); li(); vwz(200); li(); vwzs(200); li(); vwzs(200); li();

/*
var canvas = document.getElementById("c1"), co = canvas.getContext("2d");
pinsel(255,0,128);
co.fillRect(50,50,100,100);
*/
	
	} // Ende meineFunktion
	
	