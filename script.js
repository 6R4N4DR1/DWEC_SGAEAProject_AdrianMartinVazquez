/**
  SGAEA - Sistema de Gestión Académica de Estudiantes y Asignaturas
  Adrián Martín Vázquez 2º DAW AULA
  Github: https://github.com/6R4N4DR1/DWEC_SGAEAProject_AdrianMartinVazquez/
 */

// Clase base para la persona, con datos de nombre y edad
class Persona{
    // Declaración de atributos encapsulados
    #nombre; 
    #edad; 

    constructor(nombre, edad) {
        // Validación del nombre, si es válido se asigna, de lo contrario, se asigna un valor por defecto
        if(typeof nombre === "string" && /^[a-zA-ZáéíóúüÁÉÍÓÚÜ\s]+$/.test(nombre)){
            this.#nombre = nombre;
        }else{
            this.#nombre = "John Doe";
        }

        // Validación de la edad, si es válida se asigna, de lo contrario, se asigna 0
        if(edad > 0 && edad < 100){
            this.#edad = edad
        }else{
            this.#edad = 0;
        }
    }

    // Getter para obtener el nombre
    get nombre(){
        return this.#nombre;
    }

    // Getter para obtener la edad
    get edad(){
        return this.#edad;
    }
    
    toString() {
    return `${this.#nombre}, ${this.#edad} años`;
    }
}

// Clase para representar una dirección de un estudiante o persona
class Direccion{
    // Declaración de atributos encapsulados
    #calle;
    #numero;
    #piso;
    #codigoPostal;
    #provincia;
    #localidad;

    constructor(calle, numero, piso, codigoPostal, provincia, localidad) {
        // Validación de los atributos privados y asignación de valores a estos si son válidos, de lo contrario devolverán un valor por defecto

        if(this.#validarCadenas(calle)){
            this.#calle = calle
        }else{
            this.#calle = "Sin Nombre";
        }

        if(numero > 0){
            this.#numero = numero;
        }else{
            this.#numero = 0;
        }
        
        if(this.#validarCadenas(piso)){
            this.#piso = piso;
        }else{
            this.#piso = "Ninguno";
        }

        if(typeof codigoPostal === "string" && /^[0-9]{5}$/.test(codigoPostal)){
            this.#codigoPostal = codigoPostal;
        }else{
            this.#codigoPostal = "00000";
        }

        if(this.#validarCadenas(provincia)){
            this.#provincia = provincia
        }else{
            this.#provincia = "Desconocida";
        }

        if(this.#validarCadenas(localidad)){
            this.#localidad = localidad
        }else{
            this.#localidad = "Desconocida";
        }
    }

    // Método privado o encapsulado para validar strings
    #validarCadenas(texto){
        return typeof texto === "string";
    }

    // Getters para los atributos privados
    get calle(){
        return this.#calle;
    }

    get numero(){
        return this.#numero;
    }

    get piso(){
        return this.#piso;
    }

    get codigoPostal(){
        return this.#codigoPostal;
    }

    get provincia(){
        return this.#provincia;
    }

    get localidad(){
        return this.#localidad;
    }
    
    // Muestra el string de direcciones
    toString() {
        return `${this.#calle}, Nº${this.#numero}, ${this.#piso}, ${this.#localidad}, ${this.#provincia}, CP: ${this.#codigoPostal}`;
    }
}

// Clase Estudiante que hereda de Persona
class Estudiante extends Persona{
    // Declaración de atributos
    #id;
    #direccion; // Direccion del estudiante
    #asignaturas; // Asignaturas del estudiante
    #registros; // Para registar las matriculaciones y desmatriculaciones de estduantes en asignaturas
    static idsUsados = []; // Atributo estático para almacenar los IDs ya utilizados

    constructor(nombre, edad, direccion) {
        super(nombre, edad); // Llamada al constructor de Persona
        
        // Inicializamos el numero de Ids aleatorios a nada
        let numeroId = ``;

        // Hacemos un bucle poniendo un id que empieza por E- seguido de 4 numeros mientras que dicho id este en idsUsados
        do {
            numeroId = `E-${Math.floor(Math.random() * 10000)}`;
        } while (Estudiante.idsUsados.includes(numeroId));

        // Si el id no esta en idsUsados se sale del bucle y se añade dicho id a la lista de idsUsados
        Estudiante.idsUsados.push(numeroId)
        this.#id = numeroId; // El id se instancia con el numeroId obtenido
        
        // Validacion de que el atributo direccion que se pasa como parametro sea un objeto de la clase Direccion 
        if (!(direccion instanceof Direccion)) {
            throw new Error("Dirección no válida");
        }else{
            this.#direccion = direccion;
        }
        
        this.#asignaturas = []; // Inicialización del array de asignaturas
        this.#registros = []; // Inicialización del array de registros
    }
    
