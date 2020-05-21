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
"vwz(100) &rarr; Vorw&auml;rtsschritte 3D (in die Zeichenebene hinein) <br />"+
"stift(255,0,0) oder stift(\"red\") oder stift(\"#ff0000\") &rarr; Linienfarbe rot; allgemein (rot, gruen, blau) <br />"+
"dicke(2) &rarr; Liniendicke <br />"+
"lmuster(2) &rarr; Strichlinie ab (2), gr&ouml;&szlig;ere Zahlen f&uuml;r feinere Strichelung, <b>nicht bei Opera 12, IE, ...?</b> <br />"+
"vws(100,2) &rarr; Strichlinie Länge 100, ab (...,2), gr&ouml;&szlig;ere Zahlen f&uuml;r feinere Strichelung  <br />"+
"vwzs(100,2) &rarr; analog vws(...)  <br />"+
"pinsel(0,128,0) oder pinsel(\"darkgreen\") oder pinsel(\"#008000\") &rarr; auch Schrift<br />"+
"schreibe(\"blabla\",15,\"Arial\") oder schreibe(\"blabla\") Text an akt. Position<br />"+
"bogen(radius, wnkel) Kreisbogen, 360° ist Vollkreis<br />"+
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
function anz00(a){
if(isNaN(a)) return "";
var aa=Math.abs(a), fak=(693e+8), fak2=1; if(aa<(1e-14)) return 0; if(aa<(1e-5)) return a; if(aa>10000) return a;
 if(aa<0.1){var n=Math.floor(Math.log(aa)/Math.LN10); fak2=Math.pow(10,-n); fak*=fak2;} 
var ar=Math.round(a*fak)/fak; 
   if (Math.abs(ar-a) < (1e-13)/fak2)  
      return ar;  else return a;
   }
