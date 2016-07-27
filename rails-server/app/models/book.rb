class Book < ActiveRecord::Base
  has_many :reviews
  has_many :solo_readings
  has_many :group_readings
  has_many :chapters
  has_many :reviewers, through: :reviews, foreign_key: :user_id
  has_many :groups, through: :group_readings
  has_many :readers, through: :solo_readings, foreign_key: :user_id

  # validates :title, :author, :genre, :image_url, :page_numbers, :date_published, presence: true

  #returns book, update the reading status
  def self.add_book(params, user, make_chapters = true)
    # 1. Does the book exist in the DB?
    # 2. No? Make the book, make chapters for it, (return the book)
    # 3. Yes? (Then another user has already added that book) Did the user already add to their books?
    # 4. Yes? Return the book
    # 5. No? Add book to user's readings, return the book 
    # Maybe check if params[:chapters] != nil
    unless book_in_db?(params)
      added_book = add_book_to_library(params, user)
      create_chapters(added_book, params[:chapter_count]) if make_chapters == true
      # @reading = SoloReading.find_by(user_id:user.id, book_id:added_book.id)
      return added_book
    end

    book = Book.find_by(title: params['book']['title'])
      # @reading = get_reading(user, params)
    unless get_reading(user, book)
      SoloReading.create(user_id: user.id, book_id: book.id)
        # user.books << book
        # @reading = SoloReading.last
    end

    return book
      # @reading ##probably not necessary
    end
  end

  def self.get_reading(user, book)
    SoloReading.find_by(user_id:user.id, book_id:book.id)
  end

  def self.add_book_to_library(params, user)
    user.books.create(title: params['book']['title'], description: params['book']['description'], author: params['book']['author'], image_url: params['book']['image_url'], page_numbers: params['book']['page_numbers'], date_published: params['book']['publishedDate'])
  end

  def self.book_in_db?(params)
    Book.find_by(title: params['book']['title'])
  end

  # def self.user_has_book?(params, user)
  #   return true if SoloReading.find_by(user_id:user.id, book_id: Book.find_by(title: params['book']['title']))
  # end


  def self.create_chapters(book, nums)
    nums.times do |num|
      book.chapters.create(number: num)
    end
  end

  def self.add_book_by_id(params, user)
    book = Book.find_by(title: params['book']['title'])

    if book == nil
      new_book = user.books.create(title: params['book']['title'], description: params['book']['description'], author: params['book']['author'], image_url: params['book']['image_url'], page_numbers: params['book']['page_numbers'], date_published: params['book']['publishedDate'])
      @reading = SoloReading.find_by(user_id:user.id, book_id:new_book.id)
    else
      @reading = SoloReading.find_by(user_id:user.id, book_id:book.id)
      if @reading == nil
        user.books << book
        @reading = SoloReading.last
      end

      @reading
    end
  end

  def self.find_reading
    @reading = SoloReading.find_by(user_id:current_user.id, book_id:book.id)
  end

  # private

  # def book_params
  #   params.require(:book).permit(:title, :author, :genre, :image_url, :page_numbers, :date_published)
  # end

end
