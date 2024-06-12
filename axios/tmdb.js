const axios = require('axios')

async function getExtraMovieInfo(movieName) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url:
            'https://api.themoviedb.org/3/search/movie?language=pt-BR&query=' +
            movieName,
        headers: {
            Authorization: 'Bearer ' + process.env.TMDB_TKN
        }
    }

    const result = await axios
        .request(config)
        .then(response => {
            let json = response.data
            json.results = json.results.slice(0, 10)
            for (let index = 0; index < json.results.length; index++) {
                if (
                    movieName.toLowerCase() ===
                    json.results[index].title.toLowerCase()
                ) {
                    return {
                        summary: json.results[index].overview,
                        poster: `https://image.tmdb.org/t/p/w500${json.results[index].poster_path}`,
                        image: `https://image.tmdb.org/t/p/original${json.results[index].backdrop_path}`
                    }
                }
            }
            return {
                summary: json.results[0].overview,
                poster: `https://image.tmdb.org/t/p/w500${json.results[0].poster_path}`,
                image: `https://image.tmdb.org/t/p/original${json.results[0].backdrop_path}`
            }
        })
        .catch(error => {
            console.log(error)
            throw new Error(error)
        })

    return result
}

module.exports = { getExtraMovieInfo }
