class ReactionsController < ApplicationController

  def create
    reaction = Reaction.create(content: params["content"], chapter_id: params["chapter_id"], user_id: params["user_id"])
    render json: { reaction: reaction.content, user: reaction.user.user_name }
  end

  def index
    chapter_id = params[:chapter_id]
    books = Book.all
    chapter_int = chapter_id.to_i

    chapter = Chapter.find(chapter_int)
    specific_book = Book.find(chapter.book_id)
    p specific_book


    reactions = Reaction.all
    current_reactions = []
    current_users = []

    users = User.all
    reactions.each do |reaction|
      if reaction.chapter_id == chapter_int
        # current_reactions << reaction
        # current_users << users.find(reaction.user_id)
        current_reactions << {reaction: reaction.content, user: reaction.user.user_name}
      end
    end


    # reactions = Reaction.all.select {|reaction| reaction.chapter_id == chapter_id}
    render json: { reactions: current_reactions, specific_book: specific_book}
  end

  def show
    reaction = Reaction.find(params[:id])
    comments = reaction.comments
    render json: { reaction: reaction, comments: comments }
  end

  private

  def reaction_params
    params.require(:reaction).print(:chapter_id, :content, :user_id)
  end

end
