# PRD - Kreator Personalizacji Produktów SHE

## 📋 **Dokument Wymagań Produktowych**
*Wersja: 1.0*  
*Data: Grudzień 2024*  
*Status: W trakcie implementacji*

---

## 🎯 **Cel Produktu**

Stworzenie interaktywnego kreatora produktów, który pozwoli klientom na pełną personalizację produktów tekstylnych przed złożeniem zamówienia. Kreator ma być intuicyjny, responsywny i oferować szerokie możliwości konfiguracji zgodnie z wymaganiami biznesowymi SHE.

---

## 🏗️ **Architektura Produktu**

### **Technologie:**
- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **Backend:** WordPress REST API (planowane)
- **Hosting:** Vercel + WordPress

### **Struktura:**
- **7 kroków konfiguracji** z walidacją
- **Podgląd w czasie rzeczywistym**
- **Responsywny design** mobile-first
- **Integracja z systemem zamówień**

---

## 📦 **Katalog Produktów**

### **1. Plecak dla Mamy**
- **Rozmiar:** Standardowy
- **Maksymalna liczba znaków haftu:** 16
- **Opcje dodatkowe:** Rączki (czarna/brązowa skóra)
- **Wszystkie kroki konfiguracji:** ✅

### **2. Plecak dla Dziecka**
- **Rozmiar:** Mniejszy
- **Maksymalna liczba znaków haftu:** 12
- **Opcje dodatkowe:** Rączki (czarna/brązowa skóra)
- **Wszystkie kroki konfiguracji:** ✅

### **3. Worek** ⚠️ *Produkt specjalny*
- **Rozmiar:** Standardowy
- **Maksymalna liczba znaków haftu:** 14
- **Opcje dodatkowe:** Brak
- **Kroki konfiguracji:** Materiał + Haft (bez okuć)

### **4. Duża torba 'Torbacz Mamy'**
- **Rozmiar:** Duży
- **Maksymalna liczba znaków haftu:** 18
- **Opcje dodatkowe:** Rączki (czarna/brązowa skóra)
- **Wszystkie kroki konfiguracji:** ✅

### **5. Mała torba 'Torbacz Mamy'**
- **Rozmiar:** Mały
- **Maksymalna liczba znaków haftu:** 16
- **Opcje dodatkowe:** Rączki (czarna/brązowa skóra)
- **Wszystkie kroki konfiguracji:** ✅

### **6. Kosmetyczka** (3 rozmiary)
- **Rozmiary:** S (Mała), M (Średnia), L (Duża)
- **Maksymalna liczba znaków haftu:** 10
- **Opcje dodatkowe:** Rączki (czarna/brązowa skóra)
- **Wszystkie kroki konfiguracji:** ✅

### **7. Torba na laptopa**
- **Rozmiar:** Standardowy
- **Maksymalna liczba znaków haftu:** 14
- **Opcje dodatkowe:** Rączki (czarna/brązowa skóra)
- **Wszystkie kroki konfiguracji:** ✅

### **8. Etui na laptopa**
- **Rozmiar:** Standardowy
- **Maksymalna liczba znaków haftu:** 12
- **Opcje dodatkowe:** Brak
- **Wszystkie kroki konfiguracji:** ✅

---

## 🎨 **Opcje Konfiguracji**

### **Krok 1: Wybór Produktu**
- Lista 8 produktów z opisami
- Informacja o dostępnych opcjach
- Podgląd produktu
- **Walidacja:** Wymagany wybór

### **Krok 2: Wybór Materiału**
- **Ekoskóra:** Wysokiej jakości, trwała
- **Sztruks:** Klasyczny, elegancki
- **Materiały lniane:** 
  - Len A (wzór 1)
  - Len B (wzór 2) 
  - Len C (wzór 3)
- **Walidacja:** Wymagany wybór (dla wszystkich produktów)

### **Krok 3: Wybór Podszewki**
- **Kolory:** Biała, Czarna
- **Materiał:** Standardowy, wysokiej jakości
- **Walidacja:** Wymagany wybór (dla wszystkich produktów)

### **Krok 4: Wybór Okuć i Zamka**
- **Kolory:** Srebrny, Złoty
- **Materiał:** Metal wysokiej jakości
- **Walidacja:** Wymagany wybór (dla wszystkich produktów OPRÓCZ Worka)

### **Krok 5: Konfiguracja Haftu**
- **Tryb 1: Haft Personalizowany**
  - Pole tekstowe (limit znaków zależny od produktu)
  - **Czcionki:** Sans-serif, Serif, Script
  - **Rozmiary:** 12px - 36px (slider)
  - **Kolory nici:** Czarna, Biała, Złota, Srebrna, Czerwona, Niebieska
  - **Walidacja:** Tekst wymagany (dla trybu personalizowanego)

- **Tryb 2: Haft Gotowy**
  - **Wzory:** Serce, Gwiazda, Uśmiech
  - **Alfabet:** Pełny alfabet dla inicjałów
  - **Walidacja:** Wzór wymagany (dla trybu gotowego)

### **Krok 6: Opcje Dodatkowe**
- **Rączki (dla wybranych produktów):**
  - Czarna skóra
  - Brązowa skóra
- **Pasek (dla Nerki):**
  - Czarna skóra
  - Brązowa skóra
- **Kosmetyczka - rozmiary:**
  - S (Mała)
  - M (Średnia)
  - L (Duża)
- **Walidacja:** Opcjonalne (można pominąć)

### **Krok 7: Podsumowanie i Zamówienie**
- Podsumowanie wszystkich wyborów
- Możliwość edycji poszczególnych kroków
- Kalkulacja ceny końcowej
- Formularz zamówienia

