class Reaction < ActiveRecord::Base
  belongs_to :chapter
  belongs_to :user
  has_many :comments
end
