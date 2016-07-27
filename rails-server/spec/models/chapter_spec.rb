require 'rails_helper'

describe Chapter do
  let (:book) {Book.create("title" => "TurtleMaster",  "description" => "TMNT", "author" => "Fronk", "image_url" => "test", "page_numbers" => 50, "date_published" => 1945)}

  describe "Chapter::create_chapters" do
    it "creates chapters for a given book" do
      expect { Chapter.create_chapters(book, 10)}.to change {Chapter.count}.by(10)
    end
  end
end