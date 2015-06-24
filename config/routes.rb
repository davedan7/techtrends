Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  root 'static_pages#index'

  # get '/compare', to: 'static_pages#compare'
  # get '/search', to: 'static_pages#searches'
  
  # get '/auth/github/callback', to: 'sessions#create'
  # get 'logout', to: 'sessions#destroy'
end
