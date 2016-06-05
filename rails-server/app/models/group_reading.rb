class GroupReading < ActiveRecord::Base
  belongs_to :group
  belongs_to :book

  validates :group_id, :book_id, :favorite, :complete, :queue, :current, presence: true
end
