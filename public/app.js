var formulario = document.getElementById('contact');

function declararVariables(){
  let datos = new FormData(formulario);

  let nombrepaciente = datos.get('nombre');
  let cedulapaciente = datos.get('cedula');
  let edadpaciente = datos.get('edad');

  const variables = {nombrepaciente: nombrepaciente, cedulapaciente: cedulapaciente, edadpaciente: edadpaciente};

  return variables;
}

let getButton = document.getElementById('get');
let putButton = document.getElementById('put');
let deleteButton = document.getElementById('delete');

getButton.addEventListener('click', function (e) {
  e.preventDefault();
  const cedulapaciente = declararVariables().cedulapaciente;
  console.log('me diste un GET');

  let myHeaders = new Headers();

  const options = {
    method: 'GET',
    headers: myHeaders,
  }

  fetch('/pacientes', options)
    .then((res) => res.json())
    .then((data) => {
      console.log('mostrando datos', data);
      var isFound = false;
      for(var i=0; i<data.length; i++){
        if(data[i].cedula === cedulapaciente){
          document.getElementById('nombre').value=data[i].nombre;
          document.getElementById('cedula').value=data[i].cedula;
          document.getElementById('edad').value=data[i].edad;
          isFound=true;
          i=data.length;
        }
      }
      if(isFound == false)
        alert('El paciente no se encuentra registrado')
    });
});

formulario.addEventListener('submit', function (e) {
  e.preventDefault();
  const nombrepaciente = declararVariables().nombrepaciente;
  const cedulapaciente = declararVariables().cedulapaciente;
  const edadpaciente = declararVariables().edadpaciente;
  console.log('me diste un POST');

  let myHeaders = new Headers();

  const options = {
    method: 'POST',
    headers: myHeaders,
    body: new URLSearchParams({
      'nombre': nombrepaciente,
      'cedula': cedulapaciente,
      'edad': parseInt(edadpaciente)
    }),
  }

  fetch('/pacientes', options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});

putButton.addEventListener('click', function (e) {
  e.preventDefault();
  const nombrepaciente = declararVariables().nombrepaciente;
  const cedulapaciente = declararVariables().cedulapaciente;
  console.log('me diste un PUT');

  let myHeaders = new Headers();

  const options = {
    method: 'PUT',
    headers: myHeaders,
    body: new URLSearchParams({
      'nombre': nombrepaciente,
      'cedula': cedulapaciente
    }),
  }

  fetch('/pacientes', options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});

deleteButton.addEventListener('click', function (e) {
  e.preventDefault();
  const cedulapaciente = declararVariables().cedulapaciente;
  console.log('me diste un DELETE');

  let myHeaders = new Headers();

  const options = {
    method: 'DELETE',
    headers: myHeaders,
    body: new URLSearchParams({
      'cedula': cedulapaciente
    }),
  }

  fetch('/pacientes', options)
    .then((res) => res.json())
    .then((data) => {
      
    });
});