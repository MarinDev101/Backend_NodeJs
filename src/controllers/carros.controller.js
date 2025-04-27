const db = require("../config/db");
const tabla = 'carros';
const idCampo = 'id_carro';

class CarrosController {
  async obtenerTodos() {
    try {
      const [resultados] = await db.query(`SELECT * FROM ${tabla}`);
      return resultados;
    } catch (error) {
      throw error;
    }
  }

  async obtenerUno(id) {
    try {
      const [resultado] = await db.query(`SELECT * FROM ?? WHERE ?? = ?`, [tabla, idCampo, id]);
      return resultado[0];
    } catch (error) {
      throw error;
    }
  }

  async crear(data) {
    try {
      const [resultado] = await db.query(`INSERT INTO ?? SET ?`, [tabla, data]);
      return { ...data, id: resultado.insertId };
    } catch (error) {
      throw error;
    }
  }

  async actualizar(id, data) {
    try {
      const [resultado] = await db.query(`UPDATE ?? SET ? WHERE ?? = ?`, [tabla, data, idCampo, id]);
      if (resultado.affectedRows === 0) {
        throw new Error('Registro no encontrado.');
      }
      return { id, ...data };
    } catch (error) {
      throw error;
    }
  }

  async eliminar(id) {
    try {
      const [resultado] = await db.query(`DELETE FROM ?? WHERE ?? = ?`, [tabla, idCampo, id]);
      if (resultado.affectedRows === 0) {
        throw new Error('Registro no encontrado.');
      }
      return { mensaje: 'Registro eliminado correctamente.' };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CarrosController();