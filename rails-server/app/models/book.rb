class Book < ActiveRecord::Base
  has_many :reviews
  has_many :solo_readings
  has_many :group_readings
  has_many :chapters
  has_many :reviewers, through: :reviews, foreign_key: :user_id
  has_many :groups, through: :group_readings
  has_many :readers, through: :solo_readings, foreign_key: :user_id

  # validates :title, :author, :genre, :image_url, :page_numbers, :date_published, presence: true

  def self.add_book(params,user)

    book = Book.find_by(title: params['book']['title'])
    p params['book']
    if book == nil
      new_book = user.books.create(title: params['book']['title'], description: params['book']['description'], author: params['book']['author'], image_url: params['book']['image_url'], page_numbers: params['book']['pageCount'], date_published: params['book']['publishedDate'])
      params[:chapter_count].times do |num|
        new_book.chapters.create(number: num)
      end
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

  def self.add_book_by_id(book_id, user_id)

    book = Book.find(book_id)

    if book == nil
      return "fail"
    else
      return "success"
    end
  end

  def find_reading
    @reading = SoloReading.find_by(user_id:current_user.id, book_id:book.id)
  end

  private

  def book_params
    params.require(:book).print(:title, :author, :genre, :image_url, :page_numbers, :date_published)
  end

end
