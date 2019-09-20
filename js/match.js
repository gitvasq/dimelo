var jQT = $.jQTouch({
            // icon: 'kilo.png',
            //statusBar: 'black',
});

var glb_grupo;
var glb_audio;
var glb_cat;
var glb_img_grupo;
var glb_img_audio;
var glb_img_cat;

var tdig = [];			// arreglo de digitos al azar
var arrmatch = [];
var nummatches = 0;

// para controlar el toque de imagenes en el juego
var arrtoque = []; 
var ntoque=0;					
var t1=0;
var t2=0;
var tact=0;
var nant=0;

var flgtout;
var flgtout1;
var flgtout2;

//var numTotalClicks = 0;
//var numSeconds = 0;
//var	flipAnim = 'rl'; 
//var catact;

$(document).ready(function(){ 
//  if (isvalidbrowser())       .... para controlar el browser .....
var screenW=window.screen.availWidth;
var screenH=window.screen.availHeight;

if (screenW < screenH) {  		// tablet
	screenW=screen.availHeight;
	screenH=screen.availWidth;
}
var sep=30;
var numi=5;
var wi=150;
px=parseInt((1/2)*(screenW - (numi*wi + (numi - 1)*sep)));
    for (var i = 1; i < 6; i++) {
	$("#g" + i).css("position", "absolute");
	$("#g" + i).css("left", (i-1)*(wi + sep) + px + "px");
	
	if ( i % 2 == 0) {
	    $("#g" + i).css("top", "130px");
        }else{
	    $("#g" + i).css("top", "80px");
        }
    }
});
// *******************************************************************************
function isvalidbrowser() {
	return true;
}

function setgrupo(g, img) {
    glb_grupo=g;
    glb_img_grupo=img;
    $("#ii2").remove();
    $("#i2").append('<img id=ii2 width=150px height=150px src=images/' + img +  '>');
		$("#ii2").css("position", "absolute");
		$("#ii2").css("left", "40vw");
		$("#ii2").css("top", "12vh");
    for (var i = 1; i < 6; i++) {
		$("#a" + i).css("position", "absolute");
		$("#a" + i).css("left", i*28 + "vw");
		$("#a" + i).css("top", "45vh");
    }
//
//AAVVPP
//glb_audio=1;
//PlaySound("beep1");
//return;
	
	jQT.goTo("#audio", "flip"); 		
}	// end function setgrupo
function setaudio(a, img) {
    glb_audio=a;
    glb_img_audio=img;
    $("#ii3").remove();
    $("#ii4").remove();
    $("#i3").append('<img id=ii3 width=150px height=150px src=images/' + glb_img_grupo +  '>');
		$("#ii3").css("position", "absolute");
		$("#ii3").css("left", "25vw");
		$("#ii3").css("top", "12vh");
	$("#i4").append('<img id=ii4 width=150px height=150px src=images/' + img +  '>');
		$("#ii4").css("position", "absolute");
		$("#ii4").css("left", "50vw");
		$("#ii4").css("top", "12vh");
	for (var i = 1; i < 3; i++) {
		$("#c" + i).css("position", "absolute");
		$("#c" + i).css("left", i*27 + "vw");
		$("#c" + i).css("top", "45vh");
    }	
	jQT.goTo("#categ", "flip"); 		
}	// end function setaudio
function setcat(c, img) {
    glb_cat=c;
    glb_img_cat=img;
    init(glb_grupo, glb_audio, glb_cat);
	//jQT.goTo("#next", "flip"); 		
}	// end function setaudio


