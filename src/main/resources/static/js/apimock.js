//@author hcadavid

var apimock=(function(){

    const mockdata=[];

    mockdata["johnconnor"]=	[{author:"johnconnor","points":[{"x":150,"y":120},{"x":215,"y":115}],"name":"house"},
        {author:"johnconnor","points":[{"x":340,"y":240},{"x":15,"y":215}],"name":"gear"},{author:"johnconnor","points":[{"x":320,"y":220},{"x":25,"y":225}],"name":"plano"}];
    mockdata["maryweyland"]=[{author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"house2"},
        {author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"gear2"},{author:"maryweyland","points":[{"x":120,"y":130},{"x":125,"y":125}],"name":"plano2"}];
    mockdata["autor3"]=[{author:"autor3","points":[{"x":130,"y":130},{"x":105,"y":105}],"name":"house3"},
        {author:"autor3","points":[{"x":130,"y":130},{"x":105,"y":105}],"name":"gear3"},{author:"autor3","points":[{"x":110,"y":120},{"x":115,"y":115}],"name":"plano3"}];


    return {
        getBlueprintsByAuthor:function(authname,callback){
            callback(
                null, mockdata[authname]
            );
        },

        getBlueprintsByNameAndAuthor:function(authname,bpname,callback){
            callback(
                null, mockdata[authname].find(function(e){return e.name===bpname})
            );
        }
    }

})();

/*
Example of use:
var fun=function(list){
	console.info(list);
}
apimock.getBlueprintsByAuthor("johnconnor",fun);
apimock.getBlueprintsByNameAndAuthor("johnconnor","house",fun);*/