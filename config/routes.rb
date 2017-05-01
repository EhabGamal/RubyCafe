Rails.application.routes.draw do
  # resources :products, only: [:index, :show]
  # resources :categories, only: [:index, :show]
  resources :products
  resources :categories

  # scope 'admin' do
  #   resources :categories, :products
  # end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
