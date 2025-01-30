class PagesController < ApplicationController
  before_action :set_mobile_view

  def home
  end

  def notre_histoire
  end

  def nos_engagements
  end

  def nos_restaurants
  end

  def nous_rejoindre
  end

  def submit_nous_rejoindre
    # Logique pour traiter le formulaire, par exemple enregistrer les données ou envoyer un email
    flash[:notice] = "Votre candidature a bien été envoyée !"
    redirect_to root_path
  end

  private

  def set_mobile_view
    request.variant = :mobile if browser.device.mobile?
  end
end
