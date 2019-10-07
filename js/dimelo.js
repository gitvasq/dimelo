var jQT = $.jQTouch({

});
var maxtarj=12;
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

$(document).ready(function(){
var arr_sg_html  = [];
var arr_bk_html  = [];

	for (var i = 1; i < maxtarj + 1; i++) {
		$('#tb').append('<div id=tj' + i + ' class=tarjeta>');
		//crear los elementos para los archivos de sonido
		$('#tj' + i).append('<audio id=sound' + i + '>');
		$('#tj' + i).append('<div id=tji' + i + ' class=tarjeta-inner>');
		//crear los elementos para las imagenes
arr_sg_html[i] = '<div class=signos id=sg' + i + '><a><img width=100% heigth=auto ></a></div>';
arr_bk_html[i] = '<div class=signos id=bk' + i + '><a><img width=100% heigth=auto ></a></div>';

			$("#tji" + i).append(arr_sg_html[i]);
			$("#tji" + i).append(arr_bk_html[i]);

			$("#tji" + i).append('</div>');  // cierre tag div para class tarjeta-inner
			$("#tj" + i).append('</div>');  // cierre tag div para class tarjeta

	 }	// for i
});

function Shuffle(items) {
	for (
		var j, x, i = items.length; i; j = parseInt(Math.random() * i), x = items[--i], items[i] = items[j], items[j] = x
	);
	return items;
} // end function Shuffle

function setgrupo(g, img) {
    glb_grupo=g;
    glb_img_grupo=img;
    $("#ii2").remove();
//  AAVVPP  opacity ??????????  style="opacity:0.46;  ?????????????????????
    $("#i2").append('<img id=ii2 width=150px height=150px src=images/' + img +  ' style="opacity:1;">');
		$("#ii2").css("position", "absolute");
		$("#ii2").css("left", "40vw");
		$("#ii2").css("top", "12vh");
    for (var i = 1; i < 3; i++) {
		$("#a" + i).css("position", "absolute");
		$("#a" + i).css("left", i*28 + "vw");
		$("#a" + i).css("top", "45vh");
    }
/* */
	jQT.goTo("#audio", "flip");
}	// end function setgrupo
function setaudio(a, img) {
    glb_audio=a;
    glb_img_audio=img;
       
    $("#ii3").remove();
    $("#ii4").remove();
//  AAVVPP  opacity ??????????  style="opacity:0.46;  ?????????????????????
    $("#i3").append('<img id=ii3 width=150px height=150px src=images/' + glb_img_grupo +  ' style="opacity:1;">');
		$("#ii3").css("position", "absolute");
		$("#ii3").css("left", "25vw");
		$("#ii3").css("top", "12vh");
	$("#i4").append('<img id=ii4 width=150px height=150px src=images/' + img +   ' style="opacity:1;">');
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

}	// end function setcat


function init(grp, opta, cat) {

// LLamada desde el Home .... grupo grp=(0,1,2,...,7), 
// opcion audio opta=(0,1,2,3), 
// la categoria cat=(1, 2, .... ,6)

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
var ntarj;
ntarj = numfyc[cat][0]*numfyc[cat][1];
for (var i = ntarj+1; i < maxtarj + 1; i++) {
	$("#tj" + i).remove();
}
// ### DV ###
$("#juego").addClass("tablero"+ ntarj);

// Total imagenes disponibles por grupo(imgGn.png) donde G=("R", "G", "H", "J"...) y n=(1,2,3.....)
const arrnumimg = [0, 20, 20, 20, 20, 20, 20, 20];
var imgarrfilen = [];	// nombres de archivo de imagenes
var arr_sg_html  = [];
var arr_bk_html  = [];

crearalazar(ntarj, arrnumimg[grp]);

for (var i = 1; i < arrnumimg[grp] + 1; i++) {
	imgarrfilen[i]= arrgrupo[grp] + i;		// cada archivo de la forma  <cat>.<i>
}
var p=1;
	for (var i = 1; i < ntarj+1; i++) {	
		//crear los elementos para los archivos de sonido
		$("#sound" + p).attr('src', 'sounds/sound' + imgarrfilen[tdig[p]] + '.mp3');
		//crear los elementos para las imagenes
		var stronclick='clickimg(' +  p + ',' + ntarj + ')';
		$("#sg" + p + " img").attr('src', 'images/img' + imgarrfilen[tdig[p]] + '.png');
		$("#bk" + p + " img").attr('src', 'images/img' + arrgrupo[grp]  + 0 + '.png');
		$("#bk" + p + " img").attr('style', "display: inline-block;");
        $("#sg" + p).attr('onclick', stronclick);
        $("#bk" + p).attr('onclick', stronclick);
        $("#sg" + p).attr('style', "display: none;");
        $("#bk" + p).attr('style', "display: block;");
        
	    p=p+1;
	 }	// for i
}  // end function creartablero

