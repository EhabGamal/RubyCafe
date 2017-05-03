Rails.application.routes.draw do
  resources :orders
  devise_for :users, skip: [:sessions]
  as :user do
    get 'login', to: 'devise/sessions#new', as: :new_user_session
    post 'login', to: 'devise/sessions#create', as: :user_session
    delete 'logout', to: 'devise/sessions#destroy', as: :destroy_user_session
  end
  get 'products.json', to: 'pages#products', as: :products_for_user
  resources :rooms
  scope 'admin' do
    resources :categories, :products, :users
  end
  root :to => 'pages#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
