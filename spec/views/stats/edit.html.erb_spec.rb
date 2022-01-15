require 'rails_helper'

RSpec.describe "stats/edit", type: :view do
  before(:each) do
    @stat = assign(:stat, Stat.create!(
      base_stat: 1,
      effort: 1,
      name: "MyString"
    ))
  end

  it "renders the edit stat form" do
    render

    assert_select "form[action=?][method=?]", stat_path(@stat), "post" do

      assert_select "input[name=?]", "stat[base_stat]"

      assert_select "input[name=?]", "stat[effort]"

      assert_select "input[name=?]", "stat[name]"
    end
  end
end
