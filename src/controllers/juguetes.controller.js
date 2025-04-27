const db = require("../config/db");

const tabla = 'juguetes';
const idCampo = 'id_juguete';

class JuguetesController {
  // Obtener todos los juguetes
  async obtenerTodos(req, res) {
    try {
      const [resultados] = await db.query(`SELECT * FROM ${tabla}`);
      res.json(resultados); // Devuelve los resultados como respuesta
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener un juguete por ID
  async obtenerUno(req, res) {
    try {
      const { id } = req.params;
      const [resultado] = await db.query(`SELECT * FROM ?? WHERE ?? = ?`, [tabla, idCampo, id]);
      res.json(resultado[0]); // Devuelve el juguete encontrado
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

/*
Mayor legibilidad: Al extraer las propiedades de req.body de manera explícita, el código se vuelve más legible y claro, ya que es evidente qué datos se esperan en el cuerpo de la solicitud.
Facilidad de mantenimiento: Si alguna vez necesitas cambiar o agregar nuevas propiedades al cuerpo de la solicitud, será mucho más fácil hacerlo de manera controlada si todo está explícitamente nombrado.
*/

  // Crear un nuevo juguete
  async crear(req, res) {
    try {
      const { nombre, descripcion, precio, stock, marca, edad_recomendada, categoria } = req.body;
      
      // Realizar la consulta SQL con los valores proporcionados en el cuerpo de la solicitud
      const [resultado] = await db.query(
        `INSERT INTO ?? (nombre, descripcion, precio, stock, marca, edad_recomendada, categoria) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [tabla, nombre, descripcion, precio, stock, marca, edad_recomendada, categoria]
      );
  
      res.status(201).json({ id: resultado.insertId, ...req.body }); // Responde con el nuevo juguete creado
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Actualizar un juguete por ID
  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion, precio, stock, marca, edad_recomendada, categoria } = req.body;
      
      // Actualizar el juguete en la base de datos
      const [resultado] = await db.query(
        `UPDATE ?? SET nombre = ?, descripcion = ?, precio = ?, stock = ?, marca = ?, edad_recomendada = ?, categoria = ? WHERE ?? = ?`,
        [tabla, nombre, descripcion, precio, stock, marca, edad_recomendada, categoria, idCampo, id]
      );
  
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ error: 'Registro no encontrado.' });
      }
  
      res.json({ id, ...req.body }); // Responde con el juguete actualizado
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Eliminar un juguete por ID
  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const [resultado] = await db.query(`DELETE FROM ?? WHERE ?? = ?`, [tabla, idCampo, id]);
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ error: 'Registro no encontrado.' });
      }
      res.json({ mensaje: 'Registro eliminado correctamente.' }); // Responde con mensaje de éxito
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

// Exporta una instancia de la clase
module.exports = new JuguetesController();