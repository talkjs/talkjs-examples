# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
User.create(name: "John", email: "christopher.garcia@example.com", id: "john.garcia", photoUrl: "https://talkjs.com/new-web/avatar-2.jpg", role: "default")
User.create(name: "Leroy", email: "leroy.stanley@example.com", id: "leroy.stanley", photoUrl: "https://talkjs.com/new-web/avatar-3.jpg", role: "default")
User.create(name: "Ray", email: "ray.mitchelle@example.com", id: "ray.mitchelle", photoUrl: "https://talkjs.com/new-web/avatar-4.jpg", role: "default")