class BooksController < ApplicationController
  include ApplicationHelper

  def create
    user = User.find(params["user_id"])
    @reading = Book.add_book(params, user)
    if @reading.current
      render json: {token: user.id, book: "dont"}, status: :ok
    else
      Book.update_status(current, @reading)
      @reading.queue = false
      render json: {token: user.id, book: @reading.book}, status: :ok
    end
  end

  def check_books
    book = Book.find(params["book_id"])
    render json: {book: book}, status: :ok
  end

  def add_to_current
    user = User.find(params["user_id"])
    @reading = Book.add_book_by_id(params, user)
    Book.update_status(current, @reading)
    @reading.queue = false
    @reading.complete = false
    render json: {token: user.id}, status: :ok
  end

  def add_to_favorites
    user = User.find(params["user_id"])
    @reading = Book.add_book_by_id(params, user)
    if @reading.favorite == true
      @reading.favorite = false
    else
      @reading.favorite = true
    end
    @reading.save
    render json: {token: user.id, book: @reading.book}, status: :ok
  end

  def add_to_queue
    user = User.find(params["user_id"])
    @reading = Book.add_book_by_id(params, user)
    Book.update_status(queue,@reading)
    render json: {token: user.id, book: @reading.book}, status: :ok
  end

  def mark_complete
    user_id = params["user_id"].to_i
    user = User.find(user_id)
    book_id = params["book_id"].to_i
    @reading = SoloReading.find_by(user_id: user_id, book_id: book_id)
    @reading.current = false
    Book.update_status(complete, @reading)
    render json: {token: user.id, book: @reading.book}, status: :ok
  end

  def show
    book_id = params["book_id"].to_i
    @book = Book.find(book_id)
    render json: {token: session[:user_id], book: @book}, status: :ok
  end

end
