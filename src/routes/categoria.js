const express = require('express');
const routes = express.Router()
const mysqlConnection = require('../dataday');
routes.get('/api/categoria', (req, res) => { 
    mysqlConnection.query('SELECT * FROM categoria', (err, rows, fields)=>{
        if(!err){
            res.status(200).json(rows);
        }else {
            res.status(500).json({ error: 'Error al buscar' });
        }
    })
})

routes.get('/api/categoria/:idCategoria', (req, res)=>{
    const{idCategoria}=  req.params;
    mysqlConnection.query('SELECT * FROM categoria WHERE idCategoria = ' + idCategoria, (err, rows, fields)=>{
     if(!err){
         res.status(200).json(rows[0]);
     }else {
         res.status(500).json({ 'error': 'Error al buscar' });
     }
 }) 
 })
 routes.post('/api/categoria/guardar',(req , res)=>{
    const {idCategoria, nombreCategoria,descripcion} = req.body;
    const query = 'INSERT INTO `categoria` (`idCategoria`, `nombreCategoria`, `descripcion`) VALUES (?,?,?);';
    const values = [idCategoria, nombreCategoria,descripcion];
    mysqlConnection.query(query, values, (err,rows, fields)=>{
        if(!err){
            res.status(200).json({'Estado': 'guardado correctamente'});
        }else{
            res.status(500).json({ 'error': 'Error al guardar' });
        }
    })

})

routes.put('/api/categoria/editar', (req, res) => {
    const { idCategoria, descripcion, nombreCategoria } = req.body;
    if (typeof idCategoria !== 'number') {
      res.status(400).json({ error: 'Error al editar', descripcion: 'El ID no es un valor numérico válido', idCategoria });
      return; 
    }
    mysqlConnection.query('SELECT * FROM categoria WHERE idCategoria = ?', [idCategoria], (selectErr, selectRows) => {
      if (selectErr) {
        res.status(500).json({ error: 'Error al verificar el ID' });
      } else if (selectRows.length === 0) {
        res.status(404).json({ error: 'No se encontró un registro con el ID proporcionado' });
      } else {
        const query = 'UPDATE categoria SET nombreCategoria = ?, descripcion = ? WHERE idCategoria = ?';
        const values = [nombreCategoria, descripcion, idCategoria];
  
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
  
  routes.delete('/api/categoria/eliminar', (req, res) => {
    const { idCategoria } = req.body;

    if (typeof idCategoria !== 'number') {
      res.status(400).json({ error: 'Error en la solicitud', descripcion: 'El campo id debe ser un valor numérico', idCategoria });
      return;
    }
    const query = 'SELECT * FROM categoria WHERE idCategoria = ?';
  
    mysqlConnection.query(query, [idCategoria], (err, rows, fields) => {
      if (err) {
        res.status(500).json({ error: 'Error al verificar el ID en la base de datos' });
      } else {
        if (rows.length === 0) {
          res.status(404).json({ error: 'ID no encontrado', descripcion: 'El ID proporcionado no existe en la base de datos', idCategoria });
        } else {
          const deleteQuery = 'DELETE FROM categoria WHERE idCategoria = ?';
          mysqlConnection.query(deleteQuery, [idCategoria], (deleteErr, deleteResult) => {
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
  


  routes.delete('/api/categoria/eliminar/:idCategoria', (req, res) => {
    const idCategoria = req.params.idCategoria;
  
    const query = 'SELECT * FROM categoria WHERE idCategoria = ?';
  
    mysqlConnection.query(query, [idCategoria], (err, rows, fields) => {
      if (err) {
        res.status(500).json({ error: 'Error al verificar el ID en la base de datos' });
      } else {
        if (rows.length === 0) {
          res.status(404).json({ error: 'ID no encontrado', descripcion: 'El ID proporcionado no existe en la base de datos', idCategoria });
        } else {
          const deleteQuery = 'DELETE FROM categoria WHERE idCategoria = ?';
          mysqlConnection.query(deleteQuery, [idCategoria], (deleteErr, deleteResult) => {
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