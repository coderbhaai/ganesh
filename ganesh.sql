-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 08, 2021 at 07:29 AM
-- Server version: 5.7.24
-- PHP Version: 7.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ganesh`
--

-- --------------------------------------------------------

--
-- Table structure for table `basic`
--

CREATE TABLE `basic` (
  `id` int(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `tab1` varchar(255) DEFAULT NULL,
  `tab2` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `basic`
--

INSERT INTO `basic` (`id`, `type`, `name`, `tab1`, `tab2`, `created_at`, `updated_at`) VALUES
(1, 'Category', 'Category A', '', '', '2021-01-16 11:36:51', '2021-01-16 11:36:51'),
(2, 'Category', 'Category B', '', '', '2021-01-16 11:37:33', '2021-01-16 11:37:33'),
(3, 'Category', 'Category C', '', '', '2021-01-16 11:37:33', '2021-01-16 11:37:33'),
(4, 'Category', 'Category D', '', '', '2021-01-16 11:37:33', '2021-01-16 11:37:33'),
(5, 'Category', 'Category E', '', '', '2021-01-16 11:37:33', '2021-01-16 11:37:33'),
(6, 'Category', 'Category F', '', '', '2021-01-16 11:37:33', '2021-01-16 11:37:33'),
(7, 'Tag', 'Tag A', '', '', '2021-01-16 11:37:33', '2021-01-16 11:37:33'),
(8, 'Tag', 'Tag B', '', '', '2021-01-16 11:37:33', '2021-01-16 11:37:33'),
(9, 'Tag', 'Tag C', '', '', '2021-01-16 11:37:33', '2021-01-16 11:37:33'),
(10, 'Tag', 'Tag D', '', '', '2021-01-16 11:37:33', '2021-01-16 11:37:33'),
(11, 'Tag', 'Tag E', '', '', '2021-01-16 11:37:33', '2021-01-16 11:37:33'),
(12, 'Tag', 'Tag F', '', '', '2021-01-16 11:37:33', '2021-01-16 11:37:33'),
(13, 'Vendor', 'Vendor A', '', '', '2021-01-16 12:08:17', '2021-01-16 12:08:17'),
(14, 'Vendor', 'Vendor B', '', '', '2021-01-16 12:08:17', '2021-01-16 12:08:17'),
(15, 'Vendor', 'Vendor C', '', '', '2021-01-16 12:08:17', '2021-01-16 12:08:17'),
(16, 'Vendor', 'Vendor D', '', '', '2021-01-16 12:08:17', '2021-01-16 12:08:17'),
(17, 'Vendor', 'Vendor E', '', '', '2021-01-16 12:08:17', '2021-01-16 12:08:17'),
(18, 'Vendor', 'Vendor F', '', '', '2021-01-16 12:08:17', '2021-01-16 12:08:17'),
(21, 'Puja', 'Roli', '20 Gm', '', '2021-01-18 04:18:22', '2021-01-18 04:18:22'),
(22, 'Puja', 'Moli', '1 Pc', '', '2021-01-18 04:18:22', '2021-01-18 04:18:22'),
(23, 'Puja', 'Itra', '1 Ml', '', '2021-01-18 04:18:22', '2021-01-18 04:18:22'),
(24, 'Puja', 'Janeu', '2Pc', '', '2021-01-18 04:18:22', '2021-01-18 04:18:22'),
(25, 'Puja', 'Nariyal', '1Pc', '', '2021-01-18 04:18:22', '2021-01-18 04:18:22'),
(26, 'Puja', 'Batashe', '50Gm', '', '2021-01-18 04:18:22', '2021-01-18 04:18:22'),
(27, 'Puja', 'Panchmeva', '50Gm', '', '2021-01-18 04:18:22', '2021-01-18 04:18:22'),
(28, 'Puja', 'Ghee', '500 Gm', '', '2021-01-18 04:18:22', '2021-01-18 04:18:22'),
(29, 'Puja', 'Kapoor', '5 Gm', '', '2021-01-18 04:18:22', '2021-01-18 04:18:22'),
(30, 'Puja', 'GangaJal', '100Ml', '', '2021-01-18 04:18:22', '2021-01-18 04:18:22'),
(31, 'Puja', 'Agarbatti', '10 Pc', '', '2021-01-18 04:18:22', '2021-01-18 04:18:22'),
(32, 'Category', 'Category G', '', '', '2021-01-19 01:05:24', '2021-01-19 01:05:24');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `coverImg` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` mediumtext COLLATE utf8mb4_unicode_ci,
  `tag` mediumtext COLLATE utf8mb4_unicode_ci,
  `excerpt` mediumtext COLLATE utf8mb4_unicode_ci,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `url`, `coverImg`, `category`, `tag`, `excerpt`, `content`, `created_at`, `updated_at`) VALUES
