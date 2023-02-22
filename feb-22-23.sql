-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2023 at 12:20 AM
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
  `date_purchased` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admin_user`
--

CREATE TABLE `admin_user` (
  `id` int(11) NOT NULL,
  `admin_user_name` varchar(30) NOT NULL,
  `admin_user_email` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `admin_user_role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_user`
--

INSERT INTO `admin_user` (`id`, `admin_user_name`, `admin_user_email`, `password`, `admin_user_role`) VALUES
(1, 'andz89', 'andzrivero89@gmail.com', '$2a$10$KfnFBYovZQNvk9T2C9LA1e2f4V9EQY3wayhPy2bRVe0CJ36WBQnjC', 'admin');

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
  `canvas_image` varchar(100) NOT NULL
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
('7nZbBLXFzlPBzYPNAWzUq9LjRvanRTGm', 1677194171, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-02-23T22:59:42.114Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":{\"user_id\":\"e1f01c22-e99f-4f54-acc2-a70ae8f875a6\",\"user_email\":\"andzrivero89@gmail.com\",\"user_role\":\"user\"}}'),
('YIiVg2-kr5fsQZDxvLAP-7j7HwgUS5l5', 1677193182, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-02-23T22:59:42.080Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('jJdbNm6z-EEE1EH9GWPjCcBKKuy4_Qac', 1677194218, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-02-23T23:16:22.559Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":{\"user_id\":\"e1f01c22-e99f-4f54-acc2-a70ae8f875a6\",\"user_email\":\"andzrivero89@gmail.com\",\"user_role\":\"user\"}}');

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
  `user_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `templates`
--

