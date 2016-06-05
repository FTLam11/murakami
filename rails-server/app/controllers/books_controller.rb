class BooksController < ApplicationController
  include ApplicationHelper

  def create
    p params[:user_id]
    current_user = User.find(params[:user_id])
    Book.add_book(params, current_user)
    @reading.queue = true
  end

  def add_to_current
    add_book(params)
    @reading.current = true
    @reading.queue = false
    @reading.complete = false
  end

  def add_to_favorites
    add_book(params)
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