    // Getters para obtener el id, la direccion y la asignaturas del estudiante
    get id(){
        return this.#id;
    }

    get direccion(){
        return this.#direccion;
    }

    get asignaturas(){
        return [...this.#asignaturas];
    }

    // Getter para obtener los registros de matriculación y desmatriculación con la fecha de cambio en español
    get registros(){
        return this.#registros.map(([accion, asignatura, fecha]) => {
            // Inicialización de arrays de dias y meses en formato largo y en español
            const diasESP = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            const mesesESP = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

            // Se obtiene el dia numérico del equipo y se pasa a español mediante el array diasESP que coge como indice el dia de hoy
            const diaSemana = diasESP[fecha.getDay()];

            // Se obtiene el dia del mes
            const dia = fecha.getDate();

            // Se obtiene el mes númerico del equipo y se pasa a español mediante el array mesesESP que coge como indice el mes en el que se está
            const mes = mesesESP[fecha.getMonth()];

            // Se obtiene el año en formato entero, no reducido
            const ano = fecha.getFullYear();

            // El map devuelve la accion que se realiza con estos elementos matrices del array registros
            return `${accion} en ${asignatura} el ${diaSemana}, ${dia} de ${mes} de ${ano}`;
        });
    }

    // Método para matricular a un estudiante en una asignatura
    matricular(asignatura) {
        // Si el elemento nombre del array asignaturas que se encuentra en el primer valor de la matriz (0) no tiene dentro el nombre de la asignatura que se pasa como parametro
        // Se mete una nueva asignatura al array de asignaturas y como segundo valor de la matriz sin calificar y se mete tambien el registro de la matriculación
        if (this.#asignaturas.some(asig => asig.nombre === asignatura.nombre)) {
            throw new Error("El estudiante ya está matriculado en esta asignatura.");
        }
        // Matricula al estudiante y agrega el registro
        this.#asignaturas.push(asignatura);
        // Agrega el registro de la matriculación
        const fechaActual = new Date();
        this.#registros.push(["Matriculado", asignatura.nombre, fechaActual]);
    }

    // Método para desmatricular a un estudiante de una asignatura
    desmatricular(asignatura) {
        // Si el elemento nombre del array asignaturas que se encuentra en el primer valor de la matriz (0) no tiene el nombre de la asignatura que se pasa como parametro
        // Manda un error, de lo contrario, se rehace el array asignaturas eliminando la asignatura pasada como parametro, y se hace un nuevo registro
        const indice = this.asignaturas.findIndex(asig => asig.nombre === asignatura.nombre);
        if (indice === -1) {
            throw new Error("El estudiante no está matriculado en esta asignatura.");
        }
        // Elimina la asignatura y agrega el registro de desmatriculación
        this.asignaturas.splice(indice, 1);
        const fechaActual = new Date();
        this.#registros.push(["Desmatriculado", asignatura.nombre, fechaActual]);
    }

    // Método para calificar a un estudiante en una asignatura
    calificar(asignatura, nota) {
        // Verifica si la asignatura está en la lista de asignaturas del estudiante
        const asignaturaMatriculada = this.asignaturas.find(asig => asig.nombre === asignatura.nombre);
        if (!asignaturaMatriculada) {
            throw new Error(`El estudiante no está matriculado en la asignatura ${asignatura.nombre}`);
        }
        // Si está matriculado, entonces se califica
        asignaturaMatriculada.nota = nota;
        console.log(`La asignatura ${asignatura.nombre} ha sido calificada con ${nota}`);
    }

    // Getter para calcular el promedio de notas de un estudiante
    get promedio() {
        // Se hace un array de notas que obtiene las notas del array asignaturas
        const notas = this.#asignaturas.filter(a => typeof a[1] === "number");

        // Si la longitud es 0 del array notas salta un error
        if(notas.length == 0){
            return "No hay calificaciones";
        }

        // Se hace la suma de las notas y se devuelve el calculo de esa suma con la division de la longitud de notas del array notas
        const suma = notas.reduce((sumacc, asign) => sumacc += asign[1], 0);
        return Math.round(suma / notas.length);
    }

    // Metodo estatico para la llamada del atributo estatico de idsUsados para eliminar un id Ocupado y así desocuparlo
    static eliminarIdUsado(id){
        // Si el array estatico de idsUsados no contiene el id que se pasa como parametro, devuelve un error
        if(!Estudiante.idsUsados.includes(id)){
            throw new Error("ID de usuario no encontrado")
        }

        // Se rehace el array de idsUsados sin el id que se pasó como parametro que estaba anteriormente en el array estatico idsUsados
        Estudiante.idsUsados = Estudiante.idsUsados.filter(iU => iU !== id);
    }

    // Muestra el string con la id y el nombre y edad del estudiante
    toString() {
        return `${this.#id} -> ${super.toString()}`;
    }
}