(1, 'Blog A', 'Blog A', 'hiring-a-digital-marketing-agency.jpg', '[2,1,3,4]', '[5,6,7,8]', '1111111111', '<p>Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>\n', '2021-01-09 00:50:43', '2021-01-09 00:50:43'),
(2, 'Blog B', 'Blog B', 'how-much-a-website-building-cost-should-be.jpg', '[1,2,3,4]', '[5,6,7,8]', '22222222222', '<p>bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb</p>\n', '2021-01-09 00:54:46', '2021-01-09 00:54:46'),
(3, 'Blog C', 'Blog C', 'how-to-improve-google-search-ranking.jpg', '[1,2,3,4]', '[5,6,7,8]', '3333333333333', '<p>cccccccccccccccccccccccccccccccccc</p>\n', '2021-01-09 00:54:46', '2021-01-09 00:54:46'),
(4, 'Blog D', 'Blog D', 'how-to-improve-website-conversion-rates.jpg', '[1,2,3,4]', '[5,6,7,8]', '44444444444', '<p>Dddddddddddddddddddddddddddddddddddddddddd</p>\n', '2021-01-09 00:54:46', '2021-01-09 00:54:46'),
(5, 'Blog E', 'Blog E', 'how-to-make-existing-website-mobile-friendly.jpg', '[1,2,3,4]', '[5,6,7,8]', '5555555555', '<p>Eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>\n', '2021-01-09 00:54:46', '2021-01-09 00:54:46'),
(6, 'qqqqqqqq', 'wwwwwwwwww', 'hiring-a-digital-marketing-agency.jpg', '[1,4,2]', '[6,5,7]', '66666666666666', '<p>111111111111</p>\n', '2021-01-16 06:45:36', '2021-01-16 08:00:39');

-- --------------------------------------------------------

--
-- Table structure for table `blog_metas`
--

CREATE TABLE `blog_metas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blog_metas`
--

INSERT INTO `blog_metas` (`id`, `type`, `name`, `url`, `created_at`, `updated_at`) VALUES
(1, 'category', 'Category A', 'Category-A', '2021-01-09 00:50:43', '2021-01-09 00:50:43'),
(2, 'category', 'Category B', 'Category-B', '2021-01-09 00:50:43', '2021-01-09 00:50:43'),
(3, 'category', 'Category C', 'Category-C', '2021-01-09 00:50:43', '2021-01-09 00:50:43'),
(4, 'category', 'Category D', 'Category-D', '2021-01-09 00:50:43', '2021-01-09 00:50:43'),
(5, 'tag', 'tag A', 'tag-A', '2021-01-09 00:50:43', '2021-01-09 00:50:43'),
(6, 'tag', 'tag B', 'tag-B', '2021-01-09 00:50:43', '2021-01-09 00:50:43'),
(7, 'tag', 'tag C', 'tag-C', '2021-01-09 00:50:43', '2021-01-09 00:50:43'),
(8, 'tag', 'tag D', 'tag-D', '2021-01-09 00:50:43', '2021-01-09 00:50:43'),
(9, 'category', '111111', '22222222', '2021-01-16 06:45:36', '2021-01-16 06:45:36');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `blogId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `c_order` int(11) NOT NULL,
  `commentId` int(11) NOT NULL,
  `user` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `blogId`, `c_order`, `commentId`, `user`, `email`, `comment`, `status`, `created_at`, `updated_at`) VALUES
(1, '6', 0, 0, 'AmitKK', 'contact@amitkk.com', '<p>testing</p>\n', '1', '2021-01-16 09:18:28', '2021-01-16 09:18:28');

-- --------------------------------------------------------

--
-- Table structure for table `contact_forms`
--

CREATE TABLE `contact_forms` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_forms`
--

