class BooksController < ApplicationController

  def index
    rec_criteria = recommendations(current_user.id)
    @rec_books = retrieve_rec_books(rec_criteria)
  end

  def book_factory
    if Book.find_by(name: book[:title]) == nil && Book.find_by(author: book[:author]) == nil
      #create the book and soloreading association
      new_book = current_user.books.create(params[book]) #params will come from API. WRITE METHOD FOR THAT.
      #create chapters for the book
      ##the params below will come from the form inputted by user
      params[:chapter_count].times do |num|
        new_book.chapter.create(number: num)
      end
      #set the queue attribute for the reading to true
    else
      current_user.books << book
    end
    @reading = SoloReading.find_by(user_id:current_user.id, book_id:new_book.id)
  end

  def create #add book to queue
    book_factory
    @reading.queue = true
  end

  def add_to_current
    book_factory
    @reading.current = true
    @reading.queue = false
  end

  def add_to_favorites
    book_factory
    @reading.favorite = true
  end

  def mark_complete
    #find the book
    soloreading = SoloReading.find_by(book_id: params[:book_id], user_id: current_user.id)
    soloreading.current = false
    soloreading.complete = true
    #set the current && queue = false
    #when you are on the last chapter, that should mark as complete. Assuming we have book_id, we can write the method to do this.
  end

end
