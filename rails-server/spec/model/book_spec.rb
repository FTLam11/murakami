require 'rails_helper'

describe Book do
  # let (:book) {Book.create(name: "TurtleMaster",  author: "Fronk", genre: "Humor", publisher: "DBC")}

  it { should have_many(:reviewers).with_foreign_key('user_id') }
end
