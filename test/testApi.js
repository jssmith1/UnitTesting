//var nock = require("nock");
var twitter = require("twitter");
var chai = require("chai");
var expect = chai.expect;
var querystring = require('querystring');
var nock = require("nock");


var twitterClient = new twitter({
	    consumer_key: "fake",
	    consumer_secret: "secret",
	    access_token_key: "token_key",
	    access_token_secret: "token_secret"
});

twitter.prototype.show = function(id, callback)
{
	twitterClient.get('/statuses/show.json', {id:id}, callback);
};

var data = 
{
	id : "210462857140252672",
	query : "#NCSU",
  newStatus : "new Status"
}

// TESTS

describe('twitterClient', function(){
  describe('#verifyCredentials()', function(){
   	it('should return valid login properties', function(done){


      var mockService = nock("https://api.twitter.com")
         .get("/1.1/account/verify_credentials.json")
         .reply(200, {"name": "diwali", "screen_name": "statefair"});

   		twitterClient.verifyCredentials(function(results)
   		{
   			expect(results).to.have.property("name");
   			expect(results).to.have.property("screen_name");

				done();
   		});

    });
	});
});

describe('twitterClient', function(){
  describe('#search(text)', function(){
   	it('should return valid list of statuses', function(done){

      var mockService = nock("https://api.twitter.com")
         .get("/1.1/search/tweets.json?q=" + querystring.escape(data.query))
         .reply(200, {});

   		twitterClient.search(data.query, function(results)
   		{
   			expect(results).to.have.property("statuses");
   			expect(results.statuses).to.be.above(0);
   			// more assertions
        // each status should have an id property and text property
				
				done();
   		});

    });
	});
});


describe('twitterClient', function(){
  describe('#updateStatus(text)', function(){
   	it('should return updated status', function(done){

      // POST text to "https://api.twitter.com/1.1/account/update.json"

   		twitterClient.updateStatus(data.newStatus, function(results)
   		{
   			expect(results).to.have.property("text");
   			expect(results.text).to.equal(data.newStatus);

        
				done();
   		});

    });
	});
});

// test for 140 character limit when updating status

describe('twitterClient', function(){
  describe('#show()', function(){
   	it('should return valid twitter status', function(done){

    var mockService = nock("https://api.twitter.com")
         .get("/1.1/statuses/show.json?id="+data.id)
         .reply(200, 
            {
              "coordinates": null,
              "favorited": false,
              "truncated": false,
              "created_at": "Wed Jun 06 20:07:10 +0000 2012",
              "id_str": data.id,
              "entities": {
                "urls": [
                  {
                    "expanded_url": "https://dev.twitter.com/terms/display-guidelines",
                    "url": "https://t.co/Ed4omjYs",
                    "indices": [
                      76,
                      97
                    ],
                    "display_url": "dev.twitter.com/terms/display-\u2026"
                  }
                ],
                "hashtags": [
                  {
                    "text": "Twitterbird",
                    "indices": [
                      19,
                      31
                    ]
                  }
                ],
                "user_mentions": [
             
                ]
              },
              "in_reply_to_user_id_str": null,
              "contributors": [
                14927800
              ],
              "text": "Along with our new #Twitterbird, we've also updated our Display Guidelines: https://t.co/Ed4omjYs  ^JC",
              "retweet_count": 66,
              "in_reply_to_status_id_str": null,
              "id": 210462857140252672,
              "geo": null,
              "retweeted": true,
              "possibly_sensitive": false,
              "in_reply_to_user_id": null,
              "place": null,
              "user": {
                "profile_sidebar_fill_color": "DDEEF6",
                "profile_sidebar_border_color": "C0DEED",
                "profile_background_tile": false,
                "name": "Twitter API",
                "profile_image_url": "http://a0.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png",
                "created_at": "Wed May 23 06:01:13 +0000 2007",
                "location": "San Francisco, CA",
                "follow_request_sent": false,
                "profile_link_color": "0084B4",
                "is_translator": false,
                "id_str": "6253282",
                "entities": {
                  "url": {
                    "urls": [
                      {
                        "expanded_url": null,
                        "url": "http://dev.twitter.com",
                        "indices": [
                          0,
                          22
                        ]
                      }
                    ]
                  },
                  "description": {
                    "urls": [
             
                    ]
                  }
                },
                "default_profile": true,
                "contributors_enabled": true,
                "favourites_count": 24,
                "url": "http://dev.twitter.com",
                "profile_image_url_https": "https://si0.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png",
                "utc_offset": -28800,
                "id": 6253282,
                "profile_use_background_image": true,
                "listed_count": 10774,
                "profile_text_color": "333333",
                "lang": "en",
                "followers_count": 1212963,
                "protected": false,
                "notifications": null,
                "profile_background_image_url_https": "https://si0.twimg.com/images/themes/theme1/bg.png",
                "profile_background_color": "C0DEED",
                "verified": true,
                "geo_enabled": true,
                "time_zone": "Pacific Time (US & Canada)",
                "description": "The Real Twitter API. I tweet about API changes, service issues and happily answer questions about Twitter and our API. Don't get an answer? It's on my website.",
                "default_profile_image": false,
                "profile_background_image_url": "http://a0.twimg.com/images/themes/theme1/bg.png",
                "statuses_count": 3333,
                "friends_count": 31,
                "following": true,
                "show_all_inline_media": false,
                "screen_name": "twitterapi"
              },
              "in_reply_to_screen_name": null,
              "source": "web",
              "in_reply_to_status_id": null
            });


   		twitterClient.show(data.id, function(results)
   		{
   			expect(results).to.have.property("id_str");
   			chai.assert.equal(results.id_str,data.id);

				done();
   		});

    });
	});
});