class Asignatura{
    // Declaración de atributos
    #nombre;
    #calificaciones; // notas o calificaciones de una asignatura

    constructor(nombre) {
        // Validación del nombre que solo puede contener letras, tildes y espacios y numeros romanos, de lo contratio, devolverá "Asignatura no especificada"
        if(/^[a-zA-ZáéíóúüÁÉÍÓÚÜ\sIVXLCDM]+$/.test(nombre)){
            this.#nombre = nombre;
        }else{
            this.#nombre = "Asignatura no especificada";
        }

        this.#calificaciones = []; // Inicializacion del array de notas o calificaciones
    }

    // Getter para obtener el nombre de la asignatura
    get nombre(){
        return this.#nombre;
    }

    // Getter para obtener el promedio de notas de una asignatura
    get promedio() {
        if(this.#calificaciones.length === 0){
            return "Asignatura no evaluada";
        }else{
            const suma = this.#calificaciones.reduce((sumacc, nota) => sumacc + nota, 0);
            return Math.round(suma  / this.#calificaciones.length);
        }
    }

    // Metodo para poner una nota de un estudiante en la asignatura si es valido
    agregarCalificacion(nota){
        if (typeof nota === "number" && nota >= 0 && nota <= 10) {
            this.#calificaciones.push(nota);
        } else {
            throw new Error("La calificación debe ser un número entre 0 y 10");
        }
    }

    // Metodo para eliminar una nota de un estudiante si esta dentro del array calificaciones
    eliminarCalificacion(nota){
        const indiceCal = this.#calificaciones.indexOf(nota);

        if(indiceCal === -1){
            throw new Error("Ningún estudiante tiene esa nota en la lista");
        }else{
            this.#calificaciones.splice(indiceCal, 1);
        }
    }
}

// Clase para representar la lista de estudiantes
class ListaEstudiantes{
    #listaEst; // Atributo privado para almacenar la lista de estudiantes

    constructor(...estudiantes) {
        this.#listaEst = []; // Se inicializa a vacio el atributo
        for(const estudiante of estudiantes){
            this.agregarEstudiante(estudiante); // Se rellena el array de listas con el metodo agregarEstudiante
        }
    }

    // Getter para la lista de Estudiantes
    get listaEst(){
        return [...this.#listaEst];
    }

    // Metodo para agregar un estudiante sino esta ya en la lista
    agregarEstudiante(estudiante) {
        if (this.#listaEst.filter(e => e.id === estudiante.id).length != 0) {
            throw new Error("El estudiante ya está en la lista.");
        } else {
            this.#listaEst.push(estudiante);
        }
    }

    // Metodo para eliminar un estudiante si el estudiante se encuentra en la lista (elimina de la lista y de el atributo estatico de idsUsados)
    eliminarEstudiante(id) {
        const indiceEst = this.#listaEst.findIndex(e => e.id === id);

        if (indiceEst === -1) {
            throw new Error("No se encuentra ningún estudiante con este id en la lista");
        }else{
            this.#listaEst.splice(indiceEst, 1);
            Estudiante.eliminarIdUsado(id);
        } 
    }

    // Metodo para buscar los estudiantes por nombre en la lista
    buscarEstudiantes(nombre) {
        return this.#listaEst.filter(e => e.nombre.toLowerCase().includes(nombre.toLowerCase()));
    }

    // Getter para obtener el promedio general de las notas de todos los estudiantes
    get promedioGeneral() {
        const estudiantesPromediados = this.#listaEst.filter(e => typeof e.promedio === "number");
        const promedios = this.#listaEst.filter(e => !isNaN(e.promedio));
        if(estudiantesPromediados.length === 0){
            return "No hay estudiantes calificados";
        }else{
            const sumaPromedios = estudiantesPromediados.reduce((sumacc, e) => sumacc += e.promedio, 0);
            return Math.round(sumaPromedios / promedios.length)
        }
    }

    // Metodo para mostrar los reportes de de cada estudiante su información y sus calificaciones
    listaReportes(){
        for(const est of this.#listaEst){
            console.log(`REPORTE de Alumno: ${est.toString()}`)
            console.log(`\tDirección: ${est.direccion.toString()}`);
            console.log(`\tLista de notas:`);
                for(const asignatura of est.asignaturas){
                    if(typeof asignatura[1] == "string"){
                        const notas = asignatura[1];
                    }else{
                        const notas = (asignatura[1]).toFixed(2);
                    }

                    console.log(`\t\t${asignatura[0].nombre} - Nota: ${notas}`);
                }
                console.log(`\tPromedio (GPA): ${est.promedio}`);
                console.log(`\n`);
        }
    }
}

// Clase para representar la lista de asignaturas
class ListaAsignaturas{
    #listaAsign; // Atributo privado para almacenar la lista de asignaturas

