class ReactionsController < ApplicationController

  def index
    @reactions = Chapter.find_by(:params[chapter_id]).reactions
    #pass to the client for them to show
  end

  def
  end

  def show
    @reaction = Reaction.find(reaction_id)
    @comments = @reaction.comments
  end

end
