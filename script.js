/**
  SGAEA - Sistema de Gestión Académica de Estudiantes y Asignaturas
  Adrián Martín Vázquez 2º DAW AULA
  Github: https://github.com/6R4N4DR1/DWEC_SGAEAProject_AdrianMartinVazquez/
 */

// Clase para representar una dirección de una persona
class Direccion {
    // Declaración de atributos encapsulados usando el # (privados)
    #calle; // Almacena el nombre de la calle
    #numero; // Almacena el número de la dirección
    #piso; // Almacena el piso o planta de la dirección
    #codigoPostal; // Almacena el código postal
    #provincia; // Almacena la provincia de la dirección
    #localidad; // Almacena la localidad o ciudad

    constructor(calle, numero, piso, codigoPostal, provincia, localidad) {
        // Validación del atributo "calle": debe ser una cadena no vacía
        if (this.#validarCadenas(calle)) {
            this.#calle = calle;
        } else {
            throw new Error("Especificación de calle no válida");
        }

        // Validación del atributo "numero": debe ser mayor a 0
        if (numero > 0) {
            this.#numero = numero;
        } else {
            throw new Error("Número no válido");
        }

        // Validación del atributo "piso": debe ser una cadena no vacía
        if (this.#validarCadenas(piso)) {
            this.#piso = piso;
        } else {
            throw new Error("Especificación del piso no válida");
        }

        // Validación del atributo "codigoPostal": debe ser un string de 5 dígitos
        if (/^[0-9]{5}$/.test(codigoPostal)) {
            this.#codigoPostal = codigoPostal;
        } else {
            throw new Error("Código postal incorrecto");
        }

        // Validación del atributo "provincia": debe ser una cadena no vacía
        if (this.#validarCadenas(provincia)) {
            this.#provincia = provincia;
        } else {
            throw new Error("Provincia especificada no es válida");
        }

        // Validación del atributo "localidad": debe ser una cadena no vacía
        if (this.#validarCadenas(localidad)) {
            this.#localidad = localidad;
        } else {
            throw new Error("Localidad especificada no es válida");
        }
    }

    // Método privado para validar si una cadena es válida.
    // Valida si el elemento de la cadena es "string".
    #validarCadenas(cadena) {
        return typeof cadena === "string";
    }

    // Métodos "getter" para acceder a los atributos privados

    // Devuelve el valor de "calle"
    get calle() {
        return this.#calle;
    }

    // Devuelve el valor de "numero"
    get numero() {
        return this.#numero;
    }

    // Devuelve el valor de "piso"
    get piso() {
        return this.#piso;
    }

    // Devuelve el valor de "codigoPostal"
    get codigoPostal() {
        return this.#codigoPostal;
    }

    // Devuelve el valor de "provincia"
    get provincia() {
        return this.#provincia;
    }

    // Devuelve el valor de "localidad"
    get localidad() {
        return this.#localidad;
    }

    // Genera un texto con la dirección completa.
    toString() {
        return `${this.#calle}, Nº${this.#numero}, ${this.#piso}, ${this.#localidad}, ${this.#provincia}, CP: ${this.#codigoPostal}`;
    }
}


// Clase base para la persona, con datos de nombre y edad
class Persona {
    // Declaración de atributos encapsulados
    #nombre; // Almacena el nombre de la persona
    #edad; // Almacena la edad de la persona
    #direccion; // Almacena la dirección de la persona, instancia de la clase Dirección

    constructor(nombre, edad, direccion) {
        // Validación del nombre: debe ser una cadena que solo contenga letras, espacios y tildes
        if (typeof nombre === "string" && /^[a-zA-ZáéíóúüÁÉÍÓÚÜ\s]+$/.test(nombre)) {
            this.#nombre = nombre;
        } else {
            throw new Error("El nombre solo puede tener letras, tíldes y espacios");
        }

        // Validación de la edad: debe ser un número entre 1 y 99
        if (edad > 0 && edad < 100 && /^[0-9]+$/.test(edad)) {
            this.#edad = edad;
        } else {
            throw new Error("La edad solo puede ser entre 1 y 99 años");
        }

        // Validación de la dirección: debe ser una instancia de la clase Dirección
        if (direccion instanceof Direccion) {
            this.#direccion = direccion;
        } else {
            throw new Error("La dirección debe ser una instancia de la clase Dirección, por tanto no es válida");
        }
    }

    // Getter para obtener el nombre de la persona
    get nombre() {
        return this.#nombre;
    }

    // Getter para obtener la edad de la persona
    get edad() {
        return this.#edad;
    }

    // Getter para obtener la dirección de la persona
    get direccion() {
        return this.#direccion.toString(); // Devuelve la dirección en formato texto utilizando el método toString de Dirección
    }

