require 'capybara/rspec'
require "selenium-webdriver"
# require 'capybara/poltergeist'

RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end
  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end
end

# require 'capybara/rspec'
# # require "selenium-webdriver"

# # Selenium::WebDriver::Firefox::Binary.path = "/opt/homebrew-cask/Caskroom/Firefox/latest/Firefox.app"

# Bundler.setup(:default, :test)
 
 
# Capybara.default_driver = :selenium
# Capybara.run_server = false
# Capybara.app_host = "http://staging.someserver.com"
 
# RSpec.configure do |config|
#   config.include Capybara::DSL
# end

# # RSpec.configure do |config|
# #   config.expect_with :rspec do |expectations|
# #     expectations.include_chain_clauses_in_custom_matcher_descriptions = true
# #   end
# #   config.mock_with :rspec do |mocks|
# #     mocks.verify_partial_doubles = true
# #   end
# # end