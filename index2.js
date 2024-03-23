const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');
const btnEditar = formulario.querySelector('#btn');
const notificacion = document.querySelector('#notificacion')

let citasObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas:''
}

document.addEventListener('DOMContentLoaded', () =>{
    mascotaInput.addEventListener('input', datosCitas);
    propietarioInput.addEventListener('input', datosCitas);
    telefonoInput.addEventListener('input', datosCitas);
    fechaInput.addEventListener('input', datosCitas);
    horaInput.addEventListener('input', datosCitas);
    sintomasInput.addEventListener('input', datosCitas);
    formulario.addEventListener('submit', (e) =>{
        if(btnEditar.getAttribute('isEditing')){
            e.preventDefault()
            editarCita(e)
        }else{
            nuevaCita(e)
        }
        
    });
})

function datosCitas(e){
    citasObj[e.target.name] = e.target.value
}

class citas {
    constructor(){
        this.citas = []
    }
    agregarCita(cita){
        this.citas = [...this.citas, cita]
    }
    eliminarCita(id){
        this.citas = this.citas.filter(i => i.id !== id)
    }

    editarCita(citaEditada){
        this.citas = this.citas.map(cita => cita.id === citaEditada.id  ? citaEditada : cita )
    }
}

class ui {
    imprimirAlerta(mensaje){
        const alerta = document.createElement('div')
        alerta.innerHTML = `<p> ${mensaje} </p>`
        alerta.classList.add('alerta')
        notificacion.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3000);


    }

    imprimirAgregar(mensaje){
        const agregar = document.createElement('div')
        agregar.innerHTML = `<p> ${mensaje} </p>`
        agregar.classList.add('agregar')
        notificacion.appendChild(agregar);




    setTimeout(() => {
        agregar.remove();
    }, 3000);

    }




    imprimirCitas({citas}){
        this.limpiarHTML();

        citas.forEach(cita => {

                  
        const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita
        const divCita = document.createElement('div')
        divCita.classList.add['cita', 'p-3']
        divCita.dataset.id = id

        const mascotaParrafo = document.createElement('h2')
        mascotaParrafo.classList.add('card-title', 'font-weight-bolder')
        mascotaParrafo.textContent = mascota
        divCita.appendChild(mascotaParrafo)
        const propietarioParrafo = document.createElement('p')
        propietarioParrafo.innerHTML= `
        <span class='font-weight-bolder'>propietario: ${propietario}</span>
        `
        divCita.appendChild(propietarioParrafo)

        const telefonoParrafo = document.createElement('p')
        telefonoParrafo.innerHTML = `<span class=''> telefono: ${telefono}</span>`

        divCita.appendChild(telefonoParrafo)

       const fechaParrafo = document.createElement('p')
       fechaParrafo.innerHTML = `<span> fecha: ${fecha} </span>`
       divCita.appendChild(fechaParrafo)

       const horaParrafo = document.createElement('p')
       horaParrafo.innerHTML = `<span> hora: ${hora} </span>`
       divCita.appendChild(horaParrafo)

       const sintomasParrafo = document.createElement('p')
       sintomasParrafo.innerHTML = `<span> sintomas: ${sintomas} </span>`
       divCita.appendChild(sintomasParrafo)

       const Btneliminar = document.createElement('button')
       Btneliminar.classList.add('btn', 'btn-danger')
       Btneliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
       Btneliminar.onclick = () =>{
        administrarCitas.eliminarCita(id)
        this.imprimirCitas({citas: administrarCitas.citas })
    }
       divCita.appendChild(Btneliminar)

       const Btneditar = document.createElement('button')
       Btneditar.classList.add('btn','btn-info')
       Btneditar.innerHTML = `Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>`
       divCita.appendChild(Btneditar)
       Btneditar.onclick = (e) =>{
        btnEditar.innerHTML = 'Editar Cita'
        btnEditar.setAttribute('isEditing', true)
        cambiarBoton(e)
       }
       contenedorCitas.appendChild(divCita)


       });  
       
      
    }

    limpiarHTML(){
        contenedorCitas.innerHTML = ''
    }



}

const administrarCitas = new citas()
const administrarUI = new ui()

function nuevaCita(e){
    e.preventDefault()
    
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citasObj
    if(mascota === ''|| propietario === '' || telefono === '' || fecha === '' || sintomas === '' || hora === ''){
        return administrarUI.imprimirAlerta('Todos los campos son obligatorios')
    }
   
    citasObj.id = Date.now();
    administrarCitas.agregarCita({...citasObj})
    administrarUI.imprimirCitas({citas: administrarCitas.citas});
    return administrarUI.imprimirAgregar('Cita agregada exitosamente')
}

function cambiarBoton(e){
    const id = e.target.closest('.btn').parentElement.getAttribute( 'data-id' )
    const citaAEditar = administrarCitas.citas.find(cita => cita.id === Number(id))
    const {mascota, propietario, telefono, fecha, hora, sintomas } = citaAEditar
    mascotaInput.value = mascota
    propietarioInput.value = propietario
    telefonoInput.value = telefono
    fechaInput.value = fecha
    horaInput.value = hora
    sintomasInput.value = sintomas

    citasObj = { ...citaAEditar }
}

function editarCita(){
    administrarCitas.editarCita(citasObj)

    formulario.reset()
    reiniciarcitas()
    btnEditar.removeAttribute('isEditing')
    btnEditar.innerHTML = "Crear Cita"

    const editar = document.createElement('div')
    editar.innerHTML = `<p> Cita editada exitosamente </p>`
    editar.classList.add('editar')
    notificacion.appendChild(editar);

setTimeout(() => {
    editar.remove();
}, 3000);

}

function reiniciarcitas(){
    citasObj = {
        mascota: '',
        propietario: '',
        telefono: '',
        fecha: '',
        hora: '',
        sintomas:''
    }
}