    constructor(...asignaturas){
        this.#listaAsign = []; // Se inicializa la lista vacia

        for(const asignatura of asignaturas){
            this.agregarAsignatura(asignatura); // Se rellena la lista mediante el metodo agregarAsignatura
        }
    }

    // Getter para la lista de Asignaturas
    get listaAsign(){
        return [...this.#listaAsign];
    }

    // Agregar una asignatura a la lista si todavía no esta dentro
    agregarAsignatura(asignatura) {
        if (!(asignatura instanceof Asignatura)) {
            throw new Error("El parámetro debe ser instancia de la clase Asignatura");
        }

        if (this.#listaAsign.some(a => a.nombre === asignatura.nombre)) {
            throw new Error("La asignatura ya está en la lista");
        } else {
            this.#listaAsign.push(asignatura);
        }
    }
    
    // Elimina un asignatura de la lista si ese nombre de asignatura está en dicha lista
    eliminarAsignatura(nombre) {
        const indiceAsign = this.#listaAsign.findIndex(a => a.nombre === nombre);
        if(indiceAsign === -1){
            throw new Error("Dicha asignatura no se encuentra en la lista");
        }else{
            this.#listaAsign.splice(indiceAsign, 1);
        }
    }
}


// Main con la prueba de uso del codigo

const listaDirecciones = [];
const listaEstudiantes = new ListaEstudiantes();
const listaAsignaturas = new ListaAsignaturas();
let opcion;

// Inicialización de direcciones (5 direcciones de prueba)
listaDirecciones.push(new Direccion("Calle Paraguay", 1, "Bajo", "18210", "Peligros", "Granada"));
listaDirecciones.push(new Direccion("Calle Alcalá la Real", 12, "3ºB", "18013", "Norte", "Granada"));
listaDirecciones.push(new Direccion("Calle Francisco Ayala", 20, "2", "18014", "Granada", "Granada"));
listaDirecciones.push(new Direccion("Calle Afán de Ribera", 15, "2ºA", "18005", "Granada", "Granada"));
listaDirecciones.push(new Direccion("Calle Aliatar", 17, "Bajo", "18110", "Híjar", "Granada"));

// Inicialización de estudiantes (5 estudiantes de prueba)
const estudiante1 = new Estudiante("Adrián Martín", 19, listaDirecciones[0]);
const estudiante2 = new Estudiante("Sara Garzón", 19, listaDirecciones[1]);
const estudiante3 = new Estudiante("Lorenzo Rodriguez", 21, listaDirecciones[2]);
const estudiante4 = new Estudiante("Alonso Hernández", 21, listaDirecciones[3]);
const estudiante5 = new Estudiante("Alex Galán", 20, listaDirecciones[4]);
try{
    listaEstudiantes.agregarEstudiante(estudiante1);
    listaEstudiantes.agregarEstudiante(estudiante2);
    listaEstudiantes.agregarEstudiante(estudiante3);
    listaEstudiantes.agregarEstudiante(estudiante4);
    listaEstudiantes.agregarEstudiante(estudiante5);
}catch(err){
    console.log("Error al agregar un estudiante:", err.message);
}


// Inicialización de asignaturas (5 asignaturas de prueba)
const asignatura1 = new Asignatura("DWEC");
const asignatura2 = new Asignatura("DWES");
const asignatura3 = new Asignatura("Despliegue de Aplicaciones Web");
const asignatura4 = new Asignatura("DIW");
const asignatura5 = new Asignatura("Inglés");
try{
    listaAsignaturas.agregarAsignatura(asignatura1);
    listaAsignaturas.agregarAsignatura(asignatura2);
    listaAsignaturas.agregarAsignatura(asignatura3);
    listaAsignaturas.agregarAsignatura(asignatura4);
    listaAsignaturas.agregarAsignatura(asignatura5);
}catch (err){
    console.log("Error al agregar una asignatura:", err.message);
}



// Matriculación de estudiantes en algunas asignaturas
try{
    listaEstudiantes.listaEst[0].matricular(listaAsignaturas.listaAsign[0]);
    listaEstudiantes.listaEst[0].matricular(listaAsignaturas.listaAsign[1]);
    listaEstudiantes.listaEst[0].matricular(listaAsignaturas.listaAsign[2]);
    listaEstudiantes.listaEst[0].matricular(listaAsignaturas.listaAsign[3]);
    listaEstudiantes.listaEst[0].matricular(listaAsignaturas.listaAsign[4]);

    listaEstudiantes.listaEst[1].matricular(listaAsignaturas.listaAsign[0]);
    listaEstudiantes.listaEst[1].matricular(listaAsignaturas.listaAsign[2]);
    listaEstudiantes.listaEst[1].matricular(listaAsignaturas.listaAsign[3]);
    listaEstudiantes.listaEst[1].matricular(listaAsignaturas.listaAsign[4]);

    listaEstudiantes.listaEst[2].matricular(listaAsignaturas.listaAsign[0]);
    listaEstudiantes.listaEst[2].matricular(listaAsignaturas.listaAsign[1]);
    listaEstudiantes.listaEst[2].matricular(listaAsignaturas.listaAsign[2]);

    listaEstudiantes.listaEst[3].matricular(listaAsignaturas.listaAsign[3]);
    listaEstudiantes.listaEst[3].matricular(listaAsignaturas.listaAsign[4]);
}catch(err){
    console.log("Error al matricular:", err.message);
}


// Desmatriculación de algunos estudiantes en algunas asignaturas
try{
    listaEstudiantes.listaEst[0].desmatricular(listaAsignaturas.listaAsign[3]);
    listaEstudiantes.listaEst[1].desmatricular(listaAsignaturas.listaAsign[2]);
    listaEstudiantes.listaEst[2].desmatricular(listaAsignaturas.listaAsign[0]);
    listaEstudiantes.listaEst[3].desmatricular(listaAsignaturas.listaAsign[4]);
}catch(err){
    console.log("Error al desmatricular:", err.message);
}


// Calificación de algunos estudiantes
try {
    listaEstudiantes.listaEst[0].calificar(listaAsignaturas.listaAsign[1], 10);  // Ejemplo con asignatura válida
    listaEstudiantes.listaEst[0].calificar(listaAsignaturas.listaAsign[2], 7.3);
    
    listaEstudiantes.listaEst[1].calificar(listaAsignaturas.listaAsign[0], 9.5);
    listaEstudiantes.listaEst[1].calificar(listaAsignaturas.listaAsign[3], 8);
    listaEstudiantes.listaEst[1].calificar(listaAsignaturas.listaAsign[4], 6.66);

    listaEstudiantes.listaEst[2].calificar(listaAsignaturas.listaAsign[2], 8.2);
} catch (err) {
    console.log("Error al calificar:", err.message);
}

// Bucle while
let bandera = true;
while(bandera){
    console.log("\n");
    console.log("Sistema de Gestión Académica de Estudiantes y Asignaturas por Adrián Martín Vázquez");
    console.log("1. Crear un estudiante y su dirección");
    console.log("2. Crear una asignatura");
    console.log("3. Eliminar estudiante");
    console.log("4. Eliminar asignatura");
    console.log("5. Buscar un estudiante");
    console.log("6. Matricular un estudiante");
    console.log("7. Desmatricular un estudiante");
    console.log("8. Calificar a un estudiante en una asignatura");
    console.log("9. Registros de matriculaciones y desmatriculaciones");
    console.log("10. Promedio de un estudiante");
    console.log("11. Promedio de una asignatura");
    console.log("12. Promedio general de estudiantes");
    console.log("13. Reporte listado de estudiantes");
    console.log("0. Salir del sistema");

    opcion = window.prompt("Selecciona una de estas opciones: ");

    switch(opcion){
        case '1': {
            console.clear();
            console.log("Creando dirección del estudiante nuevo...");
            const calle = window.prompt("Introduce la calle: ");
            console.log(`Calle: ${calle}`);
            const numero = window.prompt("Introduce el número: ");
            console.log(`Número: ${numero}`);
            const piso = window.prompt("Introduce el piso: ");
            console.log(`Piso: ${piso}`);
            const codigoPostal = window.prompt("Introduce el código postal: ");
            console.log(`Código postal: ${codigoPostal}`);
            const provincia = window.prompt("Introduce la provincia: ");
            console.log(`Provincia: ${provincia}`);
            const localidad = window.prompt("Introduce la localidad: ");
            console.log(`Localidad: ${localidad}`);

            listaDirecciones.push(new Direccion(calle, numero, piso, codigoPostal, provincia, localidad));
            console.log("\nDirección del nuevo estudiante creada");

            console.log("\n\nCreando nuevo estudiante...");

            let direccion;
            direccion = listaDirecciones[listaDirecciones.length - 1];

            const nombreEst = window.prompt("Introduce el nombre del estudiante: ");
            console.log(`Nombre: ${nombreEst}`);
            const edad = window.prompt("Introduce la edad del estudiante: ");
            console.log(`Edad: ${edad}`);

            try{
                listaEstudiantes.agregarEstudiante(new Estudiante(nombreEst, edad, direccion));
                console.log("Creación del estudiante completado sin errores");
                console.log(`Nombre: ${nombreEst}`);
                console.log(`Edad: ${edad}`);
                console.log(`Dirección: ${direccion.toString()}`);
            }catch(err){
                console.log("Error durante la creación del estudiante");
                console.log(`Nombre: ${nombreEst}`);
                console.log(`Edad: ${edad}`);
                console.log(`Dirección: ${direccion.toString()}`);
            }
            break;
        }
        
        case '2': {
            console.clear();
            console.log("Creando nueva asignatura...");
            const nombreAsign = window.prompt("Introduce el nombre de la asignatura: ");
            console.log(`Nombre asignatura: ${nombreAsign}`);

            try{
                listaAsignaturas.agregarAsignatura(new Asignatura(nombreAsign));
                console.log("Creación de la asignatura completado sin errores");
                console.log(`Nombre asignatura: ${nombreAsign}`);
            }catch(err){
                console.log("Error durante la creación de la asignatura");
                console.log(`Nombre asignatura: ${nombreAsign}`);
            }
            break;
        }

        case '3': {
            if (listaEstudiantes.listaEst.length === 0) {
                console.log("No hay estudiantes registrados");
                break;
            }

            console.clear();
            console.log("Lista de estudiantes: ");
            for (const estudiante of listaEstudiantes.listaEst) {
                console.log(`${listaEstudiantes.listaEst.indexOf(estudiante) + 1}. ${estudiante.id} | ${estudiante.nombre}`);
            }

            const opcionEstSupr = Number(prompt("Elige un estudiante a eliminar: "));

            if (isNaN(opcionEstSupr) || opcionEstSupr < 1 || opcionEstSupr > listaEstudiantes.listaEst.length) {
                console.log("Opción no válida");
                break;
            }

            try {
                listaEstudiantes.eliminarEstudiante(listaEstudiantes.listaEst[opcionEstSupr - 1].id);
                console.log("Estudiante eliminado sin errores");
        
                if (listaEstudiantes.listaEst.length === 0) {
                    console.log("No hay estudiantes registrados");
                } else {
                    console.log("Lista de estudiantes actualizada: ");
                    for (const estudiante of listaEstudiantes.listaEst) {
                        console.log(`${listaEstudiantes.listaEst.indexOf(estudiante) + 1}. ${estudiante.id} | ${estudiante.nombre}`);
                    }
                }
            } catch (err) {
                console.log("Error durante el proceso de eliminación del estudiante");
            }
            break;
        }

        case '4':{
            if (listaAsignaturas.listaAsign.length === 0) {
                console.log("No hay asignaturas registradas");
                break;
            }
        
            console.clear();
            console.log("Lista de asignaturas: ");
            for (const asignatura of listaAsignaturas.listaAsign) {
                console.log(`${listaAsignaturas.listaAsign.indexOf(asignatura) + 1}. ${asignatura.nombre}`);
            }
        
            const opcionAsignSupr = Number(prompt("Elige una asignatura a eliminar: "));
        
            if (isNaN(opcionAsignSupr) || opcionAsignSupr < 1 || opcionAsignSupr > listaAsignaturas.listaAsign.length) {
                console.log("Opción no válida");
                break;
            }
        
            try {
                listaAsignaturas.eliminarAsignatura(
                    listaAsignaturas.listaAsign[opcionAsignSupr - 1].nombre
                );
                console.log("Asignatura eliminada sin errores");
        
                if (listaAsignaturas.listaAsign.length === 0) {
                    console.log("No hay asignaturas registradas");
                } else {
                    console.log("Lista de asignaturas actualizada: ");
                    for (const asignatura of listaAsignaturas.listaAsign) {
                        console.log(`${listaAsignaturas.listaAsign.indexOf(asignatura) + 1}. ${asignatura.nombre}`);
                    }
                }
            } catch (err) {
                console.log("Error durante el proceso de eliminación de la asignatura");
            }
            break;
        }

        case '5': {
            console.clear();
            const nombreEstBuscar = window.prompt("Dime el nombre de un estudiante a buscar: ");
            console.log(`Nombre a buscar: ${nombreEstBuscar}`)
            const resultadoBusqueda = listaEstudiantes.buscarEstudiantes(nombreEstBuscar);
            console.log("\nBuscando estudiantes...");

            if(resultadoBusqueda.length === 1){
                console.log(`Hay ${resultadoBusqueda.length} estudiante con el nombre ${nombreEstBuscar}`);
            }else if(resultadoBusqueda.length > 1){
                console.log(`Hay ${resultadoBusqueda.length} estudiantes con el nombre ${nombreEstBuscar}`);
            }else{
                console.log("No se ha encontrado ningún estudiante con ese nombre");
                break;
            }

            for(const estudiante of resultadoBusqueda){
                console.log(estudiante.toString());
            }
            break;
        }

        case '6': {
            if (listaEstudiantes.listaEst.length === 0) {
                console.log("No hay estudiantes registrados.");
                break;
            }
        
            console.clear();
            console.log("Lista de estudiantes:");
            listaEstudiantes.listaEst.forEach((estudiante, index) => {
                console.log(`${index + 1}. ${estudiante.nombre}`);
            });
        
            const opcionEstMat = Number(prompt("Elige un estudiante para matricular: "));
        
            if (isNaN(opcionEstMat) || opcionEstMat < 1 || opcionEstMat > listaEstudiantes.listaEst.length) {
                console.log("Opción no válida.");
                break;
            }
        
            const estudianteSeleccionado = listaEstudiantes.listaEst[opcionEstMat - 1];
        
            console.clear();
            console.log("Lista de asignaturas:");
            listaAsignaturas.listaAsign.forEach((asignatura, index) => {
                console.log(`${index + 1}. ${asignatura.nombre}`);
            });
        
            const opcionAsigMat = Number(prompt("Elige una asignatura para matricular: "));
        
            if (isNaN(opcionAsigMat) || opcionAsigMat < 1 || opcionAsigMat > listaAsignaturas.listaAsign.length) {
                console.log("Opción no válida.");
                break;
            }
        
            const asignaturaSeleccionada = listaAsignaturas.listaAsign[opcionAsigMat - 1];
        
            try {
                estudianteSeleccionado.matricular(asignaturaSeleccionada);
                console.log(`El estudiante ${estudianteSeleccionado.nombre} se ha matriculado en ${asignaturaSeleccionada.nombre}.`);
            } catch (err) {
                console.log(err.message);
            }
            break;
        }

        case '7': {
            if (listaEstudiantes.listaEst.length === 0) {
                console.log("No hay estudiantes registrados.");
                break;
            }
        
            console.clear();
            console.log("Lista de estudiantes:");
            listaEstudiantes.listaEst.forEach((estudiante, index) => {
                console.log(`${index + 1}. ${estudiante.nombre}`);
            });
        
            const opcionEstDesmat = Number(prompt("Elige un estudiante para desmatricular: "));
        
            if (isNaN(opcionEstDesmat) || opcionEstDesmat < 1 || opcionEstDesmat > listaEstudiantes.listaEst.length) {
                console.log("Opción no válida.");
                break;
            }
        
            const estudianteSeleccionado = listaEstudiantes.listaEst[opcionEstDesmat - 1];
        
            if (estudianteSeleccionado.asignaturas.length === 0) {
                console.log(`${estudianteSeleccionado.nombre} no está matriculado en ninguna asignatura.`);
                break;
            }
        
            console.clear();
            console.log("Asignaturas de las que el estudiante está matriculado:");
            estudianteSeleccionado.asignaturas.forEach((asignatura, index) => {
                console.log(`${index + 1}. ${asignatura.nombre}`);
            });
        
            const opcionAsigDesmat = Number(prompt("Elige una asignatura para desmatricular: "));
        
            if (isNaN(opcionAsigDesmat) || opcionAsigDesmat < 1 || opcionAsigDesmat > estudianteSeleccionado.asignaturas.length) {
                console.log("Opción no válida.");
                break;
            }
        
            const asignaturaSeleccionada = estudianteSeleccionado.asignaturas[opcionAsigDesmat - 1];
        
            try {
                estudianteSeleccionado.desmatricular(asignaturaSeleccionada);
                console.log(`El estudiante ${estudianteSeleccionado.nombre} se ha desmatriculado de ${asignaturaSeleccionada.nombre}.`);
            } catch (err) {
                console.log(err.message);
            }
            break;
        }

        case '8': {
            if (listaEstudiantes.listaEst.length === 0) {
                console.log("No hay estudiantes registrados.");
                break;
            }
            if (listaAsignaturas.listaAsign.length === 0) {
                console.log("No hay asignaturas registradas.");
                break;
            }
        
            console.clear();
            console.log("Lista de estudiantes:");
            listaEstudiantes.listaEst.forEach((estudiante, index) => {
                console.log(`${index + 1}. ${estudiante.nombre}`);
            });
        
            const opcionEstCal = Number(prompt("Elige un estudiante para calificar: "));
        
            if (isNaN(opcionEstCal) || opcionEstCal < 1 || opcionEstCal > listaEstudiantes.listaEst.length) {
                console.log("Opción no válida.");
                break;
            }
        
            const estudianteElegido = listaEstudiantes.listaEst[opcionEstCal - 1];
        
            console.log(`Estudiante seleccionado: ${estudianteElegido.nombre}`);
            console.log("Asignaturas matriculadas:");
            estudianteElegido.asignaturas.forEach((asignatura, indice) => {
                console.log(`${indice + 1}. ${asignatura.nombre}`);
            });
        
            const opcionAsigCal = Number(prompt("Elige una asignatura para calificar: "));
        
            if (isNaN(opcionAsigCal) || opcionAsigCal < 1 || opcionAsigCal > estudianteElegido.asignaturas.length) {
                console.log("Opción no válida.");
                break;
            }
        
            const asignaturaSeleccionada = estudianteElegido.asignaturas[opcionAsigCal - 1];
        
            const nota = Number(prompt(`Introduce la calificación para ${asignaturaSeleccionada.nombre}: `));
        
            if (isNaN(nota) || nota < 0 || nota > 10) {
                console.log("Calificación no válida. Debe ser un número entre 0 y 10.");
                break;
            }
        
            try {
                estudianteElegido.calificar(asignaturaSeleccionada, nota);
                console.log(`Asignatura ${asignaturaSeleccionada.nombre} calificada con ${nota}.`);
            } catch (err) {
                console.log("Error al calificar:", err.message);
            }
            break;
        }

        case '9': {
            if (listaEstudiantes.listaEst.length === 0) {
                console.log("No hay estudiantes registrados.");
                break;
            }
        
            console.clear();
            console.log("Lista de estudiantes:");
            listaEstudiantes.listaEst.forEach((estudiante, index) => {
                console.log(`${index + 1}. ${estudiante.nombre}`);
            });
        
            const opcionEstReg = Number(prompt("Elige un estudiante para ver sus registros: "));
        
            if (isNaN(opcionEstReg) || opcionEstReg < 1 || opcionEstReg > listaEstudiantes.listaEst.length) {
                console.log("Opción no válida.");
                break;
            }
        
            const estudianteElegido = listaEstudiantes.listaEst[opcionEstReg - 1];
        
            console.log(`Registros de matriculaciones y desmatriculaciones de ${estudianteElegido.nombre}:`);
            const registros = estudianteElegido.registros;
        
            if (registros.length === 0) {
                console.log("Este estudiante no tiene registros de matriculaciones o desmatriculaciones.");
            } else {
                registros.forEach((registro, indice) => {
                    console.log(`${indice + 1}. ${registro}`);
                });
            }
            break;
        }

        case '9': {
            if (listaEstudiantes.listaEst.length === 0) {
                console.log("No hay estudiantes registrados.");
                break;
            }
        
            console.clear();
            console.log("Lista de estudiantes:");
            listaEstudiantes.listaEst.forEach((estudiante, index) => {
                console.log(`${index + 1}. ${estudiante.nombre}`);
            });
        
            const opcionEstReg = Number(window.prompt("Elige un estudiante para ver sus registros: "));
        
            if (isNaN(opcionEstReg) || opcionEstReg < 1 || opcionEstReg > listaEstudiantes.listaEst.length) {
                console.log("Opción no válida.");
                break;
            }
        
            const estudianteElegido = listaEstudiantes.listaEst[opcionEstReg - 1];
        
            console.log(`\nRegistros de matriculaciones y desmatriculaciones de ${estudianteElegido.nombre}:`);
            const registros = estudianteElegido.registros;
        
            if (registros.length === 0) {
                console.log("Este estudiante no tiene registros de matriculaciones o desmatriculaciones.");
            } else {
                registros.forEach((registro, indice) => {
                    console.log(`${indice + 1}. ${registro}`);
                });
            }
            break;
        }

        case '0': {
            console.clear();
            console.log("Saliendo...");
            bandera = false;
        }

        default: {
            console.log("Prueba otra vez");
        }
    }
}