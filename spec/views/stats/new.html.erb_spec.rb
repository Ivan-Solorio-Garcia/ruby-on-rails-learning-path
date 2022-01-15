require 'rails_helper'

RSpec.describe "stats/new", type: :view do
  before(:each) do
    assign(:stat, Stat.new(
      base_stat: 1,
      effort: 1,
      name: "MyString"
    ))
  end

  it "renders new stat form" do
    render

    assert_select "form[action=?][method=?]", stats_path, "post" do

      assert_select "input[name=?]", "stat[base_stat]"

      assert_select "input[name=?]", "stat[effort]"

      assert_select "input[name=?]", "stat[name]"
    end
  end
end