    // Genera un texto de la persona, incluyendo su nombre, edad y ubicación
    toString() {
        return `${this.#nombre}, ${this.#edad} años.\nUbicación: ${this.#direccion}`;
    }
}

// Clase Estudiante que hereda de Persona
class Estudiante extends Persona{
    // Declaración de atributos
    #id;
    #asignaturas; // Asignaturas del estudiante
    #registros; // Para registar las matriculaciones y desmatriculaciones de estudiantes en asignaturas
    
    static #idsUsados = []; // Atributo estático para almacenar los IDs ya utilizados

    constructor(nombre, edad, direccion) {
        super(nombre, edad, direccion); // Llamada al constructor de Persona
        
        let numId = 1;

        // Busca el primer ID disponible
        while(Estudiante.#idsUsados.includes(numId)){
            numId++;
        }

        Estudiante.#idsUsados.push(numId); // Agrega el ID al registro de IDs usados
        this.#id = "E" + numId; // Asigna un ID único al estudiante
        
        this.#asignaturas = []; // Inicialización del array de asignaturas
        this.#registros = []; // Inicialización del array de registros
    }
    
    // Getters para obtener el id, la dirección y las asignaturas del estudiante
    get id(){
        return this.#id;
    }

    get asignaturas(){
        return [...this.#asignaturas]; // Devuelve una copia del array de asignaturas
    }

    // Getter para obtener los registros de matriculación y desmatriculación con la fecha de cambio en español
    get registros(){
        if(this.#registros.length === 0){
            return [];
        }

        return this.#registros.map(([accion, asignatura, fecha]) => {
            // Inicialización de arrays de días y meses en formato largo y en español
            const diasESP = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            const mesesESP = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

            // Obtiene el día de la semana, el día del mes, el mes y el año
            const diaSemana = diasESP[fecha.getDay()];
            const dia = fecha.getDate();
            const mes = mesesESP[fecha.getMonth()];
            const ano = fecha.getFullYear();

            // Devuelve la acción realizada con la fecha formateada
            return `${accion} en ${asignatura} el ${diaSemana}, ${dia} de ${mes} de ${ano}`;
        });
    }

    // Método para matricular a un estudiante en una asignatura
    matricular(asignatura) {
        // Verifica si el estudiante ya está matriculado en la asignatura
        const estudianteMatriculado = this.#asignaturas.some(asign => asign[0].nombreAsign === asignatura.nombreAsign);
        if (estudianteMatriculado) {
            throw new Error("El estudiante ya está matriculado en esta asignatura");
        }
        // Matricula al estudiante y agrega el registro
        this.#asignaturas.push([asignatura, "Sin calificar"]);
        const fechaActual = new Date();
        this.#registros.push(["Matriculado", asignatura.nombreAsign, fechaActual]);
    }

    // Método para desmatricular a un estudiante de una asignatura
    desmatricular(asignatura) {
        // Busca la asignatura en la lista de asignaturas
        const indice = this.#asignaturas.findIndex(asign => asign[0].nombreAsign === asignatura.nombreAsign);
        if (indice === -1) {
            throw new Error("El estudiante no está matriculado en esta asignatura");
        }
        // Elimina la asignatura y registra la desmatriculación
        this.#asignaturas.splice(indice, 1);
        const fechaActual = new Date();
        this.#registros.push(["Desmatriculado", asignatura.nombreAsign, fechaActual]);
    }

    // Método para calificar a un estudiante en una asignatura
    calificar(asignatura, nota) {
        // Verifica si la asignatura está en la lista de asignaturas del estudiante
        const asignaturaMatriculada = this.#asignaturas.find(asign => asign[0].nombreAsign === asignatura.nombreAsign);
        if (!asignaturaMatriculada) {
            throw new Error(`El estudiante no está matriculado en la asignatura ${asignatura.nombreAsign}`);
        }
        if(nota < 0 || nota > 10){
            throw new Error("La nota pasada como parámetro no está entre 0 y 10");
        }

        // Asigna la nota a la asignatura
        asignaturaMatriculada[1] = nota;
    }

    // Getter para calcular el promedio de notas de un estudiante
    promedioEstudiantes() {
        // Filtra las asignaturas que tienen notas numéricas
        const notas = this.#asignaturas.filter(asign => typeof asign[1] === "number");

        if(notas.length === 0){
            return "No hay calificaciones";
        }

        // Calcula el promedio de las notas
        const suma = notas.reduce((acc, asign) => acc + asign[1], 0);
        return Math.round(suma / notas.length);
    }

    // Método para mostrar los reportes de cada estudiante
    listaReportes(){
            console.log(`REPORTE de alumno con id: ${this.#id}`);
            console.log(`\t${super.toString()}`);
            console.log(`\tLista de notas:`);
            if(this.#asignaturas.length === 0){
                console.log("\t\tNo hay asignaturas calificadas");
            }else{
                this.#asignaturas.forEach((asign, indice) => {
                    console.log(`\t\t${indice + 1}. [${asign[0].nombreAsign} - Nota: ${asign[1] || "Sin calificar"}]`);
                });
            }
            console.log(`\tPromedio del alumno (GPA): ${this.promedioEstudiantes()}`);
    }

    // Método estático para liberar un ID usado
    static eliminarIdUsado(id){
        const indiceId = Estudiante.#idsUsados.indexOf(id);

        if(indiceId !== -1){
            Estudiante.#idsUsados.splice(indiceId, 1);
        }else{
            console.error(`ID ${id} está libre`);
        }
    }

    // Muestra un string con la ID y la información del estudiante
    toString() {
        let verAsignaturas = "Ninguna";
        if(this.#asignaturas.length > 0){
            verAsignaturas = this.#asignaturas.map(([asign, nota]) => `${asign.nombreAsign} - Nota: ${nota ?? "Sin calificar"}`).join(" | ");
        }
        return `${this.#id} -> ${super.toString()}. \n Asignaturas del estudiante: [${verAsignaturas}]`;
    }
}

