class Comment < ActiveRecord::Base
  belongs_to :reaction
  belongs_to :user
end
