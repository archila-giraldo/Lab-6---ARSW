/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.controllers;

import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.google.gson.Gson;
import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.services.BlueprintsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeEditor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador de la api blueprints
 * @author hcadavid
 * @author Camilo Archila
 * @author Luis Giraldo
 */
@RestController
@RequestMapping(value = "version1/blueprints")
public class BlueprintAPIController {
    @Autowired
    BlueprintsServices bps;

    /**
     * Metodo que nos retorna todas las blueprints
     * @return todas las blueprints o mensaje de error
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> controllerGetBlueprints(){
        try {
            List<Blueprint> data = bps.getAllBlueprints(HttpStatus.ACCEPTED);
            Gson gson = new Gson();
            return new ResponseEntity<>(gson.toJson(data), HttpStatus.ACCEPTED);
        }
        catch (Exception ex){
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("No se pudo consultar", HttpStatus.NOT_FOUND);
        }

    }

    /**
     * Metodo que nos devuelve las blueprints relacionadas a un autor
     * @param author autor del cual queremos consultar las blueprints
     * @return Blueprints del autor que queremos consultar o mensaje de error
     */
    @GetMapping("{author}")
    public ResponseEntity<?> controllerGetBlueprintsByAuthor(@PathVariable("author") String author){
         try {
             List<Blueprint> data = bps.getBlueprintsByAuthor(author);
             Gson gson = new Gson();
             return new ResponseEntity<>(gson.toJson(data), HttpStatus.ACCEPTED);
         }
         catch (Exception ex){
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("No se pudo consultar", HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Metodo que nos permite consultar un blueprint por nombre de autor y nombre de plano
     * @param author nombre del autor que queremos consultar el blueprint
     * @param bpname nombre del blueprint que queremos consultar
     * @return blueprint que queremos consultar o mensaje de error
     */
    @GetMapping("{author}/{bpname}")
    public ResponseEntity<?> controllerGetBlueprint(@RequestBody @PathVariable("author")String author,@PathVariable("bpname")String bpname){
        try {
            Blueprint data = bps.getBlueprint(author, bpname);
            Gson gson = new Gson();
            return new ResponseEntity<>(gson.toJson(data), HttpStatus.ACCEPTED);
        }
        catch (Exception ex){
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("No se pudo consultar", HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Metodo para agregar un nuevo blueprint por medio de un post
     * Ejemplo del json:
     * {
     *     "author":"autor10","name":"plano10","points":[{"x":113,"y":113}]
     * }
     * @param bp blueprint que vamos a añadir
     * @return mensaje informando si se añadio o no el plano
     */
    @RequestMapping(value = "/add",method = RequestMethod.POST)
    public ResponseEntity<?> controllerPostBlueprint(@RequestBody Blueprint bp){
        try{
            bps.addNewBlueprint(bp);
            return new ResponseEntity<>("Plano añadido exitosamente",HttpStatus.CREATED);
        }catch (BlueprintPersistenceException ex){
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("No se pudo resgitrar", HttpStatus.FORBIDDEN);
        }
    }

    /**
     * Metodo para actualizar los puntos de un plano
     * Ejemplo del json que se pide: [{"x":113,"y":113}]
     * @param author autor  del cual vamos a actualizar el plano
     * @param bpname plano que vamos a actualizar
     * @param points Objeto Json que contiene los puntos nuevos
     * @return Mensaje informando si fue o no exitosa la actualizacion
     */
    @RequestMapping(value = "/{author}/{bpname}", method = RequestMethod.PUT)
    public  ResponseEntity<?> updateBluePrint(@PathVariable("author") String author, @PathVariable("bpname") String bpname, @RequestBody List<Point> points){
        try {
            bps.getBlueprint(author,bpname).setPoints(points);
            return new ResponseEntity<>("Plano actualizado", HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("No se pudo actualizar el plano", HttpStatus.FORBIDDEN);
        }
    }
}

