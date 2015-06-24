Rails.application.routes.draw do
  # root 'static_pages#searches'
  root 'static_pages#index'

  get '/compare', to: 'static_pages#compare'
  get '/search', to: 'static_pages#searches'
  
  # get '/auth/github/callback', to: 'sessions#create'
  # get 'logout', to: 'sessions#destroy'
end
