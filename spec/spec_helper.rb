require 'capybara/rspec'
# require "selenium-webdriver"
# require 'capybara/poltergeist'

RSpec.configure do |config|
  config.before(:each, js: true) do
    page.driver.allow_url("pipes.yahoo.com")
  end
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end
  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end
end

