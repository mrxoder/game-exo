-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 29 nov. 2022 à 22:44
-- Version du serveur :  10.4.14-MariaDB
-- Version de PHP : 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `games`
--

-- --------------------------------------------------------

--
-- Structure de la table `invitation`
--

CREATE TABLE `invitation` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `rname` varchar(100) NOT NULL,
  `time` int(11) NOT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `personnages`
--

CREATE TABLE `personnages` (
  `id` int(11) NOT NULL,
  `vie` int(11) NOT NULL DEFAULT 100,
  `img` varchar(30) NOT NULL,
  `bouclier` int(11) NOT NULL,
  `pwid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `personnages`
--

INSERT INTO `personnages` (`id`, `vie`, `img`, `bouclier`, `pwid`) VALUES
(1, 100, 'archer.png', 20, 1),
(2, 100, 'faucheur.png', 30, 1),
(3, 100, 'ghost.png', 20, 2),
(4, 100, 'lucifer.png', 40, 4),
(5, 100, 'mage.png', 30, 2),
(6, 100, 'monster.png', 20, 4),
(7, 100, 'psycho.png', 20, 3),
(8, 100, 'samurai.png', 30, 4),
(9, 100, 'shadow.png', 30, 2),
(10, 100, 'nightwatcher.png', 30, 3),
(12, 100, 'whitewalkers.png', 20, 3);

-- --------------------------------------------------------

--
-- Structure de la table `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `vie` int(11) NOT NULL DEFAULT 100,
  `attaque` varchar(40) NOT NULL,
  `bouclier` int(11) NOT NULL DEFAULT 30,
  `type` varchar(30) NOT NULL,
  `avatar` varchar(11) NOT NULL,
  `time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `players`
--

INSERT INTO `players` (`id`, `nom`, `vie`, `attaque`, `bouclier`, `type`, `avatar`, `time`) VALUES
(3, 'hg', 100, 'fire', 0, 'player', 'archer.png', 1669391034),
(4, 'samourai', 100, 'atomic', 0, 'player', 'samurai.png', 1669391055);

-- --------------------------------------------------------

--
-- Structure de la table `superpower`
--

CREATE TABLE `superpower` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `superpower`
--

INSERT INTO `superpower` (`id`, `name`) VALUES
(1, 'fire'),
(2, 'thunder'),
(3, 'thunder1'),
(4, 'atomic');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `invitation`
--
ALTER TABLE `invitation`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `personnages`
--
ALTER TABLE `personnages`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `superpower`
--
ALTER TABLE `superpower`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `invitation`
--
ALTER TABLE `invitation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `personnages`
--
ALTER TABLE `personnages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `superpower`
--
ALTER TABLE `superpower`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
