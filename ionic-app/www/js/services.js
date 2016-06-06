angular.module('starter.services', [])



.factory('Books', function(){
  var books = [];

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
    },
    add: function(book_array){
      book_array.forEach(function(book){
        books.push(book)
      })
    },
    addOne: function(book){
      books.push(book)
    }
  };

})
