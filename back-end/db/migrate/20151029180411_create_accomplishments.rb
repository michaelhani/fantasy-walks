class CreateAccomplishments < ActiveRecord::Migration
  def change
    create_table :accomplishments do |t|
      t.references :user, index: true, foreign_key: true
      t.string :event
      t.date :date

      t.timestamps null: false
    end
  end
end
