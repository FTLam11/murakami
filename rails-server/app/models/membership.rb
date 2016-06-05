class Membership < ActiveRecord::Base
  belongs_to :user
  belongs_to :group

  validates :user_id, :group_id, :admin, presence: true
end
