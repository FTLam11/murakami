require 'rails_helper'

feature "User visits the homepage" do
  scenario "sees a list of all songs" do
    song = Song.create(title: 'Bohemiam Rhapsody', artist: 'Queen')
    visit '/'
    expect(page).to have_content 'Bohemiam Rhapsody'
  end
end

feature "User registers and logs in to their account" do
  let!(:user) { User.create(username: 'bob', email: 'bob@bob.com', password: 'bob') }
  scenario "registers a new user" do
    visit '/users/new'
    within('#new_user') do
      fill_in 'Username', :with => 'bob3'
      fill_in 'Email', :with => 'bob3@bob.com'
      fill_in 'Password', :with => 'bob3'
    end
    click_button 'Create User'
    expect(page).to have_content 'bob3\'s Songs'
  end

  scenario 'login to their account' do
    visit '/login'
    within('form') do
      fill_in 'Username', :with => 'bob'
      fill_in 'Password', :with => 'bob'
    end
    click_button 'Log In'
    expect(page).to have_content 'bob\'s Songs'
  end

  scenario 'logout from their account' do
    visit '/login'
    within('form') do
      fill_in 'Username', :with => 'bob'
      fill_in 'Password', :with => 'bob'
    end
    click_button 'Log In'
    click_link 'logout'
    expect(page).to have_content 'Logout successfully'
  end
end

feature "User favorites a song" do
  let!(:user) { User.create(username: 'bob', email: 'bob@bob.com', password: 'bob') }
  let!(:song) { Song.create(title: "Pony", artist: "Genuine") }
  scenario 'user can favorite a song' do
    visit '/login'
    within('form') do
      fill_in 'Username', :with => 'bob'
      fill_in 'Password', :with => 'bob'
    end
    click_button 'Log In'
    click_link 'home'
    click_link 'Favorite'
    click_link 'bob'
    expect(page).to have_content 'Pony'
  end
end
