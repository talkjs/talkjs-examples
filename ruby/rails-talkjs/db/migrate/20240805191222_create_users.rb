class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users, id: false do |t|
      t.string :name
      t.string :email
      t.string :id, primary_key: true
      t.string :photoUrl
      t.string :role

      t.timestamps
    end
  end
end
