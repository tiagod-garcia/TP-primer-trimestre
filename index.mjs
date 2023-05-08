// Importamos las librerías
import express from 'express';
import fs from "fs";

// Crea el objeto "database" con 2 métodos y 1 propiedad
const database = {
	file: './data.json', // Especificamos donde se guardan los archivos
	load() {
		return JSON.parse(fs.readFileSync(this.file)); // Cargamos los datos del archivo JSON
	},
	save(data) {
		fs.writeFileSync(this.file, JSON.stringify(data)); // Guardamos los datos editando los actuales
	}
}

const app = express(); 
app.use(express.json());

app.get("/users", (req, res) => { // Muestra todos los elementos de la base de datos
	const users = database.load(); // Cargamos los datos de la base de datos
	res.setHeader('Content-Type', 'application/json');
	res.json({
        users // Retornamos todos los usuarios
    });
})

app.get("/users/:id", (req, res) => { // Muestra la información del usuario si la id coincide con alguno
	const id = req.params.id; // Extraemos el parámetro id y lo igualamos a una constante para que sea más fácil de usar
    const users = database.load(); // Cargamos los datos de la base de datos
    const user = users.find(u => u.id == id); // Buscamos dentro de la base de datos el usuario con la id dada
    console.log(user);

	if (user) {
		res.json({
			user // Retornamos el usuario encontrado
		});
	} else {
		res.status(404).json({
			msg: "No existe el usuario" // Retorna error si el usuario no existe
		})
	}
})

app.post("/create", (req,res) => { // Agrega un nuevo usuario a la base de datos
	const user = req.body; // Extraemos los datos recibidos y los igualamos a la constante "user"
	const users = database.load(); // Cargamos los datos de la base de datos
	user.id = users.length; // Igualamos la id del usuario a la cantidad que existe en la base de datos
	users.push(user); // Agregamos el nuevo usuario al final de la base de datos
	database.save(users); // Guardamos los datos actualizados en la base de datos
	res.json ({
		msg: `${user}` // Retornamos el mensaje de éxito
	})
})

app.put("/update", (req, res) => { // Actualiza la información de un usuario en la base de datos
	const userUp = req.body; // Extraemos los datos recibidos y los igualamos a la constante "userUp" (usuario a actualizar)
	const users = database.load(); // Cargamos los datos de la base de datos
	const user = users.find(u => u.id == userUp.id); // Buscamos dentro de la base de datos el usuario con la id dada
	if (user) { // Si encontramos al usuario, actualizamos sus datos
	    user.nombre = userUp.nombre;
		user.apellido = userUp.apellido;
		user.edad = userUp.edad;
		database.save(users); // Guardamos los datos actualizados en la base de datos
		console.log("Usuario actualizado", user);
	} else {
		res.status(404).json({msg: "Usuario no encontrado"}); // Si el usuario no existe, retornamos un mensaje de error
	}
})

app.listen(3000, () => { // Asignamos el puerto donde se ejecuta la aplicación
	console.log("Mi backend se está escuchando en el puerto 3000");
})