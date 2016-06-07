// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    cache: false,
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

.state('tab.search', {
    url: '/search',
    views: {
      'tab-search': {
        templateUrl: 'templates/tab-search.html',
        controller: 'SearchCtrl'
      }
    }
  })


  .state('tab.book', {
    url: '/books',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-book.html',
        controller: 'CurrentBookCtrl'
      }
    }
  })


  .state('tab.chapter', {
    cache: false,
    url: '/books/:bookId/chapters/:chapterId',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-chapter.html',
        controller: 'ChapterCtrl'
      }
    }
  })


  .state('tab.book-detail1', {
    url: '/books/:bookId',
    views: {
      'tab-search': {
        templateUrl: 'templates/book-detail.html',
        controller: 'BookDetailCtrl'
      }
    }
  })

  .state('tab.book-detail2', {
    url: '/account/books/:bookId',
    views: {
      'tab-account': {
        templateUrl: 'templates/book-detail.html',
        controller: 'BookDetailCtrl'
      }
    }
  })

  .state('tab.book-detail3', {
    url: '/dash/books/:bookId',
    views: {
      'tab-dash': {
        templateUrl: 'templates/book-detail.html',
        controller: 'BookDetailCtrl'
      }
    }
  })

  .state('tab.reviews',{
    url: '/books/:bookId/reviews',
    views: {
      'tab-search': {
        templateUrl: 'templates/tab-user-review.html',
        controller: 'ReviewCtrl'
      }
    }
   })


  .state('tab.reader-queue', {
    url : '/queue',
    views:{
    'tab-account':{
    templateUrl: 'templates/tab-reader-queue.html',
    controller: 'QueueCtrl'
    }
  }
})


.state('tab.user-review', {
  url: '/user-review',
  views: {
    'tab-account':{
      templateUrl: 'templates/tab-user-review.html',
      controller: 'UserReviewCtrl'
    }
  }
})


.state('tab.history', {
  url: '/history',
  views: {
    'tab-account': {
      templateUrl: 'templates/history.html',
      controller: 'HistoryCtrl'
    }
  }
})

  .state('tab.favorite', {
      url: '/favorites',
      views:{
        'tab-account':{
          templateUrl: 'templates/favorite.html',
          controller: 'FavoriteCtrl'
        }
     }
  })

  .state('login', {
      url: '/',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })



  .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'RegisterCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/login');

});
