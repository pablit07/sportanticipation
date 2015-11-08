-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 06, 2015 at 03:18 PM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sportanticipationdb1`
--

-- --------------------------------------------------------

--
-- Table structure for table `st_answers`
--

CREATE TABLE IF NOT EXISTS `st_answers` (
  `answer_id` int(22) NOT NULL,
  `answer_answer` mediumtext NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `st_answers`
--

INSERT INTO `st_answers` (`answer_id`, `answer_answer`) VALUES
(1, 'Curve Ball Ball'),
(2, 'Fast Ball Ball'),
(3, 'Change Up Ball'),
(4, 'Change Up Strike'),
(5, 'Curve Ball Strike'),
(6, 'Fast Ball Strike');

-- --------------------------------------------------------

--
-- Table structure for table `st_configuration`
--

CREATE TABLE IF NOT EXISTS `st_configuration` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `value` varchar(150) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `st_configuration`
--

INSERT INTO `st_configuration` (`id`, `name`, `value`) VALUES
(1, 'website_name', 'SportAnticipation'),
(2, 'website_url', 'http://sportanticipation.com/'),
(3, 'email', 'noreply@enoxh.com'),
(4, 'activation', 'false'),
(5, 'resend_activation_threshold', '0'),
(6, 'language', 'models/languages/en.php'),
(7, 'template', 'models/site-templates/default.css');

-- --------------------------------------------------------

--
-- Table structure for table `st_pages`
--

CREATE TABLE IF NOT EXISTS `st_pages` (
  `id` int(11) NOT NULL,
  `page` varchar(150) NOT NULL,
  `private` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `st_pages`
--

INSERT INTO `st_pages` (`id`, `page`, `private`) VALUES
(1, 'account.php', 1),
(2, 'activate-account.php', 0),
(3, 'admin_configuration.php', 1),
(4, 'admin_page.php', 1),
(5, 'admin_pages.php', 1),
(6, 'admin_permission.php', 1),
(7, 'admin_permissions.php', 1),
(8, 'admin_user.php', 1),
(9, 'admin_users.php', 1),
(10, 'forgot-password.php', 0),
(11, 'index.php', 0),
(12, 'left-nav.php', 0),
(13, 'login.php', 0),
(14, 'logout.php', 1),
(15, 'register.php', 0),
(16, 'resend-activation.php', 0),
(17, 'user_settings.php', 1),
(21, 'ajaxCRUD.class.php', 0),
(22, 'blank.php', 0),
(28, 'example.php', 0),
(32, 'preheader.php', 0),
(33, 'promote.php', 0),
(36, 'sqlite.php', 0),
(37, 'test_main.php', 0),
(38, 'test_results.php', 1),
(39, 'test_start.php', 1),
(40, 'top_nav.php', 0),
(41, 'website.php', 0),
(42, 'answer_question.php', 1),
(43, 'test_funcs.php', 1),
(44, 'pre_test.php', 1),
(45, 'makejson.php', 1),
(46, 'manage_answers.php', 0),
(47, 'manage_questions.php', 0),
(48, 'manage_tests.php', 0),
(49, 'quiz.php', 0);

-- --------------------------------------------------------

--
-- Table structure for table `st_permissions`
--

CREATE TABLE IF NOT EXISTS `st_permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `st_permissions`
--

INSERT INTO `st_permissions` (`id`, `name`) VALUES
(1, 'New Member'),
(2, 'Administrator');

-- --------------------------------------------------------

--
-- Table structure for table `st_permission_page_matches`
--

