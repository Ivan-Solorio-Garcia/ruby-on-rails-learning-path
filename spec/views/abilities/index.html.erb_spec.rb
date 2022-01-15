require 'rails_helper'

RSpec.describe "abilities/index", type: :view do
  before(:each) do
    assign(:abilities, [
      Ability.create!(
        name: "Name",
        effect: "Effect"
      ),
      Ability.create!(
        name: "Name",
        effect: "Effect"
      )
    ])
  end

  it "renders a list of abilities" do
    render
    assert_select "tr>td", text: "Name".to_s, count: 2
    assert_select "tr>td", text: "Effect".to_s, count: 2
  end
end
