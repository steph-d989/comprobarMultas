//--VARIABLES--//

const botonComprobarMatricula = document.querySelector('#botonComprobar');
const formulario = document.querySelector('#validacion');
const inputComprobarMatricula = document.querySelector('#comprobarMatricula');
const regEx = /^\d{3}\-[A-Z]{1}$/;

const arrayCoches = [
    {
        matricula: 123 - E,
        modelo: 'modelo1',
        propietario: 'Isa'
    },
    {
        matricula: 321 - E,
        modelo: 'modelo2',
        propietario: 'Peter'
    },
    {
        matricula: 345 - R,
        modelo: 'modelo3',
        propietario: 'Poshito'
    },
    {
        matricula: 376 - N,
        modelo: 'modelo4',
        propietario: 'La Choni'
    },
    {
        matricula: 987 - D,
        modelo: 'modelo5',
        propietario: 'Naty Peluso'
    }
]
const arrayMultas = [
    {
        matricula: 123 - E,
        multa: ['multa1', 'multa2'],
    },
    {
        matricula: 321 - E,
        multa: ['multa1'],
    },
    {
        matricula: 345 - R,
        multa: [],
    },
    {
        matricula: 376 - N,
        multa: ['multa1', 'multa2', 'multa3', 'multa4', 'multa5'],
    },
    {
        matricula: 987 - D,
        multa: ['multa1'],
    }
]


//--EVENTOS--//


//--FUNCIONES--//
const validarInput = ()=>{
    let matricula = inputComprobarMatricula.value;
    console.log(matricula);
}
validarInput();