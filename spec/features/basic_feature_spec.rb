# describe "Javascript tests", :type => :feature, :js => true do
#   before(:all) do
#     # Capybara.javascript_driver = :poltergeist
#     # Capybara.javascript_driver = :webkit
#     Capybara.current_driver = :selenium
#   end

#   it "searches" do
#     visit '/'
#     click_link_or_button "Get Started"
#     expect(page).to have_content 'Zip Code'
#   end
# end


require 'rails_helper'
# require 'capybara/poltergeist'
require 'capybara-webkit'
Capybara.javascript_driver = :webkit
# Capybara.javascript_driver = :poltergeist
# page.driver.allow_url("pipes.yahoo.com")

describe 'some stuff which requires js', :js => true, type: :feature   do
  include Capybara::DSL

  it "searches" do
    visit root_path
    click_link_or_button "Get Started"
    fill_in "Insert Your Zip Code", with: "80202"
    click_link "Submit"
    save_and_open_page
    expect(page).to have_content '80202'
  end

end