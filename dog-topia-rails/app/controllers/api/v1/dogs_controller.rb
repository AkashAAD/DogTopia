module Api
  module V1
    class DogsController < ApplicationController
      before_action :authorize_request

      def dogs
        response = DogService.dogs

        render json: if response.code == '200'
          { dogs: JSON.parse(response.body)['message'].map {|name| name[0]} }
        else
          { error: response.message }
        end
      end

      def dog_image
        response = DogService.image(params[:dog_breed])

        render json: if response.code == '200'
          { image: JSON.parse(response.body)['message'] }
        else
          { error: response.message }
        end
      end

      def create
        dog_profile = DogProfile.new(dog_params)
        dog_profile.user = current_user

        if dog_profile.save
          render json: { message: 'Dog profile created sussessfully.' }, status: :ok
        else
          render json: { error: dog_profile.errors.full_messages.join(', ') }
        end
      end

      private

      def dog_params
        params.permit(:name, :age, :breed, :image_url)
      end
    end
  end
end
