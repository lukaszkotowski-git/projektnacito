export const PRICING = {
  cito: {
    "Kuchnia": 500,
    "Jadalnia w aneksie kuchennym": 250,
    "Jadalnia": 500,
    "Przedsionek / Wiatrołap": 500,
    "Pralnia": 500,
    "Spiżarnia": 500,
    "Pokój dziecięcy": 500,
    "Salon": 500,
    "Biuro": 500,
    "Pokój gościnny": 500,
    "Klatka schodowa": 500,
    "Łazienka": 500,
    "Garderoba": 500,
    "Sypialnia": 500,
    "Korytarz": 500,
    "Pomieszczenie gospodarcze": 500
  } as Record<string, number>,
  electricPerM2: 15,
  premium: {
    basePerM2: 150,
    kitchenFlat: 2500,
    bathFlat: 2500
  }
}

// Read API URL from environment variable (set VITE_API_URL in .env or hosting platform)
export const API_URL = import.meta.env.VITE_API_URL || 'https://n8n.projektnacito.com.pl/webhook/init'
