class SoloReading < ActiveRecord::Base
  include ApplicationHelper

  belongs_to :reader, class_name: "User", foreign_key: :user_id
  belongs_to :book

  validates :user_id, :book_id, presence: true

  def self.recommendations(user_id)
    rec_criteria = {author: []}

    User.find(user_id).books.each do |book|
      rec_criteria[:author] << book.author
    end

    rec_criteria.each {|criterion,array| array.uniq!}
  end

  def update_status(status)
    case status
        when "current"
          self.current = true
          self.queue = false 
        when "queue"
          self.queue = true 
          self.current = false
        when "complete"
          self.complete = true 
          self.current = false
        when "favorite"
          self.favorite = true 
    end

    self.save  
  end 

  def self.trending(type)
    popular_books = []

    tally_readings(plural_readings(type)).sort_by { |book, readings| readings }.each do |reading|
      popular_books << Book.find(reading[0])
    end

    popular_books
  end

  def self.tally_readings(readings_hash)
    reading_tally = {}

    readings_hash.each do |book, readings|
      reading_tally[book] = readings.length
    end

    reading_tally
  end

  def self.plural_readings(type)
    SoloReading.where(type.to_sym => true).group_by { |reading| reading.book_id }.select { |book, readings| readings.length > 1 }
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


