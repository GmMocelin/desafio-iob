# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Country.upsert(
  {
    code: "IT",
    name: "Italy",
    capital: "Rome",
    region: "Europe",
    subregion: "Southern Europe",
    flag_svg: "https://flagcdn.com/it.svg"
  },
  unique_by: :code
)
puts "Seeded country: Italy (IT)"