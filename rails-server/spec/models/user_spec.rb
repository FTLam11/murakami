require 'rails_helper'

describe User do
  let (:user) {User.create(user_name: "fronk", email: "bob@bob.com", image_url: "http://schillerwisozk.info/zachery")}
  let (:book) {Book.create(name: "TurtleMaster",  author: "Fronk", genre: "Humor", publisher: "DBC")}
  let (:book2) {Book.create(name: "SquirrelLord",  author: "Fronk", genre: "Humor", publisher: "DBC")}

  it "has many comments" do
    user.comments.create(content: "BLEEP")
    user.comments.create(content: "NO")
    expect(user.comments.count).to be > 1
  end

  it "has many reviewed books" do
    user.reviews.create(book_id: 1, content: "Whee", rating: 9)
    user.reviews.create(book_id: 2, content: "Yay", rating: 7)
    expect(user.reviews.count).to be > 1
  end
end
