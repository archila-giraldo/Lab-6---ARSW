//Variable global en donde haremos la inyección de la aplicacion
var aplicacion = apiclient;
var app = (function (){
   let tempPoints;
   let tempBlueprint;
   let author;
   let blueprintName;
   let hayBlueprintSeleccionado = false;
   
   /**
    * Retorna el nombre del autor seleccionado
    */
   function getNameOnView() {
      document.getElementById("author_name").innerHTML = author+"'s blueprints";
   }
   /**
    * Retorna el nombre del blueprint seleccionado
    */
   function getBluePrintNameOnView() {
      document.getElementById("blueprint_name").innerHTML = "Current blueprint: " + blueprintName;
   }
   /**
    * Guarda el nombre del autor introducido en el html
    */
   function getNameAuthorBlueprints(){
      hayBlueprintSeleccionado = false;
      author = $("#author").val();
      if(author === ""){
         alert("Porfavor ingrese un nombre");
         getNameOnView();
      }else {
         aplicacion.getBlueprintsByAuthor(author, (req, blueprints) => {
            changeBlueprints(blueprints);
         });
      }
   }

   /**
    *Vacía la tabla blueprint-table, si los datos son indefinidos retorna que no existe el autor
    * de otro modo llenamos la tabla html con los datos correspondientes
    * @param blueprints lista de blueprints de un autor
    */
   function changeBlueprints(blueprints) {
      $("#blueprint-table tbody").empty();
      if(blueprints === undefined){
         alert("No existe el autor");
         author = "";
         getNameOnView();
      }else {
         getNameOnView();
         const newBlueprints = blueprints.map((blueprint) => {
            return {
               name: blueprint.name,
               puntos: blueprint.points.length
            }
         });

         newBlueprints.map((blueprint) =>{
            $("#blueprint-table > tbody:last").append($("<tr><td>" + blueprint.name + "</td><td>" + blueprint.puntos.toString() + "</td><td>" + "<button  id=" + blueprint.name + " onclick=app.getBlueprintByAuthorAndName(this)>Pintar</button>" + "</td>"));
         });

         const totalpoints = newBlueprints.reduce((suma, {puntos}) => suma + puntos, 0);
         document.getElementById("total_puntos").innerHTML = "Total user points: "+totalpoints;
         }
      }

   /**
    * Consulta un blueprint en especifico de un autor
    * @param blueprint blueprint que deseamos consultar y pintar
    */
   function getBlueprintByAuthorAndName(blueprint) {
         //Esta bandera booleana nos permite identificar si hay un blueprint seleccionado
         hayBlueprintSeleccionado = true;
         tempBlueprint = blueprint;
         author = $("#author").val();
         blueprintName = blueprint.id;
         aplicacion.getBlueprintsByNameAndAuthor(author,blueprintName, (req, newBlueprint) => {
            //Almacenamos los puntos temporalmente para añadir nuevos puntos y poderlos adicionar despúes
            tempPoints = newBlueprint.points;
            paint(newBlueprint);
         });
      }

   /**
    * Pinta un blueprint
    * @param blueprint datos del blueprint a pintar
    */
   function paint(blueprint) {
      getBluePrintNameOnView();
      let canvas = document.getElementById("mi_canvas");
      canvas.width = canvas.width;
      let ctx = canvas.getContext("2d");
      let x = blueprint.points[0].x;
      let y = blueprint.points[0].y;
      ctx.moveTo(x,y);
      if (blueprint.points.length>1){
         for(let i = 1;i < blueprint.points.length;i++){
            x = blueprint.points[i].x;
            y = blueprint.points[i].y;
            ctx.lineTo(x,y);
         }
      }
      //En caso de que un blueprint tenga solo un punto no se pinta y no deja seleccionarlo ~ tener cuidado con esto al crear un blueprint desde 0
      else {
         alert("El blueprint solo tiene un punto");
         hayBlueprintSeleccionado = false;
      }
      ctx.stroke();
   }

   /**
    * Añade un punto gráficamente al canvas y lo almacena temporalmente
    * @param x posición x respecto al canvas del punto agregado
    * @param y posición y respecto al canvas del punto agregado
    */
   function addPoint(x,y) {
      if(hayBlueprintSeleccionado){
         let canvas = document.getElementById("mi_canvas");
         let ctx = canvas.getContext("2d");
         ctx.lineTo(x,y);
         ctx.stroke();
         let point = {"x":x,"y":y};
         tempPoints.push(point);
      }
   }

   /**
    * Actualiza el blueprint seleccionado haciendo uso de promesas para actualizar todos los datos al usar la funcion
    */
   function updateBlueprintsByNameAndAuthor(){
      if(hayBlueprintSeleccionado){
         //Convertimos los puntos a un json para mandarlos por el post
         let stringPoints = JSON.stringify(tempPoints)
         //Promesa para actualizar los datos
         aplicacion.updateBlueprintsByNameAndAuthor(author,blueprintName,stringPoints).then((data) => {
            getNameAuthorBlueprints();
            getBlueprintByAuthorAndName(tempBlueprint);
         })
             .catch((error) => {
                console.log(error)
             })
      }
   }

      

      return{
         getNameAuthorBlueprints: getNameAuthorBlueprints,
         getBlueprintByAuthorAndName: getBlueprintByAuthorAndName,
         /**
          * Init nos permite inicializar los event listener que van a capturar los clicks del mouse o
          * las interacciones de cualquier dispositivo apuntador (toques en tablets, lapices de tabletas graficas, etc)
          */
         init:function(){
            let canvas = document.getElementById("mi_canvas");
            if(window.PointerEvent) {
               canvas.addEventListener("pointerdown", function(event){
                  let rect = event.target.getBoundingClientRect()
                  let x = event.clientX - rect.left;
                  let y = event.clientY - rect.top;
                  addPoint(Math.round(x),Math.round(y));
                  }
               );
            }
            else {
               canvas.addEventListener("mousedown", function(event){
                  let rect = event.target.getBoundingClientRect()
                  let x = event.clientX - rect.left;
                  let y = event.clientY - rect.top;
                  addPoint(Math.round(x),Math.round(y));
                  }
               );
            }
         },
         updateBlueprintsByNameAndAuthor: updateBlueprintsByNameAndAuthor
      };
})();