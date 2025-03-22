import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VeryfyCallback } from "passport-spotify";

@Injectable() 
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify') {
  constructor() {
    super({
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/spotify/callback",
      scope: ['user-read-playback-state', 'user-modify-playback-state', 'playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-private', 'playlist-modify-public', 'user-follow-modify', 'user-read-currently-playing', 'user-follow-read', 'user-read-playback-position', 'user-top-read', 'user-read-recently-played', 'user-library-modify', 'user-library-read', 'user-read-email', 'user-read-private', '']
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VeryfyCallback): Promise<any> {
    const { id, displayName, emails, photos } = profile
    const user = {
      id,
      displayName,
      email: emails ? emails[0].value : null,
      photos: photos ? photos[0].value : null,
      accessToken,
      refreshToken
    }
    done(null, user);
  }
}