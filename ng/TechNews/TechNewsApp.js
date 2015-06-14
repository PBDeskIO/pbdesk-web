(function () {
    'use strict';

    angular
        .module('TechNewsApp', ['ngSanitize', 'PBDesk.GoogleFeedFetcher' ], function($interpolateProvider) {
            $interpolateProvider.startSymbol('[[');
            $interpolateProvider.endSymbol(']]');
        })
        .controller('TechNewsController',TechNewsController );

    TechNewsController.$inject = ['GoogleFeedsFactory'];

    function TechNewsController(GoogleFeedsFactory){
        var vm = this;
        vm.title = 'controller1';
        vm.Data = {};

        init();

        function init() {
            GoogleFeedsFactory.getData(window.TechNewsData.RssLink,window.TechNewsData.ItemCount,window.TechNewsData.FeedType).then(function(data){
                vm.Data = data;
            }, function(error){
                console.log("error" + error);
            })
        }
    }
})();