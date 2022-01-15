 require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

RSpec.describe "/stats", type: :request do
  
  # Stat. As you add validations to Stat, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  describe "GET /index" do
    it "renders a successful response" do
      Stat.create! valid_attributes
      get stats_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      stat = Stat.create! valid_attributes
      get stat_url(stat)
      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get new_stat_url
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "render a successful response" do
      stat = Stat.create! valid_attributes
      get edit_stat_url(stat)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Stat" do
        expect {
          post stats_url, params: { stat: valid_attributes }
        }.to change(Stat, :count).by(1)
      end

      it "redirects to the created stat" do
        post stats_url, params: { stat: valid_attributes }
        expect(response).to redirect_to(stat_url(Stat.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Stat" do
        expect {
          post stats_url, params: { stat: invalid_attributes }
        }.to change(Stat, :count).by(0)
      end

      it "renders a successful response (i.e. to display the 'new' template)" do
        post stats_url, params: { stat: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested stat" do
        stat = Stat.create! valid_attributes
        patch stat_url(stat), params: { stat: new_attributes }
        stat.reload
        skip("Add assertions for updated state")
      end

      it "redirects to the stat" do
        stat = Stat.create! valid_attributes
        patch stat_url(stat), params: { stat: new_attributes }
        stat.reload
        expect(response).to redirect_to(stat_url(stat))
      end
    end

    context "with invalid parameters" do
      it "renders a successful response (i.e. to display the 'edit' template)" do
        stat = Stat.create! valid_attributes
        patch stat_url(stat), params: { stat: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested stat" do
      stat = Stat.create! valid_attributes
      expect {
        delete stat_url(stat)
      }.to change(Stat, :count).by(-1)
    end

    it "redirects to the stats list" do
      stat = Stat.create! valid_attributes
      delete stat_url(stat)
      expect(response).to redirect_to(stats_url)
    end
  end
end
