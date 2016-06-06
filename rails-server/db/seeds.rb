bob = User.create(user_name: "bob",  email: Faker::Internet.email, password: "password", image_url: Faker::Internet.url)

bob2 = User.create(user_name: "bob2",  email: Faker::Internet.email, password: "password", image_url: Faker::Internet.url)

4.times do
  Book.create(title: Faker::Book.title,  author: Faker::Book.author, genre: Faker::Book.genre, image_url: Faker::Internet.url, page_numbers: Faker::Number.number(3), date_published: 1945)
end

Book.create(title: "bob",  author: "bob", genre: "bob", image_url: "bob", page_numbers: 1, date_published: 1945)

SoloReading.create(user_id: 1, book_id: 1, favorite: true, complete: false, queue: true, current: false)
SoloReading.create(user_id: 1, book_id: 5, favorite: true, complete: false, queue: true, current: false)

SoloReading.create(user_id: 2, book_id: 5, favorite: true, complete: false, queue: true, current: false)
SoloReading.create(user_id: 2, book_id: 4, favorite: true, complete: false, queue: false, current: true)
SoloReading.create(user_id: 2, book_id: 3, favorite: true, complete: true, queue: false, current: false)

Review.create(user_id: 1, book_id: 1, content: "What an exquisite read", rating: 10)
Review.create(user_id: 2, book_id: 1, content: "Never again", rating: 4)

Book.last.chapters.create(number: 1, title: "Bob's Beginning Chapter 1")
Book.last.chapters.create(number: 2, title: "Bob's Beginning Chapter 2")
Book.last.chapters.create(number: 3, title: "Bob's Beginning Chapter 3")
Book.last.chapters.create(number: 4, title: "Bob's Beginning Chapter 4")
Book.last.chapters.create(number: 5, title: "Bob's Beginning Chapter 5")
Book.last.chapters.create(number: 6, title: "Bob's Beginning Chapter 6")

Book.find(3).chapters.create(number: 1, title: "Book 3 Chapter 1")
Book.find(3).chapters.create(number: 2, title: "Book 3 Chapter 2")
Book.find(3).chapters.create(number: 3, title: "Book 3 Chapter 3")
Book.find(3).chapters.create(number: 4, title: "Book 3 Chapter 4")
Book.find(3).chapters.create(number: 5, title: "Book 3 Chapter 5")
Book.find(3).chapters.create(number: 6, title: "Book 3 Chapter 6")
Book.find(3).chapters.create(number: 7, title: "Book 3 Chapter 7")
Book.find(3).chapters.create(number: 8, title: "Book 3 Chapter 8")

bob.reactions.create(chapter_id: 1, content: " reaction 1")
bob2.reactions.create(chapter_id: 1, content: " reaction 2")
bob.reactions.create(chapter_id: 2, content: " reaction 3")
bob2.reactions.create(chapter_id: 2, content: " reaction 4")
bob.reactions.create(chapter_id: 3, content: " reaction 5")
bob2.reactions.create(chapter_id: 3, content: " reaction 6")
bob.reactions.create(chapter_id: 4, content: " reaction 7")
bob2.reactions.create(chapter_id: 4, content: " reaction 8")
bob.reactions.create(chapter_id: 5, content: " reaction 9")
bob2.reactions.create(chapter_id: 5, content: " reaction 10")
bob.reactions.create(chapter_id: 6, content: " reaction 11")
bob2.reactions.create(chapter_id: 6, content: " reaction 12")

bob2.comments.create(reaction_id: 1, content: "Seriously? You're Bob too?")
bob.comments.create(reaction_id: 2, content: "Hey, Bob is a perfectly nice name.")



