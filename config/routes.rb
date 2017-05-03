Rails.application.routes.draw do


devise_for :users, skip: [:sessions,:registrations]
as :user do
  get 'signin', to: 'devise/sessions#new', as: :new_user_session
  post 'signin', to: 'devise/sessions#create', as: :user_session
  delete 'signout', to: 'devise/sessions#destroy', as: :destroy_user_session
  get "/sign_up" => "devise/registrations#new", as: "new_user_registration" # custom path to 
    post  "/sign_up" => "devise/registrations#create" ,as:   'user_registration'
end

resources :users
  # resources :products, only: [:index, :show]
  # resources :categories, only: [:index, :show]


  resources :rooms


  scope 'admin' do
    resources :categories, :products
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