---

## 🔧 **Wymagania Techniczne**

### **Frontend:**
- **Responsywność:** Mobile-first, breakpointy: 320px, 768px, 1024px, 1440px
- **Wydajność:** Ładowanie < 3s, płynne animacje
- **Dostępność:** WCAG 2.1 AA, keyboard navigation
- **Browser Support:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### **Backend (planowane):**
- **WordPress REST API** dla zamówień
- **WooCommerce** integracja (opcjonalnie)
- **System płatności** (PayPal, Stripe, Przelewy24)
- **Panel administracyjny** dla zarządzania zamówieniami

### **Bezpieczeństwo:**
- Walidacja po stronie klienta i serwera
- HTTPS dla wszystkich transakcji
- Ochrona danych osobowych (RODO)

---

## 🎨 **Wymagania UX/UI**

### **Design System:**
- **Kolory SHE:** Ciepłe brązy (#8B7355), beże (#D4C4A8), czerń (#1A1A1A)
- **Typografia:** Inter font, czytelne hierarchie
- **Ikony:** Liniowe, spójne z designem
- **Animacje:** Subtelne, płynne przejścia

### **User Experience:**
- **Intuicyjna nawigacja** krokowa
- **Podgląd w czasie rzeczywistym** konfiguracji
- **Wskaźnik postępu** z procentami
- **Walidacja błędów** z jasnymi komunikatami
- **Możliwość powrotu** do poprzednich kroków

### **Mobile Experience:**
- **Touch-friendly** interfejs
- **Sticky navigation** na mobile
- **Optymalizacja** dla małych ekranów
- **Gesture support** (swipe, tap)

---

## 📊 **Wymagania Biznesowe**

### **Funkcjonalne:**
- **Konwersja:** Cel 15% odwiedzających kreator → zamówienie
- **Czas konfiguracji:** < 5 minut dla pełnej konfiguracji
- **Błędy użytkownika:** < 5% błędów w procesie konfiguracji
- **Wsparcie:** Chat/email dla pomocy w konfiguracji

### **Niefunkcjonalne:**
- **Dostępność:** 24/7 dostępność kreatora
- **Wydajność:** Obsługa 100+ jednoczesnych użytkowników
- **Skalowalność:** Łatwe dodawanie nowych produktów/opcji
- **Integracja:** API-first approach dla przyszłych rozszerzeń

---

## 🚀 **Plan Implementacji**

### **Faza 1: MVP (✅ Ukończone)**
- [x] Podstawowa struktura kreatora
- [x] 7 kroków konfiguracji
- [x] Design system SHE
- [x] Responsywny layout
- [x] Podgląd w czasie rzeczywistym

### **Faza 2: Integracja (🔄 W trakcie)**
- [ ] Formularz zamówienia
- [ ] Kalkulacja ceny
- [ ] WordPress API endpoint
- [ ] System płatności

### **Faza 3: Rozszerzenia (📋 Planowane)**
- [ ] Panel administracyjny
- [ ] Zarządzanie zamówieniami
- [ ] Analytics i raporty
- [ ] A/B testing różnych wersji

---

## 📈 **Metryki Sukcesu**

### **KPI:**
- **Konwersja:** 15% odwiedzających → zamówienie
- **Czas spędzony:** 3-5 minut w kreatorze
- **Bounce rate:** < 30% na pierwszym kroku
- **Completion rate:** > 80% ukończonych konfiguracji

### **User Experience:**
- **Satisfaction score:** > 4.5/5
- **Ease of use:** > 4.0/5
- **Recommendation:** > 4.0/5

---

## 🔍 **Analiza Konkurencji**

### **manashop.pl/kreator:**
- **Mocne strony:** Prosty interfejs, szybka konfiguracja
- **Słabe strony:** Ograniczone opcje personalizacji, brak podglądu
- **Nasze przewagi:** Więcej opcji, lepszy UX, design SHE

### **Inne kreatory:**
- **Nike By You:** Zaawansowane opcje, ale skomplikowane
- **Zalando:** Prosty, ale ograniczony
- **Nasza pozycja:** Równowaga między prostotą a funkcjonalnością

---

## ⚠️ **Ryzyka i Mitigacje**

### **Ryzyka Techniczne:**
- **Wydajność:** Monitoring, optymalizacja, CDN
- **Skalowalność:** Architektura modularna, caching
- **Integracja:** Testy API, fallback mechanisms

### **Ryzyka Biznesowe:**
- **Konkurencja:** Ciągłe ulepszenia, unikalne funkcje
- **Zmiana wymagań:** Agile development, regularne review
- **Użytkownicy:** User testing, feedback loops

---

## 📝 **Akceptacja**

### **Kryteria Akceptacji:**
- [ ] Wszystkie 8 produktów konfiguruje się poprawnie
- [ ] Kreator działa na wszystkich urządzeniach
- [ ] Proces konfiguracji zajmuje < 5 minut
- [ ] Błąd rate < 5%
- [ ] Design zgodny z brandem SHE

### **Stakeholders:**
- **Product Owner:** SHE Team
- **Development:** Frontend/Backend Team
- **Design:** UX/UI Team
- **Business:** Marketing/Sales Team

---

## 📞 **Kontakt**

**Product Owner:** SHE Team  
**Technical Lead:** Development Team  
**Design Lead:** UX/UI Team  

---

*Dokument aktualizowany: Grudzień 2024*  
*Wersja: 1.0*  
*Status: Implementacja w toku*

