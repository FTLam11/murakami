require 'rails_helper'

describe "BookController" do
  let (:book) {Book.create(id: 1, title: "The Jungle Book", author: "Alex Wen", genre: "fantasy", image_url: "google.com", description: "Amazing book about the jungle", page_numbers: 15, date_published: 10202018)}
  let (:user) {User.create()}
  describe "finding books" do
    it "finds a specific book" do
      book_id = 1
      check_books
      json = JSON.parse(response)
      expect json.to eq(:book)
    end
  end

  describe "adding books to favorite" do
    it "adds a book to favrorites" do

    end
  end

end