// Clase Asignatura
class Asignatura{

    // Declaración de atributos privados
    #nombreAsign;   // Nombre de la asignatura
    #calificaciones; // Array para almacenar las calificaciones de la asignatura

    // Constructor que inicializa la asignatura con su nombre
    constructor(nombreAsign) {

        // Validación del nombre de la asignatura
        // Solo permite letras, tildes, espacios y números romanos
        if(typeof(nombreAsign) === "string" && /^[a-zA-ZáéíóúüÁÉÍÓÚÜ\sIVXLCDM]+$/.test(nombreAsign)){
            this.#nombreAsign = nombreAsign; // Asigna el nombre si es válido
        }else{
            // Si el nombre no es válido, lanza un error
            throw new Error("El nombre de la asignatura solo puede contener letras, tíldes, espacios y numeros romanos");
        }

        this.#calificaciones = []; // Inicializa el array de calificaciones vacío
    }

    // Getter para obtener el nombre de la asignatura
    get nombreAsign(){
        return this.#nombreAsign; // Devuelve el nombre de la asignatura
    }

    // Método para agregar una calificación si es válida
    agregarCalificacion(nota){
        // Verifica que la calificación esté en el rango válido (0 a 10)
        if (nota >= 0 && nota <= 10) {
            this.#calificaciones.push(nota); // Si es válida, la agrega al array
        } else {
            // Si la calificación no es válida, lanza un error
            throw new Error("La calificación debe ser un número entero entre 0 y 10");
        }
    }

    // Getter para obtener el promedio de las calificaciones
    promedioAsignaturas() {
        // Si no hay calificaciones, retorna 0
        if(this.#calificaciones.length === 0){
            return 0;
        } else {
            // Si hay calificaciones, calcula el promedio
            const suma = this.#calificaciones.reduce((acc, nota) => acc + nota, 0); // Suma todas las calificaciones
            return Math.round(suma / this.#calificaciones.length); // Calcula el promedio y lo redondea
        }
    }

    // Método para eliminar una calificación si existe en el array
    eliminarCalificacion(nota) {

        // Busca el índice de la calificación en el array
        const indiceNota = this.#calificaciones.indexOf(nota);

        // Si la calificación no está en el array, lanza un error
        if (indiceNota === -1) {
            throw new Error(`La calificación ${nota} no se encuentra en la asignatura ${this.#nombreAsign}`);
        }

        // Si la calificación está en el array, la elimina
        this.#calificaciones.splice(indiceNota, 1);
    }

    // Método que convierte la asignatura a un formato de texto (string)
    toString(){
        return `${this.#nombreAsign} - Notas: ${this.#calificaciones}`; // Devuelve el nombre y las calificaciones en formato de texto
    }
}

// Clase para representar la lista de estudiantes
class ListaEstudiantes{
    #listaEst; // Atributo privado para almacenar la lista de estudiantes

    // Constructor para inicializar la lista de estudiantes
    constructor() {
        this.#listaEst = []; // Inicializa el atributo #listaEst como un array vacío
    }

    // Getter para la lista de estudiantes
    get listaEst(){
        return this.#listaEst; // Devuelve el array de estudiantes
    }

    // Método para agregar un estudiante a la lista, si no está ya en ella
    agregarEstudiante(estudiante) {
        // Verifica si el estudiante ya está en la lista por su id
        if (this.#listaEst.some(est => est.id === estudiante.id)) {
            // Si el estudiante ya existe, lanza un error
            throw new Error("El estudiante ya está en la lista.");
        } else {
            // Si no está, lo agrega a la lista
            this.#listaEst.push(estudiante);
        }
    }