function crearalazar(ntarj, numimg) {
//("------- tdig arreglo de digitos al azar ")
//("------- para las imagenes del tablero de juego ")
var nnarray2=[];
var k=1;
for (var i = 0; i < ntarj - 1; i = i + 2) {
   tdig[i]=k;
   tdig[i+1]=k;
k++;
}
for (var i = 0; i < numimg; i++) {
    nnarray2[i]=i+1;
}
Shuffle(nnarray2);
Shuffle(tdig);
for (var i = 0; i < tdig.length; i++) {
    tdig[i]=nnarray2[ tdig[i] ];
    //console.log(i + ' ... ' + tdig[i]);
}
tdig.unshift(0);
//AAVVPP console.table(tdig);  //AAVVPP
}	// end function crearalazar

function gohome() {
    location.reload();
}	// end function gohome

function gofinjuego() {
	$("#tb").remove();    //  ???????????  remover  tablero ??????????????
	
	jQT.goTo("#finjuego", "flip");
}	// end function gohome

function clickimg(n, ntarj) {
var strsound = "sound" + n;
//numTotalClicks++;
ntoque=ntoque + 1;
tact=tdig[n];
	if (ntoque == 1) {
		//  PRIMER TOQUE
		// *******************************************
		PlaySound(strsound);
		arrtoque[1] = n;
		//clearTimeout(flgtout);
		mostrar(arrtoque[1]);
		t1=tact;
		t2=0;
		tact=0;
		nant=n;
	}else{
		//  SEGUNDO TOQUE
			if ( n != nant ) {		// para controlar repeticion del Primer toque
				arrtoque[2] = n;
				//clearTimeout(flgtout);
				mostrar(arrtoque[2]);
				t2=tact;
				if (t1 == t2)  {     // MATCH ....
            // **********************************************
			/*  PARA REMOVER DE PANTALLA  habilitar las sigtes. 4 lineas
					clearTimeout(flgtout1);
					flgtout1=setTimeout( "desaparecer(arrtoque[1])", 500);
					clearTimeout(flgtout2);
					flgtout2=setTimeout( "desaparecer(arrtoque[2])", 500);
					*/
			/*  PARA CONSERVAR EN PANTALLA  habilitar las sigtes. 2 lineas  */
					arrmatch.push(arrtoque[1]);
					arrmatch.push(arrtoque[2]);
					//desactivar(arrtoque[1]);
					//desactivar(arrtoque[2]);
					$("#bk" + arrtoque[1]).removeAttr("onclick");
	                $("#sg" + + arrtoque[1]).removeAttr("onclick");
					$("#bk" + arrtoque[2]).removeAttr("onclick");
	                $("#sg" + + arrtoque[2]).removeAttr("onclick");

					nummatches++;
				}else{          // NOT MATCH
					PlaySound(strsound);
					clearTimeout(flgtout1);
					flgtout1=setTimeout( "ocultar(arrtoque[1])", 500);
					clearTimeout(flgtout2);
					flgtout2=setTimeout( "ocultar(arrtoque[2])", 500);
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
	if (nummatches == ntarj/2) {
		PlaySound("ganador");
		nummatches=0;
		clearTimeout(flgtout1);
		flgtout1=setTimeout( "gofinjuego();", 500);
		return;
	}
}	// end function clickimg

// *** functions para manejar display y animacion
function mostrar(n) {
$("#bk" + n).hide("drop", { direction: "down"  }, 500);
$("#sg" + n).show("puff", {   }, 500);
//flgtout=setTimeout( "mostrar()", 0, n);
}

function ocultar(n) {
$("#sg" + n).hide("drop", { direction: "down"  }, 500);
$("#bk" + n).show("puff", {   }, 500);
}

function desaparecer(n) {
var flgtout;
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

/*
function desactivar(n) {
	$("#bk" + n).attr('onclick', 'nada()');
	$("#sg" + n).attr('onclick', 'nada()');
}

function nada() {

}
*/
