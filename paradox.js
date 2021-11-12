// ========== BEGIN SIDE NAVIGATION ========== //
function showNav() {
//    document.getElementById("sidebar").style.left = "0px";
    document.getElementById("sidenav").style.left = "265px";
//	document.getElementById("overlay").style.display = "block";
    document.getElementById("sidenav-small").style.left = "265px";
//	document.getElementById("main-body").style.marginLeft = "265px";
//	document.getElementById("main-body").style.width = "calc(calc(100%) - 265px)";
    jQuery('#sidenav-toggle').attr('onclick', 'hideNav()');
	jQuery('#main-body').attr('onclick', 'hideNav()');
};
function hideNav() {
//    document.getElementById("sidebar").style.left = "-300px";
    document.getElementById("sidenav").style.left = "0px";
//	document.getElementById("overlay").style.display = "none";
	document.getElementById("sidenav-small").style.left = "35px";
//	document.getElementById("main-body").style.marginLeft = "35px";
//	document.getElementById("main-body").style.width = "calc(calc(100%) - 35px)";
    jQuery('#sidenav-toggle').attr('onclick', 'showNav()');
	jQuery('#main-body').attr('onclick', '');
};

function lh(value){
	
}