function init(grp, opta, cat) {

// LLamada desde el Home .... grupo grp=(0,1,2,...,7), opcion audio opta=(0,1,2,3), la categoria cat=(1, 2, .... ,6)
// arrgrupo = ["&", "R", "G", "H", "J", "V", "Z", "Y"]  definido en funcion creartablero
// a=0  No escuchar, no hablar
// a=1  Solo escuchar 
// a=2  Solo hablar 
// a=3  escuchar  y  hablar
//glb_grupo=grp;
//glb_audio=opta;
//glb_cat=cat;

PlaySound("beep1");

	// eliminar elem de arreglo con match
	for (var i = 0; i < arrmatch.length; i++) {
		  arrmatch.shift();
	}
	
	creartablero( grp, cat );
	
	//  inicializa variables para controlar juego
	ntoque=0;
	t1=0;
	t2=0;
	tact=0;
	nant=0;
	nummatches = 0;
	//numTotalClicks = 0;
	//numSeconds = 0;
	jQT.goTo("#juego", "flip");
}

function creartablero(grp, cat) { 
//  AAVVPP  const arrgrupo = ["&", "R", "G", "H", "J", "V", "Z", "Y"];
const arrgrupo = ["&", "R", "R", "R", "R", "R", "Z", "Y"];

var numfyc = [ [0, 0], [2, 3], [3, 4], [4, 5], [5, 6] ];

nf=numfyc[cat][0];
nc=numfyc[cat][1];
var ntarj;
ntarj = nf*nc;

var screenW=window.screen.availWidth;
var screenH=window.screen.availHeight;
var tpos = []; 		            // arreglo con posicx y posicy para cada imagen
var ktew;  					    // width de imagen
var ktex; 						// posic x inicial ... se calcula dependiendo de .... ver creartablero(cat) 
var ktey; 						// posic y inicial ... se calcula dependiendo de .... ver creartablero(cat) 
var ktew2;
 	
// Total imagenes disponibles por grupo(imgGn.png) donde G=("R", "G", "H", "J"...) y n=(1,2,3.....)
const arrnumimg = [0, 12, 12, 12, 12, 12, 12, 12];

var imgarrfilen = [];	// nombres de archivo de imagenes
var sep;
var arr_sg_html  = []; 
var arr_bk_html  = []; 

if (screenW < screenH) {  		// tablet
	screenW=screen.availHeight;
	screenH=screen.availWidth;
}

// ************** RECALCULANDO ancho de imagen ************************
ktew=parseInt(screenW/(nc + 2 + (nc-1)*0.1));		// nuevo ancho de imagen recalculado 
ktew2=parseInt(screenH/(nf + 2 + (nf-1)*0.1));

if ( ktew2 < ktew ) { 
   ktew=ktew2;
}
sep=parseInt(0.1*ktew);

//ktex=ktew;
//ktey=parseInt((1/2)*(screenH - (nf*ktew + (nf - 1)*sep)));

ktex=parseInt((1/2)*(screenW - (nc*ktew + (nc - 1)*sep)));
ktey=0.5*ktew;

var p=1;
var x;
var y;
crearalazar(grp, ntarj, arrnumimg[grp]);

for (var i = 1; i < arrnumimg[grp] + 1; i++) {
	imgarrfilen[i]= arrgrupo[grp] + i		// cada archivo de la forma  <cat>.<i>
}

	for (var i = 1; i < nf + 1; i++) {				// por filas
		tpos[i]=[];
		for (var j = 1; j < nc + 1; j++) {			// por columnas
		$('#tb').append('<div id=tj' + p + ' class=tarjeta>');
		//crear los elementos para los archivos de sonido	
			$("#sound" + p).remove();
			$("#tj" + p).append('<audio id=sound' + p  +  ' src=sounds/sound' + imgarrfilen[tdig[p]] + '.mp3/>');
		//crear los elementos para las imagenes	
			tpos[i][1] = i;  // fila
			tpos[i][2] = j;  // columna
			$("#sg" + p).remove();
			$("#bk" + p).remove();
			var stronclick=' onclick="clickimg(' +  p + ',' + ntarj + ')"  ';
			//console.log(stronclick);
arr_sg_html[p] = '<div class=signos id=sg' + p +  stronclick +'><a><img width=' + ktew + 'px heigth=' + ktew + 'px src=images/img' + imgarrfilen[tdig[p]] + '.png></a></div>';
arr_bk_html[p] = '<div class=signos id=bk' + p +  stronclick +'><a><img width=' + ktew + 'px heigth=' + ktew + 'px src=images/img' + arrgrupo[grp]  + 0 + '.png></a></div>';
			//console.log(arr_sg_html[p]);
			
			$("#tj" + p).append(arr_sg_html[p]);
			$("#tj" + p).append(arr_bk_html[p]);
			
			$("#bk" + p).css("display", "block");  
			$("#sg" + p).css("display", "block"); 	
			x = ktex + ktew*(j - 1) + (j - 1)*sep;
			y = ktey + ktew*(i - 1) + (i - 1)*sep;
			
			$("#sg" + p).css("position", "absolute");
			$("#sg" + p).css("left", x + "px");
			$("#sg" + p).css("top", y + "px");
			$("#bk" + p).css("position", "absolute");
			$("#bk" + p).css("left", x + "px");
			$("#bk" + p).css("top", y + "px");
 
			$("#tj" + p).append('</div>');  // cierre tag div para class tarjeta			
			p=p+1;		
		}	// for j
	}	// for i


}  // end function creartablero

