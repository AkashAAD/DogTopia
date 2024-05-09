class DogService
  class << self
    def dogs
      fetch_data('breeds/list/all')
    end

    def image(dog_name)
      fetch_data("breed/#{dog_name}/images/random")
    end

    private

    def fetch_data(endpoint)
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
