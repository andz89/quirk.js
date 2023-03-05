-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2023 at 03:02 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node`
--

-- --------------------------------------------------------

--
-- Table structure for table `activation_code`
--

CREATE TABLE `activation_code` (
  `id` int(11) NOT NULL,
  `code` varchar(100) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `date_purchased` varchar(50) NOT NULL,
  `templates_limit` varchar(100) NOT NULL,
  `count` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activation_code`
--

INSERT INTO `activation_code` (`id`, `code`, `user_id`, `date_purchased`, `templates_limit`, `count`) VALUES
(1, '111', 'e1f01c22-e99f-4f54-acc2-a70ae8f875a6', '', '5', 3);

-- --------------------------------------------------------

--
-- Table structure for table `admin_user`
--

CREATE TABLE `admin_user` (
  `id` int(11) NOT NULL,
  `admin_user_name` varchar(30) NOT NULL,
  `admin_user_email` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `admin_user_role` varchar(10) NOT NULL,
  `list` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_user`
--

INSERT INTO `admin_user` (`id`, `admin_user_name`, `admin_user_email`, `password`, `admin_user_role`, `list`) VALUES
(1, 'andz89', 'andzrivero89@gmail.com', '$2a$10$KfnFBYovZQNvk9T2C9LA1e2f4V9EQY3wayhPy2bRVe0CJ36WBQnjC', 'admin', '[{\"data_1\":\"Matthew John P. Sulapas\",\"data_2\":\"\"},{\"data_1\":\"JS Z. Fernandez\",\"data_2\":\"\"},{\"data_1\":\"Christian Jhon T. Esmeralda\",\"data_2\":\"\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `background`
--

CREATE TABLE `background` (
  `background_image` varchar(200) NOT NULL,
  `background_description` varchar(1000) NOT NULL,
  `background_name` varchar(100) NOT NULL,
  `thumbnail_image` varchar(100) NOT NULL,
  `background_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `background`
--

INSERT INTO `background` (`background_image`, `background_description`, `background_name`, `thumbnail_image`, `background_id`) VALUES
('conduct-bg-55fd7924-fd79-49ed-b343-888f0505cff0.jpg', 'test-3', 'test-3', 't-1-fa42e5c1-65b5-4c9d-aafb-c996f8dc8385.png', '9675b81e-be0e-49a2-bd1c-c5ab5ef9262d'),
('conduct-bg-57e2aae4-2483-49b5-9553-e8107f016eb8.jpg', 'test-1', 'template-1', 't-3-3c17954f-350c-4879-b8b3-469395dd10cc.png', 'cecc7118-71f9-4367-9d19-2554eafffb32'),
('honor-d50f35ca-6088-4ee2-a667-35dad92d3d62.jpg', 'test-2', 'test-2', 't-2-bf709e65-00b5-414d-b86b-0d0af5df0645.png', 'cc5240df-72fb-422c-990d-5ea2d238a8e9');

-- --------------------------------------------------------

--
-- Table structure for table `purchased_template`
--

CREATE TABLE `purchased_template` (
  `id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `template_id` varchar(100) NOT NULL,
  `template_name` varchar(100) NOT NULL,
  `template_description` varchar(100) NOT NULL,
  `template_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `template_category` varchar(100) NOT NULL,
  `canvas_image` varchar(100) NOT NULL,
  `thumbnail` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('-Sdjl-EbXDP_UiYDVkIanC2P5BDEGNjY', 1677950611, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T17:23:30.576Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('1LzDhIRzhslEeThV3F8ajWv-3xWCGX6C', 1677950609, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T17:23:29.396Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('1c1U5iZ1J4uYkHfyAdomKWqLnIr5fjhi', 1677946891, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T16:21:31.332Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('1yrI3yn7LCxuVuV3UCB6ZsRdRv-9OK-S', 1677975087, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-05T00:11:26.699Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('3oz0n5dYaWy0w_0xQAZgPbKynlnOM5yi', 1677946613, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T16:16:53.463Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('3x46Z6N8_wTR0ecBj_geWWRyqAqm1nWx', 1677975008, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-05T00:10:07.906Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('3zGSfY6MIuqkCiHPj_fDCn22NARTBAlz', 1677946549, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T16:15:48.742Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('6Pojgd_PyM30YAJkMuXBaCRTplFOczqu', 1677975024, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-05T00:10:23.901Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('76PTJDmWa1s0I6tRKG_9iti9wR5zGrGB', 1677947097, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T16:24:56.613Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('9QEtQm8-Tq5boitWPh8VoqfJ7_CZ7kBU', 1677947133, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T16:25:33.487Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('9tLtZSvDZNXK8lcNgsc90dglP2QsFGxV', 1677946075, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T16:07:55.236Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('A0wIRom2Gn6LVhiyPNRU3kn56C6O8aY-', 1677946069, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T16:07:49.201Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('FcjkBvEyd2sKLWrFww9urk7KmQJfavJk', 1677974119, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T23:55:19.208Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('FmxmNAx2FcA3Ca-KJKrdeFsygIotJO7e', 1677947440, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T16:30:40.450Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('GH3CYHyNw3mal0ZAYsU63XbidRMqm1x2', 1677974148, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T23:55:48.395Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('IFgw6Bl__B4-aUmq6GqtUM3r3L1ATiNM', 1677974930, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-05T00:08:49.626Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('MDc248iNKiHmg0S2oPkIyhL8CIdWpE6M', 1677947033, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T16:23:53.288Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('Md92JcKH0N9AFIxXpBX3-_3m9L5zkeNn', 1677975104, '{\"cookie\":{\"originalMaxAge\":86399999,\"expires\":\"2023-03-05T00:11:44.318Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('NhdvKwdPvA4NLdffA6AI3tDafkVEi9W4', 1677974120, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T23:55:19.654Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('NoYFjvIpZ2dK-NPC53xYPuPF_ioM8oco', 1677974144, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T23:55:43.721Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('OGasm_Du-wXiqlZbhTlwvwbaLwt712n9', 1678024901, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T21:39:10.346Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":{\"user_id\":1,\"user_name\":\"andz89\",\"user_email\":\"andzrivero89@gmail.com\",\"user_role\":\"admin\"}}'),
('OivTwtn3Jco8NJ5IfNOVVdUIvIppmfF1', 1677956125, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T17:20:38.804Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":{\"user_id\":1,\"user_name\":\"andz89\",\"user_email\":\"andzrivero89@gmail.com\",\"user_role\":\"admin\"}}'),
('QmxUzPalqTRtxrkoMNT2qi6uUwR7S8Rj', 1677954689, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T18:31:28.624Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('Qymf75LgAkknOUzmrBwd5Te9-UFRYQ00', 1677947384, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T16:29:43.616Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('RgWLW8xlyRj_m8GNK3yrdLM9pT-PPdaY', 1677946567, '{\"cookie\":{\"originalMaxAge\":86399999,\"expires\":\"2023-03-04T16:16:06.767Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('RnWRxESbaT54VPfmlGoZ3eeSGkXBgxWG', 1677974149, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T23:55:48.988Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('WoCUMDmD5L77rOCkIah9Vtpu5HrCMDGg', 1677947418, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T16:30:18.159Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('XZH0aDGmA1WB6fkQzdhfW-OiUy5qkpd7', 1677947432, '{\"cookie\":{\"originalMaxAge\":86399999,\"expires\":\"2023-03-04T16:30:32.279Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('_DlICCTGR0eCxFTb0bOaA6k7R-0dpehS', 1677974901, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-05T00:08:20.971Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('_MYrSO475kwryhOEAseQux5Uilp75XbX', 1677974900, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-05T00:08:19.832Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('_zTfq4RrB59tPQ7f12lLOQIgXNAttUaA', 1677974365, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T23:59:25.470Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('aGZ6D8Ai4wm6-BNo5hK5n42cugWvi-fm', 1677974143, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T23:55:43.235Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('cIsmyk2JntYrX0uhCnigvoMxSQ_kAmit', 1677975109, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-05T00:11:49.416Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('fNJvgeyh4mnKnxjKr54i6IaV7TgI5tfa', 1677946692, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T16:18:12.195Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('gK_D7iOnGPFS4Td_C3T8rMUryCNNvAj8', 1677950493, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T17:21:33.215Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('gYb8712OLRu-txaR8FKDcjqeJM-pf_yC', 1677950439, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T17:20:38.776Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('j3gFT_hqaTsJE_xuvsDkov3J_FxMchoF', 1677946600, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T16:16:39.663Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('kyfgUCMaLV2TdoWY6LgSmIZ8khxF8qz3', 1677974910, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-05T00:08:30.116Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('m2zMSXJx67DTJeZBuA4WqykZNQ-Bbhw4', 1677974403, '{\"cookie\":{\"originalMaxAge\":86399999,\"expires\":\"2023-03-05T00:00:02.585Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('nTKwjzmReMf8xUunC40V1yG8gPTuzJBt', 1677974268, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T23:57:47.896Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('o4tIfCOhLenRaFnncHKmkzATUeGvtMR5', 1677950477, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T17:21:17.343Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('oNPT1Q_CbXo3TrwXWNvWnnQWmEhyfvn0', 1677947136, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T16:25:35.882Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('p5V9rMc8NOLj8ApHGCFMtwHLkE5yKVlh', 1677974987, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-05T00:09:47.071Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('qrYVxs8cZk3WVmZr5By6ge5dZpiN3Xst', 1677946186, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T16:09:46.147Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('t13MLcqoycNZDJhhIhMVWvaTky-R9MPM', 1677975103, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-05T00:11:43.067Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('u3Pp94eHZEtbIZfgRLCD6cLkCgKbz-sw', 1677974956, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-05T00:09:15.508Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('utwVm4Nu2OVFXp8M_bSdfYwqlQkrPNOu', 1677946702, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T16:18:21.810Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('wArV31ybGKclUro9JndMfBQ6V7qQvXpF', 1677975000, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-05T00:10:00.336Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('wnqrVuqq1TDvL3B0lQ9sTlF4pcklOSlV', 1677974269, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-04T23:57:48.525Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `templates`
--

CREATE TABLE `templates` (
  `template_id` varchar(100) NOT NULL,
  `template_name` varchar(255) NOT NULL,
  `template_description` varchar(255) NOT NULL,
  `template_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `template_category` varchar(20) NOT NULL,
  `canvas_image` varchar(100) NOT NULL,
  `thumbnail` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(100) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `purchase` tinyint(1) NOT NULL,
  `list` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_password`, `purchase`, `list`) VALUES
('e1f01c22-e99f-4f54-acc2-a70ae8f875a6', 'andz89', 'andzrivero89@gmail.com', '$2a$10$KfnFBYovZQNvk9T2C9LA1e2f4V9EQY3wayhPy2bRVe0CJ36WBQnjC', 0, ''),
('e3aeb94f-eb41-47e0-9bfc-0893112eae91', 'virginia', 'virginia@gmail.com', '$2a$10$.zFXuRXW4FmUeL9gC8F2LOXxg9b29K5OOjylGNZrzigkrjJiPlFBe', 0, ''),
('ea12a0a6-73d6-456b-87d0-abc0017b014e', 'gwill', 'gwill21@gmail.com', '$2a$10$.D9XVPGdVc0ZV34eECUyaO086h8.6JqOZetuLILSSU6mATpsQzz2G', 0, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activation_code`
--
ALTER TABLE `activation_code`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_user`
--
ALTER TABLE `admin_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `background`
--
ALTER TABLE `background`
  ADD PRIMARY KEY (`background_image`);

--
-- Indexes for table `purchased_template`
--
ALTER TABLE `purchased_template`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `templates`
--
ALTER TABLE `templates`
  ADD PRIMARY KEY (`template_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activation_code`
--
ALTER TABLE `activation_code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `admin_user`
--
ALTER TABLE `admin_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `purchased_template`
--
ALTER TABLE `purchased_template`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
