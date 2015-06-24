"use strict";

describe("meetup api service", function () {
  var meetupService, httpBackend;

  beforeEach(module("meetup"));

  beforeEach(inject(function (_meetupService_, $httpBackend, $meetupApiKey) {
    meetupService = _meetupService_;
    httpBackend   = $httpBackend;
    meetupApiKey  = $meetupApiKey // 52147258472159b1938714519435029
  }));

    // "https://api.meetup.com/find/groups?key=" + meetupApiKey + "&sign=true&photo-host=public&zip=" + "80202" + "&upcoming_events=true&text=" + "ruby" + "&callback=JSON_CALLBACK" ;
    "https://api.meetup.com/find/groups?key=52147258472159b1938714519435029&sign=true&photo-host=public&zip=80202&upcoming_events=true&text=ruby&callback=JSON_CALLBACK" ;
  it("should do something", function () {
    httpBackend.whenGET("http://api.reddit.com/user/yoitsnate/submitted.json").respond({
        data: {
          children: [
            {
              data: {
                subreddit: "Ruby Group"
              }
            },
            {
              data: {
                subreddit: "Women who Code"
              }
            },
            {
              data: {
                subreddit: "Gophers"
              }
            },
            {
              data: {
                subreddit: "Turing Community Night"
              }
            }
          ]
        }
    });
    meetupService.search("ruby").then(function(subreddits) {
      expect(subreddits).toEqual(["Ruby Group", "Women who Code"]);
    });
    httpBackend.flush();
  });

});