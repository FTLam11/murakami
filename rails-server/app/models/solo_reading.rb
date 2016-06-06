class SoloReading < ActiveRecord::Base
  include ApplicationHelper


  belongs_to :reader, class_name: "User", foreign_key: :user_id
  belongs_to :book

  validates :user_id, :book_id, presence: true

  def recommendations(user_id)
    rec_criteria = {author: [], genre: []}
    user_books = User.find(user_id).books

    user_books.each do |book|
      rec_criteria[:author] << book.author
      rec_criteria[:genre] << book.genre
    end

    return rec_criteria.each {|criterion,array| array.uniq!}
  end

  def retrieve_rec_books(criteria)
    rec_books = []
    Book.all.each do |book|
      criteria[:author].each do |author|
        rec_books << book if book.author == author
      end
      criteria[:genre].each do |genre|
        rec_books << book if book.genre == genre && !rec_books.include?(book)
      end
    end

    return rec_books
  end

  def trending_now
    current_books = SoloReading.where(current: true)
  end

  def select_popular_readings(readings_arr)
    books = {}

    readings_arr.select { |reading| readings_arr.count(reading.book_id) > 1 }
  end

    def self.book_lists(user_id, type)

      if type == "history"
        readings = SoloReading.where(user_id: user_id, current: false, queue: false)
      else
        readings = SoloReading.where(user_id: user_id, "#{type}" => true)
      end

      @books = []

      if readings.length > 0
        readings.each do |reading|
          @books << reading.book
        end
      return @books
      end
    end
 end


