class CreateStats < ActiveRecord::Migration[7.0]
  def up
    create_table :stats do |t|
      
      t.integer :base_stat
      t.integer :effort
      t.string :name
      t.belongs_to :pokemon, index: true, foreing_key: true
      t.timestamps
    end
  end

  def down
    drop_table :stats
  end
end
