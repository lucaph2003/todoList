display();

function display(){
    document.querySelector("#login").style.display = "block";
    document.querySelector("#tareas").style.display = "none";

}


function logueado(){
    document.querySelector("#login").style.display = "none";
    document.querySelector("#tareas").style.display = "block";
    limpiarTerminadas();
}