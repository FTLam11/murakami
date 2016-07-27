require 'rails_helper'

describe SoloReading do
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
end