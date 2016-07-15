class ChaptersController < ApplicationController

  def index
    book = Book.find(params[:book_id].to_i)
    first_chapter = book.chapters.first
    last_chapter = book.chapters.last
    render json: {first_chapter: first_chapter, last_chapter: last_chapter}
  end

  def show
    chapter = Chapter.find(params[:id])
    reactions = chapter.reactions
    render json: { chapter: chapter, reactions: reactions }
  end

end
