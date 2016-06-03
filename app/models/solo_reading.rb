class Solo_Reading < ActiveRecord::Base
  belongs_to :reader, class_name: "User"
  belongs_to :book
end
