class BooksController < ApplicationController

  def create
    Book.add_book
    @reading.queue = true
  end

  def add_to_current
    add_book
    @reading.current = true
    @reading.queue = false
    @reading.complete = false
  end

  def add_to_favorites
    add_book
    @reading.favorite = true
  end

  def mark_complete
    find_reading
    @reading.current = false
    @reading.complete = true
  end

  def show
    @book = Book.find(params[:book_id])
  end

end
