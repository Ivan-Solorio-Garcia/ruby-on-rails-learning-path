json.extract! pokemon, :id, :name, :weight, :height, :pokemon_id, :created_at, :updated_at
json.url pokemon_url(pokemon, format: :json)
