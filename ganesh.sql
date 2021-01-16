-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 16, 2021 at 10:42 AM
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
(1, 'Publisher', 'Publisher 1', '', '', '2021-01-09 00:42:38', '2021-01-09 00:42:38'),
(2, 'Publisher', 'Publisher 2', '', '', '2021-01-09 00:42:38', '2021-01-09 00:42:38'),
(3, 'Publisher', 'Publisher 3', '', '', '2021-01-09 00:42:38', '2021-01-09 00:42:38'),
(4, 'Publisher', 'Publisher 4', '', '', '2021-01-09 00:42:38', '2021-01-09 00:42:38'),
(5, 'CouponType', 'Coupon Type 1', '', '', '2021-01-09 00:42:38', '2021-01-09 00:42:38'),
(6, 'CouponType', 'Coupon Type 2', '', '', '2021-01-09 00:42:38', '2021-01-09 00:42:38'),
(7, 'CouponType', 'Coupon Type 3', '', '', '2021-01-09 00:42:38', '2021-01-09 00:42:38'),
(8, 'CouponType', 'Coupon Type 4', '', '', '2021-01-09 00:42:38', '2021-01-09 00:42:38'),
(18, 'Carousel', 'banner-1.jpg', 'qqqqqqqqqqqqqq', 'wwwwwwwwwwwwww', '2021-01-09 02:30:19', '2021-01-09 02:30:19'),
(19, 'Carousel', 'increase-your-business-after-lockdown.jpg', 'aaaaaaaaaa', 'ssssssssssssssss', '2021-01-09 02:30:19', '2021-01-13 05:16:18'),
(20, 'Carousel', 'image-optimisation-in-website.jpg', 'zzzzzzzzzzz', 'xxxxxxxxxxxxxxxxxxxx', '2021-01-09 02:30:19', '2021-01-13 05:16:18'),
(21, 'Publisher', 'Publisher 5', '', '', '2021-01-09 02:33:15', '2021-01-09 02:33:15');

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
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `url`, `coverImg`, `category`, `tag`, `content`, `created_at`, `updated_at`) VALUES
(1, 'Blog A', 'Blog A', 'hiring-a-digital-marketing-agency.jpg', '[2,1,3,4]', '[5,6,7,8]', '<p>Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>\n', '2021-01-09 00:50:43', '2021-01-09 00:50:43'),
(2, 'Blog B', 'Blog B', 'how-much-a-website-building-cost-should-be.jpg', '[1,2,3,4]', '[5,6,7,8]', '<p>bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb</p>\n', '2021-01-09 00:54:46', '2021-01-09 00:54:46'),
(3, 'Blog C', 'Blog C', 'how-to-improve-google-search-ranking.jpg', '[1,2,3,4]', '[5,6,7,8]', '<p>cccccccccccccccccccccccccccccccccc</p>\n', '2021-01-09 00:54:46', '2021-01-09 00:54:46'),
(4, 'Blog D', 'Blog D', 'how-to-improve-website-conversion-rates.jpg', '[1,2,3,4]', '[5,6,7,8]', '<p>Dddddddddddddddddddddddddddddddddddddddddd</p>\n', '2021-01-09 00:54:46', '2021-01-09 00:54:46'),
(5, 'Blog E', 'Blog E', 'how-to-make-existing-website-mobile-friendly.jpg', '[1,2,3,4]', '[5,6,7,8]', '<p>Eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>\n', '2021-01-09 00:54:46', '2021-01-09 00:54:46');

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
(8, 'tag', 'tag D', 'tag-D', '2021-01-09 00:50:43', '2021-01-09 00:50:43');

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
(1, 'default', 'Default Title', 'Default Description', 'Default Keyword', NULL, '2021-01-09 00:42:38', '2021-01-09 00:42:38');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` mediumtext NOT NULL,
  `token` mediumtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Indexes for table `metas`
--
ALTER TABLE `metas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `metas_url_unique` (`url`);

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
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `blog_metas`
--
ALTER TABLE `blog_metas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contact_forms`
--
ALTER TABLE `contact_forms`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `metas`
--
ALTER TABLE `metas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
