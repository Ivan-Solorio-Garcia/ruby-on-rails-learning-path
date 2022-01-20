require 'rest-client'
class PokemonClient < ApplicationController
    @@is_loaded = false
    @@url = 'https://pokeapi.co/api/v2/pokemon'

    def self.is_loaded
        @@is_loaded
    end

    def self.load_pokemons
        begin
            pokemon_count = RestClient.get @@url
            pokemon_count = JSON.parse(pokemon_count.body)
            pokemon_count = pokemon_count['count']
            pokemons = RestClient.get @@url,  params: { limit: pokemon_count }
            pokemons = JSON.parse(pokemons.body)
            pokemons['results'].each do |poke_api|
                get_pokemon url: poke_api['url'] 
            end
        rescue StandardError => e
            puts e.message
        end
        @@is_loaded = true
    end

    def self.get_pokemon(url:)
        pokemon = RestClient.get url
        pokemon = JSON.parse(pokemon.body)
        searched_pokemon = Pokemon.find_by_pokemon_id(pokemon['id'])
        puts true if searched_pokemon.blank?
        if searched_pokemon.blank?
            created_pokemon = Pokemon.create!(name: pokemon['name'],
                weight: pokemon['weight'],
                height: pokemon['height'], 
                pokemon_id: pokemon['id'], 
                sprite: pokemon['sprites']['front_default'])
            puts created_pokemon
            pokemon['abilities'].each do |ability|
                puts ability
                created_ability = Ability.create!(name: ability['name'], effect: 'tbd', pokemon_id: created_pokemon.id)
                puts created_ability
                created_pokemon.abilities << created_ability
            end
            pokemon['stats'].each do |stat|
                created_stat = Stat.create!(name: stat['stat']['name'], effort: stat['effort'], base_stat: stat['base_stat'], pokemon_id: created_pokemon.id)
                puts created_stat.id
                created_pokemon.stats << created_stat
            end 
            pokemon['types'].each do |type|
                created_type = Type.create!(name: type['type']['name'], pokemon_id: created_pokemon.id)
                puts created_type
                created_pokemon.types << created_type
            end     
        end
    end
    
end