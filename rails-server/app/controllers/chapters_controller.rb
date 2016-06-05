class ChaptersController < ApplicationController

  def show
    chapter = Chapter.find(params[:id])
    render json: { reactions: chapter.reactions }
  end

end
