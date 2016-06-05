30.times do
  Book.create(name: Faker::Book.title,  author: Faker::Book.author, genre: Faker::Book.genre)
end

30.times do
  User.create(user_name: Faker::Internet.user_name,  email: Faker::Internet.email, password: "password", image_url: Faker::Internet.url)
end

SoloReading.create(user_id: 1, book_id: 1, favorite: true, complete: false, queue: false, current: true)


