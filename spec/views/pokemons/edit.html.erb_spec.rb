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

  it "renders the edit pokemon form" do
    render

    assert_select "form[action=?][method=?]", pokemon_path(@pokemon), "post" do

      assert_select "input[name=?]", "pokemon[name]"

      assert_select "input[name=?]", "pokemon[weight]"

      assert_select "input[name=?]", "pokemon[height]"

      assert_select "input[name=?]", "pokemon[pokemon_id]"
    end
  end
end
