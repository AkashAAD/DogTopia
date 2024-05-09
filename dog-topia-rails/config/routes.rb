Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [] do
        collection do
          post :create
        end
      end

      resources :authentication, only: [] do
        collection do
          post :login
        end
      end

      resources :dogs, only: [] do
        collection do
          get :dogs
          get :dog_image
        end
      end
    end
  end
end
