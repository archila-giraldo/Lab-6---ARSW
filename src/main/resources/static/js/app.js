var app = (function (){
   let author;
   let blueprintName;
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
      author = $("#author").val();
      if(author === ""){
         alert("Porfavor ingrese un nombre");
         getNameOnView();
      }else {
         apiclient.getBlueprintsByAuthor(author, (req, resp) => {
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
         author = "";
         getNameOnView();
      }else {
         getNameOnView();
         const dataJson = JSON.parse(data);
         const datanew = dataJson.map((element) => {
            return {
               name: element.name,
               puntos: element.points.length
            }
         });

         datanew.map((elements) =>{
            $("#blueprint-table > tbody:last").append($("<tr><td>" + elements.name + "</td><td>" + elements.puntos.toString() + "</td><td>" + "<button  id=" + elements.name + " onclick=app.getBlueprintByAuthorAndName(this)>Pintar</button>" + "</td>"));
         });

         const totalpoints = datanew.reduce((suma, {puntos}) => suma + puntos, 0);
         document.getElementById("total_puntos").innerHTML = "Total user points: "+totalpoints;
         }
      }

   /**
    * Pinta un blueprint seleccionado de un autor
    * @param data blueprint que deseamos pintar
    */
   function getBlueprintByAuthorAndName(data) {
         author = $("#author").val();
         blueprintName = data.id;
         apiclient.getBlueprintsByNameAndAuthor(author,blueprintName, (req, resp) => {
            console.log(resp);
            paint(resp);
         });
      }

   /**
    * Pinta un blueprint
    * @param data datos del blueprint a pintar
    */
   function paint(data) {
      const newData = JSON.parse(data);
         getBluePrintNameOnView();
       let canvas = document.getElementById("mi_canvas");
       canvas.width = canvas.width;
       let ctx = canvas.getContext("2d");
       let x = newData.points[0].x;
       let y = newData.points[0].y;
       ctx.moveTo(x,y);
         if (data.points.length>1){
            for(let i = 1;i < newData.points.length;i++){
               x = newData.points[i].x;
               y = newData.points[i].y;
               ctx.lineTo(x,y);
            }
         }
         else {
            alert("El blueprint solo tiene un punto")
         }
         ctx.stroke();
      }

      return{
         getNameAuthorBlueprints: getNameAuthorBlueprints,
         getBlueprintByAuthorAndName: getBlueprintByAuthorAndName
      }
})();