INSERT INTO `contact_forms` (`id`, `name`, `email`, `phone`, `message`, `created_at`, `updated_at`) VALUES
(1, 'Amit', 'amit.khare588@gmail.com', '8424003840', 'check this', '2021-01-19 03:32:53', '2021-01-19 03:32:53');

-- --------------------------------------------------------

--
-- Table structure for table `gofb`
--

CREATE TABLE `gofb` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `gofbtoken` mediumtext NOT NULL,
  `token` mediumtext,
  `image` mediumtext,
  `provider` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gofb`
--

INSERT INTO `gofb` (`id`, `name`, `email`, `role`, `gofbtoken`, `token`, `image`, `provider`, `created_at`, `updated_at`) VALUES
(1, 'Amit Khare', 'amit.khare588@gmail.com', 'User', '$2a$10$VdHvhsK3IMop0Bz0z1FzvuBDj5T5eCrio7.cbQfIFWJLnrOfahCja', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiQW1pdCBLaGFyZSIsImVtYWlsIjoiYW1pdC5raGFyZTU4OEBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciJ9LCJpYXQiOjE2MTI1NDA5NTN9.zS84AkYsxfvpx7-L05hOaWM5LsfuagPsbQ0bRJhfUQw', 'https://lh3.googleusercontent.com/a-/AOh14Gidy3APTpo6njmklmaw0CKA5wdrRVn2iRWVTnlOZQ=s96-c', 'Google', '2021-02-05 10:32:11', '2021-02-05 10:32:11');

-- --------------------------------------------------------

--
-- Table structure for table `metas`
--

CREATE TABLE `metas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` mediumtext COLLATE utf8mb4_unicode_ci,
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  `keyword` mediumtext COLLATE utf8mb4_unicode_ci,
  `_token` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `metas`
--

INSERT INTO `metas` (`id`, `url`, `title`, `description`, `keyword`, `_token`, `created_at`, `updated_at`) VALUES
(1, 'default', 'Default Title', 'Default Description', 'Default Keyword', NULL, '2021-01-09 00:42:38', '2021-01-09 00:42:38'),
(2, '/xxxxxx', '1111111', '22222222', '333333333333', NULL, '2021-01-16 06:37:54', '2021-01-16 06:37:54');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(255) NOT NULL,
  `orderId` varchar(255) NOT NULL,
  `refId` varchar(255) NOT NULL,
  `buyer` int(255) DEFAULT NULL,
  `address` mediumtext,
  `cart` mediumtext,
  `invoice` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `remarks` mediumtext,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `orderId`, `refId`, `buyer`, `address`, `cart`, `invoice`, `status`, `remarks`, `created_at`, `updated_at`) VALUES
(1, 'ORD-1612365457993814', '709382', 7, '[\"India\",\"MP\",\"Rewa\",\"123456\",\"123456\",\"8424003840\"]', '[[1,4,\"1611472024758-1.jpg\",\"Product A\",500,\"Product-B\",1],[1,5,\"1611471998844-8.jpg\",\"Product C\",800,\"Product-C\",1],[2,6,\"1611471981515-5.jpg\",\"Product D\",780,\"Product-D\",2]]', '2860.00', 'In Process', 'xxxxxxxxxx', '2021-02-05 17:46:03', '2021-02-05 12:15:52'),
(2, 'ORD-1612365603463228', '709386', 7, '[\"India\",\"MP\",\"Rewa\",\"11111111111\",\"11111111\",\"8424003840\"]', '[[3,4,\"1611472024758-1.jpg\",\"Product A\",500,\"Product-B\",1],[2,7,\"1611471964103-3.jpg\",\"Product C\",8881,\"Product-E1\",2]]', '19262.00', 'Being Delivered', 'yyyyyyyyyyyyyyyyyyyyyyy', '2021-02-05 17:46:18', '2021-02-05 12:15:52'),
(3, 'ORD-1612366919937713', '709394', 5, '[\"India\",\"Delhi\",\"Delhi\",\"lila ram apartment, ignou main road, neb sarai , saket\",\"110068\",\"8424003840\"]', '[[1,5,\"1611471998844-8.jpg\",\"Product C\",800,\"Product-C\",1]]', '800.00', 'Ordered', NULL, '2021-02-05 17:41:33', '2021-02-05 17:41:33'),
(4, 'ORD-1612594553369442', '712542', 14, '[\"India\",\"Haryana\",\"Faridabad\",\"1172\",\"122002\",\"1234567890\"]', '[[4,8,\"1611471950512-2.jpg\",\"Product J\",50,\"wwww-wwww\",2],[1,10,\"1612541515797-product-9.jpg\",\"Produdct Q\",400,\"Produdct-Q\",1]]', '600.00', 'Ordered', NULL, '2021-02-06 06:57:16', '2021-02-06 01:26:38'),
(5, 'ORD-1612594654099376', '712548', 14, '[\"India\",\"Haryana\",\"Faridabad\",\"1172\",\"122002\",\"1234567890\"]', '[[1,1,\"1610820550656-product-1.jpg\",\"Product K \",500,\"Product-A\",null],[1,4,\"1610820638058-product-4.jpg\",\"Product A\",500,\"Product-B\",null]]', '1000.00', 'Ordered', NULL, '2021-02-06 06:58:45', '2021-02-06 01:27:55'),
(6, 'ORD-1612758236754456', '713720', 2, '[\"India\",\"Haryana\",\"Faridabad\",\"11721\",\"122002\",\"1234567890\"]', '[[2,10,\"1612541515797-product-9.jpg\",\"Produdct Q\",400,\"Produdct-Q\",1,\"2021-02-17\",\"Amit\'s Home\"]]', '800.00', 'Ordered', NULL, '2021-02-08 04:25:04', '2021-02-07 22:52:59');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`email`, `token`, `created_at`) VALUES
('amit.khare588@gmail.com', '6009b49d4d5dcfc580f91a678433b5', '2020-04-05 21:48:51'),
('amit.khare588@gmail.com', '6009b49d4d5dcfc580f91a678433b5', '2020-04-05 21:48:51');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(255) NOT NULL,
  `vendor` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `images` mediumtext NOT NULL,
  `category` varchar(255) NOT NULL,
  `shortDesc` mediumtext,
  `longDesc` longtext,
  `price` int(255) DEFAULT NULL,
  `sale` int(255) DEFAULT NULL,
  `rating` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `inclusion` mediumtext NOT NULL,
  `exclusion` mediumtext NOT NULL,
  `recom` mediumtext NOT NULL,
  `related` mediumtext NOT NULL,
  `tagline` mediumtext,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `vendor`, `name`, `type`, `url`, `images`, `category`, `shortDesc`, `longDesc`, `price`, `sale`, `rating`, `status`, `inclusion`, `exclusion`, `recom`, `related`, `tagline`, `updated_at`) VALUES
(1, 13, 'Product K ', 3, 'Product-A', '[\"1610820550656-product-1.jpg\",\"1610820550656-product-2.jpg\",\"1610820550656-product-3.jpg\",\"1610820550656-product-4.jpg\"]', '[6,3,2,4,5]', '<p>qqqqqqqq</p>\n', '<p>wwwwwwwwwww</p>\n', 500, NULL, '[\"1.00\",1]', 1, '[30,27,31,23,24,25,26,28,22,29]', '[21,22,24,25,27,28,30]', '[7,9,5,4,6,8]', '[4,6,7,9,5,8]', '', '2021-02-06 08:20:45'),
(4, 13, 'Product A', 1, 'Product-B', '[\"1610820638058-product-4.jpg\",\"1610820638059-product-5.jpg\",\"1610820638059-product-6.jpg\",\"1610820638059-product-7.jpg\"]', '[2,3,4,5,6]', '<p>aaaaaaaaaaa</p>\n', '<p>sssssssssssss</p>\n', 500, 300, '[0,0]', 1, '[27,31,23,24,25,26,28,29,30,22]', '[21,22,23,24]', '[5,1,6,7,8,9]', '[1,7,8]', 'Check Product A Tagline', '2021-02-05 16:13:43'),
(5, 16, 'Product C', 2, 'Product-C', '[\"1610820767218-product-1.jpg\",\"1610820767219-product-2.jpg\",\"1610820767219-product-3.jpg\",\"1610820767219-product-4.jpg\"]', '[2,3,4,5,6]', '<p>zzzzzzzzzzzzzzzzz</p>\n', '<p>xxxxxxxxxxxxxxxxxxxx</p>\n', 800, NULL, '[0,0]', 1, '[23,24,25,26,27,28,29,30,22,31]', '[21,22,23,24]', '[]', '[]', NULL, '2021-02-05 16:13:46'),
(6, 13, 'Product D', 4, 'Product-D', '[\"1610821049802-product-7.jpg\",\"1610821049803-product-8.jpg\",\"1610821049803-product-9.jpg\",\"1610821049803-product-10.jpg\"]', '[2,3,4,5,6,1]', '<p>sssssssssssss</p>', '<p>ttttttttttttttttt</p>\n', 780, NULL, '[0,0]', 1, '[23,24,25,26,27,28,29,30,22,31]', '[21,22,23,24]', '[]', '[]', NULL, '2021-02-05 16:13:49'),
(7, 15, 'Product C', 2, 'Product-E1', '[\"1610821108321-product-6.jpg\",\"1610821108321-product-7.jpg\",\"1610821108321-product-8.jpg\"]', '[2,4,3,6,1,5]', '<p>sssssssssssss1111111</p>\n', '<p>ddddddddddddddd11111111111</p>\n', 8881, 4000, '[0,0]', 1, '[24,31,26,27,28,29,23,25,30,22]', '[21,22,23,24]', '[4,5,8,6]', '[4,1,6,8,5]', 'Check Product C Tagline', '2021-02-06 03:28:11'),
(8, 13, 'Product J', 1, 'wwww-wwww', '[\"1610965554460-product-8.jpg\",\"1610965554461-product-9.jpg\",\"1610965554461-product-10.jpg\",\"1610965554461-product-11.jpg\"]', '[3,2,4,5,1]', '<p>eeeeeeeeeeee</p>\n', '<p>rrrrrrrrrr</p>\n', 80, 50, '[0,0]', 1, '[28,31,22,25,26,27,21,24,23,30,29]', '[21,22,23,24]', '[5,1,4,6,7]', '[5,1,7,4,6]', NULL, '2021-02-05 16:13:56'),
(9, 13, 'Product H', 2, 'Product-H', '[\"1612541533945-product-11.jpg\",\"1612541533945-product-12.jpg\"]', '[2,4,1,3,5]', '<p>Product H</p>\n', '<p>Product H</p>\n', 500, NULL, '[0,0]', 1, '[21,22,23,24]', '[21,22,23,24]', '[]', '[]', NULL, '2021-02-05 10:39:17'),
(10, 13, 'Produdct Q', 1, 'Produdct-Q', '[\"1612541515797-product-9.jpg\",\"1612541515797-product-10.jpg\",\"1612541515797-product-11.jpg\",\"1612541515797-product-12.jpg\"]', '[1,2,4,5,6]', '<p>Produdct Q</p>\n', '<p>Produdct Q</p>\n', 500, 400, '[0,0]', 1, '[22,24,21,23,25,26,27]', '[]', '[6,1,5,7,8]', '[4,5,7,1]', 'Produdct Q', '2021-02-05 10:39:17');

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `id` int(255) NOT NULL,
  `product` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `question` mediumtext NOT NULL,
  `created_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `review` mediumtext NOT NULL,
  `rating` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`id`, `productId`, `userId`, `review`, `rating`, `created_at`, `updated_at`) VALUES
