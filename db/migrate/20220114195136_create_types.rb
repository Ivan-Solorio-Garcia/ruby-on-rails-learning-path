class CreateTypes < ActiveRecord::Migration[7.0]
  def up
    create_table :types do |t|
      t.string :name
      t.timestamps
      t.belongs_to :pokemon, index: true, foreing_key: true
    end
  end
  def down
    drop_table :types
  end
end
