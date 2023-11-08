const express = require('express');
const routes = express.Router()
const mysqlConnection = require('../dataday');


routes.get('/api/contenido', (req, res) => { 
    mysqlConnection.query('SELECT * FROM contenido', (err, rows, fields)=>{
        if(!err){
            res.status(200).json(rows);
        }else {
            res.status(500).json({ error: 'Error al buscar' });
        }
    })
})

routes.get('/api/contenido/:idContenido', (req, res) => {
    const { idContenido } = req.params;
    mysqlConnection.query('SELECT * FROM contenido WHERE idContenido = ' + idContenido, (err, rows, fields) => {
      if (!err) {
        if (rows.length > 0) {
          res.status(200).json(rows[0]);
        } else {
          res.status(404).json({ error: 'No se encontró un registro con el ID proporcionado',idContenido});
        }
      } else {
        res.status(500).json({ error: 'Error al buscar' });
      }
    });
  });

routes.post('/api/contenido/guardar',(req , res)=>{
    const {idContenido,autor,formato,titulo,archivo,idUser} = req.body;
    const query = 'INSERT INTO `contenido` (`idContenido`, `autor`, `formato`, `titulo`, `archivo`, `idUser`) VALUES (?,?,?,?,?,?)';
    const values = [idContenido,autor,formato,titulo,archivo,idUser];
    mysqlConnection.query(query, values, (err,rows, fields)=>{
        if (!err) {
            res.status(200).json({'Estado': 'guardado correctamente'});
          } else {
            res.status(500).json({ 'error': 'Error al guardar' });
          }
    })
})

routes.put('/api/contenido/editar', (req, res) => {
    const {idContenido,autor,formato,titulo,archivo,idUser} = req.body;
    mysqlConnection.query('SELECT * FROM contenido WHERE idContenido = ?', [idContenido], (erorr, Rows) => {
      if (erorr) {
        res.status(500).json({ error: 'Error al verificar el ID' , idContenido});
      } else if (Rows.length === 0) {
        res.status(404).json({ error: 'No se encontró un registro con el ID proporcionado' , idContenido});
      } else {
        const query = 'UPDATE contenido SET autor = ?, formato = ?, titulo = ?,archivo = ?, idUser = ? WHERE idContenido = ?';
        const values = [autor,formato,titulo,archivo,idUser,idContenido];
        mysqlConnection.query(query, values, (updateErr, updateRow) => {
          if (!updateErr) {
            res.status(200).json({ Estado: 'editado correctamente' });
          } else {
            res.status(500).json({ error: 'Error al editar' });
          }
        });
      }
    });
  });
  routes.delete('/api/contenido/eliminar', (req, res) => {
    const { idContenido } = req.body;
    const query = 'SELECT * FROM contenido WHERE idContenido = ?';
  
    mysqlConnection.query(query, [idContenido], (err, rows, fields) => {
      if (err) {
        res.status(500).json({ error: 'Error al verificar el ID en la base de datos' });
      } else {
        if (rows.length === 0) {
          res.status(404).json({ error: 'ID no encontrado', descripcion: 'El ID proporcionado no existe en la base de datos', idContenido });
        } else {
          const deleteQuery = 'DELETE FROM contenido WHERE idContenido = ?';
          mysqlConnection.query(deleteQuery, [idContenido], (deleteErr, deleteResult) => {
            if (!deleteErr) {
              res.status(200).json({ Estado: 'Eliminado correctamente' });
            } else {
              res.status(500).json({ error: 'Error al eliminar' });
            }
          });
        }
      }
    });
  });
  
  routes.delete('/api/contenido/eliminar/:idContenido', (req, res) => {
    const idContenido = req.params.idContenido;
    const query = 'SELECT * FROM contenido WHERE idContenido = ?';
  
    mysqlConnection.query(query, [idContenido], (err, rows, fields) => {
      if (err) {
        res.status(500).json({ error: 'Error al verificar el ID en la base de datos' });
      } else {
        if (rows.length === 0) {
          res.status(404).json({ error: 'ID no encontrado', descripcion: 'El ID proporcionado no existe en la base de datos', idContenido });
        } else {
          const deleteQuery = 'DELETE FROM contenido WHERE idContenido = ?';
          mysqlConnection.query(deleteQuery, [idContenido], (deleteErr, deleteResult) => {
            if (!deleteErr) {
              res.status(200).json({ Estado: 'Eliminado correctamente' });
            } else {
              res.status(500).json({ error: 'Error al eliminar' });
            }
          });
        }
      }
    });
  });
  
 module.exports = routes;
