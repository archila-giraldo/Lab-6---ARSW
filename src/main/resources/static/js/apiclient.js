var apiclient=(function(){

    return {
        /**
         * Retorna el mapa de datos con las blueprints de un autor
         * @param authname autor que queremos buscar
         * @param callback blueprints del autor
         */
        getBlueprintsByAuthor:function(authname,callback){
                    $.ajax({
                        type: "GET",
                        url : '/version1/blueprints/'+authname,
                        success: function(data){
                            const dataJson = JSON.parse(data);
                            callback(
                                null, dataJson
                            )
                        }
                    });
        },
        /**
         * Retorna el blueprint del autor y con el nombre que deseamos
         * @param authname autor que queremos buscar
         * @param bpname nombre del blueprint que queremos buscar
         * @param callback datos del blueprint que buscamos
         */
        getBlueprintsByNameAndAuthor:function(authname,bpname,callback){
            
            $.ajax({
                type: "GET",
                url : '/version1/blueprints/'+authname+"/"+bpname,
                success: function(data){
                    const dataJson = JSON.parse(data);
                    callback(
                        null, dataJson
                    )
                }
            });
        }
    }

})();
