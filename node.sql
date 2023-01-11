-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 11, 2023 at 11:59 PM
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
('egWcO6e6mfwzb7uz1LWLFHguxcAUaG7n', 1673476955, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-01-11T22:42:34.541Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('jAFoqUGple676KNFv240zqUbY_6VBjFE', 1673564241, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-01-12T22:32:56.968Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user\":{\"user_name\":\"andz89\",\"user_email\":\"andzrivero89@gmail.com\",\"user_role\":\"admin\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `templates`
--

CREATE TABLE `templates` (
  `template_id` varchar(100) NOT NULL,
  `template_name` varchar(255) NOT NULL,
  `template_description` varchar(255) NOT NULL,
  `json_file` varchar(2000) NOT NULL,
  `template_category` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `templates`
--

INSERT INTO `templates` (`template_id`, `template_name`, `template_description`, `json_file`, `template_category`) VALUES
('858a3e90-5006-4ae0-8a76-fd68fcbfbbdd', 'hellowdsf', 'sdfsf', '{\"json\":{\"version\":\"5.2.0\",\"objects\":[{\"type\":\"textbox\",\"version\":\"5.2.0\",\"originX\":\"left\",\"originY\":\"top\",\"left\":599.82,\"top\":312.44,\"width\":100,\"height\":13.56,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":4.2,\"scaleY\":4.2,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":\"\",\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"fontFamily\":\"Times New Roman\",\"fontWeight\":\"normal\",\"fontSize\":12,\"text\":\"Your Text Here\",\"underline\":false,\"overline\":false,\"linethrough\":false,\"textAlign\":\"center\",\"fontStyle\":\"normal\",\"lineHeight\":1.16,\"textBackgroundColor\":\"\",\"charSpacing\":0,\"styles\":{},\"direction\":\"ltr\",\"path\":null,\"pathStartOffset\":0,\"pathSide\":\"left\",\"pathAlign\":\"baseline\",\"minWidth\":20,\"splitByGrapheme\":true,\"editable\":false,\"borderColor\":\"#333\",\"cornerColor\":\"#17a2b8\",\"cornerSize\":13,\"cornerStyle\":\"circle\",\"transparentCorners\":false,\"_controlsVisibility\":{\"mtr\":false},\"lockMovementX\":false,\"lockMovementY\":false,\"lockScalingX\":false,\"lockScalingY\":false,\"selectable\":true,\"id\":\"202306153499525523\",\"name\":\"column-1-textbox\"}],\"background\":\"#fff\"},\"size\":{\"w\":1754,\"h\":1240},\"fileHandle\":{\"s\":{}}}', ''),
('85ed40f4-3d45-4c30-a8f5-444cdbfd7b86', 'ggg', 'ggg', '{\"json\":{\"version\":\"5.2.0\",\"objects\":[{\"type\":\"textbox\",\"version\":\"5.2.0\",\"originX\":\"left\",\"originY\":\"top\",\"left\":599.82,\"top\":312.44,\"width\":100,\"height\":13.56,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":4.2,\"scaleY\":4.2,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":\"\",\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"fontFamily\":\"Times New Roman\",\"fontWeight\":\"normal\",\"fontSize\":12,\"text\":\"Your Text Here\",\"underline\":false,\"overline\":false,\"linethrough\":false,\"textAlign\":\"center\",\"fontStyle\":\"normal\",\"lineHeight\":1.16,\"textBackgroundColor\":\"\",\"charSpacing\":0,\"styles\":{},\"direction\":\"ltr\",\"path\":null,\"pathStartOffset\":0,\"pathSide\":\"left\",\"pathAlign\":\"baseline\",\"minWidth\":20,\"splitByGrapheme\":true,\"editable\":false,\"borderColor\":\"#333\",\"cornerColor\":\"#17a2b8\",\"cornerSize\":13,\"cornerStyle\":\"circle\",\"transparentCorners\":false,\"_controlsVisibility\":{\"mtr\":false},\"lockMovementX\":false,\"lockMovementY\":false,\"lockScalingX\":false,\"lockScalingY\":false,\"selectable\":true,\"id\":\"202306153499525523\",\"name\":\"column-1-textbox\"}],\"background\":\"#fff\"},\"size\":{\"w\":1754,\"h\":1240},\"fileHandle\":{\"s\":{}}}', ''),
('db8a752f-5537-4b6b-877b-d9dd69f159dc', 'asd', 'asd', '{\"json\":{\"version\":\"5.2.0\",\"objects\":[{\"type\":\"textbox\",\"version\":\"5.2.0\",\"originX\":\"left\",\"originY\":\"top\",\"left\":599.82,\"top\":312.44,\"width\":100,\"height\":13.56,\"fill\":\"rgb(0,0,0)\",\"stroke\":null,\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":4.2,\"scaleY\":4.2,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":\"\",\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"fontFamily\":\"Times New Roman\",\"fontWeight\":\"normal\",\"fontSize\":12,\"text\":\"Your Text Here\",\"underline\":false,\"overline\":false,\"linethrough\":false,\"textAlign\":\"center\",\"fontStyle\":\"normal\",\"lineHeight\":1.16,\"textBackgroundColor\":\"\",\"charSpacing\":0,\"styles\":{},\"direction\":\"ltr\",\"path\":null,\"pathStartOffset\":0,\"pathSide\":\"left\",\"pathAlign\":\"baseline\",\"minWidth\":20,\"splitByGrapheme\":true,\"editable\":false,\"borderColor\":\"#333\",\"cornerColor\":\"#17a2b8\",\"cornerSize\":13,\"cornerStyle\":\"circle\",\"transparentCorners\":false,\"_controlsVisibility\":{\"mtr\":false},\"lockMovementX\":false,\"lockMovementY\":false,\"lockScalingX\":false,\"lockScalingY\":false,\"selectable\":true,\"id\":\"202306153499525523\",\"name\":\"column-1-textbox\"}],\"background\":\"#fff\"},\"size\":{\"w\":1754,\"h\":1240},\"fileHandle\":{\"s\":{}}}', '');

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
-- Indexes for table `admin_user`
--
ALTER TABLE `admin_user`
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
-- AUTO_INCREMENT for table `admin_user`
--
ALTER TABLE `admin_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
