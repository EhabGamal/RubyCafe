Rails.application.routes.draw do
  resources :orders
  devise_for :users
  resources :users
  # resources :products, only: [:index, :show]
  # resources :categories, only: [:index, :show]
  resources :rooms
  scope 'admin' do
    resources :categories, :products
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