function cconv(s,a,b){for(var i=0;i<s.length;i++){if(s.charAt(i)==a){s=s.substr(0,i)+b+s.substr(i+1);}}return s;}
function init(){ // Standardwerte
	SFarbe="black"; Xc=Xw/2; Yc=Yw/2; Richtg=0;  HG="#ffffff"; // überschreibt Konstante
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

function dreieckabc(a,b,c,s,x){
if(!x) x=10;
if(a<0||b<0||c<0){ alert("Das ist leider kein Dreieck."); return false;}
var y=20,al=Math.acos((b*b+c*c-a*a)/(2*b*c))*180/pi,f1=document.F1,hs=document.getElementById("hs"), 		//	a^2=b^2+c^2-2bc cos(al)
	be=Math.acos((a*a+c*c-b*b)/(2*a*c))*180/pi,
	ga=Math.acos((a*a+b*b-c*c)/(2*a*b))*180/pi; 
	if(Math.abs(al+be+ga-180)>1E-8) alert("Fehler 1: Winkelsumme"); else
	if(a+b+c-max(c,max(a,b))<max(c,max(a,b))) alert("Fehler 2: Dreiecksungleichung "+a+" , "+b+" , "+c+"\n"+(1*b+1*c)+" , "+max(c,max(a,b)) );
	if(f1.erg.checked){
	f1.a.value=anz00(a); f1.b.value=anz00(b); f1.c.value=anz00(c); f1.al.value=anz00(al); f1.be.value=anz00(be); f1.ga.value=anz00(ga);
	}
	hs.innerHTML="h<sub>a</sub> = "+anz00(c*sin(be*P180))+", h<sub>b</sub> = "+anz00(c*sin(al*P180))+ ", h<sub>c</sub> = "+anz00(b*sin(al*P180))+
	"<br />A = "+anz00(c*b*sin(al*P180)/2);
//	stift(64,0,128);
	aufxy(10+((al>90)? s*Math.round(b*gcos(180-al)):0),590); schreibe("A"); dx((al>90)? 40:20); 
	vw(s*c); dx(10); schreibe ("B");  dx(-10);
	li(180-be); vw(s*a); schreibe("C");
	li(180-ga); vw(s*b); li(180-al); if(x>10) pinsel(0,128,0); else pinsel(0,0,0);
	aufxy(x,y); schreibe("a = "+runden(a)); aufxy(x,y+20); schreibe("b = "+runden(b)); aufxy(x,y+40); schreibe("c = "+runden(c));
	aufxy(x,y+60); schreibe("Alpha = "+runden(al)+"°"); aufxy(x,y+80); schreibe("Beta = "+runden(be)+"°"); aufxy(x,y+100); schreibe("Gamma = "+runden(ga)+"°");
}

function dreieck(a,b,c,al,be,ga,s){
if(!al) al=0;if(!be) be=0;if(!ga) ga=0;
a=Number(a); b=Number(b); c=Number(c); al=Number(al); be=Number(be); ga=Number(ga);
var a2=0,b2=0,c2=0,al2=0,be2=0,ga2=0; if(!s) s=(Math.max(a,b,c)>8)? 50:100; 
//sws
if(a==0&&b>0&&c>0){ if(al>0) a=sqrt(b*b+c*c-2*b*c*gcos(al)); else { if(be>0) {ga=Math.asin(c*gsin(be)/b)*180/pi; if(b<c){ga2=180-ga; al2=180-be-ga2; a2=sqrt(b*b+c*c-2*b*c*gcos(al2)); stift(0,128,0); dreieckabc(a2,b,c,s,300); stift(0,0,0);}} else if(ga>0) {be=Math.asin(b*gsin(ga)/c)*180/pi;  if(c<b){be2=180-be; al2=180-ga-be2; a2=sqrt(c*c+b*b-2*b*c*gcos(al2)); stift(0,128,0); dreieckabc(a2,b,c,s,300); stift(0,0,0);}  } al=180-be-ga; if(Math.abs(al)<1E-8||isNaN(al)) a=-1; }}
if(b==0&&a>0&&c>0){ if(be>0) b=sqrt(a*a+c*c-2*a*c*gcos(be)); else { if(ga>0) {al=Math.asin(a*gsin(ga)/c)*180/pi;  if(c<a){al2=180-al; be2=180-ga-al2; b2=sqrt(a*a+c*c-2*a*c*gcos(be2)); stift(0,128,0); dreieckabc(a,b2,c,s,300); stift(0,0,0);}  } else if(al>0){ga=Math.asin(c*gsin(al)/a)*180/pi; if(a<c){ga2=180-ga; be2=180-al-ga2; b2=sqrt(a*a+c*c-2*a*c*gcos(be2)); stift(0,128,0); dreieckabc(a,b2,c,s,300); stift(0,0,0);}} be=180-al-ga; if(Math.abs(be)<1E-8||isNaN(be)) a=-1; }}
if(c==0&&a>0&&b>0){ if(ga>0) c=sqrt(a*a+b*b-2*a*b*gcos(ga)); else { if(al>0) {be=Math.asin(b*gsin(al)/a)*180/pi;  if(a<b){be2=180-be; ga2=180-al-be2; c2=sqrt(a*a+b*b-2*a*b*gcos(ga2)); stift(0,128,0); dreieckabc(a,b,c2,s,300); stift(0,0,0);}  } else  if(be>0){al=Math.asin(a*gsin(be)/b)*180/pi; if(b<a){al2=180-al; ga2=180-be-al2; c2=sqrt(a*a+b*b-2*a*b*gcos(ga2)); stift(0,128,0); dreieckabc(a,b,c2,s,300); stift(0,0,0);}} ga=180-be-al; if(Math.abs(ga)<1E-8||isNaN(ga)) a=-1; }}
//ww
if(a==0&&b==0&&c>0||b==0&&c==0&&a>0||a==0&&c==0&&b>0){
	if(al>0&&be>0) ga=180-al-be; else if(al>0&&ga>0) be=180-al-ga; else if(be>0&&ga>0) al=180-be-ga; 
	if(a>0) b=gsin(be)*a/gsin(al); else if(b>0) a=gsin(al)*b/gsin(be); else a=gsin(al)*c/gsin(ga);
	return dreieck(a,b,c,al,be,ga,s); // Rückführung auf sws
	}
if((a==0|| b==0 || c==0 )&&!isNaN(al)&&!isNaN(be)&&!isNaN(ga)) return dreieck(a,b,c,al,be,ga,s);
return dreieckabc(a,b,c,s);
}

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

function zeichne(a){  // Beim Laden ausgefuehrt
init();
var canvas = document.getElementById("c1");
if(canvas.getContext){	
	var co = canvas.getContext("2d");
	co.fillStyle = HG; //"rgb(255, 0, 255)";
	co.fillRect(0, 0, canvas.width, canvas.height);
	if(!a) meineFunktion();  //  <-- dein Code unten
	reset=0;
	}
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

function blume(far){
if(!far&&far!=0) this.far=[128,0,0]; // kein Parameter übergeben
else this.far=far ; // Verwendung des Parameters far
this.male=function(){ // Methode der Objekt-Klasse Blume
	sr(90); stift(0,128,0);	vw(100); 
	if(this.far.length==1) stift(this.far); else
	stift(this.far[0],this.far[1],this.far[2]); 
		var d=4; while(d--){
		var c=2; while(c--){kreis(50,90); re(90);} li(90);
		}
	}
this.setzef=function(r,g,b){ // alternative Methode zu Objekt.far=Wert;
	this.far=[r,g,b];
	}
}

//************ Funks

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

var winkel=0;
function xfkt1(){winkel+=6; zeichne(); }

function meineFunktion(){

var b1=new blume([64,32,255]); 
// b1.far=[128,128,0]; alert(b1.far);
 // b1.setzef(0,32,128); alert(b1.far);
b1.male();


var f1=document.F1,a=F1.a.value,b=F1.b.value,c=F1.c.value,al=F1.al.value,be=F1.be.value,ga=F1.ga.value,s=F1.s.value;
if(a!=""||b!=""||c!=""){
	zeichne(1);
	if(a!="") a=eval(cconv(a,",",".")); if(b!="") b=eval(cconv(b,",",".")); if(c!="") c=eval(cconv(c,",",".")); if(al!="") al=(cconv(al,",",".")); if(be!="") be=(cconv(be,",",".")); if(ga!="") ga=(cconv(ga,",",".")); if(s!="") s=(cconv(s,",","."));
	dreieck(a,b,c,al,be,ga, s);
	} // 0,6,7, 20



// dreieck(0,6,4, 0,0,40, 50); // dreieck(0,6,5, 30,0,0); ges: beta // (6,3,0, 0,30,0) or (0,3,6,0,30,0) ambiguous orth // (3.3, 6, 5 ...) almost orth // (0,3,6,0,29,0) 1 almost glsc

//###############################
else if(0){
// aufxy(300,550); stift(64,0,255); neck(200,6);
aufxy(10,550); rdreieck(600,8);
aufxy(550,600); li(); baum(180,29,15);
}


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
	
	
function unbenutzt(){
/** verschiebe code hier hin, wenn er nicht ausgefuehrt werden sol **/
/*
	pinsel(0,128,128); // (r, g, b), dunkel-cyan
	schreibe("Das ist ein Test",10); // Text in Groesse 10

	stift(0,128,0,1); // mittelgruen
	vw(200); re(); vw(100); re(); vw(200); re(); vw(100); 	// Rechteck:
	aufxy(50,100); richtung(0); stift("#darkorchid");
		for(var i=0; i<4; i++){
			vw(100); re();
			}
*/
// var m=0; for(c=0;c<1E+8;c++) m+=1/c;
// if(x<600) x+=200;
// window.setTimeout(meineFunktion,100);
// for (var c=0; c<360; c++) {vw(1);re(1); }

}
/*
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors
*/

