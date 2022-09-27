var app = (function (){
   let author;
   let BluesprintName;

   function getName() {
      $("#author-name").text(author + "'s " + "blueprints:");
   }

   function getBluePrintName() {
      $("#current-name").text("Current blueprint: " + blueprintName);
   }

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
            $("#blueprint-table > tbody:last").append($("<tr><td>" + elements.name + "</td><td>" + elements.puntos.toString() + "</td><td>" + "<button  id=" + elements.name + " onclick=app.getBlueprintByAuthorAndName(this)>Pintar</button>" + "</td>"));
         });

         const totalpoints = datanew.reduce((suma, {puntos}) => suma + puntos, 0);
         }
      }

      function getBlueprintByAuthorAndName(data) {
         console.log(data);
         author = $("#author").val();
         blueprintName = data.id;
         apimock.getBlueprintsByNameAndAuthor(blueprintName, author, (req, resp) => {
            console.log(resp);
            paint(resp);
         });
      }

      function paint(data) {
         getBluePrintName();

      }

      return{
         getNameAuthorBlueprints: getNameAuthorBlueprints,
         getBlueprintByAuthorAndName: getBlueprintByAuthorAndName
      }
})();