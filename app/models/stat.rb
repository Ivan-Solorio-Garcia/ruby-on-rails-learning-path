class Stat < ApplicationRecord

    belongs_to :pokemon

    scope :sorted_asc, lambda { order("id ASC") }
    scope :sorted_desc, lambda { order("id DESC") }
    scope :newest_first, lambda { order("created_at DESC") }
    scope :search, ->(query) { where(name: query.to_s) }
end
