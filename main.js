
const apiKey = 'b6609decf9415b663d5f2b9a3d6e7602';
let pagina = 1

const anterior = document.getElementById("anterior")
const siguiente = document.getElementById("siguiente")

siguiente.addEventListener("click", ()=>{
 pagina = pagina+1
 getMovies()
})

anterior.addEventListener("click",()=>{
    if(pagina > 1){
        pagina = pagina-1
        getMovies()
    }
})

// Función para realizar una solicitud GET a la API de The Movie DB
let getMovies = async ()=> {
    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-MX&page=${pagina}`)
        console.log(respuesta);
        if(respuesta.status === 200){
            const Datos = await respuesta.json()
            let peliculas = ''
            Datos.results.forEach(pelicula => {
                peliculas = peliculas +  `
                <div class="card m-3 custom-bg" style="width: 18rem;">
                <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="card-img-top " alt="peli">
                <div class="card-body">
                <h5 class="card-title text-white">${pelicula.title}</h5>
               </div>
               </div> `
            });
            document.getElementById("contenedor").innerHTML = peliculas
        }
        else if(respuesta.status === 404){
            console.log("peliculas no encontradas");
        }
    }
    catch(err){
        console.log(err);
    }
    
}
  


getMovies()