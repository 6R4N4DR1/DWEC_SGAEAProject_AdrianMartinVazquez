/**
  SGAEA - Sistema de Gestión Académica de Estudiantes y Asignaturas
  Adrián Martín Vázquez 2º DAW AULA
  Github Pages: https://github.com/6R4N4DR1/DWEC_SGAEAProject_AdrianMartinVazquez/
  (Es necesario abrir la consola de las DevTools antes de cargar la página)
 */

/**
 * Definición de Clases
 * 
 * En esta parte se definen las clases Persona, Direccion, Estudiante, Asignatura, ListaEstudiantes y ListaAsignaturas.
 */

// Clase base para la persona, con datos de nombre y edad
class Persona{
    // Declaración de atributos
    #nombre; 
    #edad; 

    constructor(nombre, edad) {
        // Validación del nombre, si es válido se asigna, de lo contrario, se asigna un valor por defecto
        if(this.#validarNombre(nombre)){
            this.#nombre = nombre;
        }else{
            this.#nombre = "John Doe";
        }

        // Validación de la edad, si es válida se asigna, de lo contrario, se asigna 0
        if(this.#validarEdad(edad)){
            this.#edad = edad
        }else{
            this.#edad = 0;
        }
    }

    // Método privado para validar el nombre (solo letras, tíldes y espacios)
    #validarNombre(nombre) {
        return typeof nombre === "string" && /^[a-zA-ZáéíóúüÁÉÍÓÚÜ\s]+$/.test(nombre);
    }

    // Método privado para validar la edad (número entero entre 1 y 99)
    #validarEdad(edad) {
        return Number.isInteger(edad) && edad > 0 && edad < 100;
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
    // Declaración de atributos
    #calle;
    #numero;
    #piso;
    #codigoPostal;
    #provincia;
    #localidad;

    constructor(calle, numero, piso, codigoPostal, provincia, localidad) {
        // Validación de los atributos y asignación de valores por defecto si no son válidos
        if(this.#validarCadena(calle)){
            this.#calle = calle
        }else{
            this.#calle = "Sin Nombre";
        }

        if(this.#validarNumero(numero)){
            this.#numero = numero;
        }else{
            this.#numero = 0;
        }
        
        this.#piso = piso;

        if(this.#validarCodigoPostal(codigoPostal)){
            this.#codigoPostal = codigoPostal;
        }else{
            this.#codigoPostal = "00000";
        }

        if(this.#validarCadena(provincia)){
            this.#provincia = provincia
        }else{
            this.#provincia = "Desconocida";
        }

        if(this.#validarCadena(localidad)){
            this.#localidad = localidad
        }else{
            this.#localidad = "Desconocida";
        }
    }

    // Método privado para validar el código postal (debe ser un número de 5 dígitos)
    #validarCodigoPostal(codigoPostal){
        return typeof codigoPostal === "string" && /^[0-9]{5}$/.test(codigoPostal);
    }

    // Método privado para validar strings
    #validarCadena(texto){
        return typeof texto === "string";
    }

    // Método privado para validar números enteros
    #validarNumero(numb){
        return Number.isInteger(numb) && numb > 0;
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
        this.#id = this.#generarId(); // Generación de un ID único para el estudiante
        // Validacion de que el atributo direccion que se pasa como parametro sea un objeto de la clase Direccion 
        if (!direccion || typeof direccion !== "object") {
            throw new Error("Dirección no válida");
        }else{
            this.#direccion = direccion;
        }
        this.#asignaturas = []; // Inicialización del array de asignaturas
        this.#registros = []; // Inicialización del array de registros
    }

    // Método privado para generar un ID único para el estudiante
    #generarId() {
        let id;
        do {
        id = `E-${Math.floor(Math.random() * 10000)}`;
        } while (Estudiante.idsUsados.includes(id));
        Estudiante.idsUsados.push(id);
        return id;
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
            const diasESP = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            const mesesESP = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

            const diaSemana = diasESP[fecha.getDay()];
            const dia = fecha.getDate();
            const mes = mesesESP[fecha.getMonth()];
            const ano = fecha.getFullYear();

            return `${accion} en ${asignatura} el ${diaSemana}, ${dia} de ${mes} de ${ano}`;
        });
    }

    // Método para matricular a un estudiante en una asignatura
    matricular(asignatura) {
        if (!this.#asignaturas.map(a => a[0].nombre).includes(asignatura.nombre)) {
            this.#asignaturas.push([ asignatura, "Sin calificar" ]);
            this.#registros.push(["Matriculación", asignatura.nombre, new Date()]);
        }
    }

    // Método para desmatricular a un estudiante de una asignatura
    desmatricular(asignatura) {
        if(!this.#asignaturas.map(a => a[0].nombre).includes(asignatura.nombre)){
            throw new Error("No hay estudiante matriculado en esta asignatura");
        }else{
            this.#asignaturas = this.#asignaturas.filter(a => a[0].nombre !== asignatura.nombre);
            this.#registros.push(["Desmatriculación", asignatura.nombre, new Date()]);
        }
    }

    // Método para calificar a un estudiante en una asignatura
    calificar(asignatura, nota) {
        if(!this.#asignaturas.map(a => a[0].nombre).includes(asignatura.nombre)){
            throw new Error("No hay estudiante matriculado en esta asignatura");
        }

        if (typeof nota !== "number" || nota < 0 || nota > 10){
            throw new Error("La nota tiene que ser entre 0 y 10");
        }

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
        const notas = this.#asignaturas.filter(a => typeof a[1] === "number");

        if(notas.length == 0){
            return "No hay calificaciones";
        }

        const suma = notas.reduce((sumacc, asign) => sumacc += asign[1], 0);
        return Math.round(suma / notas.length);
    }

    // Metodo estatico para la llamada del atributo estatico de idsUsados para eliminar un id Ocupado y así desocuparlo
    static eliminarIdUsado(id){
        if(!Estudiante.idsUsados.includes(id)){
            throw new Error("ID de usuario no encontrado")
        }

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
        // Validación del nombre que solo puede contener letras, tildes y espacios, de lo contratio, devolverá "Asignatura no especificada"
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
            console.log(`Información del alumno con id: ${est.id}`);
                console.log(`\tNombre: ${est.nombre}`);
                console.log(`\tEdad: ${est.edad}`);
                console.log(`\tDirección: ${est.direccion.toString()}`);
            console.log(`Notas del alumno con id: ${est.id}`);
                for(const [asignatura, nota] of est.asignaturas){
                    if(typeof nota === "string"){
                        const notas = nota;
                    }else{
                        const notas = Number(nota).toFixed(2);
                    }

                    console.log(`\t${asignatura.nombre} - Nota: ${notas}`);
                }
                console.log(`\tPromedio: ${est.promedio}\n`);
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

    // Metodo para buscar una asignatura en la lista por nombre
    buscarAsignaturas(nombre) {
        return this.#listaAsign.filter(a => a.nombre.toLowerCase().includes(nombre.toLowerCase()));
    }
}

