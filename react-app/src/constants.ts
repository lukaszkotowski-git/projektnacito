export const PRICING = {
  cito: {
    "Kuchnia": 500,
    "Jadalnia w aneksie": 250,
    "Jadalnia": 400,
    "Przedsionek": 300,
    "Salon": 600,
    "Biuro": 450,
    "Pokój gościnny": 450,
    "Klatka schodowa": 350,
    "Łazienka": 550,
    "Garderoba": 300,
    "Sypialnia": 500,
    "Korytarz": 250,
    "Pomieszczenie gospodarcze": 250
  } as Record<string, number>,
  electricPerM2: 15,
  premium: {
    basePerM2: 150,
    kitchenFlat: 2500,
    bathFlat: 2500
  }
}

// Read API URL from environment variable (set VITE_API_URL in .env or hosting platform)
export const API_URL = import.meta.env.VITE_API_URL || 'https://n8n.projektnacito.com.pl/webhook-test/init'
