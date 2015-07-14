class StaticPagesController < ApplicationController
  layout :resolve_layout


  # def react
  #   layout: 
  # end 

  private

    def resolve_layout
      if action_name == 'react'
        'react'
      else
        'application'
      end
    end

end