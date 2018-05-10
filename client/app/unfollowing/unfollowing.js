'use strict';

angular.module('unfollowingList', ['ngRoute'])
  .component('unfollowingList', {
    templateUrl: 'unfollowing/unfollowing.html',
    controller: ['$http', '$rootScope', function TweetListController($http, $rootScope) {
      var self = this;

      const requestOptions = {
          headers: { 'X-session': $rootScope.x_session }
      };

      $http.get('http://localhost:8080/twitterapi/unfollowing/', requestOptions).then(function (response) {
        self.followings = response.data;
      });
    }]
});