class ContactsController < ApplicationController
  def create
    contact_params = params.require(:contact).permit(:name, :email, :message)

    # Envoi de l'email au service de réservation
    ContactMailer.contact_email(contact_params).deliver_now

    # Envoi de l'email de confirmation à l'utilisateur
    ContactMailer.confirmation_email(contact_params).deliver_now

    redirect_to root_path, notice: 'Votre message a été envoyé avec succès !'
  end
end
