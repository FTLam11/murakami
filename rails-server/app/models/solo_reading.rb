class SoloReading < ActiveRecord::Base
  belongs_to :reader, class_name: "User"
  belongs_to :book
end
