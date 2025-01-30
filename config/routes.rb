Rails.application.routes.draw do
  root "pages#home" # Page d'accueil
  get "notre_histoire", to: "pages#notre_histoire"
  get "nos_valeurs", to: "pages#nos_valeurs"
  get "nos_restaurants", to: "pages#nos_restaurants"
  get "nous_rejoindre", to: "pages#nous_rejoindre"
  post "nous_rejoindre", to: "pages#submit_nous_rejoindre" # Route POST

end