CREATE TABLE IF NOT EXISTS `st_permission_page_matches` (
  `id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  `page_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `st_permission_page_matches`
--

INSERT INTO `st_permission_page_matches` (`id`, `permission_id`, `page_id`) VALUES
(1, 1, 1),
(2, 1, 14),
(3, 1, 17),
(4, 2, 1),
(5, 2, 3),
(6, 2, 4),
(7, 2, 5),
(8, 2, 6),
(9, 2, 7),
(10, 2, 8),
(11, 2, 9),
(12, 2, 14),
(13, 2, 17),
(23, 1, 39),
(24, 2, 39),
(25, 1, 43),
(26, 2, 43),
(27, 1, 42),
(28, 2, 42),
(29, 1, 44),
(30, 2, 44),
(31, 1, 38),
(32, 2, 38),
(33, 1, 45),
(34, 2, 45);

-- --------------------------------------------------------

--
-- Table structure for table `st_questions`
--

CREATE TABLE IF NOT EXISTS `st_questions` (
  `question_id` int(22) NOT NULL,
  `question_question` mediumtext NOT NULL,
  `question_answer` mediumtext NOT NULL,
  `question_video` varchar(200) NOT NULL,
  `question_weight` int(11) NOT NULL,
  `question_occ` int(11) NOT NULL,
  `question_test` int(11) NOT NULL,
  `question_test_num` int(22) NOT NULL,
  `question_correct` int(22) NOT NULL,
  `question_battingside` int(4) NOT NULL,
  `question_alt_video` varchar(150) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `st_questions`
--

INSERT INTO `st_questions` (`question_id`, `question_question`, `question_answer`, `question_video`, `question_weight`, `question_occ`, `question_test`, `question_test_num`, `question_correct`, `question_battingside`, `question_alt_video`) VALUES
(1, 'What kind of pitch is this?', 'Fastball Left', 'videos/001/001.mp4', 1, 1, 1, 1, 1, 1, 'videos/001/002.mp4'),
(2, 'What kind of pitch is this?', 'Fastball Left', 'videos/001/001.mp4', 1, 1, 1, 2, 1, 1, 'videos/001/002.mp4'),
(3, 'What kind of pitch is this?', 'Fastball Left', 'videos/001/001.mp4', 1, 1, 1, 3, 1, 1, 'videos/001/002.mp4'),
(4, 'What kind of pitch is this?', 'Fastball Left', 'videos/001/001.mp4', 1, 1, 1, 4, 1, 1, 'videos/001/002.mp4'),
(5, 'What kind of pitch is this?', 'Fastball Left', 'videos/001/001.mp4', 1, 1, 1, 1, 1, 1, 'videos/001/002.mp4');

-- --------------------------------------------------------

--
-- Table structure for table `st_results`
--

CREATE TABLE IF NOT EXISTS `st_results` (
  `result_id` int(11) NOT NULL,
  `result_user` int(11) NOT NULL,
  `result_test` int(11) NOT NULL,
  `result_question` int(11) NOT NULL,
  `result_answered` mediumtext NOT NULL,
  `result_correct_answer` mediumtext NOT NULL,
  `result_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM AUTO_INCREMENT=192 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `st_results`
--

INSERT INTO `st_results` (`result_id`, `result_user`, `result_test`, `result_question`, `result_answered`, `result_correct_answer`, `result_date`) VALUES
(123, 7, 1, 3, '2', '1', '2015-06-22 16:20:19'),
(122, 7, 1, 2, '1', '1', '2015-06-22 16:20:10'),
(121, 7, 1, 1, '2', '1', '2015-06-22 16:20:02'),
(120, 7, 1, 4, '1', '1', '2015-06-22 16:19:53'),
(119, 7, 1, 3, '2', '1', '2015-06-22 16:19:45'),
(118, 7, 1, 2, '1', '1', '2015-06-22 16:19:37'),
(117, 7, 1, 1, '3', '1', '2015-06-22 16:19:28'),
(116, 7, 1, 4, '1', '1', '2015-06-22 16:16:22'),
(115, 7, 1, 3, '2', '1', '2015-06-22 16:16:07'),
(114, 7, 1, 2, '2', '1', '2015-06-22 16:15:56'),
(113, 7, 1, 1, '2', '1', '2015-06-22 16:15:43'),
(112, 7, 1, 4, '1', '1', '2015-06-22 16:15:32'),
(111, 7, 1, 3, '1', '1', '2015-06-22 16:15:23'),
(110, 7, 1, 2, '1', '1', '2015-06-22 16:15:11'),
(109, 7, 1, 1, '4', '1', '2015-06-22 16:15:02'),
(108, 7, 1, 4, '1', '1', '2015-06-22 16:13:22'),
(107, 7, 1, 3, '1', '1', '2015-06-22 16:13:13'),
(106, 7, 1, 2, '1', '1', '2015-06-22 16:13:05'),
(105, 7, 1, 1, '1', '1', '2015-06-22 16:12:57'),
(104, 7, 1, 4, '1', '1', '2015-06-22 16:12:48'),
(103, 7, 1, 3, '5', '1', '2015-06-22 16:12:38'),
(102, 7, 1, 2, '4', '1', '2015-06-22 16:12:28'),
(101, 7, 1, 1, '2', '1', '2015-06-22 16:12:19'),
(100, 7, 1, 4, '2', '1', '2015-06-22 16:10:04'),
(99, 7, 1, 3, '1', '1', '2015-06-22 16:09:47'),
(98, 7, 1, 2, '1', '1', '2015-06-22 16:09:35'),
(97, 7, 1, 1, '1', '1', '2015-06-22 16:09:26'),
(96, 7, 1, 4, '1', '1', '2015-06-22 16:09:17'),
(95, 7, 1, 3, '2', '1', '2015-06-22 16:09:07'),
(94, 7, 1, 2, '1', '1', '2015-06-22 16:08:57'),
(93, 7, 1, 1, '1', '1', '2015-06-22 16:08:48'),
(92, 7, 1, 4, '1', '1', '2015-06-22 16:07:57'),
(91, 7, 1, 3, '1', '1', '2015-06-22 16:07:49'),
(90, 7, 1, 2, '2', '1', '2015-06-22 16:07:39'),
(89, 7, 1, 1, '1', '1', '2015-06-22 16:07:24'),
(88, 7, 1, 4, '1', '1', '2015-06-22 16:07:14'),
(87, 7, 1, 3, '2', '1', '2015-06-22 16:07:05'),
(86, 7, 1, 2, '1', '1', '2015-06-22 16:06:55'),
(85, 7, 1, 1, '3', '1', '2015-06-22 16:06:46'),
(84, 7, 1, 3, '1', '1', '2015-06-22 16:03:46'),
(83, 7, 1, 2, '2', '1', '2015-06-22 16:02:41'),
(82, 7, 1, 1, '1', '1', '2015-06-22 16:02:31'),
(81, 7, 1, 4, '4', '1', '2015-06-22 16:02:10'),
(80, 7, 1, 3, '3', '1', '2015-06-22 16:01:46'),
(79, 7, 1, 2, '2', '1', '2015-06-22 16:01:27'),
(78, 7, 1, 1, '1', '1', '2015-06-22 16:01:11'),
(77, 7, 1, 4, '1', '1', '2015-06-22 16:00:41'),
(124, 7, 1, 4, '1', '1', '2015-06-22 16:20:28'),
(125, 7, 1, 1, '1', '1', '2015-06-22 16:48:15'),
(126, 7, 1, 2, '1', '1', '2015-06-22 16:48:29'),
(127, 7, 1, 3, '1', '1', '2015-06-22 16:48:37'),
(128, 7, 1, 4, '1', '1', '2015-06-22 16:48:46'),
(129, 7, 1, 1, '2', '1', '2015-06-22 16:49:36'),
(130, 7, 1, 2, '1', '1', '2015-06-22 16:49:45'),
(131, 7, 1, 3, '1', '1', '2015-06-22 16:49:54'),
(132, 7, 1, 4, '1', '1', '2015-06-22 16:50:03'),
(133, 7, 1, 1, '1', '1', '2015-06-23 06:54:23'),
(134, 7, 1, 1, '1', '1', '2015-06-23 06:59:29'),
(135, 7, 1, 1, '1', '1', '2015-06-23 07:00:56'),
(136, 7, 1, 1, '1', '1', '2015-06-23 07:02:55'),
(137, 7, 1, 1, '1', '1', '2015-06-23 07:04:00'),
(138, 7, 1, 1, '1', '1', '2015-06-23 07:04:32'),
(139, 7, 1, 1, '1', '1', '2015-06-23 07:04:59'),
(140, 7, 1, 1, '1', '1', '2015-06-23 07:07:12'),
(141, 7, 1, 2, '4', '1', '2015-06-23 07:07:26'),
(142, 7, 1, 1, '1', '1', '2015-06-23 07:09:32'),
(143, 7, 1, 1, '1', '1', '2015-06-23 07:10:10'),
(144, 7, 1, 1, '1', '1', '2015-06-23 07:10:14'),
(145, 7, 1, 1, '1', '1', '2015-06-23 07:10:35'),
(146, 7, 1, 1, '1', '1', '2015-06-23 07:10:58'),
(147, 7, 1, 1, '1', '1', '2015-06-23 07:11:34'),
(148, 7, 1, 1, '1', '1', '2015-06-23 07:13:10'),
(149, 7, 1, 1, '3', '1', '2015-06-23 07:14:12'),
(150, 7, 1, 1, '3', '1', '2015-06-23 07:15:32'),
(151, 7, 1, 1, '3', '1', '2015-06-23 07:16:05'),
(152, 7, 1, 1, '3', '1', '2015-06-23 07:17:37'),
(153, 7, 1, 1, '3', '1', '2015-06-23 07:17:49'),
(154, 7, 1, 1, '1', '1', '2015-06-23 07:18:23'),
(155, 7, 1, 1, '1', '1', '2015-06-23 07:21:25'),
(156, 7, 1, 1, '1', '1', '2015-06-23 07:21:59'),
(157, 7, 1, 1, '1', '1', '2015-06-23 07:22:12'),
(158, 7, 1, 1, '1', '1', '2015-06-23 07:22:57'),
(159, 7, 1, 1, '1', '1', '2015-06-23 07:23:50'),
(160, 7, 1, 1, '1', '1', '2015-06-23 07:25:17'),
(161, 7, 1, 1, '1', '1', '2015-06-23 07:27:23'),
(162, 7, 1, 1, '1', '1', '2015-06-23 07:27:55'),
(163, 7, 1, 1, '1', '1', '2015-06-23 07:28:20'),
(164, 7, 1, 1, '1', '1', '2015-06-23 07:28:33'),
(165, 7, 1, 1, '1', '1', '2015-06-23 07:29:08'),
(166, 7, 1, 3, '1', '1', '2015-06-23 07:29:26'),
(167, 7, 1, 3, '1', '1', '2015-06-23 07:29:52'),
(168, 7, 1, 3, '1', '1', '2015-06-23 07:30:29'),
(169, 7, 1, 3, '1', '1', '2015-06-23 07:31:52'),
(170, 7, 1, 3, '1', '1', '2015-06-23 07:32:45'),
(171, 7, 1, 3, '1', '1', '2015-06-23 07:33:22'),
(172, 7, 1, 3, '1', '1', '2015-06-23 07:34:32'),
(173, 7, 1, 3, '1', '1', '2015-06-23 07:34:59'),
(174, 7, 1, 3, '1', '1', '2015-06-23 07:37:27'),
(175, 7, 1, 3, '1', '1', '2015-06-23 07:38:38'),
(176, 7, 1, 3, '1', '1', '2015-06-23 07:39:14'),
(177, 7, 1, 3, '1', '1', '2015-06-23 07:40:24'),
(178, 7, 1, 3, '1', '1', '2015-06-23 07:41:41'),
(179, 7, 1, 3, '1', '1', '2015-06-23 07:42:13'),
(180, 7, 1, 3, '1', '1', '2015-06-23 07:43:01'),
(181, 7, 1, 3, '1', '1', '2015-06-23 07:44:14'),
(182, 7, 1, 3, '1', '1', '2015-06-23 07:44:49'),
(183, 7, 1, 3, '1', '1', '2015-06-23 07:45:15'),
(184, 7, 1, 3, '1', '1', '2015-06-23 07:46:05'),
(185, 7, 1, 3, '1', '1', '2015-06-23 07:46:21'),
(186, 7, 1, 3, '1', '1', '2015-06-23 07:47:39'),
(187, 7, 1, 3, '1', '1', '2015-06-23 07:48:03'),
(188, 7, 1, 3, '1', '1', '2015-06-23 07:52:54'),
(189, 7, 1, 4, '2', '1', '2015-06-23 07:53:13'),
(190, 7, 1, 1, '6', '1', '2015-06-23 08:06:55'),
(191, 7, 1, 1, '6', '1', '2015-06-23 08:13:20');

-- --------------------------------------------------------

--
-- Table structure for table `st_teams`
--

CREATE TABLE IF NOT EXISTS `st_teams` (
  `team_id` int(11) NOT NULL,
  `team_name` varchar(250) NOT NULL,
  `team_admin` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `st_teams`
--

INSERT INTO `st_teams` (`team_id`, `team_name`, `team_admin`) VALUES
(1, 'Red Sox', 1),
(2, 'Yankees', 1);

-- --------------------------------------------------------

--
-- Table structure for table `st_tests`
--

CREATE TABLE IF NOT EXISTS `st_tests` (
  `test_id` int(22) NOT NULL,
  `test_title` mediumtext NOT NULL,
  `test_description` mediumtext NOT NULL,
  `test_team` mediumtext NOT NULL,
  `test_focus` mediumtext NOT NULL,
  `test_active` mediumtext NOT NULL,
  `test_author` mediumtext NOT NULL,
  `test_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `test_answers` varchar(100) NOT NULL,
  `test_question_count` int(22) NOT NULL,
  `test_question_order` varchar(100) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `st_tests`
--

INSERT INTO `st_tests` (`test_id`, `test_title`, `test_description`, `test_team`, `test_focus`, `test_active`, `test_author`, `test_created`, `test_answers`, `test_question_count`, `test_question_order`) VALUES
(1, 'Pitching Cues', 'Identify Pitching Cues', '1', '1', '1', '1', '2015-06-18 08:33:23', '1,2,3,4,5,6', 8, '12341234');

-- --------------------------------------------------------

--
-- Table structure for table `st_test_summaries`
--

CREATE TABLE IF NOT EXISTS `st_test_summaries` (
  `ts_id` int(22) NOT NULL,
  `ts_test_id` int(22) NOT NULL,
  `ts_total_answered` int(22) NOT NULL,
  `ts_total_correct` int(22) NOT NULL,
  `ts_user_id` int(22) NOT NULL,
  `ts_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `st_userinfo`
--

CREATE TABLE IF NOT EXISTS `st_userinfo` (
  `ui_id` int(22) NOT NULL,
  `ui_uid` int(22) NOT NULL,
  `ui_battingside` int(22) NOT NULL,
  `ui_usertype` int(22) NOT NULL,
  `ui_team` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `st_userinfo`
--

INSERT INTO `st_userinfo` (`ui_id`, `ui_uid`, `ui_battingside`, `ui_usertype`, `ui_team`) VALUES
(1, 1, 1, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `st_users`
--

CREATE TABLE IF NOT EXISTS `st_users` (
  `id` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `display_name` varchar(50) NOT NULL,
  `password` varchar(225) NOT NULL,
  `email` varchar(150) NOT NULL,
  `activation_token` varchar(225) NOT NULL,
  `last_activation_request` int(11) NOT NULL,
  `lost_password_request` tinyint(1) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `title` varchar(150) NOT NULL,
  `sign_up_stamp` int(11) NOT NULL,
  `last_sign_in_stamp` int(11) NOT NULL,
  `batting_side` int(4) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `st_users`
--

INSERT INTO `st_users` (`id`, `user_name`, `display_name`, `password`, `email`, `activation_token`, `last_activation_request`, `lost_password_request`, `active`, `title`, `sign_up_stamp`, `last_sign_in_stamp`, `batting_side`) VALUES
(1, 'enoxh', 'Enoxh', '118f1d13230c0ee7553c89cdc4bba0a4251794887608af65029d9d402c262eaa7', 'enoxheloe@gmail.com', 'eb3aafefb2388d766cbeda61aae53923', 1434618560, 0, 1, 'New Member', 1434618560, 1438179806, 1),
(2, 'testtestp', 'tomtest', 'a07ec920003a84d07c64f2ed57eb494563e766971891d8077eaaf26706aa88945', 'drpardikes@gmail.com', '7aa829ee7cc29b5c45d9c25b497e17f6', 1435539809, 0, 1, 'New Member', 1435539809, 1437665773, 0),
(5, 'username', 'UserName', '124a415f843dbe2b4943d9c66de130895ff8c75543c97963ff2bd2ae31d9c33f9', 'pardikes@gmail.com', '5918115fc5dc1bbbc0823e1f9701de4e', 1435857604, 0, 1, 'New Member', 1435857604, 1436631140, 0),
(6, 'pjf1234', 'PeterFadde', 'f0d139de14574ab84643da7b6c1b6ec7539ae54e7a3da999126b67bdd74c1006c', 'peter.fadde@gmail.com', 'd165c234142100d3d172bf03b5fbeff5', 1435861977, 0, 1, 'New Member', 1435861977, 1435862140, 0);

-- --------------------------------------------------------

--
-- Table structure for table `st_user_permission_matches`
--

CREATE TABLE IF NOT EXISTS `st_user_permission_matches` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `st_user_permission_matches`
--

INSERT INTO `st_user_permission_matches` (`id`, `user_id`, `permission_id`) VALUES
(1, 1, 2),
(2, 1, 1),
(3, 2, 1),
(5, 2, 2),
(8, 5, 1),
(9, 6, 1),
(10, 6, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `st_answers`
--
ALTER TABLE `st_answers`
  ADD PRIMARY KEY (`answer_id`);

--
-- Indexes for table `st_configuration`
--
ALTER TABLE `st_configuration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `st_pages`
--
ALTER TABLE `st_pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `st_permissions`
--
ALTER TABLE `st_permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `st_permission_page_matches`
--
ALTER TABLE `st_permission_page_matches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `st_questions`
--
ALTER TABLE `st_questions`
  ADD PRIMARY KEY (`question_id`);

--
-- Indexes for table `st_results`
--
ALTER TABLE `st_results`
  ADD PRIMARY KEY (`result_id`);

--
-- Indexes for table `st_teams`
--
ALTER TABLE `st_teams`
  ADD PRIMARY KEY (`team_id`);

--
-- Indexes for table `st_tests`
--
ALTER TABLE `st_tests`
  ADD PRIMARY KEY (`test_id`);

--
-- Indexes for table `st_test_summaries`
--
ALTER TABLE `st_test_summaries`
  ADD PRIMARY KEY (`ts_id`);

--
-- Indexes for table `st_userinfo`
--
ALTER TABLE `st_userinfo`
  ADD PRIMARY KEY (`ui_id`);

--
-- Indexes for table `st_users`
--
ALTER TABLE `st_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `st_user_permission_matches`
--
ALTER TABLE `st_user_permission_matches`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `st_answers`
--
ALTER TABLE `st_answers`
  MODIFY `answer_id` int(22) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `st_configuration`
--
ALTER TABLE `st_configuration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `st_pages`
--
ALTER TABLE `st_pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=50;
--
-- AUTO_INCREMENT for table `st_permissions`
--
ALTER TABLE `st_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `st_permission_page_matches`
--
ALTER TABLE `st_permission_page_matches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT for table `st_questions`
--
ALTER TABLE `st_questions`
  MODIFY `question_id` int(22) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `st_results`
--
ALTER TABLE `st_results`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=192;
--
-- AUTO_INCREMENT for table `st_teams`
--
ALTER TABLE `st_teams`
  MODIFY `team_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `st_tests`
--
ALTER TABLE `st_tests`
  MODIFY `test_id` int(22) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `st_test_summaries`
--
ALTER TABLE `st_test_summaries`
  MODIFY `ts_id` int(22) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `st_userinfo`
--
ALTER TABLE `st_userinfo`
  MODIFY `ui_id` int(22) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `st_users`
--
ALTER TABLE `st_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `st_user_permission_matches`
--
ALTER TABLE `st_user_permission_matches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