(2, 6, 2, '<p>1111111111111</p>\n', 1, '2021-01-18 18:27:35', '2021-01-18 12:57:29'),
(3, 1, 2, '<p>qqqqqq</p>\n', 1, '2021-02-06 02:50:05', '2021-02-06 02:50:05');

-- --------------------------------------------------------

--
-- Table structure for table `shippings`
--

CREATE TABLE `shippings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `seller` int(255) NOT NULL,
  `region` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shippingType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remarks` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `password` mediumtext NOT NULL,
  `token` mediumtext,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `password`, `token`, `created_at`, `updated_at`) VALUES
(2, 'Test', 'test@test.com', 'Admin', '$2a$10$cTnEoF3yp3.BEXk5YkoDLer4yizhNqssitbMLRUynXu4GrLjbBouC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJuYW1lIjoiVGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInJvbGUiOiJBZG1pbiJ9LCJpYXQiOjE2MTI3NTc1NTN9.y7ZYGcPa3Jnl_FeV9PpbDwHzcO9aAGGWV179hE7UHB8', '2021-01-16 05:34:25', '2021-02-07 22:42:07'),
(4, 'Amit', 'test@test.com1', 'User', '$2a$10$CIa65573qJbtMWZ.tx8jfOzfPPFeo6fi534r6hFxckukA6FOHnPSa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJBbWl0IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tMSIsInJvbGUiOiJVc2VyIn0sImlhdCI6MTYxMDk1NDQ3MiwiZXhwIjoxNjExMDQwODcyfQ.lujhf5j2GmkCdrao2ShA8KxSCsYfUKi8VZE8W51_n8M', '2021-01-18 01:49:41', '2021-01-18 07:21:12'),
(5, 'Amit', 'amit.khare588@gmail.com1', 'User', '$2a$10$S7T.5WCyfT6VivJ7YVPhOumFuisuF3l4OTiNU2KKvc7xi.73kho6G', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJBbWl0IiwiZW1haWwiOiJhbWl0LmtoYXJlNTg4QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIn0sImlhdCI6MTYxMjI5MjE2MCwiZXhwIjoxNjEyMzc4NTYwfQ.h0YpCume7F0drgrJznF4RV5KQPOONp3CW5GhWVaZEvc', '2021-02-02 13:25:13', '2021-02-02 18:56:00'),
(6, 'Amit', 'amit.khare588@gmail.com2', 'User', '$2a$10$/GxaUNmlhG5bTrU5qbMZMehZjXxd//uRRANAkGOWEym2XJrgYmOou', NULL, '2021-02-03 01:26:55', '2021-02-03 01:54:41'),
(7, 'Amit', 'amit.khare588@gmail.com3', 'User', '$2a$10$GRqXeHFtUAYKkfAaud0piOtRp40Syk1srf9CHy97yMikI2BFMiyAy', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJBbWl0IiwiZW1haWwiOiJhbWl0LmtoYXJlNTg4QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIn0sImlhdCI6MTYxMjMzNzE1NSwiZXhwIjoxNjEyNDIzNTU1fQ.3aiByaGdDbjgYqjBghSf3ONZtqolBOP9vN1fslHsRWw', '2021-02-03 01:54:41', '2021-02-03 07:25:55'),
(8, 'Amit', 'amit.khare588@gmail.com4', 'User', '$2a$10$1rsTZ9sm9bSjJl0GYB4ui.voNoAHgefwZsgVlBxZeHCZxjBqz3e3K', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJBbWl0IiwiZW1haWwiOiJhbWl0LmtoYXJlNTg4QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIn0sImlhdCI6MTYxMjMzNzQ2MSwiZXhwIjoxNjEyNDIzODYxfQ.JNTxOh7ULPYEzJEPq_oWOavFoLpQEbpYzwazasEFkUE', '2021-02-03 01:59:54', '2021-02-03 07:31:01'),
(9, 'Amit', 'amit.khare588@gmail.com5', 'User', '$2a$10$yNYBBNqLtfBSKn2eLDcROORwlwUrfzo6o1kKRvBs.fc7ahZpCdZX.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJBbWl0IiwiZW1haWwiOiJhbWl0LmtoYXJlNTg4QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIn0sImlhdCI6MTYxMjMzODA0MiwiZXhwIjoxNjEyNDI0NDQyfQ.LRDdwjlFForMxWb2hNFT5tO5_elJhBxe49IniEtC0o0', '2021-02-03 02:09:34', '2021-02-03 07:40:42'),
(10, 'Amit', 'amit.khare588@gmail.com6', 'User', '$2a$10$hCdn8i5ASUYgBsu78sQCIeyiiOibnQo78HmuDNWXUA1Mj/oFGipAK', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJBbWl0IiwiZW1haWwiOiJhbWl0LmtoYXJlNTg4QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIn0sImlhdCI6MTYxMjMzOTc0NSwiZXhwIjoxNjEyNDI2MTQ1fQ.9mMi1x-XXaL56FxxDNaRWhsj9egjNps_ZQJaqHGG-dI', '2021-02-03 02:37:54', '2021-02-03 08:09:05'),
(11, 'Amit', 'amit.khare588@gmail.com7', 'User', '$2a$10$6kP0XqkvkLNMJV6WEJHT2Oq8LhYuFq8uYy8c/nMqrVjOJUHrZPLFq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJBbWl0IiwiZW1haWwiOiJhbWl0LmtoYXJlNTg4QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIn0sImlhdCI6MTYxMjM0MDUyMiwiZXhwIjoxNjEyNDI2OTIyfQ.PNwwichVER4PAaHTSazcnuG4KvDcOr0Bmzf13hWGx8A', '2021-02-03 02:51:01', '2021-02-03 08:22:02'),
(12, 'Amit', 'amit.khare588@gmail.com8', 'User', '$2a$10$n/1wyxxXLFjg53uYXgaAe..mHh/QsEOYyBWnwB.VYBa6uVPg6Kuqa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJBbWl0IiwiZW1haWwiOiJhbWl0LmtoYXJlNTg4QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIn0sImlhdCI6MTYxMjM0MDk1NSwiZXhwIjoxNjEyNDI3MzU1fQ.g0SUtxFNbs5zWkgpKoEPSGilgKZt-wlmrFQvVl5amb4', '2021-02-03 02:58:22', '2021-02-03 08:29:15'),
(13, 'Amit', 'amit.khare588@gmail.com9', 'User', '$2a$10$Lx1OkZEbQ0YNvdkp9BVwsuwURgWuDh89URW6T58gJ4q0pwd00L4FK', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJBbWl0IiwiZW1haWwiOiJhbWl0LmtoYXJlNTg4QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIn0sImlhdCI6MTYxMjM0MTEyMCwiZXhwIjoxNjEyNDI3NTIwfQ.A1LWy63HWVHl4Og-8f8ZqzGrTnCML1gPdwVz1B9Dy3I', '2021-02-03 03:00:24', '2021-02-03 08:32:00'),
(14, 'Amit', 'amit.khare588@gmail.com', 'User', '$2a$10$KypHWWXd4tMWYo.SGUq8QuvKJwBBjEwrqsL15ePeObOwakoI5tJxW', NULL, '2021-02-03 05:49:07', '2021-02-05 10:32:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `basic`
--
ALTER TABLE `basic`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `blogs_url_unique` (`url`);

--
-- Indexes for table `blog_metas`
--
ALTER TABLE `blog_metas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `blog_metas_url_unique` (`url`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_forms`
--
ALTER TABLE `contact_forms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gofb`
--
ALTER TABLE `gofb`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `metas`
--
ALTER TABLE `metas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `metas_url_unique` (`url`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shippings`
--
ALTER TABLE `shippings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `basic`
--
ALTER TABLE `basic`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `blog_metas`
--
ALTER TABLE `blog_metas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contact_forms`
--
ALTER TABLE `contact_forms`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `gofb`
--
ALTER TABLE `gofb`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `metas`
--
ALTER TABLE `metas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `shippings`
--
ALTER TABLE `shippings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
