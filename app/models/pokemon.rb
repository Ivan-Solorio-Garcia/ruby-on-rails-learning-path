class Pokemon < ApplicationRecord
    has_many :abilities, :class_name => 'Ability'
    has_many :stats, :class_name => 'Stat'
    has_many :types, :class_name => 'Type'

    scope :sorted_asc, lambda { order("id ASC") }
    scope :sorted_desc, lambda { order("id ") }
    scope :newest_first, lambda { order("created_at DESC") }
    scope :search, lambda {|query| where(["name LIKE ?", "%#{query}%"]) }
end
