module Api
  module V1
    class DogsController < ApplicationController
      def dogs
        response = DogService.dogs

        render json: { dogs: response['message'].map {|name| name[0]} }
      end

      def dog_image
        response = DogService.image(params[:dog_name])

        render json: { image: response['message'] }
      end
    end
  end
end
