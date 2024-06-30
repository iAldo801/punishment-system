import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const guildId = process.env.guildId;
        const token = process.env.token;

        const response = await axios.get(`https://discord.com/api/v9/guilds/${guildId}/bans`, {
            headers: {
                'Authorization': `Bot ${token}`
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
