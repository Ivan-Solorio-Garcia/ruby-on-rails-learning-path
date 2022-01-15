class CreatePokemons < ActiveRecord::Migration[7.0]
  def up
    create_table :pokemons do |t|
      t.string :name
      t.integer :weight
      t.integer :height
      t.integer :pokemon_id
      t.string :sprite
      t.timestamps
    end
  end
  def down
    drop_table :pokemons
  end
end
