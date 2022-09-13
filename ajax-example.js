// Ejemplo con XMLHttpRequest

var request = new XMLHttpRequest();

request.open(
    'GET',
    'https://pokeapi.co/api/v2/egg-group/1',
    true
    );

request.send();

request.onreadystatechange = (state) =>{
    if(request.readyState === 4){
        console.log(JSON.parse(request.response))
    }
}