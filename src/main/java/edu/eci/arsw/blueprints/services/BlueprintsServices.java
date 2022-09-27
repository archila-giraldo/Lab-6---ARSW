/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.services;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import edu.eci.arsw.blueprints.persistence.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

/**
 *
 * @author hcadavid
 */

@Service
public class BlueprintsServices {
   
    @Autowired
    BlueprintsPersistence bpp;

    @Autowired
    Filter filtro;
    
    public void addNewBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        bpp.saveBlueprint(bp);
    }
    
    public List<Blueprint> getAllBlueprints(HttpStatus accepted) {
        try{
            System.out.println(bpp.getBlueprints().toString());
            List<Blueprint> bps = new ArrayList<>();
            for (Blueprint bp: bpp.getBlueprints()){
                bps.add(filtro.filtro(bp));
            }
            return bps;
        }
        catch (BlueprintNotFoundException ex){
            return null;
        }
    }
    
    /**
     * 
     * @param author blueprint's author
     * @param name blueprint's name
     * @return the blueprint of the given name created by the given author
     * @throws BlueprintNotFoundException if there is no such blueprint
     */
    public Blueprint getBlueprint(String author,String name) {
        try {
            Blueprint bp = bpp.getBlueprint(author,name);
            return filtro.filtro(bp);
        } catch (BlueprintNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
    
    /**
     * 
     * @param author blueprint's author
     * @return all the blueprints of the given author
     * @throws BlueprintNotFoundException if the given author doesn't exist
     */
    public List<Blueprint> getBlueprintsByAuthor(String author) {
        List<Blueprint> blueprints = new ArrayList();
        try {
            for(Blueprint bp:bpp.getBlueprintByautor(author)){
                blueprints.add(filtro.filtro(bp));
            }
        } catch (BlueprintNotFoundException e) {
            throw new RuntimeException(e);
        }
        return blueprints;
    }

    
}
