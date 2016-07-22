class Book < ActiveRecord::Base
  has_many :reviews
  has_many :solo_readings
  has_many :group_readings
  has_many :chapters
  has_many :reviewers, through: :reviews, foreign_key: :user_id
  has_many :groups, through: :group_readings
  has_many :readers, through: :solo_readings, foreign_key: :user_id

  # validates :title, :author, :genre, :image_url, :page_numbers, :date_published, presence: true

  def self.add_book(params, user)
    #associate book with the user
    #create the book if it doesnt exist
    book = Book.find_by(title: params['book']['title'])
    if book == nil
      new_book = user.books.create(title: params['book']['title'], description: params['book']['description'], author: params['book']['author'], image_url: params['book']['image_url'], page_numbers: params['book']['page_numbers'], date_published: params['book']['publishedDate']) #user.books.create(book_params)
      create_chapters(new_book, params[:chapter_count])
      @reading = SoloReading.find_by(user_id:user.id, book_id:new_book.id)
    else
      @reading = SoloReading.find_by(user_id:user.id, book_id:book.id)
      if @reading == nil
        user.books << book
        @reading = SoloReading.last
      end

      @reading ##probably not necessary
    end
  end

  def self.update_status(status, reading)
    reading.status = true 
    reading.save  
  end 

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

  private

  def book_params
    params.require(:book).permit(:title, :author, :genre, :image_url, :page_numbers, :date_published)
  end

end
