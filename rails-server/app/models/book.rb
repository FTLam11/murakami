class Book < ActiveRecord::Base
  has_many :reviews
  has_many :solo_readings
  has_many :group_readings
  has_many :chapters
  has_many :reviewers, through: :reviews, foreign_key: :user_id
  has_many :groups, through: :group_readings
  has_many :readers, through: :solo_readings, foreign_key: :user_id

  validates :name, :author, :genre, :image_url, :page_numbers, :date_published, presence: true

  def add_book

    book = Book.find_by(name: params[:title], author: params[:author])

    if book == nil
      new_book = current_user.books.create(params[book])
      params[:chapter_count].times do |num|
        new_book.chapters.create(number: num)
      end
      find_reading
    else
      if find_reading == nil
        current_user.books << book
      end
    end
  end

  def find_reading
    @reading = SoloReading.find_by(user_id:current_user.id, book_id:book.id)
  end
end
