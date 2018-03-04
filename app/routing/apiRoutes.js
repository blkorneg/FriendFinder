var friends = require("../data/friends");
module.exports = function(app) {

  // Get friends from friends.js as JSON. Later get friends from DB
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    //console.log(req.body.scores);
    // Receive user details (name, photo, scores)
    var user = req.body;

    var userResults = user.scores;

    // default to firstfriend in store unless compatible match is found based on minimum difference
    var friendFinderIndex = 0;
    var minimumDifference = 100;

    // Search store of friends looking for compatible match based on minimum difference
    for(var i = 0; i < friends.length; i++) {
      var totalDifference = 0;

      for(var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(userResults[j] - friends[i].scores[j]);
        totalDifference += difference;
      }

      // keep updating new match based on minimum differences
      if(totalDifference < minimumDifference) {
        friendFinderIndex = i;
        minimumDifference = totalDifference;
      }
    }

    // after finding match, add user to friend array
    friends.push(user);

    // send back to browser the best friend match
    res.json(friends[friendFinderIndex]);

  });

};
