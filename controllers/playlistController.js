exports.generatePlaylist = async (req, res) => {
    const { genre, year, numSongs } = req.body;
  
    // TODO: Use Sequelize to query the database for songs matching the given criteria once we find a solid db we can use 
  
    const playlist = [
      { id: 1, title: 'Song 1', artist: 'Artist 1', year: 2000, genre: 'Rock' },
      { id: 2, title: 'Song 2', artist: 'Artist 2', year: 2005, genre: 'Pop' },
      { id: 3, title: 'Song 3', artist: 'Artist 3', year: 2010, genre: 'Hip-hop' },
    ];
    res.json(playlist);
  };
  