//require data from friends
var friends = require('../data/friends.js');

module.exports = function(app){
    
  //using app.route() for chaining actions on the same endpoint
  app.route('/api/friends')
    .get(function(req, res){
        res.json(friends);
        // console.log(friends);
        
       
    })

    
	.post( function(req, res){
        //Object to hold the best match
        var bestMatch = {
            name: "",
            photo: "",
            //initialize the value to a very high number to ensure that a "new" best match is assigned from results
            friendDifference: 1000
        };

        // variables for the form data
        var userData 	= req.body;
        var userName 	= userData.name;
        var userPhoto 	= userData.photo;
        var userScores 	= userData.scores;

        var totalDifference = 0;

        // Loop through all the entries in the friends database. 
        for  (var i=0; i< friends.length; i += 1) {        
            //console.log(friends[i].name);                                  error?
            totalDifference = 0;
            // Loop through all the scores within current friend
            for (var j=0; j< friends[i].scores.length; j++){
                //math.abs returns absolute values, no negatives, to compare score by score add to totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
                // If the sum of differences is less then the differences of the current "best match"
                if (totalDifference <= bestMatch.friendDifference){
                    // Assign current friend values to bestMatch after each loop if the current difference is smaller 
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }        
        // push the request body to the friends 
        friends.push(userData);
        // Return a JSON with the user's bestMatch. 
        res.json(bestMatch);
        //res.redirect('/'); 
    });
            
}