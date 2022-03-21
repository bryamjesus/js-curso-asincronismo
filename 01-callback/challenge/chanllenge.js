const URL_API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();

function fetchData(url, callback){
  
    xhttp.open('GET', url, true); //el tercer valor es para activar el asincronismo
    
    //https://www.w3schools.com/xml/ajax_xmlhttprequest_response.asp - los diferentes estados
    //https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
    xhttp.onreadystatechange = function (event){
        if(xhttp.readyState === 4){
            if(xhttp.status === 200){
                callback(null,JSON.parse(xhttp.responseText)); // se recibe una respesta en texto
            }
            else{
                const error = new Error('Error ' + url) 
                return callback(error, null)
            }
        }
    }
    xhttp.send()
}

fetchData(URL_API, function(error1, data1){
    if(error1) return console.error(error1);
    fetchData(URL_API + data1.results[0].id, function(error2, data2){
        if(error2) return console.error(error2);
        fetchData(data2.origin.url, function(error3,data3){
            if(error3) return console.error(error3);
            console.log(data1.info.count)
            console.log(data2.name)
            console.log(data3.dimension)
        })
    })
})




/*Es recomendable de no realizar mas de 3 callback para no caer en un callback Hell, si tu proyecto tiene una funcion con mas de 3 callback, se recomienda hacer una revision y utilizar una mejor forma de ejecutar el codigo, para ello estan las promesas o el Async Away*/