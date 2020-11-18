const argv = require('./config/yargs')._Argv;
const porHacer = require('./tareasPorHacer/por-hacer');


let comando = argv._[0];



switch (comando) {
    case 'crear':
        porHacer.crear(argv.descripcion);
        break;
    case 'listar':
        porHacer.getListado(argv.completado);
        break;
    case 'actualizar':
        porHacer.actualizarTarea(argv.descripcion, argv.completado);
        break;
    case 'borrar':
        porHacer.borrarTarea(argv.descripcion);
        break;
    default:
        console.log('Comando no reconocido');
}