require 'rails_helper'

RSpec.describe "stats/index", type: :view do
  before(:each) do
    assign(:stats, [
      Stat.create!(
        base_stat: 2,
        effort: 3,
        name: "Name"
      ),
      Stat.create!(
        base_stat: 2,
        effort: 3,
        name: "Name"
      )
    ])
  end

  it "renders a list of stats" do
    render
    assert_select "tr>td", text: 2.to_s, count: 2
    assert_select "tr>td", text: 3.to_s, count: 2
    assert_select "tr>td", text: "Name".to_s, count: 2
  end
end