function crearalazar(grp, ntarj, numimg) {
//("------- arreglo de digitos al azar ")
//("------- para tablero de juego ")

var f;
var arrazar = [];
var arraux =  [];

for (var i = 1; i < numimg + 1; i++) {
		tdig[i] = 0;
		arraux[i] = 0;
		
}
var limd=ntarj/2;	
// cambiar para que entren al juego todas las imagenes del grupo y no solamente limd=ntarj/2
for (var i = 1; i < limd + 1; i++) {
	f=Math.floor(Math.random() * numimg) + 1;
	if (tdig[f] == 0) {	
		tdig[f]=i;				
	}else{		
		while (tdig[f] > 0)  {
			f=Math.floor(Math.random() * numimg) + 1;
		}
		tdig[f]=i;				
	}
	arrazar[i]=f;	
// // console.log(" al azar 1 ... f=" + f + " .. tdig[f]=" + tdig[f] + " ..arrazar[i]=" + arrazar[i] + " ..para i=" + i);
}
// en arreglo arrazar hay 3 numeros no repetidos generados al azar entre 1 y num total de imags disponibles

for (var i = 1; i < limd + 1; i++) {
	f=Math.floor(Math.random() * ntarj) + 1;
	if (arraux[f] == 0) {	
		arraux[f]=arrazar[i];
	}else{		
		while (arraux[f] > 0)  {
			f=Math.floor(Math.random() * ntarj) + 1;
		}
		arraux[f]=arrazar[i];
	}

}

for (var i = 1; i < limd + 1; i++) {
	f=Math.floor(Math.random() * ntarj) + 1;
	if (arraux[f] == 0) {	
		arraux[f]=arrazar[i];
	}else{		
		while (arraux[f] > 0)  {
			f=Math.floor(Math.random() * ntarj) + 1;
		}
		arraux[f]=arrazar[i];
	}

}

for (var i = 1; i < ntarj + 1; i++) {
	tdig[i]=arraux[i];
	
}

}	// end function crearalazar

function gohome() {	
    location.reload(); 
}	// end function gohome

function gofinjuego() {
	PlaySound("ganador");
	jQT.goTo("#finjuego", "flip"); 		
}	// end function gohome

