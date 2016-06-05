class SoloReading < ActiveRecord::Base
  belongs_to :reader, class_name: "User"
  belongs_to :book

  validates :user_id, :book_id, :favorite, :complete, :queue, :current, presence: true

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

  private
    def book_lists(user_id, type)

      if type == "history"
        readings = SoloReading.where(user_id: current_user.id, current: false, queue: false)
      else
        readings = SoloReading.where(user_id: current_user.id, "#{type}" => true)
      end

      if readings.length > 0
        @books = readings.books
      else
        @books = []
      end
    end
end