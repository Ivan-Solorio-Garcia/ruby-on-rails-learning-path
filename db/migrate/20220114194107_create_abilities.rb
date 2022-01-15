class CreateAbilities < ActiveRecord::Migration[7.0]
  def up
    create_table :abilities do |t|
      t.string :name
      t.string :effect
      t.belongs_to :pokemon, index: true, foreing_key: true
      t.timestamps
    end
  end

  def down
    drop_table :abilities 
  end
end
