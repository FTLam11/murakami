class BooksController < ApplicationController
  include ApplicationHelper

  def create
    user = User.find(params["user_id"])
    @reading = Book.add_book(params, user)
    if @reading.current
      render json: {token: user.id, book: "dont"}, status: :ok
    else
      @reading.current = true
      @reading.save
      render json: {token: user.id, book: @reading.book}, status: :ok
    end
  end

  def check_books
    p params["book_id"]
    book = Book.find(params["book_id"])
    render json: {book: book}, status: :ok
  end

  def add_to_current
    # puts "==============================="
    # p params
    # user = User.find(params["user_id"])
    # @reading = Book.add_book_by_id(params["book_id"], params["user_id"])
    # @reading.current = true
    # @reading.queue = false
    # @reading.complete = false
    # @reading.save
    render json: {token: user.id}, status: :ok
  end

  def add_to_favorites
    add_book(params, user)
    @reading.favorite = true
  end

  def add_to_queue
    user = User.find(params["user_id"])
    @reading = Book.add_book_by_id(params, user)
    @reading.queue = true
    @reading.save
    render json: {token: user.id, book: @reading.book}, status: :ok
  end

  def mark_complete
    user_id = params["user_id"].to_i
    user = User.find(user_id)
    book_id = params["book_id"].to_i

    @reading = SoloReading.find_by(user_id: user_id, book_id: book_id)

    @reading.complete = true
    @reading.current = false
    @reading.save

    render json: {test: 3}
  end

  def show
    @book = Book.find(params[:book_id])
  end

end
