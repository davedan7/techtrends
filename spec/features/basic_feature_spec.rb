describe "Javascript tests", :type => :feature, :js => true do
  before(:all) do
    # Capybara.javascript_driver = :poltergeist
    # Capybara.javascript_driver = :webkit
    Capybara.current_driver = :selenium
  end

  it "searches" do
    visit '/'
    click_link_or_button "Get Started"
    expect(page).to have_content 'Zip Code'
  end
end