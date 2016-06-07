angular.module('starter.services', [])



.factory('Books', function(){
  var currentBooks = [];
  var queueBooks = [];
  var favoriteBooks = [];
  var historyBooks = [];

  var control = function(type) {
    if (type === "current"){
      return currentBooks
      } else if (type === "queue") {
        return queueBooks
      } else if (type === "favorite") {
        return favoriteBooks
      } else if (type === "history") {
        return historyBooks
      }
  }



  return {
    all: function(type) {
      books = control(type)
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
      books = control(type)
      book_array.forEach(function(book){
        books.push(book)
      })
    },
    addOne: function(book, type){
      books = control(type)
      books.push(book)
    },
    remove: function(matchBook, type){
      books = control(type)
      var index = books.indexOf(matchBook)
      books.splice(index, 1)
    },
    checkBook: function(matchBook, type){
      books = control(type)
      books.forEach(function(book){
        if ((book.id === matchBook.book_id) === true){
          matchBook = true
        }
      }, matchBook)
      return matchBook
    },
    clearCurrent: function(){
      currentBooks = []
    }
  };

})
