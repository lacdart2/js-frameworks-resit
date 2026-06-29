// This file defines the shape of all data we get from the Noroff API.
// TypeScript will use these types to check our code everywhere.

// The image object inside each game
export interface GameImage {
    url: string;
    alt: string;
}

// A single game object from the API
export interface Game {
    id: number;
    slug: string;
    name: string;
    description: string;
    released: string;
    image: GameImage;
    genre: string[];
}

// The response we get when fetching all games
export interface GamesResponse {
    data: Game[];
}

// The response we get when fetching one game
export interface SingleGameResponse {
    data: Game;
}