# n8n Workflow - Projekt na Cito

## Struktura Google Sheet

Utwórz nowy arkusz Google Sheets o nazwie: **"Projekt na Cito - Zgłoszenia"**

### Kolumny (wiersz 1 - nagłówki):

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Data | Pakiet | Imię i nazwisko | Telefon | Cena netto (zł) | Pokoje | Projekt elektryczny | Metraż elektryczny | Metraż całkowity | Metraż kuchni | Metraż łazienek | Link do pliku |

### Opis kolumn:

- **Data** - data i godzina zgłoszenia
- **Pakiet** - typ pakietu: "Cito", "Premium" lub "Konsultacja"
- **Imię i nazwisko** - dane klienta
- **Telefon** - numer telefonu klienta
- **Cena netto (zł)** - wyliczona cena (dla Cito/Premium) lub "200 zł/h" (dla Konsultacji)
- **Pokoje** - lista wybranych pomieszczeń z ilością (tylko Cito)
- **Projekt elektryczny** - "Tak" / "Nie" (tylko Cito)
- **Metraż elektryczny** - m² projektu elektrycznego (tylko Cito)
- **Metraż całkowity** - m² całkowite (tylko Premium)
- **Metraż kuchni** - m² kuchni (tylko Premium)
- **Metraż łazienek** - m² łazienek (tylko Premium)
- **Link do pliku** - link do załączonego pliku w Google Drive

## Struktura Google Drive

Utwórz folder w Google Drive o nazwie: **"Projekt na Cito - Załączniki"**

Pliki będą zapisywane z nazwą: `{pakiet}_{data}_{imie}.{rozszerzenie}`

## Konfiguracja

Zobacz plik `setup-instructions.md` dla instrukcji krok po kroku.
