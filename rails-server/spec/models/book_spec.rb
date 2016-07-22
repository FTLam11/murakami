require 'rails_helper'

describe Book do
    describe "associations" do
        it { should have_many(:reviewers).with_foreign_key('user_id') }
    end

    describe "#add_book" do
        context "given the book has not been added to the database" do
            let (:params) { {"book" => {"title" => "TurtleMaster",  "description" => "TMNT", "author" => "Fronk", "image_url" => "test", "page_numbers" => 50, "date_published" => 1945}} }
            let (:user) { User.create(user_name: "Fronk",  email: "Fronk@fronk.fronk", password_digest: "fronk", image_url: "test") }
            it "creates a new entry in the Books table" do
                expect { Book.add_book(params, user) }.to change{ Book.count }.by(1)
            end
        end
    end
end