/**
 * Programa Principal.
 * 
 * En esta sección se declara un objeto ListaEstudiantes, otro objeto ListaAsignaturas, y un Array de objetos
 * Direccion llamado listaDirecciones. Seguidamente, se entra en el bucle while.
 * 
 * Extra: Se inicializan y añaden 5 direcciones, 5 estudiantes y 5 asignaturas.
 *        Se matriculan a algunos estudiantes de algunas asignaturas.
 *        Se desmatriculan a algunos estudiantes de algunas asignaturas.
 *        Se califican a algunos estudiantes en algunas asignaturas.
 * 
 * Por siempre, se preguntará la elección principal de la acción a realizar.
 * La variable eleccion será la variable que siempre obtenga el valor de window.prompt().
 */

const listaDirecciones = [];
const listaEstudiantes = new ListaEstudiantes();
const listaAsignaturas = new ListaAsignaturas();

// Inicialización de direcciones (5 direcciones de ejemplo)
listaDirecciones.push(new Direccion("Calle Paraguay", 1, "Bajo", "18210", "Peligros", "Granada"));
listaDirecciones.push(new Direccion("Calle Alcalá la Real", 12, "3ºB", "18013", "Norte", "Granada"));
listaDirecciones.push(new Direccion("Calle Francisco Ayala", 20, "2", "18014", "Granada", "Granada"));
listaDirecciones.push(new Direccion("Calle Afán de Ribera", 15, "2ºA", "18005", "Granada", "Granada"));
listaDirecciones.push(new Direccion("Calle Aliatar", 17, "Bajo", "18110", "Híjar", "Granada"));

// Inicialización de estudiantes (5 estudiantes de ejemplo)
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

// Inicialización de asignaturas (5 asignaturas de ejemplo)
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
    console.log("1. Crear");
    console.log("2. Eliminar");
    console.log("3. Matricular");
    console.log("4. Desmatricular");
    console.log("5. Calificar");
    console.log("6. Registros");
    console.log("7. Buscar");
    console.log("8. Promedio");
    console.log("9. Reporte");

    elegir = Number.parseInt(window.prompt("¿Cuál eliges?: "));

    switch(elegir){

    }
}