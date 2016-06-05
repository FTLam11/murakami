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
        readings = SoloReading.where(user_id: current_user.id, current: false, queue: false)
      else
        readings = SoloReading.where(user_id: user_id, "#{type}" => true)
      end

      if readings.length > 0
        @books = readings.books
      else
        @books = { recommended: "Add books to your current reading list, queue, or favorites to receive recommendations!", current: "Books in progress appear here. Don't forget to share your reactions!", favorite: "What are your favorite books? Everyone wants to know!", queue: "Just heard about a great book? Add it here so you can read it later!", history: "Any books you finish automatically appear here. Better get to reading!"}
      end
    end
end
