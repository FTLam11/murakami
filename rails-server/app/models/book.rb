class Book < ActiveRecord::Base
  has_many :reviews
  has_many :solo_readings
  has_many :group_readings
  has_many :chapters
  has_many :reviewers, through: :reviews, foreign_key: :user_id
  has_many :groups, through: :group_readings
  has_many :readers, through: :solo_readings, foreign_key: :user_id

  # validates :title, :author, :genre, :image_url, :page_numbers, :date_published, presence: true

  def self.add_book(params, user, make_chapters = true)
    book_in_library?(params)? add_to_user(params, user) :  add_to_library(params, user, make_chapters)
  end

  def self.book_in_library?(params)
    Book.find_by(title: params['book']['title'])
  end

  def self.add_to_library(params, user, make_chapters)
    added_book = create_book(params, user)
    Chapter.create_chapters(added_book, params[:chapter_count]) if make_chapters == true
    added_book
  end 

  def self.create_book(params, user)
    user.books.create(title: params['book']['title'], description: params['book']['description'], author: params['book']['author'], image_url: params['book']['image_url'], page_numbers: params['book']['page_numbers'], date_published: params['book']['publishedDate'])
  end

  def self.add_to_user(params, user)
    book = Book.find_by(title: params['book']['title'])
    user_has_book?(user, book)? book : SoloReading.create(user_id: user.id, book_id: book.id)
  end

  def self.user_has_book?(user, book)
    SoloReading.find_by(user_id:user.id, book_id:book.id)
  end
end
