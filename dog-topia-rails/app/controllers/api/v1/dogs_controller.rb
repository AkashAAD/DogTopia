module Api
  module V1
    class DogsController < ApplicationController
      def dogs
        dogs = dog_service('breeds/list/all')

        render json: { dogs: dogs['message'].map {|name| name[0]} }
      end

      def dog_image
        dog = dog_service("breed/#{params[:dog_name]}/images/random")

        render json: { image: dog['message'] }
      end

      private

      def dog_service(endpoint)
        require 'net/http'

        uri = URI("https://dog.ceo/api/#{endpoint}")
        http = Net::HTTP.new(uri.host, uri.port)
        http.use_ssl = true
        request = Net::HTTP::Get.new(uri.path)
        response = http.request(request)

        JSON.parse(response.body)
      end
    end
  end
end
