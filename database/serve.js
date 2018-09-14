var mongoose = require("mongoose");
mongoose.connect('mongodb://Deekshaa007:<dbpassword>@ds149252.mlab.com:49252/pippop');
var movieSchema = mongoose.Schema({

        // name: { type: String, required: true, },
        // releaseDate: { type: String, required: true },
        // ratings: { type: Number, required: true },
        // director: { type: String, required: true },
        // cast: { type: String, required: true },
        // posterImage: { type: String, required: true }

    }, { 
        collection: 'movie_details' 
    }); 

var moviesCollection = mongoose.model('movies', movieSchema);

module.exports = moviesCollection;