const xhttp = new XMLHttpRequest();

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    xhttp.open("GET", url, true); //el tercer valor es para activar el asincronismo

    xhttp.onreadystatechange = (() => {
      if (xhttp.readyState === 4) {
        (xhttp.status === 200) 
            ? resolve(JSON.parse(xhttp.responseText))
            : reject(new Error('Error '+ url))
      }
    });
    xhttp.send();
  });
};

export default fetchData