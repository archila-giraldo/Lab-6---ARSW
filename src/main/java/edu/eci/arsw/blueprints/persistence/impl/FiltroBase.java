package edu.eci.arsw.blueprints.persistence.impl;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.persistence.Filter;
import org.springframework.stereotype.Service;

/**
 * Filtro base que retorna la misma blueprint que le entra
 */
@Service
public class FiltroBase implements Filter {
    @Override
    public Blueprint filtro(Blueprint blueprint) {
        return blueprint;
    }
}
