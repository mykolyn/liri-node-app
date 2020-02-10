// Read and set environment variables
require("dotenv").config();

//read .txt file
var fs = require("fs");

//spotify npm
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//axios npm
var axios = require("axios");

//moment npm
var moment = require('moment'); 
moment().format();

//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------

//input variables
var option = process.argv[2]
var parameter = process.argv[3] //+ " "+ process.argv[process.argv.length - 1];

console.log("-----------------")
console.log (parameter)
console.log("-----------------")


runLiri (option, parameter)
// var wordCheck = parameter.split(",")
// console.log ("below should be array")
// console.log(wordCheck)
// console.log("-----------------")

// if (wordCheck.length < 3) {
//     console.log("one word function runs")
//     var uniqueList=parameter.split(',').filter(function(item,i,allItems){
//         return i==allItems.indexOf(item);
//     }).join(',');
//     console.log (uniqueList)
// }
function runLiri (option, parameter) {
switch (option) {
    case "concert-this":
        concertThis(parameter);
        break;
    case "spotify-this-song":
        spotifySong(parameter);
        break;
    case "movie-this":
        movieThis(parameter);
        console.log("switch")
        break;
    case "do-what-it-says":
        doThis(parameter);
        break;
    default:
        console.log("Choose one of the following commands: \nconcert-this, \nspotify-this-song, \nmovie-this, \ndo-what-it-says")
    
};
}

//concert-this command
function concertThis(parameter) {
    if (!parameter) {
        parameter = "celine+dione"
    }
    var queryUrl = "https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp"
    console.log(queryUrl)
    axios.get(queryUrl)
        .then(function (response) {
            //console.log(response)
            if (response.data.length === 0) {
                console.log("No shows available, please try again")
            }
            for (var i = 0; i < response.data.length; i++) {

                var datetime = response.data[i].datetime; 
                var dateArr = datetime.split('T'); 
                var concertResults =
                    "------------------------------------------------" +
                    "\nVenue Name: " + response.data[i].venue.name +
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + moment(dateArr[0], "MM-DD-YYYY"); 
                console.log(concertResults);
            }
        })
        .catch(function (error) {
            console.log(error);
            //console.log("no shows available")
        })
}

//spotify-this-song command
function spotifySong(parameter){
   if (!parameter) {
       parameter = "the&sign"
   }
    spotify
    .search({ type: 'track', query: parameter })
    .then(function(response) {
        for (var i = 0; i < 10; i++) {
            var spotifyResults = 
            "--------------------------------------------------------------------" +
                "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
                "\nSong Name: " + response.tracks.items[i].name +
                "\nAlbum Name: " + response.tracks.items[i].album.name +
                "\nPreview Link: " + response.tracks.items[i].preview_url;
                
        console.log(spotifyResults);
        }
    })
    .catch(function(err) {
      console.log(err);
    });
}

//movie-this command
function movieThis() {
    if (!parameter) {
        parameter = "mr nobody"
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + parameter + "&y=&plot=short&apikey=trilogy"
    axios.get(queryUrl)
        .then(function (response) {
           // console.log(response)
           var movieResults =  (
               "---------------------------------------" +
               "\nTitle: " + response.data.Title +
               "\nYear Released: " + response.data.Released +
               "\nIMDB Rating: " + response.data. imdbRating +
               "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
               "\nCountry Produced: " + response.data.Country +
               "\nLanguage: " + response.data.Language +
               "\nPlot: " + response.data.Plot +
               "\nActors/Actresses: " + response.data.Actors
           )
            console.log (movieResults)
            console.log (response.data.Ratings)
            console.log (response.data.Ratings[1])
            console.log (response.data.Ratings[1].Value)



            console.log (response.data.Ratings.Value)
        })
        .catch(function (error) {
            console.log(error);
        })
}

//do-what-it-says command
function doThis(){
    fs.readFile('random.txt', 'utf8', function(err, data){
		if (err){ 
			return console.log(err);
		}
        var dataArr = data.split(',');
        console.log (dataArr)
        runLiri(dataArr[0], dataArr[1]);
	});
}