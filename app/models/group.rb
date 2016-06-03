class Group < ActiveRecord::Base
  has_many :memberships
  has_many :users, through: :memberships
  has_many :group_readings
  has_many :books, through: :group_readings
end
