30.times do
  books.create(name: Faker::Book.title, author: Faker::Book.author, genre: Faker::Book.genre, publisher: Faker::Book.publisher date: Faker::Date.between(10.years.ago, Date.today))
end

