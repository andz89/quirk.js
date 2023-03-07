-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 07, 2023 at 04:56 PM
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
(1, '111', 'e1f01c22-e99f-4f54-acc2-a70ae8f875a6', '', '', 0),
(2, '222', '', '', '', 0);

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
(1, 'andz89', 'andzrivero89@gmail.com', '$2a$10$KfnFBYovZQNvk9T2C9LA1e2f4V9EQY3wayhPy2bRVe0CJ36WBQnjC', 'admin', '[{\"data_1\":\"Amoncio, Ken Ervic, Comendador\",\"data_2\":\"132289180002\"},{\"data_1\":\"Cagabcab, Aaron, Camantoy\",\"data_2\":\"132289180086\"},{\"data_1\":\"Cagna-an, Jexter Zion, De Castro\",\"data_2\":\"132610180002\"},{\"data_1\":\"Canico, Zaijan Jade, Sulapas\",\"data_2\":\"132289180057\"},{\"data_1\":\"Comanda, Noel Jr., Abasola\",\"data_2\":\"132289180010\"},{\"data_1\":\"Dubduban, Keith, Labatos\",\"data_2\":\"132289180020\"}]');

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
('colorful-elementary-certificate-6c4c5214-e0c0-40ef-9d13-5de70617d3d9.png', 'test 3', 'test 3', 'colorful-elementary-certificate-27e44e1e-305f-474d-96bb-d5b63ceed51a.png', '66fa7551-5d7f-4da1-aba0-55c41b79113e'),
('colorful-preschool-anna-certificate-c2ca1192-c9b6-428b-93d6-1e1abc45b88c.png', 'tete', 'test', 'colorful-preschool-anna-certificate-06517484-1fdc-4c77-828f-d7b6cdee8f8b.png', 'c108c9de-e3a2-4f3f-8774-8498ebfdea38'),
('colorful-preschool-anna-certificate-c8ea2e5e-c85a-4180-a493-673e379632ec.png', 'test 2', 'test 2', 'colorful-preschool-anna-certificate-86550857-d256-4181-b5c5-523a1713b4da.png', 'ff27b192-38a0-4999-8849-9f91403b9410');

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
('bpBNThdFGdtr1VCq2HNb5Qiy_NWGzadx', 1678258013, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-07T21:40:09.574Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":{\"user_id\":1,\"user_name\":\"andz89\",\"user_email\":\"andzrivero89@gmail.com\",\"user_role\":\"admin\"}}');

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

--
-- Dumping data for table `templates`
--

INSERT INTO `templates` (`template_id`, `template_name`, `template_description`, `template_json`, `template_category`, `canvas_image`, `thumbnail`) VALUES
('67995ca0-9726-4633-b13e-4b60b254364d', 'test', 'test', '  {\"json\":{\"version\":\"5.2.0\",\"objects\":[{\"type\":\"image\",\"name\":\"bg-image\",\"src\":\"http://localhost:5000/images/ci/colorful-elementary-certificate-6c4c5214-e0c0-40ef-9d13-5de70617d3d9.png\"},{\"type\":\"textbox\",\"left\":401.66,\"top\":760.34,\"width\":271.85,\"height\":19.21,\"fill\":\"#f3b709\",\"scaleX\":9.92,\"scaleY\":9.92,\"fontFamily\":\"Fredoka One\",\"fontSize\":\"17\",\"text\":\"Certificate of Recognition\",\"textAlign\":\"center\",\"id\":\"2023121554293730176\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":336.04,\"top\":1648.43,\"width\":285.08,\"height\":26.26,\"scaleX\":9.92,\"scaleY\":9.92,\"fontFamily\":\"Open Sans\",\"fontSize\":\"7\",\"text\":\"during the First Quarter Recognition of Achievers, for School Year 2022-2023. <-br->Given this 23rd day of February, 2023 at B. Vasquez Memorial Central Elementary <-br->School, Brgy. Rizal, Surigao City \",\"textAlign\":\"center\",\"id\":\"2023121517836210261\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":949.6,\"top\":972.84,\"width\":161.38,\"height\":6.78,\"scaleX\":9.92,\"scaleY\":9.92,\"fontSize\":\"6\",\"text\":\"This certificate is awarded to\",\"textAlign\":\"center\",\"id\":\"202312152438814066\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":115.82,\"top\":1109.06,\"width\":329.48,\"height\":19.21,\"fill\":\"#27a989\",\"scaleX\":9.92,\"scaleY\":9.92,\"fontFamily\":\"Dancing Script\",\"fontSize\":\"17\",\"text\":\"Amoncio, Ken Ervic, Comendador\",\"textAlign\":\"center\",\"id\":\"2023121540632261491\",\"name\":\"Column-1-textbox\"},{\"type\":\"textbox\",\"left\":1254.04,\"top\":224.07,\"width\":100,\"height\":14.64,\"scaleX\":9.92,\"scaleY\":9.92,\"fontFamily\":\"Open Sans\",\"fontWeight\":\"bold\",\"fontSize\":\"6\",\"text\":\"Republic of the Philippines<-br->Department of Education\",\"textAlign\":\"center\",\"id\":\"2023121556211790666\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":791.07,\"top\":627.21,\"width\":193.34,\"height\":6.78,\"scaleX\":9.92,\"scaleY\":9.92,\"fontFamily\":\"Open Sans\",\"fontWeight\":\"bold\",\"fontSize\":\"6\",\"text\":\"B. Vasquez Memorial Central Elementary School\",\"textAlign\":\"center\",\"id\":\"202312153610991579\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":1007.96,\"top\":1434.17,\"width\":142.67,\"height\":7.91,\"scaleX\":10.4,\"scaleY\":10.4,\"fontFamily\":\"Open Sans\",\"fontSize\":\"7\",\"text\":\"for his/her Academic Performance as \",\"textAlign\":\"center\",\"id\":\"2023121203439911737\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":1229.8,\"top\":1294.08,\"width\":100,\"height\":6.78,\"scaleX\":10.4,\"scaleY\":10.4,\"fontSize\":\"6\",\"text\":\"132289180002\",\"textAlign\":\"center\",\"id\":\"202312120423904223\",\"name\":\"Column-2-textbox\"},{\"type\":\"textbox\",\"left\":786.32,\"top\":429.2,\"width\":185.29,\"height\":18.76,\"scaleX\":10.4,\"scaleY\":10.4,\"fontFamily\":\"Open Sans\",\"fontSize\":\"5\",\"text\":\"CARAGA ADMINISTRATIVE REGION<-br->Division of Surigao City<-br->Surigao City, District 6\",\"textAlign\":\"center\",\"id\":\"2023121204671633750\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":1162.53,\"top\":698.35,\"width\":112.94,\"height\":5.65,\"scaleX\":10.4,\"scaleY\":10.4,\"fontFamily\":\"Open Sans\",\"fontSize\":\"5\",\"text\":\"Rizal, Surigao City\",\"textAlign\":\"center\",\"id\":\"20231212012514651156\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":1360.41,\"top\":1543.11,\"width\":100,\"height\":10.17,\"scaleX\":7.81,\"scaleY\":7.81,\"fontFamily\":\"Work Sans\",\"fontWeight\":\"bold\",\"fontSize\":\"9\",\"text\":\"WITH HONORS\",\"textAlign\":\"center\",\"id\":\"20231212026195569404\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":2157.82,\"top\":1946.35,\"width\":93.54,\"height\":6.78,\"scaleX\":8.6,\"scaleY\":8.6,\"fontFamily\":\"Open Sans\",\"fontWeight\":\"bold\",\"fontSize\":\"6\",\"text\":\"DAWN ANDREW N. RIVERO\",\"textAlign\":\"center\",\"id\":\"20231212141165523315\",\"name\":\"footer-name\"},{\"type\":\"textbox\",\"left\":2177.08,\"top\":2003.65,\"width\":93.54,\"height\":6.78,\"scaleX\":8.6,\"scaleY\":8.6,\"fontFamily\":\"Open Sans\",\"fontSize\":\"6\",\"text\":\"Adviser\",\"textAlign\":\"center\",\"id\":\"2023121214425840219\",\"name\":\"footer-position\"},{\"type\":\"textbox\",\"left\":461.8,\"top\":1946.35,\"width\":93.54,\"height\":6.78,\"scaleX\":8.6,\"scaleY\":8.6,\"fontFamily\":\"Open Sans\",\"fontWeight\":\"bold\",\"fontSize\":\"6\",\"text\":\"LUCELLE A. QUEZADA, EdD\",\"textAlign\":\"center\",\"id\":\"20231212136233605218\",\"name\":\"footer-name\"},{\"type\":\"textbox\",\"left\":469.6,\"top\":2003.65,\"width\":93.54,\"height\":6.78,\"scaleX\":8.6,\"scaleY\":8.6,\"fontFamily\":\"Open Sans\",\"fontSize\":\"6\",\"text\":\"School Principal\",\"textAlign\":\"center\",\"id\":\"202312121274123604\",\"name\":\"footer-position\"}],\"background\":\"#fff\"},\"size\":{\"w\":3508,\"h\":2480}}', '', '', 'colorful-elementary-certificate-3281e1d0-0e47-4ed4-be19-d86c8c22895b.png');

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
  `list` varchar(5000) NOT NULL,
  `certificate_subscription` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_password`, `purchase`, `list`, `certificate_subscription`) VALUES
('e1f01c22-e99f-4f54-acc2-a70ae8f875a6', 'andz89Wafo', 'andzrivero@gmail.com', '$2a$10$KfnFBYovZQNvk9T2C9LA1e2f4V9EQY3wayhPy2bRVe0CJ36WBQnjC', 0, '', 'true'),
('e3aeb94f-eb41-47e0-9bfc-0893112eae91', 'virginia', 'virginia@gmail.com', '$2a$10$.zFXuRXW4FmUeL9gC8F2LOXxg9b29K5OOjylGNZrzigkrjJiPlFBe', 0, '', ''),
('ea12a0a6-73d6-456b-87d0-abc0017b014e', 'gwill', 'gwill21@gmail.com', '$2a$10$.D9XVPGdVc0ZV34eECUyaO086h8.6JqOZetuLILSSU6mATpsQzz2G', 0, '', '');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `admin_user`
--
ALTER TABLE `admin_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `purchased_template`
--
ALTER TABLE `purchased_template`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
