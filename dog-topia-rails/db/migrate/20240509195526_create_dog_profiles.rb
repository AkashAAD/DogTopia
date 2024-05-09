class CreateDogProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :dog_profiles do |t|
      t.string :name
      t.string :breed
      t.integer :age
      t.timestamps
    end
  end
end
