require 'rails_helper'

RSpec.describe Type, type: :model do

  
  before(:each) do
    
    @pokemon=Pokemon.create(name:"ditto",
      weight:40,
      height:40,
      pokemon_id:132,
      sprite:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png")
    @type=Type.create(name:"test",pokemon_id: @pokemon.id)
    @pokemon.types <<  @type
  end
  after(:each) do
    Type.delete_all
  end
  it "is valid with valid attributes" do
    puts @pokemon
     expect(@type.name).to eq('test')
     expect(@type.pokemon_id).to eq(@pokemon.id)  
  end
  it "saves record" do
    @type.save
    saved_record=Type.find_by_name("test")
    expect(saved_record.name).to eq("test")
    expect(saved_record.pokemon_id).to eq(@pokemon.id)   
  end
end
