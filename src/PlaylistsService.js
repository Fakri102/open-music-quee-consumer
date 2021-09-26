const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer FROM songs
              LEFT JOIN playlistssongs ON playlistssongs.song_id = songs.id
              WHERE playlistssongs.playlist_id = $1 
              GROUP BY songs.id`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistsService;
