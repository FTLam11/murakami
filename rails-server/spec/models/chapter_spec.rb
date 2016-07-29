require 'rails_helper'

describe Chapter do
  let (:book) {Book.create("title" => "TurtleMaster",  "description" => "TMNT", "author" => "Fronk", "image_url" => "test", "page_numbers" => 50, "date_published" => 1945)}

  describe "Chapter::create_chapters" do
    it "creates chapters for a given book" do
      expect { Chapter.create_chapters(book, 10)}.to change {Chapter.count}.by(10)
    end

    context "when creating 10 chapters for a given book" do
      before(:each) do
        Chapter.create_chapters(book, 10)
      end
      
      let(:new_chapters) { Chapter.last(10) }

      it "creates chapter one" do
        expect(new_chapters.first.number).to eq(1)               
      end

      it "creates chapter ten" do
        expect(new_chapters.last.number).to eq(10)
      end
    end
  end
end