class Chapter < ActiveRecord::Base
  belongs_to :book
  has_many :reactions

  validates :book_id, :number, presence: true

  def self.create_chapters(book, nums)
    nums.times { |num| book.chapters.create(number: num) }
  end
end
