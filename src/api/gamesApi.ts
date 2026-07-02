// this file contains all functions that talk to the Noroff API.
// i keep all fetch logic here so pages stay clean.

import type { GamesResponse, SingleGameResponse, Game } from '../types/game';

const BASE_URL = 'https://v2.api.noroff.dev';


// fetch all games
export async function getAllGames(): Promise<Game[]> {
    const response = await fetch(`${BASE_URL}/old-games`);
    if (!response.ok) throw new Error('failed to fetch games');
    const json: GamesResponse = await response.json();
    return json.data;
}

// fetch a single game by its id
export async function getGameById(id: number): Promise<Game> {
    const response = await fetch(`${BASE_URL}/old-games/${id}`);
    if (!response.ok) throw new Error(`failed to fetch game ${id}`);
    const json: SingleGameResponse = await response.json();
    return json.data;
}
