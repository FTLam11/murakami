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

Book.last.chapters.create(number: 1, title: "Bob's Beginning")
Book.last.chapters.create(number: 2, title: "Bob's Beginning")

bob.reactions.create(chapter_id: 1, content: "Wow I never knew there was another Bob just like me.")
bob2.reactions.create(chapter_id: 2, content: "I'm nothing like this bob guy.")

bob2.comments.create(reaction_id: 1, content: "Seriously? You're Bob too?")
bob.comments.create(reaction_id: 2, content: "Hey, Bob is a perfectly nice name.")



