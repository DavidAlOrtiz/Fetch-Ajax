const datos = document.querySelector("#formulario");
const name = document.querySelector("#nombre");
const job = document.querySelector("#trabajo");

var persona = {
  name: "",
  job: "",
  id: "" 
};

datos.addEventListener("submit", (e) => {
  e.preventDefault();
  persona.name = name.value;
  persona.job = job.value;
  guardar(persona);
});

document.addEventListener("DOMContentLoaded", async () => {
  const result = await fetch("https://reqres.in/api/users");
  const resultado = await result.json();
  const datos = document.querySelector("#datos");
  const tr = document.querySelector("#idFinal");

  resultado.data.forEach((p) => {
    tr.innerHTML += `<tr>
        <td>${p.first_name}</td>
        <td>${p.last_name}</td>
        <td> <button onClick="eliminar(${p.id})">Eliminar</button> <td>
        <td> <button onClick="editar(${p.id})">editar</button> <td>
        <tr>`;
  });
});

// Ejemplo con fetch get

// consultar = () =>{
//     fetch("https://pokeapi.co/api/v2/egg-group/1")
//     .then(response => response.json())
//     .then(response => console.log(response))
// }

const editar = (id) => {
  const datos = fetch(`https://reqres.in/api/users/${id}`)
    .then((response) => response.json())
    .then((response) => {
      name.value = response.data.first_name;
      job.value = response.data.last_name;
      persona.id = response.data.id;
    });
  console.log(persona);
};

const consultar = () => {
  fetch("https://pokeapi.co/api/v2/egg-group/1")
    .then((response) => response.json())
    .then((response) => response);
};

// consultar2 = () =>{
//     fetch("https://pokeapi.co/api/v2/egg-group/1")
//     .then(response => response.json())
//     .then(console.log)
//     .catch(console.error)
// }
// const consultar3 = async () =>{
//     const datos = await fetch("https://pokeapi.co/api/v2/egg-group/1")
//     const result = await datos.json();
//     console.log(result)
// }

// Ejemplo post
guardar = (persona) => {
  if (persona.id == "") {
    fetch("https://reqres.in/api/users", {
      method: "Post",
      body: JSON.stringify(persona),
      headers: { "Content-Type": "application/json" },
    })
      .then(console.log)
      .catch(console.error);
    alert("Nuevo");
    return;
  }

  actualizar(persona, persona.id);
};

// actualizar = (persona) =>{
//     fetch('https://reqres.in/api/users/2',{
//         method :'Put',
//         body: JSON.stringify(persona),
//         headers: {'Content-Type': 'application/json'}
//     }).then(console.log)
//     .catch(console.error)
// }

actualizar = (persona, id) => {
  fetch(`https://reqres.in/api/users/${id}`, {
    method: "Put",
    body: JSON.stringify(persona),
    headers: { "Content-Type": "application/json" },
  })
    .then(console.log)
    .catch(console.error);
  persona.id = "";
  alert("actualizado");
};

eliminar = (id) => {
  fetch(`https://reqres.in/api/users/${id}`, {
    method: "Delete",
    headers: { "Content-Type": "application/json" },
  })
    .then(console.log)
    .catch(console.error);
};
