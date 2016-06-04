class BooksController < ApplicationController

  def create
    book_factory
    @reading.queue = true
  end

  def add_to_current
    book_factory
    @reading.current = true
    @reading.queue = false
    @reading.complete = false
  end

  def add_to_favorites
    book_factory
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
