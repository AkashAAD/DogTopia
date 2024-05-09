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

      def create
        dog_profile = DogProfile.new(dog_params)
        dog_profile.user = User.last

        if dog_profile.save
          render json: { message: 'Dog profile created sussessfully.' }, status: :ok
        else
          render json: { error: dog_profile.errors.full_messages.join(', ') }, status: :unprocessable_entity
        end
      end

      private

      def dog_params
        params.permit(:name, :age, :breed, :photo)
      end
    end
  end
end
