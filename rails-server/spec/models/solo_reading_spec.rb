require 'rails_helper'

describe SoloReading do
  describe "SoloReading::recommendations" do
    before(:each) do
        fronk = User.create(user_name: "Fronk",  email: "Fronk@fronk.fronk", password_digest: "fronk", image_url: "test")
        Book.create!("title" => "PKMN",  "description" => "I wanna be the best!", "author" => "Red", "image_url" => "test", "page_numbers" => 70, "date_published" => 2010)
        SoloReading.create!(user_id: User.last.id, book_id: Book.last.id)
        Book.create!("title" => "TurtleMaster",  "description" => "TMNT", "author" => "Fronk", "image_url" => "test", "page_numbers" => 50, "date_published" => 1945)
        SoloReading.create!(user_id: User.last.id, book_id: Book.last.id)
        Book.create!("title" => "Telemaster",  "description" => "Exciting!", "author" => "Fronk", "image_url" => "test", "page_numbers" => 500, "date_published" => 2001)
        SoloReading.create!(user_id: User.last.id, book_id: Book.last.id)
    end
    
    let (:user) { User.last }
    let (:recommendations) { SoloReading.recommendations(user.id) }
    
    it "returns a collection of all authors from a user's books" do
      expect(recommendations[:author]).to include("Fronk")
      expect(recommendations[:author]).to include("Red")
    end

    context "when a user has different books by the same author" do
      it "returns a collection of unique authors from a user's books" do
        expect(recommendations).to eq({author: ["Red", "Fronk"]})
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

  describe "SoloReading::trending_now" do
    
    context "when type is 'current'" do
      it "returns the most popular books currently being read" do
        expect(SoloReading.trending_now("current")).to_not eq []
      end
    end
  end

  describe "SoloReading::readings_hash" do
    before(:each) do
      SoloReading.create(user_id: 1, book_id: 1, current: true)
      SoloReading.create(user_id: 2, book_id: 1, current: true)
      SoloReading.create(user_id: 3, book_id: 1, current: true)
      SoloReading.create(user_id: 1, book_id: 2, current: true)
      SoloReading.create(user_id: 1, book_id: 3, current: true)
    end
    it "returns readings of the requested type for any book associated with more than one user" do
      expect(SoloReading.readings_hash("current")).to eq(SoloReading.where(book_id: 1))
    end
  end

  describe "SoloReading::tally_readings" do
    ""
  end
end