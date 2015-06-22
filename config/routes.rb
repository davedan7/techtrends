Rails.application.routes.draw do
  root 'static_pages#index'
  
  resources :users, only: [:show]

  get '/compare', to: 'static_pages#compare'
  
  get '/auth/github/callback', to: 'sessions#create'
  get 'logout', to: 'sessions#destroy'
end
