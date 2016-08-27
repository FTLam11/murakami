require 'rails_helper'
require 'rspec_helpers'

describe Book do
    include Helpers
    describe "Book::add_book" do
        let (:book_params) { {"book" => {"title" => "TurtleMaster",  "description" => "TMNT", "author" => "Fronk", "image_url" => "test", "page_numbers" => 50, "date_published" => 1945}, chapter_count: 10} }
        let (:user) { create_user_helper }
        let (:user2) { create_user_helper("joules") }

        context "when a user adds a book to current" do
            it "creates a new Book" do
                expect { Book.add_book(book_params, user) }.to change { Book.count }.by(1)
            end

            it "creates chapters for the added book" do
                expect { Book.add_book(book_params, user) }.to change { Chapter.count }.by(10)
            end

            it "associates the added book with the correct user" do
                Book.add_book(book_params, user)
                expect(SoloReading.find_by(user_id: user.id, book_id: Book.last.id)).to_not be nil
            end
        end

        context "when a user adds a book to queue or favorites" do
            it "creates a new book" do
                expect { Book.add_book(book_params, user, false) }.to change { Book.count }.by(1)
            end

            it "does not create chapters for the book" do
                expect { Book.add_book(book_params, user, false) }.to_not change { Chapter.count }
            end

            it "associates the added book with the correct user" do
                Book.add_book(book_params, user)
                expect(SoloReading.find_by(user_id: user.id, book_id: Book.last.id)).to_not be nil
            end
        end

        context "when a user adds a book that has already been added by a different user" do
            before(:each) do
                Book.create(book_params['book'])
                Book.add_book(book_params, user)
                Book.add_book(book_params, user2)
            end

            it "does not create a new Book" do
                expect { Book.add_book(book_params, user2) }.to_not change { Book.count }
            end

            it "doest not create chapters for the book" do
                expect { Book.add_book(book_params, user2) }.to_not change { Chapter.count }
            end

            it "associates the existing book with the correct user" do
                expect(SoloReading.find_by(user_id: user2.id, book_id: Book.last.id)).to_not be nil               
            end
        end
    end
end
