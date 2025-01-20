class ContactMailer < ApplicationMailer
  def contact_email(contact_params)
    @contact_params = contact_params

    mail(
      to: ENV.fetch('RESERVATION_EMAIL', 'info@campus-gerance.ch'),
      from: ENV.fetch('EMAIL_FROM', 'info@dipiaza.com'),
      subject: 'Nouvelle demande de contact Dipiaza'
    )
  end

  def confirmation_email(contact_params)
    @contact_params = contact_params

    mail(
      to: @contact_params[:email],
      subject: 'Confirmation de votre demande de contact'
    )
  end
end
