class BooksController < ApplicationController

  def index
    current_user
    rec_criteria = recommendations(current_user.id)
    @rec_books = retrieve_rec_books(rec_criteria)
  end

  def

  end

  def create
    #we will receive a JSON object by carrier pigeon which we will then convert into a new book(if it doesn't already exist) into the database. book { title: "Blah", author: "Liz", etc...}
    if Book.find_by(name: book[:title]) == nil && Book.find_by(author: book[:author]) == nil
      current_user.books.create(params)
    else
      current_user.books << book
    end
  end

end
