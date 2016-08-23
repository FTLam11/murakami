class BooksController < ApplicationController
  include ApplicationHelper

  def create #returns book or dont
    get_user
    @reading = Book.add_book(params, user)
    if @reading.current
      render json: {token: user.id, book: "dont"}, status: :ok
    else
      @reading.update_status("current")
      render json: {token: user.id, book: @reading.book}, status: :ok
    end
  end

  def check_books #move to model?
    book = Book.find(params["book_id"])
    render json: {book: book}, status: :ok
  end

  def add_to_current
    get_user
    @reading = Book.add_book_by_id(params, user)
    @reading.update_status("current") 
    render json: {token: user.id}, status: :ok
  end

  def add_to_favorites
    get_user
    @reading = Book.add_book_by_id(params, user)
    @reading.update_status("favorite")
    render json: {token: user.id, book: @reading.book}, status: :ok
  end

  def add_to_queue
    get_user
    @reading = Book.add_book_by_id(params, user)
    @reading.update_status("queue")
    render json: {token: user.id, book: @reading.book}, status: :ok
  end

  def mark_complete
    user_id = params["user_id"].to_i
    user = User.find(user_id)
    book_id = params["book_id"].to_i
    @reading = SoloReading.find_by(user_id: user_id, book_id: book_id)
    @reading.update_status("complete") 
    render json: {token: user.id, book: @reading.book}, status: :ok
  end

  def show
    book_id = params["book_id"].to_i
    @book = Book.find(book_id)
    render json: {token: session[:user_id], book: @book}, status: :ok
  end

end
