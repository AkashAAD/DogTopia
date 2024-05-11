class DogProfile < ApplicationRecord
  belongs_to :user

  validates :name, :age, :breed, :image_url, presence: true
end
