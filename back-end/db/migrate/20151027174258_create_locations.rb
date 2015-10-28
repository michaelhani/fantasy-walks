class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :name
      t.integer :miles
      t.integer :days
      t.text :description

      t.timestamps null: false
    end
  end
end
