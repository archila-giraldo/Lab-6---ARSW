var app = (function (){
   let author;
   let blueprintName;
   /**
    * Retorna el nombre del autor seleccionado
    */
   function getName() {
      $("#author-name").val(author + "'s " + "blueprints:");
   }
   /**
    * Retorna el nombre del blueprint seleccionado
    */
   function getBluePrintName() {
      $("#current-name").val("Current blueprint: " + blueprintName);
   }
   /**
    * Guarda el nombre del autor introducido en el html
    */
   function getNameAuthorBlueprints(){
      author = $("#author").val();
      if(author === ""){
         alert("Porfavor ingrese un nombre");
      }else {
         apimock.getBlueprintsByAuthor(author, (req, resp) => {
            changeData(resp);
         });
      }
   }

   /**
    *Vacía la tabla blueprint-table, si los datos son indefinidos retorna que no existe el autor
    * de otro modo llenamos la tabla html con los datos correspondientes
    * @param data lista de blueprints de un autor
    */
   function changeData(data) {
      $("#blueprint-table tbody").empty();
      if(data === undefined){
         alert("No existe el autor");
      }else {
         getName();
         const datanew = data.map((element) => {
            return {
               name: element.name,
               puntos: element.points.length
            }
         });

         datanew.map((elements) =>{
            $("#blueprint-table > tbody:last").append($("<tr><td>" + elements.name + "</td><td>" + elements.puntos.toString() + "</td><td>" + "<button  id=" + elements.name + "onclick = "+"app.getBlueprintByAuthorAndName(this)>"+Pintar+"</button>" + "</td>"));
         });

         const totalpoints = datanew.reduce((suma, {puntos}) => suma + puntos, 0);
         }
      }

   /**
    * Pinta un blueprint seleccionado de un autor
    * @param data blueprint que deseamos pintar
    */
   function getBlueprintByAuthorAndName(data) {
         author = $("#author").val();
         blueprintName = data.id;
         apimock.getBlueprintsByNameAndAuthor(blueprintName, author, (req, resp) => {
            console.log(resp);
            paint(resp);
         });
      }

   /**
    * Pinta un blueprint
    * @param data datos del blueprint a pintar
    */
   function paint(data) {
         getBluePrintName();

      }

      return{
         getNameAuthorBlueprints: getNameAuthorBlueprints,
         getBlueprintByAuthorAndName: getBlueprintByAuthorAndName
      }
})();