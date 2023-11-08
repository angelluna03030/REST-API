const express = require('express');
const routes = express.Router()
const mysqlConnection = require('../dataday');


routes.get('/api/usuarios', (req, res) => { 
    mysqlConnection.query('SELECT * FROM usuario', (err, rows, fields)=>{
        if(!err){
            res.status(200).json(rows);
        }else {
            res.status(500).json({ error: 'Error al buscar' });
        }
    })
})

routes.get('/api/usuarios/:idUsuario', (req, res) => {
    const { idUsuario } = req.params;
    mysqlConnection.query('SELECT * FROM usuario WHERE idUsuario = ' + idUsuario, (err, rows, fields) => {
      if (!err) {
        if (rows.length > 0) {
          res.status(200).json(rows[0]);
        } else {
          res.status(404).json({ error: 'No se encontró un registro con el ID proporcionado',idUsuario});
        }
      } else {
        res.status(500).json({ error: 'Error al buscar' });
      }
    });
  });
routes.post('/api/usuarios/guardarUsuario',(req , res)=>{
    const { idUsuario, nombreUsuario, correoUsuario, contrasenaUsuario } = req.body;
    const query = 'INSERT INTO usuario (idUsuario, nombreUsuario,correoUsuario,contrasenaUsuario) VALUES (?,?,?,?)';
    const values = [idUsuario, nombreUsuario,correoUsuario,contrasenaUsuario];
    mysqlConnection.query(query, values, (err,rows, fields)=>{
        if (!err) {
            res.status(200).json({'Estado': 'guardado correctamente'});
          } else {
            res.status(500).json({ 'error': 'Error al guardar' });
          }
    })
})
routes.put('/api/usuarios/editar', (req, res) => {
    const {idUsuario, nombreUsuario, correoUsuario, contrasenaUsuario } = req.body;
    mysqlConnection.query('SELECT * FROM usuario WHERE idUsuario = ?', [idUsuario], (erorr, Rows) => {
      if (erorr) {
        res.status(500).json({ error: 'Error al verificar el ID' , idUsuario});
      } else if (Rows.length === 0) {
        res.status(404).json({ error: 'No se encontró un registro con el ID proporcionado' , idUsuario});
      } else {
        const query = 'UPDATE usuario SET nombreUsuario = ?, correoUsuario = ?, contrasenaUsuario = ? WHERE idUsuario = ?';
  
        const values = [nombreUsuario, correoUsuario, contrasenaUsuario, idUsuario];
  
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
  routes.delete('/api/usuarios/eliminar', (req, res) => {
    const { idUsuario } = req.body;
    if (typeof idUsuario !== 'number') {
        res.status(400).json({ error: 'Error en la solicitud', descripcion: 'El campo id debe ser un valor numérico',idUsuario });
        return; 
    }
    const query = 'SELECT * FROM usuario WHERE idUsuario = ?';

    mysqlConnection.query(query, [idUsuario], (err, rows, fields) => {
        if (err) {
            res.status(500).json({ error: 'Error al verificar el id en la base de datos' });
        } else {
            if (rows.length === 0) {
                res.status(404).json({ error: 'ID no encontrado', descripcion: 'El id proporcionado no existe en la base de datos',id });
            } else {
                
                const deleteQuery = 'DELETE FROM usuario WHERE idUsuario = ?';
                mysqlConnection.query(deleteQuery, [idUsuario], (deleteErr, deleteResult) => {
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


routes.delete('/api/usuarios/eliminar/:idUsuario', (req, res) => {
    const idUsuario = req.params.idUsuario;
    
    const checkQuery = 'SELECT * FROM usuario WHERE idUsuario = ?';
    mysqlConnection.query(checkQuery, [idUsuario], (checkErr, checkResult) => {
        if (checkErr) {
            res.status(500).json({ error: 'Error al verificar el ID en la base de datos'. idUsuario });
        } else {
            if (checkResult.length === 0) {
                res.status(404).json({ error: 'ID no encontrado', descripcion: 'El ID proporcionado no existe en la base de datos', id });
            } else {
                const deleteQuery = 'DELETE FROM usuario WHERE idUsuario = ?';
                mysqlConnection.query(deleteQuery, [idUsuario], (deleteErr, deleteResult) => {
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
