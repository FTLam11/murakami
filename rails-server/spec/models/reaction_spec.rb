require 'rails_helper'

describe Reaction do
  describe "Reaction::get_reaction_details" do
    context "when given a chapter id" do
      before(:each) do
        fronk = User.create(user_name: "Fronk",  email: "Fronk@fronk.fronk", password_digest: "fronk", image_url: "birdnest")
        bob = User.create(user_name: "bob",  email: "bob@bob.bob", password_digest: "bob", image_url: "mouse")
        Reaction.create(chapter_id: 4, content: "Test", user_id: fronk.id)
        Reaction.create(chapter_id: 4, content: "Bob", user_id: bob.id)
      end

      it "returns the reaction content of all reactions for that chapter" do
        expect(Reaction.get_reaction_details(4).first[:reaction]).to eq("Test")
        expect(Reaction.get_reaction_details(4).last[:reaction]).to eq("Bob")
      end

      it "returns the reaction author of all reactions for that chapter" do
        expect(Reaction.get_reaction_details(4).first[:username]).to eq("Fronk")
        expect(Reaction.get_reaction_details(4).last[:username]).to eq("bob")
      end

      it "returns the user avatar URL of all reactions for that chapter" do
        expect(Reaction.get_reaction_details(4).first[:userAvatar]).to eq("birdnest")
        expect(Reaction.get_reaction_details(4).last[:userAvatar]).to eq("mouse")
      end      
    end
  end
end