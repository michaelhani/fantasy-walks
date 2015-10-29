class CreateFitbits < ActiveRecord::Migration
  def change
    create_table :fitbits do |t|
      t.string :fitbit_uid
      t.string :fitbit_secret
      t.string :fitbit_token
      t.references :user, index: true, foreign_key: true
      t.timestamps null: false
    end
  end
end
