require 'spec_helper'
 
describe "SearchController.js" do
  # the following is a demo spec for demonstration purposes
  # it is meant to run on the ToDoMVC:Backbone.js Demo app:
  # http://todomvc.com/architecture-examples/backbone/
 
  it "allows creation of a todo-list item", :js => true do
    visit search_path
    fill_in "zip", with: "80202"

    click_button("Submit")
    expect(page).to have_content "80202"
    expect(page).to have_content "Jobs by Title"
  end
 
  # it "allows marking todo-list item as completed", :js => true do
  #   visit "http://todomvc.com/architecture-examples/backbone/"
  #   find(:css, 'input.toggle').click
  #   expect(page).to have_content "0 items left"
  # end
 
  # it "allows deleting todo-list items", :js => true do
  #   visit "http://todomvc.com/architecture-examples/backbone/"
  #   find(:css, 'button.destroy').click
  # end
 
end