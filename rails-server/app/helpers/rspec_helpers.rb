module Helpers
  def create_user_helper
    User.create(user_name: "Fronk",  email: "Fronk@fronk.fronk", password_digest: "fronk", image_url: "test")
  end

  def create_readings_helper
    Book.create!("title" => "PKMN",  "description" => "I wanna be the best!", "author" => "Red", "image_url" => "test", "page_numbers" => 70, "date_published" => 2010)
    SoloReading.create!(user_id: user.id, book_id: Book.last.id)
    Book.create!("title" => "TurtleMaster",  "description" => "TMNT", "author" => "Fronk", "image_url" => "test", "page_numbers" => 50, "date_published" => 1945)
    SoloReading.create!(user_id: user.id, book_id: Book.last.id, current: true)
    Book.create!("title" => "Telemaster",  "description" => "Exciting!", "author" => "Fronk", "image_url" => "test", "page_numbers" => 500, "date_published" => 2001)
    SoloReading.create!(user_id: user.id, book_id: Book.last.id, current: true)
  end

  def trending_readings_helper
    Book.create!("title" => "PKMN",  "description" => "I wanna be the best!", "author" => "Red", "image_url" => "test", "page_numbers" => 70, "date_published" => 2010)
    SoloReading.create(user_id: 1, book_id: Book.last.id, current: true)
    SoloReading.create(user_id: 2, book_id: Book.last.id, current: true)
    Book.create!("title" => "TurtleMaster",  "description" => "TMNT", "author" => "Fronk", "image_url" => "test", "page_numbers" => 50, "date_published" => 1945)
    SoloReading.create(user_id: 1, book_id: Book.last.id, current: true)
    SoloReading.create(user_id: 2, book_id: Book.last.id, current: true)
  end
end