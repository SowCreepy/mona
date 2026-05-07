# MONA - CS2 Matchmaking App (React)

## Contexte

**Mona** est une application web de matchmaking pour Counter-Strike 2 (CS2), inspirée du fonctionnement de Tinder. L'objectif est de permettre aux joueurs de trouver rapidement un coéquipier pour jouer ensemble.

Le joueur parcourt les profils de joueurs disponibles via un système de **swipe** (glisser à droite pour inviter, à gauche pour passer), et lorsqu'une invitation est acceptée, une conversation en temps réel s'ouvre entre les deux joueurs.

Ce projet est la version **React** de l'application Flutter du même nom, connectée à la même API backend.

---

## Fonctionnalités

### Authentification

- Inscription / Connexion par email et mot de passe
- JWT (Access Token + Refresh Token via cookie httpOnly)
- Reconnexion automatique au chargement de l'app

### Profil joueur

- Affichage du profil : pseudo, rang CS2, ELO, niveau, Steam URL
- Modification du profil (pseudo, ELO, lien Steam)
- Toggle de disponibilité (visible ou non dans la recherche)
- Statistiques (victoires, défaites, winrate)

### Recherche de coéquipier (Swipe)

- Parcours des joueurs disponibles avec des cartes
- **Swipe droite** = Envoyer une invitation
- **Swipe gauche** = Passer
- Boutons d'action (Skip / Inviter / Ajouter)
- Overlay visuel dynamique pendant le swipe

### CRUD Matchs

- Ajouter un match (victoire/défaite, map, kills, deaths)
- Historique des matchs récents sur le profil

### Invitations

- Envoi d'invitations depuis le swipe
- Réception d'invitations (mode Solo)
- Accepter / Refuser les invitations
- Notifications en temps réel (Socket.io)

### Chat en temps réel

- Liste des conversations actives
- Messagerie en temps réel via WebSocket
- Aperçu du dernier message et horodatage

---

### Architecture MVVM

```
src/
├── models/              # M - Interfaces TypeScript (données)
│   ├── Player.ts
│   ├── Invitation.ts
│   └── Chat.ts
│
├── services/            # Couche d'accès aux données
│   ├── api.ts           # Client HTTP (Axios + interceptors JWT)
│   ├── auth.service.ts
│   ├── player.service.ts
│   ├── match.service.ts
│   ├── invitation.service.ts
│   ├── chat.service.ts
│   └── socket.service.ts
│
├── viewmodels/          # VM - Logique métier (hooks React)
│   ├── useProfileViewModel.ts
│   ├── useSearchViewModel.ts
│   ├── useInvitationViewModel.ts
│   ├── useMatchViewModel.ts
│   └── useChatViewModel.ts
│
├── views/               # V - Composants UI React
│   ├── pages/           # Pages complètes
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Profile.tsx
│   │   ├── EditProfile.tsx
│   │   ├── AddMatch.tsx
│   │   ├── SearchLast.tsx
│   │   ├── Matchmaking.tsx
│   │   ├── Messages.tsx
│   │   ├── ChatRoom.tsx
│   │   └── InvitationsSent.tsx
│   ├── components/      # Composants réutilisables
│   │   ├── PlayerCard.tsx
│   │   ├── PlayerAvatar.tsx
│   │   ├── RankBadge.tsx
│   │   ├── StatBox.tsx
│   │   ├── MatchTile.tsx
│   │   ├── SwipeOverlay.tsx
│   │   ├── InvitationCard.tsx
│   │   └── AvailabilityToggle.tsx
│   └── layouts/         # Mise en page
│       ├── MainLayout.tsx
│       └── AuthGuard.tsx
│
├── stores/              # State global (Zustand)
│   └── authStore.ts
│
├── utils/
│   └── rank.ts          # ELO → Rang, maps CS2
│
├── theme.ts             # Thème MUI (dark mode)
├── App.tsx              # Routing principal
└── main.tsx             # Point d'entrée
```

## Installation

```bash
# Cloner le repo
git clone <repo-url>
cd mona

# Installer les dépendances
npm install

# Configurer l'environnement
# Éditer .env avec l'URL de l'API
# VITE_API_URL=http://localhost:3000/api
# VITE_SOCKET_URL=http://localhost:3000

# Lancer le serveur de développement
npm run dev
```

### Prérequis

- Node.js 18+
- L'API Mona doit tourner sur le port 3000 (voir repo `api_mona`)

---

## Scripts

| Commande          | Description            |
| ----------------- | ---------------------- |
| `npm run dev`     | Serveur de dev (Vite)  |
| `npm run build`   | Build de production    |
| `npm run preview` | Prévisualiser le build |

---
