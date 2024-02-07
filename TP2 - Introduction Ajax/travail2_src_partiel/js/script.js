var _titre;
var _artiste;
var _prix;
var _info;
var _image;
 
function Init() {
  _titre = document.getElementById("titre");
  _artiste = document.getElementById("artiste");
  _prix = document.getElementById("prix");
  _info = document.getElementById("info");
  _image = document.getElementById("peinture");
}
/*
Fonction qui charge les informaitons de l'image choisit
*/
function ChargerInfo(el) {
	var code = el.value;

	SelectTypeFichier(code);
	GetAndDisplayTEXT(code);

}					
/*
Fonction qui affiche le contenu du fichier JSON ou XML selon l'option choisi
*/
function SelectTypeFichier(code){
var json = document.getElementById("json").selected;

	if(json){
		GetAndDisplayJSON(code);
	}else{

		GetAndDisplayXML(code);

	}
}
/*
Fonction qui récupère via AJAX un fichier TEXTE stocké sur le serveur et affiche son contenu dans la section <div>
*/
function GetAndDisplayTEXT(fichier) {
	var xhr = new XMLHttpRequest();
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			ClearDivMessage();
			_info.appendChild(CreatePElement(xhr.responseText));
		}
	}
	xhr.open("GET", "ajax/" + fichier + ".txt", true);
	xhr.send();
}
/*
Fonction qui récupère via AJAX un fichier XML stocké sur le serveur et affiche son contenu dans la section <div>
*/
function GetAndDisplayXML(code) {
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			DisplayXMLResponse(xhr.responseXML, code);
		}
	}
	
  xhr.open("GET", "ajax/peintures.xml", true);
	xhr.send();
}
/*
Fonction qui récupère via AJAX un fichier JSON stocké sur le serveur et affiche son contenu dans la section <div>
*/
function GetAndDisplayJSON(code) {
	var xhr = new XMLHttpRequest();
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			DisplayJSONResponse(JSON.parse(xhr.responseText), code);
		}
	}
	
    xhr.open("GET", "ajax/peintures.json", true);
	xhr.send();
}
/*
Fonction qui affiche le résultat XML dans la section <div>
*/
function DisplayXMLResponse(xml, code) {
	ClearDivMessage();

	var peinture = xml.getElementsByTagName("peinture");

	for (j = 0; j < peinture.length; j++) {
		var _code = peinture[j].getElementsByTagName("code")[0].firstChild.nodeValue;

		if(_code == code){

			var titre = peinture[j].getElementsByTagName("titre")[0].firstChild.nodeValue;
			var artiste = peinture[j].getElementsByTagName("artiste")[0].firstChild.nodeValue;
			var prix = peinture[j].getElementsByTagName("prix")[0].firstChild.nodeValue;
			var image = peinture[j].getElementsByTagName("image")[0].firstChild.nodeValue;
			
			_titre.appendChild(CreatePElement(titre));
			_artiste.appendChild(CreatePElement(artiste));
			_prix.appendChild(CreatePElement(prix));
			_image.src = "img/" + image;	
		}
				
	}
}
/*
Fonction qui affiche le résultat JSON dans la section <div>
*/
function DisplayJSONResponse(json , code) {
	ClearDivMessage();

	var peinture = json.peinture;
	
	for (i = 0; i < peinture.length; i++) {
		var _code = peinture[i].code;
		if(_code == code){

			var titre = peinture[i].titre;
			var artiste = peinture[i].artiste;
			var prix = peinture[i].prix;
			var image = peinture[i].image;
	
			_titre.appendChild(CreatePElement(titre));
			_artiste.appendChild(CreatePElement(artiste));
			_prix.appendChild(CreatePElement(prix));
			_image.src = "img/" + image;
		}
	}
}
/*
Fonction qui efface le contenu des sections
*/
function ClearDivMessage() {

	while (_titre.firstChild && _artiste.firstChild && _prix.firstChild && _info.firstChild) {
		_titre.removeChild(_titre.firstChild);
		_artiste.removeChild(_artiste.firstChild);
		_prix.removeChild(_prix.firstChild);
		_info.removeChild(_info.firstChild);
		
	}
}
/*
Fonction qui crée et retourne une balise <p> et son contenu
*/
function CreatePElement(text) {
	var newP = document.createElement("p");
	var newPText = document.createTextNode(text);
	
	newP.appendChild(newPText);
	
	return newP;
}
