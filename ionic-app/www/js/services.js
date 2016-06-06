angular.module('starter.services', [])



.factory('Books', function(){
  var currentBooks = [];
  var queueBooks = [];
  var favoriteBooks = [];
  var historyBooks = [];



  return {
    all: function(type) {
      if (type === "current"){
      var books = currentBooks
      } else if (type === "queue") {
        var books = queueBooks
      } else if (type === "favorite") {
        var books = favoriteBooks
      } else if (type === "history") {
        var books = historyBooks
      }
      return books;
    },
    remove: function(book) {
      currentBooks.splice(books.indexOf(book), 1);
    },
    get: function(bookId) {
      for (var i = 0; i < currentBooks.length; i++) {
        if (books[i].id === parseInt(bookId)) {
          return currentBooks[i];
        }
      }
      return null;
    },
    add: function(book_array, type){
      if (type === "current"){
      var books = currentBooks
      } else if (type === "queue") {
        var books = queueBooks
      } else if (type === "favorite") {
        var books = favoriteBooks
      } else if (type === "history") {
        var books = historyBooks
      }
      book_array.forEach(function(book){
        books.push(book)
      })
    },
    addOne: function(book, type){
      if (type === "current"){
      var books = currentBooks
      } else if (type === "queue") {
        var books = queueBooks
      } else if (type === "favorite") {
        var books = favoriteBooks
      } else if (type === "history") {
        var books = historyBooks
      }
      books.push(book)
    }
  };

})
