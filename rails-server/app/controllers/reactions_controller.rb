class ReactionsController < ApplicationController

  def create
    reaction = Reaction.create(reaction_params)
    render json: { reaction: reaction.content, reaction_id: reaction.id, username: reaction.user.user_name }
  end

  def index
    chapter = Chapter.find(params[:chapter_id])
    specific_book = Book.find(chapter.book_id)
    reactions = Reaction.get_reaction_details(chapter.id)
    render json: { reactions: reactions, specific_book: specific_book}
  end

  def show
    reaction = Reaction.find(params[:id])
    comments = reaction.comments
    render json: { reaction: reaction, comments: comments }
  end

  private

  def reaction_params
    params.require(:reaction).permit(:chapter_id, :content, :user_id)
  end

end
