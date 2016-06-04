require 'rails_helper'
require 'spec_helper'

describe User do
  let (:user) {User.create(user_name: "fronk", email: "bob@bob.com", image_url: "http://schillerwisozk.info/zachery")}
  let (:comment) {Comment.create(content: "BLEEP", user_id: 1)}

  describe "ActiveRecord associations" do
    it "has many comments" do
      expect(user).to have_many(:comments)
    end
  end

end
