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
        },
        /**
         * Actualiza el blueprint del autor y con el nombre que deseamos
         * @param authname autor que queremos buscar
         * @param bpname nombre del blueprint que queremos actualizar
         * @param puntos Puntos que queremos añadir
         * @returns {Promise<unknown>} promesa de la funcion
         */
        updateBlueprintsByNameAndAuthor:function (authname,bpname,puntos){
            return new Promise((resolve, reject) => {
            $.ajax({
                type: "PUT",
                url: '/version1/blueprints/'+authname+"/"+bpname,
                data: puntos,
                contentType: "application/json",
                success: function (data) {
                    resolve(data)
                },
                error: function (error) {
                    reject(error)
                }
            })
        })
        },

        ceateBP: function (author, bpName) {
            var data = JSON.stringify({author: author, "points":[{}], "name": bpName})
            return new Promise((resolve, reject) =>{
                $.ajax({
                    type: "POST",
                    url: '/version1/blueprints/add',
                    data: data,
                    contentType: "application/json",
                    success: function (data) {
                        resolve(data)
                    },
                    error: function (error) {
                        reject(error)
                    }
                }) 
            })
        },

        deleteBp: function (author, blueprintName){
            return new Promise((resolve, reject) =>{
                $.ajax({
                    type: "DELETE",
                    url: '/version1/blueprints/' + author + "/" + blueprintName,
                    success: function () {
                        resolve()
                    },
                    error: function (error) {
                        reject(error)
                    }
                })
            })
        }
    }
})();
