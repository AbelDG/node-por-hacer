/*
    -Definir el comando 'crear', el cual crea una tarea nueva
        --descripcion -d
    -Definir el comando 'actualizar', el cual actualiza el estado de la tarea
        --descripcion -d
        --completado -c true
    
    -Definir el help()
        --help

*/

const comandosCrear = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'Descripción de la tarea por hacer'
    }
}

const comandosActualizar = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'Descripción de la tarea por hacer'
    },
    completado: {
        default: true,
        alias: 'c',
        desc: 'Marca como completado o pendiente la tarea'

    }
}
const comandosListarTarea = {
    completado: {
        demand: false,
        default: undefined,
        alias: 'c',
        desc: 'Lista las tareas'
    }
}
const comandosBorrarTarea = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'Descripción de la tarea a borrar'
    }
}


const _Argv = require('yargs')
    .command('crear', 'Crear una tarea a realizar', comandosCrear)
    .command('actualizar', 'Actualizamos la tarea pendiente de terminar', comandosActualizar)
    .command('listar', 'Muestra todas las tareas registradas', comandosListarTarea)
    .command('borrar', 'Borra del listado de tareas la tarea introducida', comandosBorrarTarea)
    .help()
    .argv;





module.exports = {
    _Argv
}