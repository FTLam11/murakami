30.times do
  Book.create(name: Faker::Book.title,  author: Faker::Book.author, genre: Faker::Book.genre, publisher: Faker::Book.publisher)
end

30.times do
  User.create(user_name: Faker::Internet.user_name,  email: Faker::Internet.email, hashword: Faker::Internet.password(8), image_url: Faker::Internet.url)
end

SoloReading.create(user_id: 1, book_id: 1, favorite: true, complete: false, queue: false, current: true)


