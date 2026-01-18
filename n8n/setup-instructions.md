# Instrukcja konfiguracji n8n - Projekt na Cito

## Krok 1: Przygotowanie Google Cloud Console

### 1.1 Utwórz projekt Google Cloud

1. Przejdź do [Google Cloud Console](https://console.cloud.google.com/)
2. Kliknij **Select a project** → **New Project**
3. Nazwa: `Projekt na Cito n8n`
4. Kliknij **Create**

### 1.2 Włącz wymagane API

1. W menu bocznym: **APIs & Services** → **Library**
2. Wyszukaj i włącz:
   - **Google Sheets API** → kliknij **Enable**
   - **Google Drive API** → kliknij **Enable**
   - **Gmail API** → kliknij **Enable**

### 1.3 Skonfiguruj OAuth Consent Screen

1. **APIs & Services** → **OAuth consent screen**
2. Wybierz **External** → **Create**
3. Wypełnij:
   - App name: `Projekt na Cito`
   - User support email: `projektnacitobiuro@gmail.com`
   - Developer contact email: `projektnacitobiuro@gmail.com`
4. Kliknij **Save and Continue**
5. **Scopes**: kliknij **Add or Remove Scopes**, dodaj:
   - `https://www.googleapis.com/auth/spreadsheets`
   - `https://www.googleapis.com/auth/drive`
   - `https://www.googleapis.com/auth/gmail.send`
6. Kliknij **Save and Continue**
7. **Test users**: dodaj `projektnacitobiuro@gmail.com`
8. Kliknij **Save and Continue** → **Back to Dashboard**

### 1.4 Utwórz OAuth Credentials

1. **APIs & Services** → **Credentials**
2. Kliknij **+ Create Credentials** → **OAuth client ID**
3. Application type: **Web application**
4. Name: `n8n`
5. **Authorized redirect URIs** - dodaj:
   ```
   http://test-n8n-9c6ed0-72-61-136-140.traefik.me/rest/oauth2-credential/callback
   ```
6. Kliknij **Create**
7. **ZAPISZ Client ID i Client Secret** - będą potrzebne w n8n

---

## Krok 2: Przygotowanie Google Sheets i Drive

### 2.1 Utwórz arkusz Google Sheets

1. Przejdź do [Google Sheets](https://sheets.google.com)
2. Utwórz nowy arkusz: **Projekt na Cito - Zgłoszenia**
3. W wierszu 1 wpisz nagłówki kolumn:

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Data | Pakiet | Imię i nazwisko | Telefon | Cena netto (zł) | Pokoje | Projekt elektryczny | Metraż elektryczny | Metraż całkowity | Metraż kuchni | Metraż łazienek | Link do pliku |

4. **ZAPISZ ID arkusza** z URL:
   ```
   https://docs.google.com/spreadsheets/d/[TEN_ID_SKOPIUJ]/edit
   ```

### 2.2 Utwórz folder Google Drive

1. Przejdź do [Google Drive](https://drive.google.com)
2. Utwórz nowy folder: **Projekt na Cito - Załączniki**
3. **ZAPISZ ID folderu** z URL:
   ```
   https://drive.google.com/drive/folders/[TEN_ID_SKOPIUJ]
   ```

---

## Krok 3: Konfiguracja n8n

### 3.1 Import workflow

1. Otwórz n8n: http://test-n8n-9c6ed0-72-61-136-140.traefik.me
2. Kliknij **+** (nowy workflow) lub **Import from File**
3. Zaimportuj plik `workflow.json` z tego folderu

### 3.2 Skonfiguruj credentials Google Sheets

1. W n8n: **Settings** (⚙️) → **Credentials** → **Add Credential**
2. Wyszukaj: **Google Sheets OAuth2 API**
3. Wypełnij:
   - **Credential Name**: `Google Sheets`
   - **Client ID**: (z Google Cloud Console)
   - **Client Secret**: (z Google Cloud Console)
4. Kliknij **Sign in with Google** i zaloguj się kontem `projektnacitobiuro@gmail.com`
5. Zatwierdź uprawnienia
6. Kliknij **Save**

### 3.3 Skonfiguruj credentials Google Drive

1. **Settings** → **Credentials** → **Add Credential**
2. Wyszukaj: **Google Drive OAuth2 API**
3. Wypełnij:
   - **Credential Name**: `Google Drive`
   - **Client ID**: (ten sam co wyżej)
   - **Client Secret**: (ten sam co wyżej)
4. Kliknij **Sign in with Google** i zatwierdź
5. Kliknij **Save**

### 3.4 Skonfiguruj credentials Gmail

1. **Settings** → **Credentials** → **Add Credential**
2. Wyszukaj: **Gmail OAuth2 API**
3. Wypełnij:
   - **Credential Name**: `Gmail`
   - **Client ID**: (ten sam co wyżej)
   - **Client Secret**: (ten sam co wyżej)
4. Kliknij **Sign in with Google** i zatwierdź
5. Kliknij **Save**

### 3.5 Zaktualizuj workflow

1. Otwórz zaimportowany workflow
2. **Google Drive - Upload**: 
   - Kliknij node → **Parameters** → **Folder** → wklej ID folderu Google Drive
   - **Credential**: wybierz `Google Drive`
3. **Google Sheets (z plikiem)** i **Google Sheets (bez pliku)**:
   - Kliknij node → **Parameters** → **Document** → wklej ID arkusza Google Sheets
   - **Credential**: wybierz `Google Sheets`
4. **Gmail (z plikiem)** i **Gmail (bez pliku)**:
   - **Credential**: wybierz `Gmail`

### 3.6 Aktywuj workflow

1. Kliknij przełącznik **Active** (prawy górny róg)
2. Workflow jest gotowy!

---

## Krok 4: Test

### 4.1 Sprawdź URL webhooka

Po aktywacji workflow, URL webhooka to:
```
http://test-n8n-9c6ed0-72-61-136-140.traefik.me/webhook/projektnacito-form
```

### 4.2 Test z curl

```bash
curl -X POST http://test-n8n-9c6ed0-72-61-136-140.traefik.me/webhook/projektnacito-form \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "packageType": "cito",
      "userName": "Test User",
      "userPhone": "+48 123 456 789",
      "estimatedPrice": 1500,
      "details": {
        "rooms": {"Kuchnia": 1, "Salon": 2},
        "electricProject": true,
        "electricM2": 50
      }
    }
  }'
```

Oczekiwana odpowiedź:
```json
{"success": true, "message": "Zgłoszenie zostało przyjęte"}
```

### 4.3 Weryfikacja

1. Sprawdź arkusz Google Sheets - powinien pojawić się nowy wiersz
2. Sprawdź skrzynkę `projektnacitobiuro@gmail.com` - powinien przyjść email

---

## Troubleshooting

### Problem: "Access blocked: This app's request is invalid"
- Upewnij się, że redirect URI w Google Cloud Console jest dokładnie taki sam jak w n8n
- Sprawdź czy dodałeś email do Test users

### Problem: "Error 403: access_denied"
- Dodaj `projektnacitobiuro@gmail.com` do Test users w OAuth consent screen

### Problem: Webhook nie odpowiada
- Sprawdź czy workflow jest **Active**
- Sprawdź logi w n8n: **Executions** → zobacz błędy

### Problem: Plik nie zapisuje się w Drive
- Sprawdź czy credentials Google Drive mają uprawnienia do folderu
- Sprawdź ID folderu

---

## Struktura workflow

```
[Webhook] 
    ↓
[Czy ma załącznik?]
    ├── TAK → [Google Drive Upload] → [Google Sheets] → [Gmail] → [Odpowiedź]
    └── NIE → [Google Sheets] → [Gmail] → [Odpowiedź]
```
