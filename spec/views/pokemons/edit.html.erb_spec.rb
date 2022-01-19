require 'rails_helper'

RSpec.describe "pokemons/edit", type: :view do
  before(:each) do
    @pokemon = assign(:pokemon, Pokemon.create!(
      name: "MyString",
      weight: 1,
      height: 1,
      pokemon_id: 1
    ))
  end

  it "renders the edit pokemons form" do
    render

    assert_select "form[action=?][method=?]", pokemon_path(@pokemon), "post" do

      assert_select "input[name=?]", "pokemons[name]"

      assert_select "input[name=?]", "pokemons[weight]"

      assert_select "input[name=?]", "pokemons[height]"

      assert_select "input[name=?]", "pokemons[pokemon_id]"
    end
  end
end
