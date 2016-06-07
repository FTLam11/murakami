class SoloReading < ActiveRecord::Base
  include ApplicationHelper

  belongs_to :reader, class_name: "User", foreign_key: :user_id
  belongs_to :book

  validates :user_id, :book_id, presence: true

  def self.recommendations(user_id)
    rec_criteria = {author: []}
    user_books = User.find(user_id).books

    user_books.each do |book|
      rec_criteria[:author] << book.author
    end

    return rec_criteria.each {|criterion,array| array.uniq!}
  end

  def self.retrieve_rec_books(criteria, user_id)
    rec_books = []
    user_books = User.find(user_id).books


    Book.all.each do |book|
      criteria[:author].each do |author|
        rec_books << book if book.author == author
      end
      # criteria[:genre].each do |genre|
      #   rec_books << book if book.genre == genre && !rec_books.include?(book)
      # end
    end

    return rec_books - user_books
  end

  def trending_now
    popular_books = []

    tally(filter_readings).values.sort.each do |reading|
      popular_books << Book.find(reading)
    end

    return popular_books
  end


  def filter_readings
    current_books = SoloReading.where(current: true)

    current_books.select { |reading| current_books.count(reading.book_id) > 1 }
  end

  def tally(readings_arr)
    reading_tally = {}

    readings_arr.each do |reading|
      if reading_tally[reading.book_id] == nil
        reading_tally[reading.book_id] = 1
      else
        reading_tally[reading.book_id] += 1
      end
    end

    return reading_tally
  end

  def self.book_lists(user_id, type)
    @books = []

    if type == "history"
      readings = SoloReading.where(user_id: user_id, complete: true)
    else
      readings = SoloReading.where(user_id: user_id, "#{type}" => true)
    end

    if readings.length > 0
      readings.each { |reading| @books << reading.book }
    end

    return @books
  end
 end


