class ReactionsController < ApplicationController

  def create
    reaction = Reaction.create(reaction_params)
    render json: { reaction: reaction.content, reaction_id: reaction.id, username: reaction.user.user_name }
  end

  def index
    chapter_id = params[:chapter_id]
    books = Book.all
    chapter_int = chapter_id.to_i

    chapter = Chapter.find(chapter_int)
    specific_book = Book.find(chapter.book_id)

    reactions = Reaction.all
    
    Reaction.check_reactions(reactions)
    render json: { reactions: current_reactions, specific_book: specific_book}
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
