class Book < ActiveRecord::Base
  has_many :reviews
  has_many :solo_readings
  has_many :group_readings
  has_many :chapters
  has_many :reviewers, through: :reviews, foreign_key: :user_id
  has_many :groups, through: :group_readings
  has_many :readers, through: :solo_readings, foreign_key: :user_id

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
end
