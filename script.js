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
        if(Number.isInteger(edad) && edad > 0 && edad < 100){
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

        if(Number.isInteger(numero) && numero > 0){
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
        numeroId = ``;

        // Hacemos un bucle poniendo un id que empieza por E- seguido de 4 numeros mientras que dicho id este en idsUsados
        do {
            numeroId = `E-${Math.floor(Math.random() * 10000)}`;
        } while (Estudiante.idsUsados.includes(id));

        // Si el id no esta en idsUsados se sale del bucle y se añade dicho id a la lista de idsUsados
        Estudiante.idsUsados.push(numeroId)
        this.#id = numeroId; // El id se instancia con el numeroId obtenido
        
        // Validacion de que el atributo direccion que se pasa como parametro sea un objeto de la clase Direccion 
        if (!direccion || typeof direccion !== "object") {
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
        if (!this.#asignaturas.map(a => a[0].nombre).includes(asignatura.nombre)) {
            this.#asignaturas.push([ asignatura, "Sin calificar" ]);
            this.#registros.push(["Matriculación", asignatura.nombre, new Date()]);
        }
    }

    // Método para desmatricular a un estudiante de una asignatura
    desmatricular(asignatura) {
        // Si el elemento nombre del array asignaturas que se encuentra en el primer valor de la matriz (0) no tiene el nombre de la asignatura que se pasa como parametro
        // Manda un error, de lo contrario, se rehace el array asignaturas eliminando la asignatura pasada como parametro, y se hace un nuevo registro
        if(!this.#asignaturas.map(a => a[0].nombre).includes(asignatura.nombre)){
            throw new Error("No hay estudiante matriculado en esta asignatura");
        }else{
            this.#asignaturas = this.#asignaturas.filter(a => a[0].nombre !== asignatura.nombre);
            this.#registros.push(["Desmatriculación", asignatura.nombre, new Date()]);
        }
    }

    // Método para calificar a un estudiante en una asignatura
    calificar(asignatura, nota) {
        // Si el elemento nombre del array asignaturas que se encuentra en el primer valor de la matriz (0) no tiene dentro el nombre de la asignatura que se pasa como parametro
        // Devuelve un error
        if(!this.#asignaturas.map(a => a[0].nombre).includes(asignatura.nombre)){
            throw new Error("No hay estudiante matriculado en esta asignatura");
        }

        // Si el elemento nota no es un numero y el numero es menor de 0 o mayor de 10 entonces devuelve un error
        if (typeof nota !== "number" || nota < 0 || nota > 10){
            throw new Error("La nota tiene que ser entre 0 y 10");
        }

        // Se itera el array de asignaturas añadiendo por asignatura que se pasa como parametro su calificacion que es el segundo valor de la matriz (1)
        // Además se agregar esa nueva calificación a la asignatura mediante el metodo de Asignatura de agregarCalificacion, una vez se encuentre el nombre
        // de la asignatura que se paso como parametro y se hagan estas asignaciones, se sale del bucle
        for(const asign of this.#asignaturas){
            if(asign[0].nombre === asignatura.nombre){
                asign[1] = parseFloat(nota.toFixed(2));
                asignatura.agregarCalificacion(nota);
                break;
            }
        }
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

    // Muestra un string del nombre de cada asignatura
    toString() {
        return this.#nombre;
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
        if (this.#listaAsign.filter(a => a.nombre === asignatura.nombre).length != 0) {
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

listaEstudiantes.agregarEstudiante(estudiante1);
listaEstudiantes.agregarEstudiante(estudiante2);
listaEstudiantes.agregarEstudiante(estudiante3);
listaEstudiantes.agregarEstudiante(estudiante4);
listaEstudiantes.agregarEstudiante(estudiante5);

// Inicialización de asignaturas (5 asignaturas de prueba)
const asignatura1 = new Asignatura("DWEC");
const asignatura2 = new Asignatura("DWES");
const asignatura3 = new Asignatura("Despliegue de Aplicaciones Web");
const asignatura4 = new Asignatura("DIW");
const asignatura5 = new Asignatura("Inglés");

listaAsignaturas.agregarAsignatura(asignatura1);
listaAsignaturas.agregarAsignatura(asignatura2);
listaAsignaturas.agregarAsignatura(asignatura3);
listaAsignaturas.agregarAsignatura(asignatura4);
listaAsignaturas.agregarAsignatura(asignatura5);

// Matriculación de estudiantes en algunas asignaturas
ListaEstudiantes.listaEst[0].matricular(listaAsignaturas.listaAsign[0]);
ListaEstudiantes.listaEst[0].matricular(listaAsignaturas.listaAsign[1]);
ListaEstudiantes.listaEst[0].matricular(listaAsignaturas.listaAsign[2]);
ListaEstudiantes.listaEst[0].matricular(listaAsignaturas.listaAsign[3]);
ListaEstudiantes.listaEst[0].matricular(listaAsignaturas.listaAsign[4]);

ListaEstudiantes.listaEst[1].matricular(listaAsignaturas.listaAsign[0]);
ListaEstudiantes.listaEst[1].matricular(listaAsignaturas.listaAsign[2]);
ListaEstudiantes.listaEst[1].matricular(listaAsignaturas.listaAsign[3]);
ListaEstudiantes.listaEst[1].matricular(listaAsignaturas.listaAsign[4]);

ListaEstudiantes.listaEst[2].matricular(listaAsignaturas.listaAsign[0]);
ListaEstudiantes.listaEst[2].matricular(listaAsignaturas.listaAsign[1]);
ListaEstudiantes.listaEst[2].matricular(listaAsignaturas.listaAsign[2]);

ListaEstudiantes.listaEst[3].matricular(listaAsignaturas.listaAsign[3]);
ListaEstudiantes.listaEst[3].matricular(listaAsignaturas.listaAsign[4]);

// Desmatriculación de algunos estudiantes en algunas aignaturas
ListaEstudiantes.listaEst[0].desmatricular(listaAsignaturas.listaAsign[3]);
ListaEstudiantes.listaEst[1].desmatricular(listaAsignaturas.listaAsign[2]);
ListaEstudiantes.listaEst[2].desmatricular(listaAsignaturas.listaAsign[0]);
ListaEstudiantes.listaEst[3].desmatricular(listaAsignaturas.listaAsign[4]);

// Calificación de algunos estudiantes
ListaEstudiantes.listaEst[0].calificar(listaAsignaturas.listaAsign[1], 10);
ListaEstudiantes.listaEst[0].calificar(listaAsignaturas.listaAsign[2], 7.3);

ListaEstudiantes.listaEst[1].calificar(listaAsignaturas.listaAsign[0], 9.5);
ListaEstudiantes.listaEst[1].calificar(listaAsignaturas.listaAsign[3], 8);
ListaEstudiantes.listaEst[1].calificar(listaAsignaturas.listaAsign[4], 6.66);

ListaEstudiantes.listaEst[2].calificar(listaAsignaturas.listaAsign[2], 8.2);

// Bucle while

while(true){
    console.clear();
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
    console.log("10. Promedios");
    console.log("11. Reporte listado de estudiantes");
    console.log("0. Salir del sistema");

    let opcion = Number.parseInt(window.prompt("Selecciona una de estas opciones: "));

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
            
        }


    }
}