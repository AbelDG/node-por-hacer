const fs = require('fs');
const color = require('colors/safe');

let listadoPorHacer = [];


const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    let ruta = 'db/data.json';
    fs.writeFile(ruta, data, (err) => {
        if (err) throw new Error(color.red('No se pudo guardar los datos'), err);
        console.log(color.green('Datos guardados con éxito'));
    });
}

const cargarDB = () => {
    try {
        return require('../db/data.json');
    } catch (error) {
        console.log(color.red('No se ha podido cargar el data.json', error));
        return [];
    }
}

const crear = (descripcion) => {
    listadoPorHacer = cargarDB();

    for (let data of listadoPorHacer) {
        if (data.descripcion == descripcion && data.completado == false) {
            //Si la tarea a programar ya se ha introducido, no se puede volver a introducir hasta que termine
            console.log(`La tarea ${color.green(descripcion)} todavía está pendiente de ser completada`);
            return;
        }
    }

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    console.log(`La tarea ${color.yellow(porHacer.descripcion)} ha sido añadida a la lista de tareas ${color.green('correctamente')} `);
    return porHacer;
}

const getListado = completado => {

    listadoPorHacer = cargarDB();


    let tareas = color.green('==========| POR HACER |==========\n');

    if (completado === undefined) {
        for (let tarea of listadoPorHacer) {
            if (tarea.completado == true) {
                tareas += `${color.yellow(tarea.descripcion)} - Estado: ${color.green("Finalizada")}\n`;
            } else {
                tareas += `${color.yellow(tarea.descripcion)} - Estado: ${color.red("Pendiente")}\n`;
            }
        }
    } else {
        if (completado == "finalizado") {
            for (let tarea of listadoPorHacer) {
                if (tarea.completado == true) {
                    tareas += `${color.yellow(tarea.descripcion)} - Estado: ${color.green("Finalizada")}\n`;
                }
            }
        } else if (completado == "pendiente") {
            for (let tarea of listadoPorHacer) {
                if (tarea.completado == false) {
                    tareas += `${color.yellow(tarea.descripcion)} - Estado: ${color.red("Pendiente")}\n`;
                }
            }
        }
    }

    tareas += color.green('==================================');
    console.log(tareas);
    return tareas;
}


const actualizarTarea = (descripcion, completado = true) => {
    listadoPorHacer = cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        console.log(`La tarea ${color.green(listadoPorHacer[index].descripcion)} se ha terminado correctamente`);
        return true;
    } else {
        console.log(color.red(`No se ha encontrado la tarea especificada`));
        return false;
    }

}

const borrarTarea = descripcion => {
        //Cargamos el json
        listadoPorHacer = cargarDB();
        //Verificamos que la tarea a borrar existe realmente en la db
        let index = listadoPorHacer.findIndex(tarea => tarea.descripcion == descripcion);
        if (index >= 0) { //Si existe, procedemos a eliminarla
            let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
            listadoPorHacer = nuevoListado;
            guardarDB();
            console.log(`La tarea ${color.yellow(descripcion)} ha sido borrada correctamente`);
            return true;
        } else { //Si no existe, lanzamos un error
            console.log(`${color.red(`La tarea ${descripcion} no se ha encontrado en el listado de tareas`)}`);
            return false;
        }
}
    


module.exports = {
    crear,
    getListado,
    actualizarTarea,
    borrarTarea
}