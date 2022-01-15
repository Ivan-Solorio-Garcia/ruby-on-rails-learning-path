require 'rails_helper'


RSpec.describe Stat, type: :model do

  let(:pokemon) do 
    Pokemon.create(name:"ditto",
    weight:40,
    height:40,
    pokemon_id:132,
    sprite:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png")
  end

  let!(:stat) do
    Stat.create(name: "test",
    base_stat: 30,
    effort: 0,
    pokemon_id: pokemon.id)
  end
  
  it "should create a stat" do
    expect(stat).not_to be nil
  end

  it "should be accesible" do
    saved_stat = Stat.find_by_name("test")
    puts saved_stat.name if saved_stat.name == "test"
    aux = stat.name
    expect(saved_stat.name).to eq("test")
    expect(saved_stat.id).to eq(stat.id)
  end
end
