class DogService
  class << self
    def dogs
      fetch_data('breeds/list/all')
    end

    def image(dog_breed)
      fetch_data("breed/#{dog_breed}/images/random")
    end

    private

    def fetch_data(endpoint)
      require 'net/http'

      uri = URI("https://dog.ceo/api/#{endpoint}")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      request = Net::HTTP::Get.new(uri.path)

      http.request(request)
    rescue => e
      Rails.logger.error("Unexpcted error #{e.message}")
    end
  end
end
