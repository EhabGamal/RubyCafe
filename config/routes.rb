Rails.application.routes.draw do



devise_for :users, skip: [:sessions,:registrations]
as :user do
  get 'login', to: 'devise/sessions#new', as: :new_user_session
  post 'login', to: 'devise/sessions#create', as: :user_session
  delete 'logout', to: 'devise/sessions#destroy', as: :destroy_user_session
  get "/sign_up" => "devise/registrations#new", as: "new_user_registration" # custom path to 
    post  "/sign_up" => "devise/registrations#create" ,as:   'user_registration'
end
 get 'products', to: 'products#all', as: :products_for_user
resources :users
  # resources :products, only: [:index, :show]
  # resources :categories, only: [:index, :show]

  resources :orders
  scope 'admin' do
    resources :categories, :products, :users,:rooms
  end
  root :to => 'pages#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
