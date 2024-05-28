//--VARIABLES--//

const botonComprobarMatricula = document.querySelector('#botonComprobar');
const inputComprobarMatricula = document.querySelector('#comprobarMatricula');
let fragment = document.createDocumentFragment();
let mensaje = document.querySelector("#mensaje");
let matriculasBuscadas = JSON.parse(localStorage.getItem('matriculasFiltradas')) || []
let botonLimpiar = document.querySelector('#botonLimpiar');
const regEx = /^\d{3}\-[A-Z]{1}$/;
mensaje.innerHTML = "<p>Ingresa una matricula para comprobar tus multas</p>"


const arrayCoches = [
    {
        matricula: "123-E",
        modelo: 'modelo1',
        propietario: 'Isa'
    },
    {
        matricula: "321-E",
        modelo: 'modelo2',
        propietario: 'Peter'
    },
    {
        matricula: "345-R",
        modelo: 'modelo3',
        propietario: 'Poshito'
    },
    {
        matricula: "376-N",
        modelo: 'modelo4',
        propietario: 'La Choni'
    },
    {
        matricula: "987-D",
        modelo: 'modelo5',
        propietario: 'Naty Peluso'
    }
]
const arrayMultas = [
    {
        matricula: "123-E",
        multa: ['multa1', 'multa2'],
    },
    {
        matricula: "321-E",
        multa: ['multa1'],
    },
    {
        matricula: "345-R",
        multa: [],
    },
    {
        matricula: "376-N",
        multa: ['multa1', 'multa2', 'multa3', 'multa4', 'multa5'],
    },
    {
        matricula: "987-D",
        multa: ['multa1'],
    }
]


//--EVENTOS--//
botonComprobarMatricula.addEventListener("click", (evento) => {
    evento.preventDefault();
    const matricula = inputComprobarMatricula.value;
    mostrarMultas(matricula)
})

botonLimpiar.addEventListener("click", (evento) => {
    evento.preventDefault();
    localStorage.clear();
    pintarTabla();
})

//--FUNCIONES--//
const validarMatricula = async (matriculaSolicitada) => {
    const matriculaValidada = regEx.test(matriculaSolicitada)
    if (matriculaValidada) return (matriculaSolicitada)
    else throw (`${matriculaSolicitada} no es una matricula válida`)
}

const buscarMatricula = async (matriculaSolicitada) => {
    const matriculaBuscada = arrayCoches.find(item => item.matricula == matriculaSolicitada)?.matricula
    if (matriculaBuscada) return (matriculaBuscada)
    else throw (`la matricula ${matriculaSolicitada} no existe`)
}
const buscarMultas = async (matriculaSolicitada) => {
    const multa = arrayMultas.find(item => item.matricula == matriculaSolicitada)?.multa;
    if (multa != 0) return (matriculaSolicitada)
    else throw (`La matricula ${matriculaSolicitada} no tiene multas asociadas`)
}

const mostrarMultas = async (matriculaSolicitada) => {
    try {
        let validada = await validarMatricula(matriculaSolicitada);
        let buscada = await buscarMatricula(matriculaSolicitada);
        let multada = await buscarMultas(matriculaSolicitada);

        return insertarDatos(matriculaSolicitada)
        
    } catch (error) {
        return mensaje.innerHTML = error
    }
}

const insertarDatos = (matriculaSolicitada)=>{
    const coche = arrayCoches.find(item => item.matricula == matriculaSolicitada)
    const multa = arrayMultas.find(item => item.matricula == matriculaSolicitada)?.multa
    console.log(multa)
    matriculasBuscadas.push({ ...coche, multas: multa })
    console.log(matriculasBuscadas)
    localStorage.setItem('matriculasFiltradas', JSON.stringify(matriculasBuscadas))
    pintarTabla()

}

const pintarTabla = () => {
    cuerpoTabla.innerHTML='';
    matriculasBuscadas = JSON.parse(localStorage.getItem('matriculasFiltradas')) || []
    matriculasBuscadas.forEach(({ matricula, modelo, propietario, multas }) => {
        tablaFila = document.createElement('tr');
        let tablaColumna1 = document.createElement('td');
        tablaColumna1.textContent = matricula;
        let tablaColumna2 = document.createElement('td');
        tablaColumna2.textContent = modelo
        let tablaColumna3 = document.createElement('td');
        tablaColumna3.textContent = propietario
        let tablaColumna4 = document.createElement('td');
        tablaColumna4.textContent = multas.join(", ")

        tablaFila.append(tablaColumna1, tablaColumna2, tablaColumna3, tablaColumna4);
        fragment.append(tablaFila);
    })
    cuerpoTabla.append(fragment)
    inputComprobarMatricula.reset
}


pintarTabla();