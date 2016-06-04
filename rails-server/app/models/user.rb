class User < ActiveRecord::Base
  has_many :comments
  has_many :reactions
  has_many :chapters, through: :reactions
  has_many :reviews
  has_many :solo_readings
  has_many :books, through: :solo_readings
  has_many :memberships
  has_many :groups, through: :memberships


end
