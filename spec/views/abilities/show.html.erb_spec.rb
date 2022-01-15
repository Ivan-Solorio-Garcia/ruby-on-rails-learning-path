require 'rails_helper'

RSpec.describe "abilities/show", type: :view do
  before(:each) do
    @ability = assign(:ability, Ability.create!(
      name: "Name",
      effect: "Effect"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/Effect/)
  end
end
