'use strict';

angular.module('followingList', ['ngRoute'])
    .component('followingList', {
        templateUrl: 'following/following.html',
        controller: ['$http', '$rootScope', function TweetListController($http, $rootScope) {
            var self = this;
            const requestOptions = {
                headers: { 'X-session': $rootScope.x_session }
            };

            self.sendfollowing = function sendfollowing(followingname) {
                const requestOptions = {
                    headers: { 'X-session': $rootScope.x_session }
                };
                var data = "followingname=" + encodeURIComponent(followingname);
                $http.post('http://localhost:8080/twitterapi/following/', data, requestOptions).then(function (response) {
                    $http.get('http://localhost:8080/twitterapi/following ', requestOptions).then(function (response) {
                        self.tweets = response.data;
                        self.tweets.forEach(function iterator(value, index, collection) {
                            value.Message = decodeURIComponent(value.Message);
                        });
                    });
                });
            }

            self.deletefollowing = function deletefollowing(followingname) {
                const requestOptions = {
                    headers: { 'X-session': $rootScope.x_session }
                };
                var data = "followingname=" + encodeURIComponent(followingname);
                $http.delete('http://localhost:8080/twitterapi/following/', data, requestOptions).then(function (response) {
                    self.followings = response.data;

                });


            }

            $http.get('http://localhost:8080/twitterapi/following/', requestOptions).then(function (response) {
                self.followings = response.data;

            });
        }]
    });