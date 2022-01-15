require 'rails_helper'

RSpec.describe "stats/show", type: :view do
  before(:each) do
    @stat = assign(:stat, Stat.create!(
      base_stat: 2,
      effort: 3,
      name: "Name"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/2/)
    expect(rendered).to match(/3/)
    expect(rendered).to match(/Name/)
  end
end
