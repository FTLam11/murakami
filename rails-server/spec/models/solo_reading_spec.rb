require 'rails_helper'

describe SoloReading do
	describe "#updatestatus" do
		let (:reading) { SoloReading.new(book_id: 1, user_id: 1) }

		context "status is current" do
			it "changes status for current to true" do
				reading.update_status("current")
  		  expect(SoloReading.find_by(book_id: 1, user_id: 1).current).to be(true)
			end
		end

		context "status is queue" do
			it "changes status for queue to true" do
				reading.update_status("queue")
  		  expect(SoloReading.find_by(book_id: 1, user_id: 1).queue).to be(true)
			end
		end

	end
end