-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 10, 2023 at 07:27 PM
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
  `user_id` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `code` varchar(100) NOT NULL,
  `date_purchased` varchar(50) NOT NULL,
  `date_expired` varchar(100) NOT NULL,
  `certificate_subscription` varchar(100) NOT NULL,
  `days_duration` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activation_code`
--

INSERT INTO `activation_code` (`id`, `user_id`, `user_name`, `user_email`, `code`, `date_purchased`, `date_expired`, `certificate_subscription`, `days_duration`) VALUES
(1, 'e1f01c22-e99f-4f54-acc2-a70ae8f875a6', 'andz89Wafo', 'andzrivero@gmail.com', '111', '3/10/2023, 10:24:49 AM', '3/11/2023, 10:24:49 AM', 'true', 0),
(2, '', '', '', '222', '', '', '0', 0);

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
(1, 'andz89', 'andzrivero89@gmail.com', '$2a$10$KfnFBYovZQNvk9T2C9LA1e2f4V9EQY3wayhPy2bRVe0CJ36WBQnjC', 'admin', '[{\"data_1\":\"Amoncio, Ken Ervic, Comendador\",\"data_2\":\"132289180002\",\"data_3\":\"disable\"},{\"data_1\":\"Balutan, Jhundy, Fuentes\",\"data_2\":\"132289180051\",\"data_3\":\"\"},{\"data_1\":\"Cagabcab, Aaron, Camantoy\",\"data_2\":\"132289180086\",\"data_3\":\"\"},{\"data_1\":\"Cagna-an, Jexter Zion, De Castro\",\"data_2\":\"132610180002\",\"data_3\":\"disable\"},{\"data_1\":\"Canico, Zaijan Jade, Sulapas\",\"data_2\":\"132289180057\",\"data_3\":\"\"},{\"data_1\":\"Comanda, Noel Jr., Abasola\",\"data_2\":\"132289180010\",\"data_3\":\"\"},{\"data_1\":\"Dubduban, Keith, Labatos\",\"data_2\":\"132289180020\",\"data_3\":\"\"}]');

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
('colorful-elementary-certificate-8a9127d1-988e-4e40-8e39-23d7dc5afca1.png', 'test', 'template', 'colorful-elementary-certificate-bca52526-1edd-42f2-b5f7-57d3e356cb69.png', '8340553a-c060-43d3-b8d3-375ac3c450c1'),
('colorful-preschool-anna-certificate-95cd03ed-4562-4690-aae6-aa0b9c284461.png', 'test', 'test2', 'colorful-preschool-anna-certificate-34b9dd65-cc6d-42cd-bfbe-e619cafda6e0.png', '39405c11-230b-410b-9fb3-2b61c041bffd');

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
('1ZrE1CfxC1dTrFupsxvwV8q2JeAKyxIv', 1678559093, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-10T23:36:23.461Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":{\"user_id\":1,\"user_name\":\"andz89\",\"user_email\":\"andzrivero89@gmail.com\",\"user_role\":\"admin\"}}'),
('T5CxpelbjtQZ6dMg6yQnIIAw2B5KDayy', 1678478780, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-09T21:04:28.902Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":{\"user_id\":1,\"user_name\":\"andz89\",\"user_email\":\"andzrivero89@gmail.com\",\"user_role\":\"admin\"}}'),
('eBwSDP1_qS47oPuzYd0R-BXM1dIrjzUA', 1678478838, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-09T23:58:51.209Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":{\"user_id\":\"ea12a0a6-73d6-456b-87d0-abc0017b014e\",\"user_email\":\"gwill21@gmail.com\",\"user_role\":\"user\"}}'),
('g4zrEgWJb312dTk5QSFzRczGKjVWQau9', 1678559090, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-03-11T18:24:49.741Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":{\"user_id\":\"e1f01c22-e99f-4f54-acc2-a70ae8f875a6\",\"user_email\":\"andzrivero@gmail.com\",\"user_name\":\"andz89Wafo\",\"user_role\":\"user\"}}');

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
('290dce3b-03d6-471f-ac8d-99aa512a43cc', 'test 2', 'test', '  {\"json\":{\"version\":\"5.2.0\",\"objects\":[{\"type\":\"image\",\"name\":\"bg-image\",\"src\":\"http://localhost:5000/images/ci/colorful-preschool-anna-certificate-95cd03ed-4562-4690-aae6-aa0b9c284461.png\"},{\"type\":\"textbox\",\"left\":448.42,\"top\":843.38,\"width\":262.42,\"height\":19.21,\"fill\":\"#b4552d\",\"scaleX\":9.92,\"scaleY\":9.92,\"fontFamily\":\"Titan One\",\"fontSize\":\"17\",\"text\":\"Certificate of Recognition\",\"textAlign\":\"center\",\"id\":\"2023121554293730176\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":336.04,\"top\":1762.61,\"width\":285.08,\"height\":26.26,\"scaleX\":9.92,\"scaleY\":9.92,\"fontSize\":\"7\",\"text\":\"during the First Quarter Recognition of Achievers, for School Year 2022-2023. <-br->Given this 23rd day of February, 2023 at B. Vasquez Memorial Central Elementary <-br->School, Brgy. Rizal, Surigao City \",\"textAlign\":\"center\",\"id\":\"2023121517836210261\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":949.6,\"top\":1035.12,\"width\":161.38,\"height\":6.78,\"scaleX\":9.92,\"scaleY\":9.92,\"fontSize\":\"6\",\"text\":\"This certificate is awarded to\",\"textAlign\":\"center\",\"id\":\"202312152438814066\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":261.39,\"top\":1200.42,\"width\":300.13,\"height\":16.95,\"fill\":\"#050a0a\",\"scaleX\":9.92,\"scaleY\":9.92,\"fontSize\":\"15\",\"text\":\"Dubduban, Keith, Labatos\",\"textAlign\":\"center\",\"id\":\"2023121540632261491\",\"name\":\"Column-1-textbox\"},{\"type\":\"textbox\",\"left\":1254.04,\"top\":229.26,\"width\":100,\"height\":14.64,\"scaleX\":9.92,\"scaleY\":9.92,\"fontWeight\":\"bold\",\"fontSize\":\"6\",\"text\":\"Republic of the Philippines<-br->Department of Education\",\"textAlign\":\"center\",\"id\":\"2023121556211790666\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":791.07,\"top\":585.69,\"width\":193.34,\"height\":6.78,\"scaleX\":9.92,\"scaleY\":9.92,\"fontWeight\":\"bold\",\"fontSize\":\"6\",\"text\":\"B. Vasquez Memorial Central Elementary School\",\"textAlign\":\"center\",\"id\":\"202312153610991579\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":1007.96,\"top\":1524.3,\"width\":142.67,\"height\":7.91,\"scaleX\":10.4,\"scaleY\":10.4,\"fontSize\":\"7\",\"text\":\"for his/her Academic Performance as \",\"textAlign\":\"center\",\"id\":\"2023121203439911737\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":1229.8,\"top\":1383.07,\"width\":100,\"height\":6.78,\"scaleX\":10.4,\"scaleY\":10.4,\"fontSize\":\"6\",\"text\":\"132289180020\",\"textAlign\":\"center\",\"id\":\"202312120423904223\",\"name\":\"Column-2-textbox\"},{\"type\":\"textbox\",\"left\":786.32,\"top\":392.87,\"width\":185.29,\"height\":18.76,\"scaleX\":10.4,\"scaleY\":10.4,\"fontSize\":\"5\",\"text\":\"CARAGA ADMINISTRATIVE REGION<-br->Division of Surigao City<-br->Surigao City, District 6\",\"textAlign\":\"center\",\"id\":\"2023121204671633750\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":1162.53,\"top\":672.4,\"width\":112.94,\"height\":5.65,\"scaleX\":10.4,\"scaleY\":10.4,\"fontSize\":\"5\",\"text\":\"Rizal, Surigao City\",\"textAlign\":\"center\",\"id\":\"20231212012514651156\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":1360.41,\"top\":1652.1,\"width\":100,\"height\":10.17,\"scaleX\":7.81,\"scaleY\":7.81,\"fontWeight\":\"bold\",\"fontSize\":\"9\",\"text\":\"WITH HONORS\",\"textAlign\":\"center\",\"id\":\"20231212026195569404\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":2157.82,\"top\":2102.05,\"width\":93.54,\"height\":6.78,\"scaleX\":8.6,\"scaleY\":8.6,\"fontWeight\":\"bold\",\"fontSize\":\"6\",\"text\":\"DAWN ANDREW N. RIVERO\",\"textAlign\":\"center\",\"id\":\"20231212141165523315\",\"name\":\"footer-name\"},{\"type\":\"textbox\",\"left\":2177.08,\"top\":2174.92,\"width\":93.54,\"height\":6.78,\"scaleX\":8.6,\"scaleY\":8.6,\"fontSize\":\"6\",\"text\":\"Adviser\",\"textAlign\":\"center\",\"id\":\"2023121214425840219\",\"name\":\"footer-position\"},{\"type\":\"textbox\",\"left\":461.8,\"top\":2102.05,\"width\":93.54,\"height\":6.78,\"scaleX\":8.6,\"scaleY\":8.6,\"fontWeight\":\"bold\",\"fontSize\":\"6\",\"text\":\"LUCELLE A. QUEZADA, EdD\",\"textAlign\":\"center\",\"id\":\"20231212136233605218\",\"name\":\"footer-name\"},{\"type\":\"textbox\",\"left\":469.6,\"top\":2174.92,\"width\":93.54,\"height\":6.78,\"scaleX\":8.6,\"scaleY\":8.6,\"fontSize\":\"6\",\"text\":\"School Principal\",\"textAlign\":\"center\",\"id\":\"202312121274123604\",\"name\":\"footer-position\"}],\"background\":\"#fff\"},\"size\":{\"w\":3508,\"h\":2480}}', '', 'colorful-preschool-anna-certificate-95cd03ed-4562-4690-aae6-aa0b9c284461.png', 'conduct-bg-9b8ed649-a030-4e98-a873-63a4c6a65a2b.jpg'),
('51e59cab-6e9e-4738-adfa-0ae71fd97a92', 'tenplate 1', 'template 1', '  {\"json\":{\"version\":\"5.2.0\",\"objects\":[{\"type\":\"image\",\"name\":\"bg-image\",\"src\":\"http://localhost:5000/images/ci/colorful-elementary-certificate-8a9127d1-988e-4e40-8e39-23d7dc5afca1.png\"},{\"type\":\"textbox\",\"left\":412.55,\"top\":813.07,\"width\":269.65,\"height\":19.21,\"fill\":\"#efb409\",\"scaleX\":9.92,\"scaleY\":9.92,\"fontFamily\":\"Fredoka One\",\"fontSize\":\"17\",\"text\":\"Certificate of Recognition\",\"textAlign\":\"center\",\"id\":\"2023121554293730176\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":336.04,\"top\":1762.61,\"width\":285.08,\"height\":26.26,\"scaleX\":9.92,\"scaleY\":9.92,\"fontFamily\":\"Roboto\",\"fontSize\":\"7\",\"text\":\"during the First Quarter Recognition of Achievers, for School Year 2022-2023. <-br->Given this 23rd day of February, 2023 at B. Vasquez Memorial Central Elementary <-br->School, Brgy. Rizal, Surigao City \",\"textAlign\":\"center\",\"id\":\"2023121517836210261\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":949.6,\"top\":1035.12,\"width\":161.38,\"height\":6.78,\"scaleX\":9.92,\"scaleY\":9.92,\"fontFamily\":\"Roboto\",\"fontSize\":\"6\",\"text\":\"This certificate is awarded to\",\"textAlign\":\"center\",\"id\":\"202312152438814066\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":558.59,\"top\":1175.14,\"width\":240.21,\"height\":16.95,\"fill\":\"#050a0a\",\"scaleX\":9.92,\"scaleY\":9.92,\"fontFamily\":\"Dancing Script\",\"fontSize\":\"15\",\"text\":\"Canico, Zaijan Jade, Sulapas\",\"textAlign\":\"center\",\"id\":\"2023121540632261491\",\"name\":\"Column-1-textbox\"},{\"type\":\"textbox\",\"left\":1254.04,\"top\":229.26,\"width\":100,\"height\":14.64,\"scaleX\":9.92,\"scaleY\":9.92,\"fontFamily\":\"Roboto\",\"fontWeight\":\"bold\",\"fontSize\":\"6\",\"text\":\"Republic of the Philippines<-br->Department of Education\",\"textAlign\":\"center\",\"id\":\"2023121556211790666\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":791.07,\"top\":585.69,\"width\":193.34,\"height\":6.78,\"scaleX\":9.92,\"scaleY\":9.92,\"fontFamily\":\"Roboto\",\"fontWeight\":\"bold\",\"fontSize\":\"6\",\"text\":\"B. Vasquez Memorial Central Elementary School\",\"textAlign\":\"center\",\"id\":\"202312153610991579\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":1007.96,\"top\":1524.3,\"width\":142.67,\"height\":7.91,\"scaleX\":10.4,\"scaleY\":10.4,\"fontFamily\":\"Roboto\",\"fontSize\":\"7\",\"text\":\"for his/her Academic Performance as \",\"textAlign\":\"center\",\"id\":\"2023121203439911737\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":1229.8,\"top\":1357.12,\"width\":100,\"height\":6.78,\"scaleX\":10.4,\"scaleY\":10.4,\"fontFamily\":\"Roboto\",\"fontSize\":\"6\",\"text\":\"132289180057\",\"textAlign\":\"center\",\"id\":\"202312120423904223\",\"name\":\"Column-2-textbox\"},{\"type\":\"textbox\",\"left\":786.32,\"top\":392.87,\"width\":185.29,\"height\":18.76,\"scaleX\":10.4,\"scaleY\":10.4,\"fontFamily\":\"Roboto\",\"fontSize\":\"5\",\"text\":\"CARAGA ADMINISTRATIVE REGION<-br->Division of Surigao City<-br->Surigao City, District 6\",\"textAlign\":\"center\",\"id\":\"2023121204671633750\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":1162.53,\"top\":672.4,\"width\":112.94,\"height\":5.65,\"scaleX\":10.4,\"scaleY\":10.4,\"fontFamily\":\"Roboto\",\"fontSize\":\"5\",\"text\":\"Rizal, Surigao City\",\"textAlign\":\"center\",\"id\":\"20231212012514651156\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":1360.41,\"top\":1652.1,\"width\":100,\"height\":10.17,\"scaleX\":7.81,\"scaleY\":7.81,\"fontFamily\":\"Roboto\",\"fontWeight\":\"bold\",\"fontSize\":\"9\",\"text\":\"WITH HONORS\",\"textAlign\":\"center\",\"id\":\"20231212026195569404\",\"name\":\"textbox\"},{\"type\":\"textbox\",\"left\":2157.82,\"top\":2102.05,\"width\":93.54,\"height\":6.78,\"scaleX\":8.6,\"scaleY\":8.6,\"fontFamily\":\"Roboto\",\"fontWeight\":\"bold\",\"fontSize\":\"6\",\"text\":\"DAWN ANDREW N. RIVERO\",\"textAlign\":\"center\",\"id\":\"20231212141165523315\",\"name\":\"footer-name\"},{\"type\":\"textbox\",\"left\":2177.08,\"top\":2154.16,\"width\":93.54,\"height\":6.78,\"scaleX\":8.6,\"scaleY\":8.6,\"fontFamily\":\"Roboto\",\"fontSize\":\"6\",\"text\":\"Adviser\",\"textAlign\":\"center\",\"id\":\"2023121214425840219\",\"name\":\"footer-position\"},{\"type\":\"textbox\",\"left\":461.8,\"top\":2102.05,\"width\":93.54,\"height\":6.78,\"scaleX\":8.6,\"scaleY\":8.6,\"fontFamily\":\"Roboto\",\"fontWeight\":\"bold\",\"fontSize\":\"6\",\"text\":\"LUCELLE A. QUEZADA, EdD\",\"textAlign\":\"center\",\"id\":\"20231212136233605218\",\"name\":\"footer-name\"},{\"type\":\"textbox\",\"left\":469.6,\"top\":2154.16,\"width\":93.54,\"height\":6.78,\"scaleX\":8.6,\"scaleY\":8.6,\"fontFamily\":\"Roboto\",\"fontSize\":\"6\",\"text\":\"School Principal\",\"textAlign\":\"center\",\"id\":\"202312121274123604\",\"name\":\"footer-position\"}],\"background\":\"#fff\"},\"size\":{\"w\":3508,\"h\":2480}}', '', '', 'colorful-elementary-certificate-fc198790-f6c7-4b7c-a59d-8d24cb8bdd48.png');

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
('e1f01c22-e99f-4f54-acc2-a70ae8f875a6', 'andz89Wafo', 'andzrivero@gmail.com', '$2a$10$KfnFBYovZQNvk9T2C9LA1e2f4V9EQY3wayhPy2bRVe0CJ36WBQnjC', 0, '[]', 'true'),
('e3aeb94f-eb41-47e0-9bfc-0893112eae91', 'virginia', 'virginia@gmail.com', '$2a$10$.zFXuRXW4FmUeL9gC8F2LOXxg9b29K5OOjylGNZrzigkrjJiPlFBe', 0, '', ''),
('ea12a0a6-73d6-456b-87d0-abc0017b014e', 'gwill', 'gwill21@gmail.com', '$2a$10$.D9XVPGdVc0ZV34eECUyaO086h8.6JqOZetuLILSSU6mATpsQzz2G', 0, '[{\"data_1\":\"AMONCIO,KEN ERVIC, COMENDADOR\",\"data_2\":\"132289180002\",\"data_3\":\"disable\"},{\"data_1\":\"BALUTAN,JHUNDY, FUENTES\",\"data_2\":\"132289180051\",\"data_3\":\"disable\"},{\"data_1\":\"Cagabcab, Aaron, Camantoy\",\"data_2\":\"132289180086\",\"data_3\":\"\"},{\"data_1\":\"Cagna-an, Jexter Zion, De Castro\",\"data_2\":\"132610180002\",\"data_3\":\"\"},{\"data_1\":\"Canico, Zaijan Jade, Sulapas\",\"data_2\":\"132289180057\",\"data_3\":\"\"},{\"data_1\":\"COMANDA,NOEL JR., ABASOLA\",\"data_2\":\"132289180010\",\"data_3\":\"disable\"},{\"data_1\":\"DUBDUBAN,KEITH, LABATOS\",\"data_2\":\"132289180020\",\"data_3\":\"disable\"}]', 'true');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
