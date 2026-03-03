# ZASADA: NIGDY NIE WYKONUJ COMMITÓW AUTOMATYCZNIE

Cel
----
Ten dokument zawiera jedną, prostą zasadę dotyczącą zachowania automatycznych narzędzi (w tym asystentów AI) oraz skryptów pracujących na repozytorium:

> NIGDY nie wykonuj `git commit`, `git push` ani innych operacji zmieniających historię (np. `git commit --amend`, `git rebase -i`, `git push --force`) bez wyraźnego, jednoznacznego żądania od użytkownika.

Zakres
------
Zasada dotyczy wszystkich automatycznych agentów, skryptów oraz reguł CI/CD, a także wszystkich osób korzystających z asystenta w kontekście tego repozytorium.

Szczegółowe wskazówki
---------------------
- Asystent (AI) może modyfikować pliki lokalnie w katalogu roboczym (working tree), ale ZAWSZE pozostawia zmiany niezacommitowane i nie wykonuje żadnych poleceń `git commit` ani `git push`.
- Jeśli asystent tworzy lub modyfikuje pliki, musi jasno poinformować użytkownika jakie pliki zmodyfikował i poczekać na instrukcję dotyczącą commitowania.
- Każda prośba o wykonanie commita musi być wyrażona wprost i zawierać:
  - treść wiadomości commit (commit message),
  - docelową gałąź (branch),
  - czy ma nastąpić push i czy ma być zwykły push czy `--force-with-lease` (tylko po wyraźnej zgodzie i z pełnym ostrzeżeniem),
  - ewentualne dodatkowe instrukcje (np. czy użyć `--no-verify`).

Przykładowa prośba (bez wątpliwości):

"Proszę wykonać commit tych zmian z wiadomością: `feat: dodaj dokumentację X` i wypchnąć na branch `feature/docs`. Nie używaj force-push." 

Bezpieczeństwo i dobre praktyki
-------------------------------
- Nigdy nie obchodź hooków (pre-commit, pre-push) — jeśli hook blokuje commit, napisz użytkownikowi szczegóły błędu i zaproponuj naprawę.
- Nigdy nie wykonuj `git push --force` bez wyraźnego upoważnienia i uzasadnienia użytkownika.
- Unikaj wykonywania poleceń, które zmieniają historię gałęzi `main`/`master` bez zgody zespołu.

Co zrobić, jeśli użytkownik chce commita
----------------------------------------
1. Użytkownik wyraźnie prosi o commit i podaje wymagane informacje (wiadomość, branch, push?).
2. Asystent przedstawia plan commita (lista plików, wiadomość commit, czy push) i oczekuje potwierdzenia.
3. Po potwierdzeniu asystent może wykonać commit i (opcjonalnie) push — ale tylko wtedy, gdy użytkownik to jasno polecił.

Uwaga dotycząca tego pliku
---------------------------
- Ten plik został dodany do katalogu roboczego repozytorium na żądanie użytkownika i pozostaje w stanie niezatwierdzonym dopóki użytkownik nie poprosi o wykonanie commita.
- Jeśli chcesz, żeby ten plik został zatwierdzony do repo, powiedz wyraźnie: `Proszę commit: <wiadomość>`, i określ docelową gałąź oraz czy ma nastąpić push.

Kontakt / eskalacja
--------------------
W przypadku wątpliwości lub gdy działania automatyczne mogłyby naruszyć politykę zespołu — powiadom administratora repozytorium zamiast wykonywać zmiany w historii.

---
Plik wygenerowany przez asystenta na żądanie użytkownika. Nie wykonano żadnego commita ani pushu.

---
Uwaga użytkownika (zapisano automatycznie przez asystenta):

> Pamiętaj, aby NIGDY nie wykonywać commitów automatycznie, o ile nie poproszę o to.
> Każda prośba o commit jest jednorazowa i wymaga osobnego, wyraźnego potwierdzenia następnym razem.

Ten wpis został dodany do pliku na wyraźne żądanie użytkownika i pozostaje w katalogu roboczym (working tree). Nie wykonano żadnego commita.