    // Método para eliminar un estudiante de la lista por su id
    eliminarEstudiante(id) {
        // Busca el índice del estudiante en la lista por su id
        const indiceEst = this.#listaEst.findIndex(est => est.id === id);

        // Si el estudiante no está en la lista, lanza un error
        if(indiceEst === -1){
            throw new Error("El estudiante no está en la lista");
        }

        // Elimina el estudiante encontrado en el índice
        this.#listaEst.splice(indiceEst, 1);
    }

    // Método para buscar estudiantes por nombre en la lista
    buscarEstudiantes(nombre) {
        // Filtra los estudiantes cuyo nombre contenga la búsqueda (ignora mayúsculas/minúsculas)
        const resultadosBusqueda = this.#listaEst.filter(est => est.nombre.toLowerCase().includes(nombre.toLowerCase()));
        
        // Si no se encuentran resultados, lanza un error
        if(resultadosBusqueda.length === 0){
            throw new Error("No hay resultados");
        }

        // Muestra los resultados encontrados en la consola
        resultadosBusqueda.forEach(est => console.log(est.toString())); 
    }

    // Método para obtener el promedio general de las calificaciones de todos los estudiantes
    promedioGeneral(){
        // Si no hay estudiantes en la lista, lanza un error
        if (this.#listaEst.length === 0) {
            throw new Error("No hay estudiantes registrados en la lista");
        }
    
        let sumaTotal = 0; // Variable para almacenar la suma total de las calificaciones
        let contadorNotas = 0; // Variable para contar cuántas calificaciones se suman
    
        // Recorre cada estudiante en la lista
        for (const estudiante of this.#listaEst) {
            // Filtra las asignaturas que tienen calificaciones válidas (números)
            const notas = estudiante.asignaturas.filter(asign => typeof asign[1] === "number");
            if (notas.length > 0) {
                // Suma las calificaciones de las asignaturas
                sumaTotal += notas.reduce((acc, asign) => acc + asign[1], 0);
                // Cuenta el número total de calificaciones
                contadorNotas += notas.length;
            }
        }
    
        // Si no se encontraron calificaciones, lanza un error
        if (contadorNotas === 0) {
            throw new Error("No hay calificaciones");
        }
    
        // Devuelve el promedio redondeado de las calificaciones
        return Math.round(sumaTotal / contadorNotas);
    }

    // Método para ver la lista completa de estudiantes
    verListaEst(){
        // Si la lista de estudiantes está vacía, lanza un error
        if(this.#listaEst.length === 0){
            throw new Error("No hay estudiantes registrados");
        }
        // Muestra la información de todos los estudiantes en la consola
        this.#listaEst.forEach(est => console.log(est.toString()));
    }
}

// Clase para representar la lista de asignaturas
class ListaAsignaturas{
    #listaAsign; // Atributo privado para almacenar la lista de asignaturas

    // Constructor para inicializar la lista de asignaturas
    constructor(){
        this.#listaAsign = []; // Inicializa el atributo #listaAsign como un array vacío
    }

    // Getter para obtener la lista de asignaturas
    get listaAsign(){
        return this.#listaAsign; // Devuelve el array de asignaturas
    }

    // Método para agregar una asignatura a la lista si aún no está en ella
    agregarAsignatura(asignatura) {
        // Verifica si la asignatura ya está en la lista comparando su nombre
        if (this.#listaAsign.some(asign => asign.nombreAsign === asignatura.nombreAsign)) {
            // Si la asignatura ya existe, lanza un error
            throw new Error("La asignatura ya está en la lista");
        } else {
            // Si no está en la lista, la agrega
            this.#listaAsign.push(asignatura);
        }
    }
    
    // Método para eliminar una asignatura de la lista por su nombre
    eliminarAsignatura(nombreAsign) {
        // Busca el índice de la asignatura en la lista usando su nombre
        const indiceAsign = this.#listaAsign.findIndex(asign => asign.nombreAsign === nombreAsign);
        
        // Si no encuentra la asignatura, lanza un error
        if(indiceAsign === -1){
            throw new Error("Dicha asignatura no se encuentra en la lista");
        }else{
            // Si la asignatura está en la lista, la elimina
            this.#listaAsign.splice(indiceAsign, 1);
        }
    }

