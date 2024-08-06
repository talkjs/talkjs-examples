Rails.application.routes.draw do
  get 'chat', to: 'chat#index'
  get 'chat/conversation/:id', to: 'chat#conversation', as: 'chat_conversation'
  # other routes
end