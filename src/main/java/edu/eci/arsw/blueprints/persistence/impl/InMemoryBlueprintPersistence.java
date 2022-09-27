/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.persistence.impl;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 *
 * @author hcadavid
 */
@Service
public class InMemoryBlueprintPersistence implements BlueprintsPersistence{

    private final Map<Tuple<String,String>,Blueprint> blueprints=new ConcurrentHashMap<>();

    public InMemoryBlueprintPersistence() {
        //load stub data
        Point[] pts=new Point[]{new Point(140, 140),new Point(115, 115)};
        Blueprint bp=new Blueprint("autor1", "plano1", Arrays.asList(pts));
        blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        Point[] pts2 =new Point[]{new Point(140, 140),new Point(115, 115)};
        Blueprint bp2 =new Blueprint("autor2", "plano2", Arrays.asList(pts2));
        blueprints.put(new Tuple<>(bp2.getAuthor(),bp2.getName()), bp2);
        Point[] pts3 =new Point[]{new Point(115, 115),new Point(115, 115)};
        Blueprint bp3=new Blueprint("autor2", "plano3", Arrays.asList(pts3));
        blueprints.put(new Tuple<>(bp3.getAuthor(),bp3.getName()), bp3);
        Point[] pts4 =new Point[]{new Point(140, 140),new Point(140, 140)};
        Blueprint bp4=new Blueprint("autor3", "plano4", Arrays.asList(pts4));
        blueprints.put(new Tuple<>(bp4.getAuthor(),bp4.getName()), bp4);
    }    
    
    @Override
    public void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        if (blueprints.containsKey(new Tuple<>(bp.getAuthor(),bp.getName()))){
            throw new BlueprintPersistenceException("The given blueprint already exists: "+bp);
        }
        else{
            blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        }        
    }

    @Override
    public Blueprint getBlueprint(String author, String bprintname) throws BlueprintNotFoundException {
        Tuple<String,String> tp = new Tuple<>(author,bprintname);
        System.out.println(blueprints.get(tp));
        return blueprints.get(tp);
    }

    @Override
    public Set<Blueprint> getBlueprintByautor(String author) throws BlueprintNotFoundException {
        Set<Blueprint> blueprint= new HashSet<>();
        Set<Tuple<String, String>> keys = blueprints.keySet();
        for(Tuple<String, String> tuple: keys){
            if(tuple.getElem1().equals(author)){
                blueprint.add(blueprints.get(tuple));
            }
        }
        return blueprint;
    }

    //Si el casteo no funciona toca hacer un recasteo manual
    @Override
    public List<Blueprint> getBlueprints() throws BlueprintNotFoundException {
        List<Blueprint> bps = new ArrayList<>();
        Set<Tuple<String, String>> keys = blueprints.keySet();
        for (Tuple tupla:keys){
            Blueprint bp = blueprints.get(tupla);
            bps.add(bp);
            System.out.println(bps);
        }
        return bps;
    }
}