    // Método para ver todas las asignaturas en la lista
    verListaAsign(){
        // Si no hay asignaturas registradas, lanza un error
        if(this.#listaAsign.length === 0){
            throw new Error("No hay asignaturas registradas");
        }
        // Muestra las asignaturas de la lista en la consola
        this.#listaAsign.forEach(asign => console.log(asign.toString()));
    }
}


// Main con la prueba de uso del código

// Creación de instancias de la lista de estudiantes y asignaturas
const listaEstudiantes = new ListaEstudiantes();
const listaAsignaturas = new ListaAsignaturas();
let opcion;

// Inicialización de 5 estudiantes de prueba
const estudiante1 = new Estudiante("Adrián Martín", 19, new Direccion("Calle Paraguay", 1, "Bajo", "18210", "Peligros", "Granada"));
const estudiante2 = new Estudiante("Sara Garzón", 19, new Direccion("Calle Alcalá la Real", 12, "3ºB", "18013", "Norte", "Granada"));
const estudiante3 = new Estudiante("Lorenzo Rodriguez", 21, new Direccion("Calle Francisco Ayala", 20, "2", "18014", "Granada", "Granada"));
const estudiante4 = new Estudiante("Alonso Hernández", 21, new Direccion("Calle Afán de Ribera", 15, "2ºA", "18005", "Granada", "Granada"));
const estudiante5 = new Estudiante("Alex Galán", 20, new Direccion("Calle Aliatar", 17, "Bajo", "18110", "Híjar", "Granada"));

// Agregar los estudiantes a la lista
try {
    listaEstudiantes.agregarEstudiante(estudiante1);
    listaEstudiantes.agregarEstudiante(estudiante2);
    listaEstudiantes.agregarEstudiante(estudiante3);
    listaEstudiantes.agregarEstudiante(estudiante4);
    listaEstudiantes.agregarEstudiante(estudiante5);
} catch (err) {
    console.log("Error al agregar un estudiante:", err.message);
}

// Inicialización de 5 asignaturas de prueba
const asignatura1 = new Asignatura("DWEC");
const asignatura2 = new Asignatura("DWES");
const asignatura3 = new Asignatura("Despliegue");
const asignatura4 = new Asignatura("DIW");
const asignatura5 = new Asignatura("Inglés");

// Agregar las asignaturas a la lista
try {
    listaAsignaturas.agregarAsignatura(asignatura1);
    listaAsignaturas.agregarAsignatura(asignatura2);
    listaAsignaturas.agregarAsignatura(asignatura3);
    listaAsignaturas.agregarAsignatura(asignatura4);
    listaAsignaturas.agregarAsignatura(asignatura5);
} catch (err) {
    console.log("Error al agregar una asignatura:", err.message);
}

// Matriculación de estudiantes en algunas asignaturas
try {
    // Estudiante 1
    listaEstudiantes.listaEst[0].matricular(listaAsignaturas.listaAsign[0]);
    listaEstudiantes.listaEst[0].matricular(listaAsignaturas.listaAsign[1]);
    listaEstudiantes.listaEst[0].matricular(listaAsignaturas.listaAsign[2]);
    listaEstudiantes.listaEst[0].matricular(listaAsignaturas.listaAsign[3]);
    listaEstudiantes.listaEst[0].matricular(listaAsignaturas.listaAsign[4]);

    // Estudiante 2
    listaEstudiantes.listaEst[1].matricular(listaAsignaturas.listaAsign[0]);
    listaEstudiantes.listaEst[1].matricular(listaAsignaturas.listaAsign[2]);
    listaEstudiantes.listaEst[1].matricular(listaAsignaturas.listaAsign[3]);
    listaEstudiantes.listaEst[1].matricular(listaAsignaturas.listaAsign[4]);

    // Estudiante 3
    listaEstudiantes.listaEst[2].matricular(listaAsignaturas.listaAsign[0]);
    listaEstudiantes.listaEst[2].matricular(listaAsignaturas.listaAsign[1]);
    listaEstudiantes.listaEst[2].matricular(listaAsignaturas.listaAsign[2]);

    // Estudiante 4
    listaEstudiantes.listaEst[3].matricular(listaAsignaturas.listaAsign[3]);
    listaEstudiantes.listaEst[3].matricular(listaAsignaturas.listaAsign[4]);
} catch (err) {
    console.log("Error al matricular:", err.message);
}

// Desmatriculación de estudiantes en algunas asignaturas
try {
    // Desmatriculación de asignaturas
    listaEstudiantes.listaEst[0].desmatricular(listaAsignaturas.listaAsign[3]);
    listaEstudiantes.listaEst[1].desmatricular(listaAsignaturas.listaAsign[2]);
    listaEstudiantes.listaEst[2].desmatricular(listaAsignaturas.listaAsign[0]);
    listaEstudiantes.listaEst[3].desmatricular(listaAsignaturas.listaAsign[4]);
} catch (err) {
    console.log("Error al desmatricular:", err.message);
}

// Calificación de estudiantes en algunas asignaturas
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

// Función para mostrar el menú principal
function fnMenu(){
    console.log("\n");
    console.log("Sistema de Gestión Académica de Estudiantes y Asignaturas por Adrián Martín Vázquez");
    console.log("1. Crear...");
    console.log("2. Eliminar...");
    console.log("3. Matricular estudiante");
    console.log("4. Desmatricular estudiante");
    console.log("5. Calificar estudiante");
    console.log("6. Buscar estudiante");
    console.log("7. Ver Registros");
    console.log("8. Promedios...");
    console.log("9. Ver Reporte");
    console.log("0. Salir del sistema");
}

// Funciones para crear estudiantes o asignaturas
function fnCrear(){
    console.clear();
    console.log("Sistema de Gestión Académica de Estudiantes y Asignaturas por Adrián Martín Vázquez");
    console.log("1. Crear estudiante");
    console.log("2. Crear asignatura");
    console.log("0. Volver al menú principal");
}

// Funciones para eliminar estudiantes o asignaturas
function fnEliminar(){
    console.clear();
    console.log("Sistema de Gestión Académica de Estudiantes y Asignaturas por Adrián Martín Vázquez");
    console.log("1. Eliminar estudiante");
    console.log("2. Eliminar asignatura");
    console.log("0. Volver al menú principal");
}

// Función para ver promedios
function fnPromedios(){
    console.clear();
    console.log("Sistema de Gestión Académica de Estudiantes y Asignaturas por Adrián Martín Vázquez");
    console.log("1. Promedio estudiantes");
    console.log("2. Promedio general estudiantes");
    console.log("0. Volver al menú principal");
}

// Bucle principal del programa para mostrar el menú y ejecutar las opciones
let salir = true;
while(salir){
    fnMenu();  // Mostrar el menú principal
    opcion = prompt("Selecciona una de estas opciones: ");

    switch(opcion){
        case '1': {
            console.clear();
            fnCrear();  // Mostrar opciones para crear estudiante o asignatura
            const optCrear = prompt("Selecciona una de estas opciones: ");
            switch(optCrear){
                case '1': {
                    console.clear();
                    // Proceso para crear un nuevo estudiante
                    console.log("Creando nuevo estudiante...");
                    const nombreEst = prompt("Introduce el nombre del estudiante: ");
                    console.log(`Nombre: ${nombreEst}`);
                    const edad = prompt("Introduce la edad del estudiante: ");
                    console.log(`Edad: ${edad}`);
                    console.log("\nCreando dirección del estudiante nuevo...");
                    const calle = prompt("Introduce la calle: ");
                    console.log(`Calle: ${calle}`);
                    const numero = prompt("Introduce el número: ");
                    console.log(`Número: ${numero}`);
                    const piso = prompt("Introduce el piso: ");
                    console.log(`Piso: ${piso}`);
                    const codigoPostal = prompt("Introduce el código postal: ");
                    console.log(`Código postal: ${codigoPostal}`);
                    const provincia = prompt("Introduce la provincia: ");
                    console.log(`Provincia: ${provincia}`);
                    const localidad = prompt("Introduce la localidad: ");
                    console.log(`Localidad: ${localidad}`);

                    // Crear la dirección y el estudiante
                    const direccion = new Direccion(calle, numero, piso, codigoPostal, provincia, localidad);
                    const estudiante = new Estudiante(nombreEst, edad, direccion);
                    
                    try{
                        console.log("Creación del estudiante completado sin errores");
                        console.log(estudiante.toString());
                        listaEstudiantes.agregarEstudiante(estudiante);  // Agregar el estudiante a la lista
                    }catch(err){
                        console.log("Error durante la creación del estudiante");
                        console.log(estudiante.toString());
                    }
                    break;
                }

                case '2': {
                    console.clear();
                    // Proceso para crear una nueva asignatura
                    console.log("Creando nueva asignatura...");
                    const nombreAsignatura = prompt("Introduce el nombre de la asignatura: ");
                    console.log(`Nombre asignatura: ${nombreAsignatura}`);

                    if(nombreAsignatura.trim() === ""){
                        throw new Error("Tiene que escribir un nombre válido");
                    }

                    const asignatura = new Asignatura(nombreAsignatura);
                    try{
                        console.log("Creación de la asignatura completado sin errores");
                        console.log(`Nombre asignatura: ${nombreAsignatura}`);
                        listaAsignaturas.agregarAsignatura(asignatura);  // Agregar la asignatura a la lista
                    }catch(err){
                        console.log("Error durante la creación de la asignatura");
                        console.log(`Nombre asignatura: ${nombreAsignatura}`);
                    }
                    break;
                }

                case '0': {
                    console.log("Saliendo al menú...");
                    salir = false;
                    break;
                }

                default: {
                    console.log("Prueba de nuevo");
                } 
            }
            break;
        }

        case '2': {
            console.clear();
            fnEliminar();  // Mostrar opciones para eliminar estudiante o asignatura
            const optEliminar = prompt("Selecciona una de estas opciones: ");
            
            switch(optEliminar){
                case '1': {
                    console.clear();
                    // Eliminar un estudiante de la lista
                    console.log("Lista de estudiantes: ");
                    listaEstudiantes.verListaEst();

                    const idSupr = prompt("Elige un estudiante (por ID): ");

                    try {
                        listaEstudiantes.eliminarEstudiante(idSupr);  // Eliminar estudiante por ID
                        console.log("Estudiante eliminado sin errores");
                        console.log("Lista de estudiantes actualizada: ");
                        listaEstudiantes.verListaEst();
                    } catch (err) {
                        console.log("Error durante el proceso de eliminación del estudiante:", err.message);
                    }
                    break;
                }

                case '2': {
                    console.clear();
                    // Eliminar una asignatura de la lista
                    console.log("Lista de asignaturas: ");
                    listaAsignaturas.verListaAsign();

                    const nombreSupr = prompt("Elige una asignatura a eliminar (por Nombre): ");

                    try{
                        listaAsignaturas.eliminarAsignatura(nombreSupr);  // Eliminar asignatura por nombre
                        console.log("Asignatura eliminada sin errores");
                        console.log("Lista de asignaturas actualizada: ");
                        listaAsignaturas.verListaAsign();
                    } catch(err) {
                        console.log("Error durante el proceso de eliminación de la asignatura");
                    }
                    break;
                }

                case '0': {
                    console.log("Saliendo al menú...");
                    salir = false;
                    break;
                }

                default: {
                    console.log("Prueba de nuevo");
                }
            }
            break;
        }

        // Opción 3: Matricular un estudiante en una asignatura
        case '3': {
            console.clear();
            console.log("Lista de estudiantes: ");
            listaEstudiantes.verListaEst();  // Mostrar la lista de estudiantes
            const id = prompt("Elige un estudiante a matricular (por ID): ");

            const estudiante = listaEstudiantes.listaEst.find(est => est.id === id);  // Buscar el estudiante por ID
            if(!estudiante){
                throw new Error("No está el estudiante en la lista");
                break;
            }

            console.log("\nLista de asignaturas: ");
            listaAsignaturas.verListaAsign();  // Mostrar la lista de asignaturas
            const nombreAsign = prompt("Elige una asignatura para la matriculación (por Nombre): ");

            const asignatura = listaAsignaturas.listaAsign.find(asign => asign.nombreAsign === nombreAsign);  // Buscar la asignatura por nombre
            if(!asignatura){
                throw new Error("No está la asignatura en la lista");
                break;
            }

            try{
                estudiante.matricular(asignatura);  // Intentar matricular al estudiante en la asignatura seleccionada
                console.log("Estudiante matriculado sin errores");
            } catch (err) {
                console.log("Ocurrió un error durante el proceso de matriculación");
            }
            break;
        }

        // Opción 4: Desmatricular un estudiante de una asignatura
        case '4':{
            console.clear();
            console.log("Lista de estudiantes: ");
            listaEstudiantes.verListaEst();  // Mostrar la lista de estudiantes
            const id = prompt("Elige un estudiante para desmatricular (por ID): ");
            const estudiante =  listaEstudiantes.listaEst.find(est => est.id === id);  // Buscar el estudiante por ID

            if(!estudiante){
                throw new Error("No está el estudiante en la lista");
                break;
            }

            console.log(`Lista de asignaturas matriculadas del estudiante ${estudiante.nombre}`);
            // Mostrar las asignaturas en las que el estudiante está matriculado
            estudiante.asignaturas.forEach((asign, indice) => {
                console.log(`${indice + 1}. [${asign[0].nombreAsign} - ${asign[1]}]`);
            });

            const indiceAsignatura = prompt("Elige una asignatura a desmatricular (por índice): ");
            const asignatura = estudiante.asignaturas[indiceAsignatura - 1];  // Obtener la asignatura por índice

            if(!asignatura){
                throw new Error("No hay ninguna asignatura de este tipo matriculada a este estudiante");
                break;
            }

            try{
                estudiante.desmatricular(asignatura[0]);  // Intentar desmatricular al estudiante de la asignatura
                console.log("Estudiante desmatriculado sin errores");
            } catch(err) {
                console.log("Ha ocurrido un error durante el proceso de desmatriculación");
            }
            break;
        }

        // Opción 5: Calificar a un estudiante en una asignatura
        case '5': {
            console.clear();
            console.log("Lista de estudiantes: ");
            listaEstudiantes.verListaEst();  // Mostrar la lista de estudiantes
            const id = prompt("Elige un estudiante a calificar (por ID): ");
            
            const estudiante = listaEstudiantes.listaEst.find(est => est.id === id);  // Buscar el estudiante por ID
            if(!estudiante){
                throw new Error("El estudiante no se encuentra en la lista");
                break;
            }

            const nombreAsign = prompt ("Elige la asignatura del alumno para calificar (por nombre): ");
            const asignatura = listaAsignaturas.listaAsign.find(asign => asign.nombreAsign === nombreAsign);  // Buscar la asignatura por nombre
            
            if(!asignatura){
                throw new Error("La asignatura no se encuentra en la lista");
                break;
            }

            const nota = prompt("Escribe una nota para la calificación: ");
            const notaDecimal = parseFloat(nota);

            if(notaDecimal < 0 || notaDecimal > 10){
                throw new Error("La calificación tiene que estar entre 0 y 10");
                break;
            }

            try{
                estudiante.calificar(asignatura, notaDecimal);  // Intentar calificar al estudiante en la asignatura
                console.log("Estudiante calificado en la asignatura sin errores");
            } catch(err) {
                console.log("Ha ocurrido un error durante el proceso de calificación");
            }
            break;
        }

        // Opción 6: Buscar un estudiante por nombre
        case '6': {
            console.clear();
            const nombreEstBuscar = prompt("Dime el nombre de un estudiante a buscar: ");
            console.log(`Nombre a buscar: ${nombreEstBuscar}`);

            if (!nombreEstBuscar || nombreEstBuscar.trim() === "") {
                console.log("No se ingresó un nombre válido para buscar.");
                break;
            }

            const resultadoBusqueda = listaEstudiantes.buscarEstudiantes(nombreEstBuscar);  // Buscar estudiantes por nombre

            console.log("\nBuscando estudiantes...");
            if (!resultadoBusqueda || resultadoBusqueda.length === 0) {
                console.log("No se han encontrado estudiantes.");
                break;
            }

            if (resultadoBusqueda.length === 1) {
                console.log(`Hay ${resultadoBusqueda.length} estudiante con el nombre ${nombreEstBuscar}`);
            } else {
                console.log(`Hay ${resultadoBusqueda.length} estudiantes con el nombre ${nombreEstBuscar}`);
            }

            // Mostrar los estudiantes encontrados
            for (const estudiante of resultadoBusqueda) {
                console.log(estudiante.toString());
            }
            break;
        }

        // Opción 7: Ver los registros de un estudiante
        case '7': {
            console.clear();
            console.log("Lista de estudiantes: ");
            listaEstudiantes.verListaEst();  // Mostrar la lista de estudiantes
            const id = prompt("Elige un estudiante para ver sus registros (por ID): ");

            const estudiante = listaEstudiantes.listaEst.find(est => est.id === id);  // Buscar el estudiante por ID
            if(!estudiante){
                throw new Error("El estudiante descrito no está en la lista");
                break;
            }

            if(estudiante.registros.length === 0){
                console.log("No hay registros de este estudiante");
            }else{
                console.log("Registros del estudiante elegido");
                // Mostrar los registros del estudiante
                estudiante.registros.forEach(registro => console.log(registro));
            }
            break;
        }

        // Opción 8: Ver los promedios de los estudiantes
        case '8': {
            console.clear();
            fnPromedios();  // Mostrar las opciones de promedios
            const optPromedios = prompt("Selecciona una de estas opciones: ");

            switch(optPromedios){
                case '1': {
                    console.clear();
                    console.log("Lista de estudiantes: ");
                    listaEstudiantes.verListaEst();  // Mostrar la lista de estudiantes
                    const id = prompt("Elige un estudiante para hacerle el promedio (por ID): ");
                    const estudiante = listaEstudiantes.listaEst.find(est => est.id === id);  // Buscar el estudiante por ID
                    
                    if(!estudiante){
                        throw new Error("El estudiante no se encuentra en la lista");
                        break;
                    }

                    console.log(`Promedio (GPA) de ${estudiante.nombre}: ${estudiante.promedioEstudiantes()}`);  // Mostrar el promedio del estudiante
                    break;
                }

                case '2':{
                    console.clear();
                    try{
                        const gpaGeneral = listaEstudiantes.promedioGeneral();  // Calcular el promedio general de todos los estudiantes
                        console.log(`Promedio general de notas de todos los estudiantes: ${gpaGeneral}`);
                    } catch (err) {
                        console.log(err.message);
                    }
                    break;
                }

                case '0': {
                    console.log("Saliendo al menú...");
                    salir = false;
                    break;
                }

                default: {
                    console.log("Prueba de nuevo");
                }
            }
            break;
        }

        // Opción 9: Ver el reporte de un estudiante
        case '9': {
            console.clear();
            console.log("Listado de estudiantes: ");
            listaEstudiantes.verListaEst();  // Mostrar la lista de estudiantes

            const id = prompt("Elige un estudiante para ver su reporte (por ID): ");
            const estudiante = listaEstudiantes.listaEst.find(est => est.id === id);  // Buscar el estudiante por ID

            if(!estudiante){
                throw new Error("El estudiante no se encuentra en la lista");
                break;
            }

            estudiante.listaReportes();  // Mostrar el reporte del estudiante
            break;
        }

        // Opción 0: Salir del sistema
        case '0': {
            console.clear();
            console.log("Sayonara~");
            salir = false;  // Finaliza el bucle del programa
            break;
        }

        default: {
            console.log("Prueba otra vez");
        }
    }
}