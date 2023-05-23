let Usuarios = new Array();
let usuarioLogueado = null;

inicializar();

function inicializar(){
    precarga();
    document.querySelector("#btnLogin").addEventListener("click",login);
    document.querySelector("#btnAgregarTarea").addEventListener("click",agregarTarea);
    document.querySelector("#btnLimpiar").addEventListener("click",limpiarTerminadas);
}

function precarga(){
    addUser("J","J");

    addTarea(1,"Lavar Platos");
    addTarea(1,"Lavar Banio");
    addTarea(1,"Hacer Deberes");

}

function addUser(pNombre,pPassword){
    let usuario = new Usuario(Usuarios.length+1,pNombre,pPassword);
    Usuarios.push(usuario);
}

function addTarea(pIdUser,pNombre){
    let Usuario = buscarUsuarioId(pIdUser);
    if(Usuario != null){
        let tarea = new Tarea(Usuario.tareas.length,pNombre)
        Usuario.tareas.push(tarea);
    }
}

function buscarUsuarioId(pIdUsuario){
    for(let i =0;i < Usuarios.length;i++){
        if(Usuarios[i].id == pIdUsuario)
        {
            return Usuarios[i];
        }
    }
    return null;
}

function login(){
    let usuario = document.querySelector("#usuario").value;
    let password = document.querySelector("#password").value;
    for(let i =0;i < Usuarios.length;i++){
        if(Usuarios[i].username == usuario && Usuarios[i].password == password)
        {
            usuarioLogueado = Usuarios[i];
            logueado();
        }
    }
}

function listarTareas(){
    let tabla = document.querySelector("#TareasPendiente");
    let card = "";
    let Tareas = usuarioLogueado.tareas;
    for(let i=0;i < Tareas.length; i++){
        let nombre;
        if(Tareas[i].terminado){
            nombre = `<p class="text-decoration-line-through">${Tareas[i].nombre}</p>`;
        }else{
            nombre = Tareas[i].nombre;
        }
        card += `<tr><td>${Tareas[i].id}</td><td>${nombre}</td><td>${Tareas[i].estaFinalizada()}</td><td><input type="button" value="Finalizar" id="${Tareas[i].id}" class="btnFinalizar btn btn-danger"></td></tr>`
    }
    tabla.innerHTML = card;

    if (Tareas.length > 0) {
        let btnFinalizar = document.querySelectorAll(".btnFinalizar");
        for (let i = 0; i < btnFinalizar.length; i++) {
          btnFinalizar[i].addEventListener("click", finalizarTarea);
        }
    }
}

function finalizarTarea(){
    let Tarea = obtenerTareaPorId(this.id);
    if(Tarea != null){
        Tarea.Termina();
        listarTareas();
    }
    
}

function obtenerTareaPorId(idTarea){
    for (let i = 0; i < usuarioLogueado.tareas.length; i++) {
        if (usuarioLogueado.tareas[i].id == idTarea) {
            console.log(usuarioLogueado.tareas[i]);
            return usuarioLogueado.tareas[i];

        }
      }
      return null;
}

function agregarTarea(){
    let nombre = document.querySelector("#tarea").value;
    addTarea(usuarioLogueado.id,nombre);
    logueado();
}

function limpiarTerminadas(){
    let tabla = document.querySelector("#TareasPendiente");
    let card = "";
    let Tareas = usuarioLogueado.tareas;
    for(let i=0;i < Tareas.length; i++){
        let nombre;
        if(!Tareas[i].terminado){
            card += `<tr><td>${Tareas[i].id}</td><td>${Tareas[i].nombre}</td><td>${Tareas[i].estaFinalizada()}</td><td><input type="button" value="Finalizar" id="${Tareas[i].id}" class="btnFinalizar btn btn-danger"></td></tr>`
        }
        
    }
    tabla.innerHTML = card;

    if (Tareas.length > 0) {
        let btnFinalizar = document.querySelectorAll(".btnFinalizar");
        for (let i = 0; i < btnFinalizar.length; i++) {
          btnFinalizar[i].addEventListener("click", finalizarTarea);
        }
    }
}