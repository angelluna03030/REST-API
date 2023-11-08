const express = require('express');
const routes = express.Router()
const mysqlConnection = require('../dataday');
routes.get('/api/categoria_contenido', (req, res) => { 
    mysqlConnection.query('SELECT * FROM categoria_contenido', (err, rows, fields)=>{
        if(!err){
            res.status(200).json(rows);
        }else {
            res.status(500).json({ error: 'Error al buscar' });
        }
    })
})

routes.get('/api/categoria_contenido/:idcateconte', (req, res) => {
    const { idcateconte } = req.params;

    mysqlConnection.query('SELECT * FROM categoria_contenido WHERE idcateconte = ?', [idcateconte], (err, rows, fields) => {
      if (!err) {
        if (rows.length > 0) {
          res.status(200).json(rows[0]);
        } else {
          res.status(404).json({ error: 'ID no encontrado', descripcion: 'El ID proporcionado no existe en la base de datos', idcateconte });
        }
      } else {
        res.status(500).json({ error: 'Error al buscar' });
      }
    });
  });
  
  routes.post('/api/categoria_contenido/guardar', (req, res) => {
    const { idcateconte,  idContenido,idCategoria } = req.body;
    const query = 'INSERT INTO categoria_contenido (idcateconte, idContenido, idCategoria) VALUES (?, ?, ?)';
    const values = [idcateconte, idContenido,idCategoria]; // Corregido aquí
  
    mysqlConnection.query(query, values, (err, rows, fields) => {
      if (!err) {
        res.status(200).json({ Estado: 'guardado correctamente' });
      } else {
        res.status(500).json({ error: 'Error al guardar' });
      }
    });
  });
  

  routes.put('/api/categoria_contenido/editar', (req, res) => {
    const { idCategoria, idContenido, idcateconte } = req.body;
  
    if (typeof idcateconte !== 'number') {
      res.status(400).json({ error: 'Error al editar', descripcion: 'El campo idcateconte no es un valor numérico válido', idcateconte });
      return; // Terminar la ejecución aquí
    } else {
      const query = 'UPDATE categoria_contenido SET idCategoria  = ?, idContenido  = ? WHERE idcateconte = ?';
      const values = [idCategoria, idContenido, idcateconte];
  
      mysqlConnection.query(query, values, (err, row, fields) => {
        if (!err) {
          res.status(200).json({ Estado: 'editado correctamente' });
        } else {
          res.status(500).json({ error: 'Error al editar' });
        }
      });
    }
  });
  



routes.delete('/api/categoria_contenido/eliminar', (req, res) => {
  const { idcateconte } = req.body;


  if (typeof idcateconte !== 'number') {
    res.status(400).json({ error: 'Error en la solicitud', descripcion: 'El campo id debe ser un valor numérico', idCategoria });
    return;
  }
  const query = 'SELECT * FROM categoria_contenido WHERE idcateconte = ?';

  mysqlConnection.query(query, [idcateconte], (err, rows, fields) => {
    if (err) {
      res.status(500).json({ error: 'Error al verificar el ID en la base de datos' });
    } else {
      if (rows.length === 0) {
        res.status(404).json({ error: 'ID no encontrado', descripcion: 'El ID proporcionado no existe en la base de datos', idCategoria });
      } else {
        const deleteQuery = 'DELETE FROM categoria_contenido WHERE idcateconte = ?';
        mysqlConnection.query(deleteQuery, [idcateconte], (deleteErr, deleteResult) => {
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



routes.delete('/api/categoria_contenido/eliminar/:idcateconte', (req, res) => {
  const idcateconte = req.params.idcateconte;
  const query = 'SELECT * FROM categoria_contenido WHERE idcateconte = ?';
  mysqlConnection.query(query, [idcateconte], (err, rows, fields) => {
    if (err) {
      res.status(500).json({ error: 'Error al verificar el ID en la base de datos' });
    } else {
      if (rows.length === 0) {
        res.status(404).json({ error: 'ID no encontrado', descripcion: 'El ID proporcionado no existe en la base de datos', idCategoria });
      } else {
        const deleteQuery = 'DELETE FROM categoria_contenido WHERE idcateconte = ?';
        mysqlConnection.query(deleteQuery, [idcateconte], (deleteErr, deleteResult) => {
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
