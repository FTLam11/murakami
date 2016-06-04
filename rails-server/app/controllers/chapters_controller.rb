class ChaptersController < ApplicationController

  def create #adding a new book to list
    book = Book.find(params[:book_id])
    if Book.find_by(id: params[:book_id]) == nil
    end
  end

  def show
  end

  private
    def chapter_params
      params.require(:chapter).permit(:book_id, :number, :title)
    end
end

end
