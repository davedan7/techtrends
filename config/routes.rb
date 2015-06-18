Rails.application.routes.draw do
  root 'static_pages#index'
  
  resources :users, only: [:show]
  
  get '/auth/github/callback', to: 'sessions#create'
  get 'logout', to: 'sessions#destroy'
end