INSERT INTO `templates` (`template_id`, `template_name`, `template_description`, `template_json`, `template_category`, `canvas_image`, `user_id`) VALUES
('1c549a69-7056-4c5f-917a-22a1ffcd2c41', 'With Honors', 'Certificate With Honors 21 backgrounds available', '{\"json\":{\"version\":\"5.2.0\",\"objects\":[{\"type\":\"textbox\",\"left\":736.56,\"top\":761.22,\"width\":204.33,\"height\":19.21,\"fill\":\"#b4552d\",\"scaleX\":9.92,\"scaleY\":9.92,\"fontSize\":\"17\",\"text\":\"Certificate of Recognition\",\"textAlign\":\"center\",\"id\":\"2023121554293730176\",\"name\":\"textbox\",\"lockMovementX\":true,\"lockMovementY\":false},{\"type\":\"textbox\",\"left\":336.04,\"top\":1774.32,\"width\":285.08,\"height\":26.26,\"scaleX\":9.92,\"scaleY\":9.92,\"fontSize\":\"7\",\"text\":\"during the First Quarter Recognition of Achievers, for School Year 2022-2023. <-br->Given this 23rd day of February, 2023 at B. Vasquez Memorial Central Elementary <-br->School, Brgy. Rizal, Surigao City \",\"textAlign\":\"center\",\"id\":\"2023121517836210261\",\"name\":\"textbox\",\"lockMovementX\":true,\"lockMovementY\":false},{\"type\":\"textbox\",\"left\":949.6,\"top\":1035.12,\"width\":161.38,\"height\":6.78,\"scaleX\":9.92,\"scaleY\":9.92,\"fontSize\":\"6\",\"text\":\"This certificate is awarded to\",\"textAlign\":\"center\",\"id\":\"202312152438814066\",\"name\":\"textbox\",\"lockMovementX\":true,\"lockMovementY\":false},{\"type\":\"textbox\",\"left\":823.3,\"top\":1208.06,\"width\":186.84,\"height\":16.95,\"fill\":\"#050a0a\",\"scaleX\":9.92,\"scaleY\":9.92,\"fontSize\":\"15\",\"text\":\"Juan Dela Cruz\",\"textAlign\":\"center\",\"id\":\"2023121540632261491\",\"name\":\"Column-1-textbox\",\"lockMovementX\":true,\"lockMovementY\":false},{\"type\":\"textbox\",\"left\":1254.04,\"top\":112.2,\"width\":100,\"height\":14.64,\"scaleX\":9.92,\"scaleY\":9.92,\"fontWeight\":\"bold\",\"fontSize\":\"6\",\"text\":\"Republic of the Philippines<-br->Department of Education\",\"textAlign\":\"center\",\"id\":\"2023121556211790666\",\"name\":\"textbox\",\"lockMovementX\":true,\"lockMovementY\":false},{\"type\":\"textbox\",\"left\":791.07,\"top\":472.53,\"width\":193.34,\"height\":6.78,\"scaleX\":9.92,\"scaleY\":9.92,\"fontWeight\":\"bold\",\"fontSize\":\"6\",\"text\":\"B. Vasquez Memorial Central Elementary School\",\"textAlign\":\"center\",\"id\":\"202312153610991579\",\"name\":\"textbox\",\"lockMovementX\":true,\"lockMovementY\":false},{\"type\":\"textbox\",\"left\":1007.96,\"top\":1536.01,\"width\":142.67,\"height\":7.91,\"scaleX\":10.4,\"scaleY\":10.4,\"fontSize\":\"7\",\"text\":\"for his/her Academic Performance as \",\"textAlign\":\"center\",\"id\":\"2023121203439911737\",\"name\":\"textbox\",\"lockMovementX\":true,\"lockMovementY\":false},{\"type\":\"textbox\",\"left\":1229.8,\"top\":1384.43,\"width\":100,\"height\":6.78,\"scaleX\":10.4,\"scaleY\":10.4,\"fontSize\":\"6\",\"text\":\"LRN\",\"textAlign\":\"center\",\"id\":\"202312120423904223\",\"name\":\"Column-2-textbox\",\"lockMovementX\":true,\"lockMovementY\":false},{\"type\":\"textbox\",\"left\":786.32,\"top\":271.91,\"width\":185.29,\"height\":18.76,\"scaleX\":10.4,\"scaleY\":10.4,\"fontSize\":\"5\",\"text\":\"CARAGA ADMINISTRATIVE REGION<-br->Division of Surigao City<-br->Surigao City, District 6\",\"textAlign\":\"center\",\"id\":\"2023121204671633750\",\"name\":\"textbox\",\"lockMovementX\":true,\"lockMovementY\":false},{\"type\":\"textbox\",\"left\":1162.53,\"top\":551.44,\"width\":112.94,\"height\":5.65,\"scaleX\":10.4,\"scaleY\":10.4,\"fontSize\":\"5\",\"text\":\"Rizal, Surigao City\",\"textAlign\":\"center\",\"id\":\"20231212012514651156\",\"name\":\"textbox\",\"lockMovementX\":true,\"lockMovementY\":false},{\"type\":\"textbox\",\"left\":1360.41,\"top\":1656,\"width\":100,\"height\":10.17,\"scaleX\":7.81,\"scaleY\":7.81,\"fontWeight\":\"bold\",\"fontSize\":\"9\",\"text\":\"WITH HONORS\",\"textAlign\":\"center\",\"id\":\"20231212026195569404\",\"name\":\"textbox\",\"lockMovementX\":true,\"lockMovementY\":false},{\"type\":\"textbox\",\"left\":2177.33,\"top\":2191.8,\"width\":93.54,\"height\":6.78,\"scaleX\":8.6,\"scaleY\":8.6,\"fontWeight\":\"bold\",\"fontSize\":\"6\",\"text\":\"DAWN ANDREW N. RIVERO\",\"textAlign\":\"center\",\"id\":\"20231212141165523315\",\"name\":\"footer-name\",\"lockMovementX\":false,\"lockMovementY\":false},{\"type\":\"textbox\",\"left\":2177.08,\"top\":2252.96,\"width\":93.54,\"height\":6.78,\"scaleX\":8.6,\"scaleY\":8.6,\"fontSize\":\"6\",\"text\":\"Adviser\",\"textAlign\":\"center\",\"id\":\"2023121214425840219\",\"name\":\"footer-position\",\"lockMovementX\":false,\"lockMovementY\":false},{\"type\":\"textbox\",\"left\":469.6,\"top\":2191.8,\"width\":93.54,\"height\":6.78,\"scaleX\":8.6,\"scaleY\":8.6,\"fontWeight\":\"bold\",\"fontSize\":\"6\",\"text\":\"LUCELLE A. QUEZADA, EdD\",\"textAlign\":\"center\",\"id\":\"20231212136233605218\",\"name\":\"footer-name\",\"lockMovementX\":false,\"lockMovementY\":false},{\"type\":\"textbox\",\"left\":469.6,\"top\":2252.96,\"width\":93.54,\"height\":6.78,\"scaleX\":8.6,\"scaleY\":8.6,\"fontSize\":\"6\",\"text\":\"School Principal\",\"textAlign\":\"center\",\"id\":\"202312121274123604\",\"name\":\"footer-position\",\"lockMovementX\":false,\"lockMovementY\":false}],\"background\":\"#fff\"},\"size\":{\"w\":3508,\"h\":2480}}', '', 'conduct-bg-9a0e7cc0-5c69-4888-b87e-a5eee9adbd92.jpg', ''),
('ff885bfa-516c-49da-a386-c2ac6e3a3125', 'Conduct award', 'Template Editable', '{\"json\":{\"version\":\"5.2.0\",\"objects\":[{\"type\":\"textbox\",\"left\":12.28,\"top\":17.4,\"width\":410.77,\"height\":62.96,\"scaleX\":4.2,\"scaleY\":4.2,\"backgroundColor\":\"transparent\",\"fontSize\":\"7\",\"text\":\"Republic of the Philippines<-br->Department of Education<-br->CARAGA Administrative region<-br->DIVISION OF SURIGAO CITY<-br->Surigao City District 6<-br->B. Vasquez Memorial Central Elementary School<-br->Rizal, Surigao City\",\"textAlign\":\"center\",\"lockMovementX\":true,\"lockMovementY\":false,\"lockScalingX\":false,\"lockScalingY\":false,\"id\":\"2023115221192894057\",\"name\":\"textbox\",\"centeredScaling\":true},{\"type\":\"textbox\",\"left\":102.53,\"top\":356.63,\"width\":367.79,\"height\":28.25,\"fill\":\"#008071\",\"scaleX\":4.2,\"scaleY\":4.2,\"backgroundColor\":\"transparent\",\"fontFamily\":\"Roboto\",\"fontWeight\":\"bold\",\"fontSize\":\"25\",\"text\":\"CONDUCT AWARD\",\"textAlign\":\"center\",\"lockMovementX\":true,\"lockMovementY\":false,\"lockScalingX\":false,\"lockScalingY\":false,\"id\":\"20231152234832711511\",\"name\":\"textbox\",\"centeredScaling\":true},{\"type\":\"textbox\",\"left\":24.87,\"top\":519.26,\"width\":404.77,\"height\":27.12,\"scaleX\":4.2,\"scaleY\":4.2,\"backgroundColor\":\"transparent\",\"fontSize\":\"24\",\"text\":\"Column-1-textbox\",\"textAlign\":\"center\",\"lockMovementX\":true,\"lockMovementY\":false,\"lockScalingX\":false,\"lockScalingY\":false,\"id\":\"20231152233321483726\",\"name\":\"Column-1-textbox\",\"centeredScaling\":true},{\"type\":\"textbox\",\"left\":10.18,\"top\":640.6,\"width\":411.77,\"height\":10.17,\"scaleX\":4.2,\"scaleY\":4.2,\"backgroundColor\":\"transparent\",\"fontSize\":9,\"text\":\"LRN\",\"textAlign\":\"center\",\"lockMovementX\":true,\"lockMovementY\":false,\"lockScalingX\":false,\"lockScalingY\":false,\"id\":\"20231152226670196091\",\"name\":\"Column-2-textbox\",\"centeredScaling\":true},{\"type\":\"textbox\",\"left\":35.37,\"top\":720.81,\"width\":399.78,\"height\":69.52,\"scaleX\":4.2,\"scaleY\":4.2,\"backgroundColor\":\"transparent\",\"fontFamily\":\"Roboto\",\"fontSize\":9,\"text\":\"in recognition for consistently and dutifully carrying out<-br->The Core Values of the Department of Education:<-br->Maka-Diyos, Makatao, Makakalikasan at Makabansa,<-br-><-br->during the second Quarter Recognition of Acheivers S.Y 2022-2023<-br->Given this 17th day of February 2023<-br->at Bernardo Vasquez Memorial Central Elementary School, Brgy. Rizal, Surigao City.\",\"textAlign\":\"center\",\"lockMovementX\":true,\"lockMovementY\":false,\"lockScalingX\":false,\"lockScalingY\":false,\"id\":\"2023115222559259556\",\"name\":\"textbox\",\"centeredScaling\":true},{\"type\":\"textbox\",\"left\":1565.37,\"top\":1098.84,\"width\":144.96,\"height\":9.04,\"scaleX\":4.2,\"scaleY\":4.2,\"backgroundColor\":\"transparent\",\"fontSize\":\"8\",\"text\":\"Your Text Here\",\"textAlign\":\"center\",\"lockMovementX\":false,\"lockMovementY\":false,\"lockScalingX\":false,\"lockScalingY\":false,\"id\":\"20231152214754655602\",\"name\":\"textbox\",\"centeredScaling\":true},{\"type\":\"textbox\",\"left\":111.2,\"top\":1085.89,\"width\":167.28,\"height\":9.04,\"scaleX\":4.2,\"scaleY\":4.2,\"backgroundColor\":\"transparent\",\"fontFamily\":\"Roboto\",\"fontWeight\":\"bold\",\"fontSize\":\"8\",\"text\":\"LUCELLE A. QUEZADA, EdD\",\"textAlign\":\"center\",\"lockMovementX\":true,\"lockMovementY\":false,\"lockScalingX\":false,\"lockScalingY\":false,\"id\":\"20231152210294813080\",\"name\":\"footer-name\",\"centeredScaling\":true},{\"type\":\"textbox\",\"left\":163.68,\"top\":1143.24,\"width\":142.29,\"height\":7.91,\"scaleX\":4.2,\"scaleY\":4.2,\"backgroundColor\":\"transparent\",\"fontFamily\":\"Roboto\",\"fontSize\":\"7\",\"text\":\"School Principal 3\",\"textAlign\":\"center\",\"lockMovementX\":true,\"lockMovementY\":false,\"lockScalingX\":false,\"lockScalingY\":false,\"id\":\"20231152245203360342\",\"name\":\"footer-position\",\"centeredScaling\":true},{\"type\":\"textbox\",\"left\":1002.04,\"top\":1143.24,\"width\":142.29,\"height\":7.91,\"scaleX\":4.2,\"scaleY\":4.2,\"backgroundColor\":\"transparent\",\"fontFamily\":\"Roboto\",\"fontSize\":\"7\",\"text\":\"Adviser\",\"textAlign\":\"center\",\"lockMovementX\":true,\"lockMovementY\":false,\"lockScalingX\":false,\"lockScalingY\":false,\"id\":\"2023115225499999686\",\"name\":\"footer-position\",\"centeredScaling\":true},{\"type\":\"textbox\",\"left\":948.15,\"top\":1085.89,\"width\":161.95,\"height\":9.04,\"scaleX\":4.2,\"scaleY\":4.2,\"backgroundColor\":\"transparent\",\"fontFamily\":\"Roboto\",\"fontWeight\":\"bold\",\"fontSize\":\"8\",\"text\":\"Dawn Andrew N. Rivero\",\"textAlign\":\"center\",\"lockMovementX\":true,\"lockMovementY\":false,\"lockScalingX\":false,\"lockScalingY\":false,\"id\":\"2023115225499881211\",\"name\":\"footer-name\",\"centeredScaling\":true}],\"background\":\"#fff\",\"centeredScaling\":false},\"size\":{\"w\":1754,\"h\":1240}}', '', 'conduct-bg-a56b1e67-0171-4cc3-9f30-99dcea58e458.jpg', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(100) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `purchase` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_password`, `purchase`) VALUES
('e1f01c22-e99f-4f54-acc2-a70ae8f875a6', 'andz89', 'andzrivero89@gmail.com', '$2a$10$KfnFBYovZQNvk9T2C9LA1e2f4V9EQY3wayhPy2bRVe0CJ36WBQnjC', 0),
('e3aeb94f-eb41-47e0-9bfc-0893112eae91', 'virginia', 'virginia@gmail.com', '$2a$10$.zFXuRXW4FmUeL9gC8F2LOXxg9b29K5OOjylGNZrzigkrjJiPlFBe', 0),
('ea12a0a6-73d6-456b-87d0-abc0017b014e', 'gwill', 'gwill21@gmail.com', '$2a$10$.D9XVPGdVc0ZV34eECUyaO086h8.6JqOZetuLILSSU6mATpsQzz2G', 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `admin_user`
--
ALTER TABLE `admin_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `purchased_template`
--
ALTER TABLE `purchased_template`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
