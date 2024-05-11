class CreateDogProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :dog_profiles do |t|
      t.string :name
      t.string :breed
      t.string :image_url
      t.integer :age
      t.references :user, index: true
      t.timestamps
    end
  end
end
