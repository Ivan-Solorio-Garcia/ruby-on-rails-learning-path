require 'rails_helper'

RSpec.describe "pokemons/new", type: :view do
  before(:each) do
    assign(:pokemon, Pokemon.new(
      name: "MyString",
      weight: 1,
      height: 1,
      pokemon_id: 1
    ))
  end

  it "renders new pokemons form" do
    render

    assert_select "form[action=?][method=?]", pokemons_path, "post" do

      assert_select "input[name=?]", "pokemons[name]"

      assert_select "input[name=?]", "pokemons[weight]"

      assert_select "input[name=?]", "pokemons[height]"

      assert_select "input[name=?]", "pokemons[pokemon_id]"
    end
  end
end
