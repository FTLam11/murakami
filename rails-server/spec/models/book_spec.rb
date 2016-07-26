require 'rails_helper'

describe Book do
    describe "#add_book" do
        let (:params) { {"book" => {"title" => "TurtleMaster",  "description" => "TMNT", "author" => "Fronk", "image_url" => "test", "page_numbers" => 50, "date_published" => 1945}, chapter_count: 10} }
        let (:user) { User.create(user_name: "Fronk",  email: "Fronk@fronk.fronk", password_digest: "fronk", image_url: "test") }

        context "given the book does not exist in the database" do
            it "creates a new Book" do
                expect { Book.add_book(params, user) }.to change { Book.count }.by(1)
            end

            it "creates chapters for the added book" do
                expect { Book.add_book(params, user) }.to change { Chapter.count }.by(10)
            end

            it "associates the added book with the correct user" do
                Book.add_book(params, user)
                expect(SoloReading.find_by(user_id: user.id, book_id: Book.last.id)).to_not be nil
            end

            it "returns the added book"
        end

        context "given the book exists in the database" do
            before(:each) do
                Book.create(params['book'])
                Book.add_book(params, user)
            end

            it "does not create a new Book" do
                expect { Book.add_book(params, user) }.to_not change { Book.count }
            end

            it "doest not create chapters for the book" do
                expect { Book.add_book(params, user) }.to_not change { Chapter.count }
            end

            it "associates the existing book with the correct user" do
                expect(SoloReading.find_by(user_id: user.id, book_id: Book.last.id)).to_not be nil               
            end
        end
    end
end
