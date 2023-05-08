// Importamos la biblioteca Axios para poder realizar solicitudes HTTP desde JavaScript
import axios from "axios"

// Realizamos una solicitud POST a la URL 'http://localhost:3000/create', enviando datos de nombre, apellido y edad
axios.post('http://localhost:3000/create',{
	nombre:'inputName',
	apellido:'inputSurname',
	edad:0
}).then((res) => { // Si la solicitud tiene éxito, se imprime la respuesta de datos en la consola
	console.log('respuesta: ', res.data)
}).catch((error) => { // Si la solicitud falla, se imprime el error en la consola
	console.error(error)
});

// Realizamos una solicitud GET a la URL 'http://localhost:3000/users' para obtener datos de usuarios
axios.get('http://localhost:3000/users')
.then(res => { // Si la solicitud tiene éxito, se imprime la respuesta de datos en la consola
	console.log('respuesta: ',res.data)})
.catch(error => { // Si la solicitud falla, se imprime el error en la consola
	console.error(error)
});

// Realizamos una solicitud GET a la URL 'http://localhost:3000/users/4', donde 4 es la ID del usuario que deseamos obtener
axios.get('http://localhost:3000/users/4')
.then((respuesta) =>{ // Si la solicitud tiene éxito, se imprime la respuesta de datos en la consola
	console.log('respuesta: ', respuesta.data);
}).catch((error) =>{ // Si la solicitud falla, se imprime el error en la consola
	console.error(error);
})

// Realizamos una solicitud PUT a la URL 'http://localhost:3000/update', enviando datos para actualizar un usuario existente
axios.put('http://localhost:3000/update',{
	id:3, // Especificamos la ID del usuario que deseamos actualizar
	nombre:'newNuevo', // Especificamos el nuevo nombre
	apellido:'newSurname', // Especificamos el nuevo apellido
	edad:0
}).then((respuesta) =>{ // Si la solicitud tiene éxito, se imprime la respuesta de datos en la consola
	console.log('respuesta: ', respuesta.data);
}).catch((error) =>{ // Si la solicitud falla, se imprime el error en la consola
	console.error(error);
})

/* Para manejar correctamente las respuestas de las solicitudes HTTP, utilizamos los métodos then() y catch().
Los métodos then() se ejecutan cuando la solicitud tiene éxito y nos dan acceso a la respuesta de datos.
Los métodos catch() se ejecutan cuando la solicitud falla y nos permiten manejar el error. */