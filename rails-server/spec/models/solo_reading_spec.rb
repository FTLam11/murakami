require 'rails_helper'
require 'rspec_helpers'

describe SoloReading do

include Helpers

  describe "SoloReading::recommendations" do
    let (:user) { create_user_helper }
    let (:recommendations) { SoloReading.recommendations(user.id) }

    before(:each) do
      create_readings_helper
    end

    context "when a user has added books to any of their lists" do
      it "returns a collection of all authors from a user's books" do
        expect(recommendations).to include("Fronk")
        expect(recommendations).to include("Red")
      end
    end

    context "when a user has different books by the same author" do
      it "returns a collection of unique authors from a user's books" do
        expect(recommendations).to eq( ["Red", "Fronk"])
      end
    end
  end

  describe "SoloReading::update_status" do
    let (:reading) { SoloReading.new(book_id: 1, user_id: 1) }

    context "when status is current" do
      it "changes status for current to true and queue to false" do
        reading.update_status("current")
        expect(SoloReading.find_by(book_id: 1, user_id: 1).current).to be(true)
        expect(SoloReading.find_by(book_id: 1, user_id: 1).queue).to be(false)
      end
    end

    context "when status is queue" do
      it "changes status for queue to true and current to false" do
        reading.update_status("queue")
        expect(SoloReading.find_by(book_id: 1, user_id: 1).queue).to be(true)
        expect(SoloReading.find_by(book_id: 1, user_id: 1).current).to be(false)
      end
    end

    context "when status is complete" do
      it "changes status for complete to true and current to false" do
        reading.update_status("complete")
        expect(SoloReading.find_by(book_id: 1, user_id: 1).complete).to be(true)
        expect(SoloReading.find_by(book_id: 1, user_id: 1).current).to be(false)
      end
    end
  end

  describe "SoloReading::trending" do
    context "when type is 'current'" do
      it "returns the most popular current books" do
        trending_readings_helper
        expect(SoloReading.trending("current")).to eq Book.last(2)
      end
    end
  end

  describe "SoloReading::plural_readings" do
    before(:each) do
      SoloReading.create(user_id: 1, book_id: 1, current: true)
      SoloReading.create(user_id: 2, book_id: 1, current: true)
      SoloReading.create(user_id: 3, book_id: 1, current: true)
      SoloReading.create(user_id: 1, book_id: 2, current: true)
      SoloReading.create(user_id: 1, book_id: 3, current: true)
    end

    context "when type is 'current'" do
      it "groups current readings by book" do
        expect(SoloReading.plural_readings("current").keys).to include(1)
        expect(SoloReading.plural_readings("current").values).to include(SoloReading.where(book_id: 1).last(3))
      end

      it "ignores current books that are only associated with one user" do
        expect(SoloReading.plural_readings("current")).to_not include(SoloReading.last(2))
      end
    end
  end

  describe "SoloReading::book_lists" do
    let (:user) { create_user_helper }

    before(:each) do
        create_readings_helper
    end 

    context "when type is current" do
      it "returns all current books of a user" do
        expect(SoloReading.book_lists(User.last.id, "current")).to eq(Book.last(2).flatten)
      end
    end

    context "when type is favorite" do
      it "returns all favorite books of a user" do
        Book.create!("title" => "Telemaster",  "description" => "Exciting!", "author" => "Fronk", "image_url" => "test", "page_numbers" => 500, "date_published" => 2001)
          SoloReading.create!(user_id: User.last.id, book_id: Book.last.id, favorite: true)
          expect(SoloReading.book_lists(User.last.id, "favorite")[0]).to eq(Book.last)
      end
    end

    context "when a user has no current books" do
      it "returns an empty array" do
        user_with_no_books = create_user_helper
        expect(SoloReading.book_lists(user_with_no_books.id, "current")).to eq []
      end
    end
  end
end