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
    popular_books = plural_readings(type).sort_by { |book, readings| readings.length }.map { |book, reading| book = Book.find(book) }

    popular_books[0..8]
  end

  def self.plural_readings(type)
    SoloReading.where(type.to_sym => true).group_by { |reading| reading.book_id }.select { |book, readings| readings.length > 1 }
  end

  def self.book_lists(user_id, type)
    SoloReading.where(user_id: user_id, "#{type}" => true).map { |reading| reading = reading.book}
  end
 end


