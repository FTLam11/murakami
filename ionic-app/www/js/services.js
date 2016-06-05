angular.module('starter.services', [])

.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (name == 'user' && pw == 'secret') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.factory('Books', function(){
  var books = [{
    id:0,
    title: "First Book",
    author: "John Doe",
    image: "img/catcher.jpg",
    description: "This is a great book that has a plot. The characters exist and they do many things"
  }, {
    id:1,
    title: "Second Book",
    author: "Jane Doe",
    image: "img/enders.jpg",
    description: "This is a great book that has a plot. The characters exist and they do many things"
  }, {
    id:2,
    title: "Third Book",
    author: "Juniper Doe",
    image: "img/download.jpeg",
    description: "This is a great book that has a plot. The characters exist and they do many things"
    }];

  return {
    all: function() {
      return books;
    },
    remove: function(book) {
      books.splice(books.indexOf(book), 1);
    },
    get: function(bookId) {
      for (var i = 0; i < books.length; i++) {
        if (books[i].id === parseInt(bookId)) {
          return books[i];
        }
      }
      return null;
    }
  };

})
