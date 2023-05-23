class Usuario {
    constructor(pId,pUsername, pPassword) { 
    this.id = pId;
    this.username = pUsername;
    this.password = pPassword;
    this.idTarea = 0;
    this.tareas = new Array();
    }
}

class Tarea {
    constructor(pId,pNombre){
        this.id = pId;
        this.nombre = pNombre;
        this.terminado = false;
    }

    Termina(){
        this.terminado = true;
    }

    estaFinalizada(){
        if(this.terminado){
            return "Esta finalizada";
        }else{
            return "No esta finalizada";
        }
    }
}
