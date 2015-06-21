class MeetupService
  attr_reader :connection

  def initialize
    @connection = Hurley::Client.new("https://api.meetup.com")
  end
"https://api.meetup.com/2/open_events?key=52147258472159b1938714519435029&?zip=80202&sign=true&photo-host=public&text=ruby&page=10"
  def search_groups(word, zip)
    response = connection.get("/2/open_events?key=#{ENV["meetup_key"]}&?zip=11211sign=true&photo-host=public&text=#{word}&page=10")
    binding.pry
  end

  private

    def parse(response)
      # JSON.parse(response, symbolize_names: true)
      JSON.parse(response)
    end

end