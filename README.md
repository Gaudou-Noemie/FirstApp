
# 📚 NowBooks

> Une application mobile React Native pour rechercher, sauvegarder et organiser tes lectures simplement.

NowBooks permet de **rechercher des livres via Google Books API** et de les classer rapidement dans deux listes personnelles :

❤️ **Liste d’envie**  
📖 **Déjà lu**

Toutes les données sont **stockées localement sur le téléphone (AsyncStorage)**.  
👉 Aucun serveur • Aucun compte cloud • 100% offline

---

## ✨ Aperçu

NowBooks te permet de :

- 🔎 Rechercher n’importe quel livre
- ❤️ L’ajouter à ta wishlist
- 📖 Marquer comme lu
- 🔁 Ajouter / retirer en un clic
- 💾 Garder tes données localement

Simple. Rapide. Efficace.

---

# 🚀 Fonctionnalités

## 🔐 Authentification locale
- Création de compte (email / mot de passe)
- Connexion
- Stockage local sécurisé avec AsyncStorage
- Pas de backend nécessaire

## 🔎 Recherche de livres
- API Google Books
- Résultats instantanés
- Affichage :
  - Couverture
  - Titre
  - Auteurs

## ❤️ Liste d’envie
- Icône ❤️ cœur vide / plein
- Ajout ou suppression en un clic

## 📖 Déjà lu
- Icône 📘 livre ouvert / fermé
- Ajout ou suppression en un clic

## 📂 Navigation fluide
- Footer fixe en bas de l’écran
- Accès rapide aux listes
- Bouton retour intégré
- Interface minimaliste et mobile-first

---

# 🛠️ Stack technique

| Technologie | Utilisation |
|------------|-------------|
| React Native (Expo) | Framework mobile |
| TypeScript | Typage |
| React Navigation | Navigation entre écrans |
| AsyncStorage | Stockage local |
| Axios | Appels API |
| Google Books API | Données livres |
| Expo Vector Icons | Icônes UI |

---

# 📦 Installation

## 1️⃣ Cloner le projet

```bash
git clone <URL_DU_REPO>
cd nowbooks

## 2️⃣ Installer les dépendances
npm install

## ▶️ Lancer l’application
npx expo start a