function clickimg(n, ntarj) {
var strsound = "sound" + n;
desactivartodo();

//numTotalClicks++;
ntoque=ntoque + 1;
tact=tdig[n];

	if (ntoque == 1) {			
		//  PRIMER TOQUE
		// *******************************************
		// alert("PRIMER TOQUE... ntoque=" + ntoque + " ..compara ... " + (n == nant) );
		PlaySound(strsound);
		arrtoque[1] = n;
		clearTimeout(flgtout);
		mostrar(arrtoque[1]);
		t1=tact;
		t2=0;
		tact=0;
		nant=n;
	}else{
		//  SEGUNDO TOQUE		
			if ( n != nant ) {		// para controlar repeticion del Primer toque
				// alert("SEGUNDO TOQUE... ntoque=" + ntoque + " ..compara ... " + (n == nant) );				
				arrtoque[2] = n;
				clearTimeout(flgtout);
				mostrar(arrtoque[2]);

				t2=tact;
				if (t1 == t2)  {     // MATCH .... 
// ***************************************************************************************************
			/*  PARA REMOVER DE PANTALLA  habilitar las sigtes. 4 lineas   
					clearTimeout(flgtout1);
					flgtout1=setTimeout( "desaparecer(arrtoque[1])", 500);
					clearTimeout(flgtout2);
					flgtout2=setTimeout( "desaparecer(arrtoque[2])", 500);
					*/ 
			/*  PARA CONSERVAR EN PANTALLA  habilitar las sigtes. 2 lineas  */
					arrmatch.push(arrtoque[1]);
					arrmatch.push(arrtoque[2]);
// ***************************************************************************************************					
					nummatches++;					
					//alert("MATCH .... entre ... " + nant + " ..y.. " + n);
				}else{          // NOT MATCH
					//alert("NOT NOT NOT MATCH .... entre ... " + nant + " ..y.. " + n);
					PlaySound(strsound);
					clearTimeout(flgtout1);
					flgtout1=setTimeout( "ocultar(arrtoque[1])", 500);
					clearTimeout(flgtout2);
					flgtout2=setTimeout( "ocultar(arrtoque[2])", 1000);
				}	
			nant=0;	
			ntoque=0;
			t1=0;
			t2=0;
			tact=0;
		}else{  // se repitio el primer toque  .. es decir n==nant
			ntoque=1;
		}
	}
// "SALE DEL TOQUE"
	clearTimeout(flgtout);
	flgtout=setTimeout( "reactivartodo()", 1000, ntarj);	
    //////console.log(' nummatches: ' +  nummatches + ' ntarj: ' + ntarj);
	if (nummatches == ntarj/2) {
		nummatches=0;
		clearTimeout(flgtout1);
		flgtout1=setTimeout( "gofinjuego();", 2000);
		return;
	}	
}	// end function clickimg

// *** functions para manejar display y animacion 
function mostrar(n) {
var x=n;
$("#bk" + n).hide("drop", { direction: "down"  }, 500);
$("#sg" + n).show("puff", {   }, 500);
flgtout=setTimeout( "mostrar()", 1000, x);
}
 
function ocultar(n) {

$("#sg" + n).hide("drop", { direction: "down"  }, 500);
$("#bk" + n).show("puff", {   }, 500);

}
		
function desaparecer(n) {
var flgtout;
//flgtout=setTimeout( "reactivartodo()", 500, ntarj);
	$("#sg" + n).remove();
	$("#bk" + n).remove();

}

function PlaySound(soundObj) {
var sound = document.getElementById(soundObj);
if (glb_audio == 1  ||  glb_audio == 3) {	
	if (sound) {
		sound.play();
	}
}
}

function desactivar(n) {
	$("#bk" + n).attr('onclick', 'nada()');
	$("#sg" + n).attr('onclick', 'nada()');
}

function reactivar(n) {
	$("#bk" + n).attr('onclick', 'clickimg(' +  n + ') ');
	$("#sg" + n).attr('onclick', 'clickimg(' +  n + ') ');
}

function desactivartodo(ntarj) {

	for (var i = 1; i < ntarj + 1; i++) {
		desactivar(i);
	}
}

function reactivartodo(ntarj) {

	for (var i = 1; i < ntarj + 1; i++) {
		reactivar(i);
	}
	//  ****************   FALTA EXCEPTUAR LAS QUE HAN HECHO MATCH .... arrmatch

	for (var x = 0; x < arrmatch.length; x++) {
		desactivar(arrmatch[x]);
	}
	flgtout=setTimeout( "reactivartodo()", 500, ntarj);
}

function nada() {
   
}


