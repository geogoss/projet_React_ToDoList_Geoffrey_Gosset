   
// Récupérer les éléments dans le dom pour les utiliser
const form = document.querySelector("form");
const liste = document.querySelector("ul");
const input = document.querySelector("form input");
// Création de tableaux vident qui contiendront les tâches créées, en cours et finie
let tous = [];
let finie = [];
let enCours = [];




// événement de création de tâches
form.addEventListener("submit", event => {
    event.preventDefault();

    const text = input.value.trim();
    if (text !== "") {
        ajouterUneTache(text);
        input.value = "";
    }
})

function ajouterUneTache(text) {

    const todo = {
        text,
        // La méthode Dat.now() renvoie le nb de millisecondes écoulées depuis le 1er janvier 1970
        id: Date.now(),
    }
    afficherListe(todo)
}

// déclaration des variables
var div;
var btnSupprimer;
var btnValider;
var btnDevalider;
var btnModifier;
var txt;
var item;
function afficherListe(todo) {
    
    // créer lélément (ici li) block tâche
    item = document.createElement("li");
    item.setAttribute("data-key", todo.id);

    // créer le span
    txt = document.createElement("span");
    txt.innerText = todo.text;
    item.appendChild(txt);

    // créer la div qui va englober les boutons
    div = document.createElement("div");
    div.setAttribute("class", "d-flex flex-column justify-content-start")

    // Créer le bouton Valider la tâche
    btnValider = document.createElement("button");
    btnValider.innerText = "Valider"
    btnValider.setAttribute("class", "btn btn-success m-1");
    div.appendChild(btnValider);
    btnValider.addEventListener("click", function (e){
        valider(e.target.parentElement.previousElementSibling)
    });
    



    // créer le bouton supprimer la tâche
    btnSupprimer = document.createElement("button");
    btnSupprimer.innerText = "Supprimer"
    btnSupprimer.setAttribute("class", "btn btn-success m-1")
    div.appendChild(btnSupprimer);
    item.appendChild(div)
    btnSupprimer.addEventListener("click", function(e){
        supprimer(e.target)
    })

    // créer le bouton modifier la tâche
    btnModifier = document.createElement("button");
    btnModifier.innerText = "Modifier"
    btnModifier.setAttribute("class", "btn btn-success m-1");
    div.appendChild(btnModifier)
    btnModifier.addEventListener("click", function (e){
        modifier(e.target)
    });

    // mettre cette nouvelle tâche dans le ul du html et le tableau ToutesLes Tâches
    liste.appendChild(item);
    // tous.push(item);
    enCours.push(item);
    console.log(enCours);

}

// -------------------------------------------------------

function supprimer(e) {
    let btnOui = document.createElement("button")
    btnOui.className = "btn btn-success m-1"
    btnOui.innerText = "oui"
    e.parentElement.insertBefore(btnOui, e.nextElementSibling)

    let btnNon = document.createElement("button")
    btnNon.className = "btn btn-success m-1"
    btnNon.innerText = "Non"
    e.parentElement.insertBefore(btnNon, e.nextElementSibling)
    e.classList.add("d-none")
    
    btnOui.addEventListener("click", function (){
        e.parentElement.parentElement.remove()
        tous.splice(tous.indexOf(e.parentElement.parentElement), 1)
        enCours.splice(enCours.indexOf(e.parentElement.parentElement), 1)
        finie.splice(finie.indexOf(e.parentElement.parentElement), 1)
    })

    btnNon.addEventListener("click", function(){
        e.classList.remove("d-none");
        btnOui.remove();
        btnNon.remove();
    })
}




var inputModif;
var btnConfirmer;
function modifier(e) {

    btnConfirmer = document.createElement("button");
    btnConfirmer.setAttribute("class", "btn btn-success m-1");
    btnConfirmer.innerText = "Confirmer"
    e.parentElement.append(btnConfirmer)
    btnConfirmer.addEventListener("click", function (e){
        confirmer(e.target)
    })

    e.classList.add("d-none");

    inputModif = document.createElement("input");
    inputModif.setAttribute("type", "text")
    inputModif.setAttribute("class", "w-100 m-1")
    e.parentElement.append(inputModif)
}

function confirmer(e) {
    let input = e.nextElementSibling;
    let span = e.parentElement.previousElementSibling;
    
    span.innerText = input.value
    input.remove()
    e.previousElementSibling.classList.remove("d-none")
    e.remove()
    

}


// -------------------------------------------------------
function valider(e) {

    e.classList.toggle("finDeTache");
    e.parentElement.classList.toggle("bg-info")

    if (enCours.includes(e.parentElement)) {
        enCours.splice(enCours.indexOf(e.parentElement),1)
        
        
    }
    else{
        enCours.push(e.parentElement)
    }


    if (    e.nextElementSibling.firstElementChild.innerText == "Valider"
    ) {
        e.nextElementSibling.firstElementChild.innerText = "Pas validé"

    }
    else{
        e.nextElementSibling.firstElementChild.innerText = "Valider"
    }

}

let btnTous = document.querySelectorAll(".trier")[1]
btnTous.addEventListener("click", function () {
    afficherTous()
})
let btnEnCours = document.querySelectorAll(".trier")[2]
btnEnCours.addEventListener("click", function () {
    afficherEnCours()
})
let btnFinie = document.querySelectorAll(".trier")[3]
btnFinie.addEventListener("click", afficherFinie)

function afficherTous() {

    let li = document.querySelectorAll("li");

    li.forEach(e => {
        if (e.classList.contains("d-none")) {
        
            e.classList.remove("d-none")
        }
    
    });
    
}

function afficherEnCours() {
    let li = document.querySelectorAll("li");

    li.forEach(e => {
        e.classList.add("d-none")
    });
    
    enCours.forEach(e => {
        e.classList.remove("d-none")
    }); 

}