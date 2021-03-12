-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Mar 12, 2021 at 01:33 PM
-- Server version: 5.7.33
-- PHP Version: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ganesh_com_db`
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
(1, 'Category', 'Festival Puja', '', '', '2021-02-08 07:22:51', '2021-02-08 07:22:51'),
(2, 'Category', 'Home Puja', '', '', '2021-02-08 07:22:51', '2021-02-08 07:22:51'),
(3, 'Vendor', 'Pujarambh', '', '', '2021-02-08 07:22:51', '2021-02-08 07:22:51'),
(4, 'Category', 'Katha/Paath/Jaap', '', '', '2021-02-08 07:22:51', '2021-02-08 07:22:51'),
(5, 'Category', '16 Sanskaar', '', '', '2021-02-08 07:22:51', '2021-02-08 07:22:51'),
(6, 'Category', 'Puja for wealth', '', '', '2021-02-08 07:22:51', '2021-02-08 07:22:51'),
(7, 'Category', 'Puja for health', '', '', '2021-02-08 07:22:51', '2021-02-08 07:22:51'),
(8, 'Category', 'Grah Shanti', '', '', '2021-02-13 11:33:24', '2021-02-13 11:33:24'),
(9, 'Category', 'Astrology Consultation', '', '', '2021-02-13 11:33:24', '2021-02-13 11:33:24'),
(10, 'Category', 'Vastu Consultation', '', '', '2021-02-13 11:33:24', '2021-02-13 11:33:24'),
(11, 'Category', 'Puja Items', '', '', '2021-02-13 11:33:24', '2021-02-13 11:33:24'),
(12, 'Vendor', 'Body Soul', '', '', '2021-02-13 11:33:24', '2021-02-13 11:33:24'),
(13, 'Vendor', 'Arham', '', '', '2021-02-13 11:33:24', '2021-02-13 11:33:24');

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
  `excerpt` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `url`, `coverImg`, `category`, `tag`, `excerpt`, `content`, `created_at`, `updated_at`) VALUES
(1, 'Importance of Kanak Dhara Stotra', 'importance-of-kanak-dhara-stotra', 'importance-of-kanak-dhara-stotra.jpg', '[2]', '[5,6]', 'कनकधारा स्तोत्र माता लक्ष्मी की बड़ी सुन्दर हृदयस्पर्शी स्तुति है', '<h2>माता लक्ष्मी धन सम्पदा और सम्पन्नता की देवी होती हैं |</h2>\n\n<p>कनकधारा स्तोत्र माता लक्ष्मी की बड़ी सुन्दर हृदयस्पर्शी स्तुति है|</p>\n\n<p>एक प्रसंग के अनुसार भगवान शंकराचार्य जी ने एक वृद्ध महिला की दरिद्रता दूर करने के लिए इसी शक्तिशाली स्तोत्र के पाठ प्रभाव से स्वर्ण वर्षा कराई थी| श्रद्धा विश्वास पूर्वक किये गए इस स्तोत्र के पाठ प्रभाव से कार्य व्यापर में बरकत होती है, साधक का विवेक आर्थिक उन्नति के विचारों को ग्रहण करके समृद्धि के मार्ग को प्राप्त करता है और जल्द ही आर्थिक हानि या ऋण से उबरने लगता है| अत्यंत परिश्रम के बाद भी अगर घर से दरिद्रता और आर्थिक अवनति दूर न हो रही हो तो कनकधारा का मासिक पाठ श्रद्धापूर्वक शुक्रवार की शाम से प्रारम्भ करना चाहिए|</p>\n\n<p>ऐसा अनुभूत किया गया है ग्रहणकाल में इस स्तोत्र को सिद्ध कर नित्य पाठ करने से पीढ़ी दर पीढ़ी से चली आ रही दरिद्रता तक नष्ट हो जाती है|</p>\n', '2021-02-01 07:12:00', '2021-02-06 09:08:41'),
(2, 'What is the significance of Bell in a Temple?', 'significance-of-bell-in-a-temple', 'significance-of-bell-in-a-temple.jpg', '[4]', '[]', 'घंटी बजाने से पूजा परिवेश में दैवीय चेतना का प्रसार होता है', '<p>दरअसल मान्यता है कि पूजा पाठ या मंदिर में प्रवेश के दौरान घंटी बजाने से पूजा परिवेश में दैवीय चेतना का प्रसार होता है और घंटी से उत्पन्न नाद की तरंगें पूजा स्थल की नकारात्मक ऊर्जा का नाश करती है। हालांकि इसके पिछे वैज्ञानिक कारण भी है, जिसकी चर्चा आज हम करने जा रहे हैं।</p>\n\n<p>वैज्ञानिकों के अनुसार कहा जाता है कि जब घंटी बजाई जाती है तो वातावरण में विशेष प्रकार का कंपन होता है, यह कंपन वायुमंडल के कारण काफी दूर तक जाता है, जिसका फायदा यह है कि इसके क्षेत्र में आने वाले सभी जीवाणु, विषाणु और सूक्ष्म जीव आदि नष्ट हो जाते हैं, जिससे आसपास का वातावरण शुद्ध हो जाता है। यही कारण है कि लोग अपने घरों के दरवाजों और खिड़कियों पर भी विंड चाइम्स का प्रयोग करते हैं,</p>\n', '2021-02-01 07:12:00', '2021-02-06 09:08:41'),
(3, 'The story behind Holika Dahan – Holi Festival Special', 'The-Story-Behind-Holika-Dahan', 'Picture1.jpg', '[9]', '[8]', 'Once upon a time, there was a demon king called Hiranyakashyap. He believed himself to be the real god', '<p>In the month of March, Veer a 10-year-old boy, came to visit his Grand Maa and planned for a stay there. One day in the early morning hours, Veer saw some ladies and kids gather around a heap of wood logs. As he saw them Veer asked&nbsp;his granny,</p>\n\n<p>Veer: Granny, where are these people going and what are they doing?</p>\n\n<p>Granny: Veer, they are preparing for Holika Dahan Pooja.</p>\n\n<p>Veer: What is Holika Dahan Granny; Can you please explain it to me?</p>\n\n<p>Granny: (smile) Ok Son! It has religious values and I will explain it with the famous&nbsp;story behind Holika Dahan.</p>\n\n<p>&nbsp;</p>\n\n<p><strong>Story Begins-</strong></p>\n\n<p>Once upon a time, there was a demon king called Hiranyakashyap. He believed himself to be the real god. He wanted everyone in his kingdom to worship him. Rest all the other gods and goddess should be destroyed. In front of the king&rsquo;s power all the people obeyed him and all the temples and the idols of gods were demolished.</p>\n\n<p>However, there was someone in Hiranyakashapya home, who dare to differ from his thoughts. It was his own son Prahalad, who did not worship him. He used to pray and bow down to the all mighty Lord Vishnu.</p>\n\n<p>This act of his own son made Hiranyakashyap very angry. The level of anger reaches to this extent that he decided to kill him. As disobedience of Prahalad revokes the people of his kingdom.</p>\n\n<p>To get his son killed he called his demon sister Holika. Sister Holika has a vardaan(boon)&nbsp;that she cannot be burnt alive in the fire. Therefore she decided to use this magical power of her to kill Prahalad. One evening she loved Prahalad and artfully she brought him to her lap. Then she sat over the huge bonfire, thinking that Prahalad will die soon and she will come back safely.</p>\n\n<p>Veer: Then what happened Granny? What happened to Prahalad?</p>\n\n<p>Granny: (Smile) But, something unexpected happens, God took favour of Prahalad, as he was worshipping lord Vishnu, always with his pure heart. On the other hand, Holika died as she had the ill intension of killing a small child, just because he was worshipping the real power &ldquo;God&rdquo;!</p>\n\n<p>In the end, his father was shocked as Holika&rsquo;s powers did not work. And Prahalad came out safely while he was chanting &ldquo;Lord Vishnu&rdquo;, who saved him while wicked Holika has burned away.</p>\n\n<p>So what did you learned from this story Veer?</p>\n\n<p>Veer: ( Excited) That we should always worship god</p>\n\n<p>Granny: Of course and also&nbsp;&ldquo;<strong>Good always beats evil</strong>&rdquo;. So you should always help others and never use your strength to harm others.</p>\n\n<p>Importance of the story : We do the bonfire in the evening a day before the Holi festival, to embark the presence of Goodness and humanity while remembering Prahalad and Lord Vishnu.</p>\n\n<p>Veer: (Politely) Granny can I&nbsp;also go and see the bonfire in the evening?</p>\n\n<p>Granny hugged Veer and nod her head in confirmation.</p>\n', '2021-02-04 15:56:27', '2021-02-08 07:22:51');

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
(1, 'category', '16 Sanskaar', '16-sanskaar', '2021-01-09 00:50:43', '2021-02-06 09:08:41'),
(2, 'category', 'Puja for wealth', 'Puja-for-wealth', '2021-01-09 00:50:43', '2021-02-06 09:08:41'),
(3, 'category', 'Puja for health', 'Puja-for-health', '2021-01-09 00:50:43', '2021-02-06 09:08:41'),
(4, 'category', 'Hindu Puja', 'hindu-puja', '2021-01-09 00:50:43', '2021-02-06 09:08:41'),
(5, 'tag', 'Grah Shanti', 'Grah-Shanti', '2021-01-09 00:50:43', '2021-02-08 07:22:51'),
(6, 'tag', 'Paath', 'paath', '2021-01-09 00:50:43', '2021-02-08 07:22:51'),
(7, 'tag', 'Diwali', 'Diwali', '2021-01-09 00:50:43', '2021-02-06 09:08:41'),
(8, 'tag', 'Holi', 'holi', '2021-01-09 00:50:43', '2021-02-06 09:08:41'),
(9, 'category', 'Hindu Festivals', 'hindu-festivals', '2021-01-16 06:45:36', '2021-02-06 09:08:41');

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

--
-- Dumping data for table `contact_forms`
--

INSERT INTO `contact_forms` (`id`, `name`, `email`, `phone`, `message`, `created_at`, `updated_at`) VALUES
(1, 'GayatriVerma', 'sgayatri395@gmail.com', '7678136824', 'hgjhbklhnkhkjbhjvgh', '2021-02-08 07:22:51', '2021-02-08 07:22:51');

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `id` int(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `discount` int(255) NOT NULL,
  `dis_type` int(255) NOT NULL,
  `start` date NOT NULL,
  `expiry` date NOT NULL,
  `status` int(255) NOT NULL,
  `product` mediumtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coupon`
--

INSERT INTO `coupon` (`id`, `type`, `code`, `discount`, `dis_type`, `start`, `expiry`, `status`, `product`, `created_at`, `updated_at`) VALUES
(1, 'Single', 'AMITT', 10, 0, '2021-03-04', '2021-03-31', 0, '[2]', '2021-03-12 12:47:04', '2021-03-12 13:30:11');

-- --------------------------------------------------------

--
-- Table structure for table `couponapllied`
--

CREATE TABLE `couponapllied` (
  `id` int(255) NOT NULL,
  `userId` int(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `couponId` int(255) NOT NULL,
  `couponCode` varchar(255) NOT NULL,
  `orderId` mediumtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `couponapllied`
--

INSERT INTO `couponapllied` (`id`, `userId`, `type`, `couponId`, `couponCode`, `orderId`, `created_at`, `updated_at`) VALUES
(1, 5, 'Single', 1, 'AMITT', 'ORD161555582218730', '2021-03-12 13:30:11', '2021-03-12 13:30:11');

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
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gofb`
--

INSERT INTO `gofb` (`id`, `name`, `email`, `role`, `gofbtoken`, `token`, `image`, `provider`, `created_at`, `updated_at`) VALUES
(1, 'pujarambh support', 'pujarambh.com@gmail.com', 'Admin', '$2a$10$QR.lXesE8gQO1Wc.SB5jq.4g8lr1oVQ1ubqrZii4Noz.u3w7d0Pfa', NULL, 'https://lh3.googleusercontent.com/-W2pDhMcjiiM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuck-kNHVFdym0OuGr0kE-bvBHgN_QA/s96-c/photo.jpg', 'Google', '2021-02-12 16:11:56', '2021-02-12 15:59:42'),
(2, 'Amit Jain', 'amitjain.rn@gmail.com', 'User', '$2a$10$pRv7XGCEdKg.zABPpCQ7mOUvMrEIJYg/L9mHmfcJekDuOBShTvSt2', NULL, 'https://lh3.googleusercontent.com/a-/AOh14GgVVBsYqMWiNSbBBhdDXku8tgOUTBFUOVex_jeyMcM=s96-c', 'Google', '2021-02-13 02:48:16', '2021-02-12 15:59:42');

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
(1, 'default', 'Online Pandit Booking | Online Pandit near me | Pooja Online', 'Pujarambh is end to your search for qualified pundit/purohits for any puja/havan and authentic puja samagri for all rituals along with consultation from pandits for shubh muhurat and vastu.', 'Online booking, puja, havan, astrology, puja samagri, puja kits', NULL, '2021-01-09 00:42:38', '2021-02-16 10:20:24'),
(2, '/shop', 'Book Panditji for puja and havan | Astrology |Vastu consultation', 'Online booking of panditji for all type of puja in hindi, english, tamil, telugu, bengali. We help in organizing puja at home, temple or over video call.', 'Grah Pravesh, Bhoomi pujan, satyanarayan katha, sunderkand, grah shanti, pitr dosh, shaadi, vastu', NULL, '2021-01-16 06:37:54', '2021-02-08 07:22:51'),
(3, '/privacy-policy', 'Pujarambh.com | Privacy Policy', 'Pujarambh is end to your search for qualified pundit/purohits for any puja/havan and authentic puja samagri for all rituals.', 'puja, online pandit, policy', NULL, '2021-02-04 15:56:27', '2021-02-04 15:56:27'),
(4, '/terms-and-condition', 'Pujarambh.com | terms and conditions', 'Pujarambh is end to your search for qualified pundit/purohits for any puja/havan and authentic puja samagri for all rituals.', 'puja, online booking, tnc', NULL, '2021-02-04 15:56:27', '2021-02-04 15:56:27');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(255) NOT NULL,
  `orderId` mediumtext NOT NULL,
  `refId` varchar(255) NOT NULL,
  `buyer` int(255) DEFAULT NULL,
  `address` mediumtext,
  `cart` mediumtext,
  `invoice` varchar(255) NOT NULL,
  `discount` int(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `remarks` mediumtext,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `orderId`, `refId`, `buyer`, `address`, `cart`, `invoice`, `discount`, `status`, `remarks`, `created_at`, `updated_at`) VALUES
(1, 'ORD1613139917360382', '321822132', 2, '[\"India\",\"MP\",\"Rewa\",\"1172\",\"122002\",\"8424003840\"]', '[[1,1,\"1612875312552-saraswati-puja - Copy.jpg\",\"Saraswati Puja\",5,\"saraswati-puja\",1]]', '5.00', NULL, 'Ordered', NULL, '2021-02-12 14:29:58', '2021-02-12 14:25:12'),
(2, 'ORD1613145672797951', '321894463', 2, '[\"India\",\"Delhi\",\"delhi\",\"a11, charan singh complex, MB road, Saidulajab\",\"110068\",\"9892049649\"]', '[[1,1,\"1612875312552-saraswati-puja - Copy.jpg\",\"Saraswati Puja\",5,\"saraswati-puja\",1]]', '5.00', NULL, 'Ordered', NULL, '2021-02-12 16:02:57', '2021-02-12 15:59:42'),
(3, 'ORD161555582218730', '342283581', 5, '[\"qqqq\",\"wwwwwww\",\"eeeeee\",\"rrrrrrr\",\"122002\",\"8424003840\"]', '[[1,2,\"1612877810189-ganesh-puja - Copy.jpg\",\"Ganesh Puja\",20,\"ganesh-puja\",null]]', '10.00', 10, 'Ordered', NULL, '2021-03-12 13:31:14', '2021-03-12 13:30:11');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(1, 3, 'Saraswati Puja', 1, 'saraswati-puja', '[\"1612875312552-saraswati-puja - Copy.jpg\",\"1612875312555-saraswati-puja.jpg\"]', '[1]', '<p>Vasant Panchami, also known as Basant Panchami in India is celebrated because the festival of deity Saraswati.&nbsp;<strong>Ma Saraswati Puja</strong>&nbsp;is done on the day of Vasant Panchami.</p>\n\n<p>No of Pandit(s) : 1&nbsp; | Duration : 1 hrs | Puja Samagri Included in the package</p>\n', '<p>Goddess Saraswati is known &nbsp;as the sign of education, art, culture and music. She is known to be the archive of information. Human beings are conferred with speech, wisdom and learning by her.&nbsp;Knowledge seekers across the country believe that worshipping the deity of wisdom can facilitate them gain a lots of abilities and eternal understanding.</p>\n\n<p>What we will do?</p>\n\n<ul>\n	<li>&nbsp;Once you have booked the Puja, you will receive a booking confirmation message</li>\n	<li>&nbsp;Our team will call you to validate your booking and get additional details, if required</li>\n	<li>&nbsp;After validation, our team will assign the best Guruji(s)/Pandit(s) as per your requirement</li>\n</ul>\n', 3100, 2900, '[0,0]', 1, '[]', '[]', '[]', '[]', 'Introductory Offer - Rs.200 off ', '2021-02-16 10:20:24'),
(2, 3, 'Ganesh Puja', 1, 'ganesh-puja', '[\"1612877810189-ganesh-puja - Copy.jpg\",\"1612877810189-ganesh-puja.jpg\"]', '[1,6]', '<p>Ganesh Puja is performed for <strong>Lord Ganapathi</strong> who removes all the obstacles and negative energies. This puja bestows one with victory, brings harmony in family and helps one succeed in life.</p>\n\n<p><strong>No of Panditji(s) : 1&nbsp; | Duration : 1-2 hrs | Pujan Samagri Included</strong></p>\n', '<p>Key Insights:</p>\n\n<ul>\n	<li>To retain health, wealth and prosperity.</li>\n	<li>Ganesh is worshiped before doing any auspicious activity.</li>\n	<li>Gurukul&nbsp;certified and specialized&nbsp;priests.</li>\n	<li>All rituals follow Vedic Standards and Procedures.</li>\n	<li>High quality Samagri to ensure a pleasant puja experience.</li>\n	<li>Guaranteed Punctuality and Authenticity.</li>\n	<li>Professional Guidance &amp; Support.</li>\n</ul>\n', 3100, 2900, '[0,0]', 1, '[]', '[]', '[]', '[13,25,1,27]', 'Introductory Offer - Rs.200 off ', '2021-03-12 13:30:11'),
(3, 3, 'Bhoomi Pujan', 1, 'bhoomi-pujan', '[\"1612878117511-bhoomi-poojan - Copy.jpg\",\"1612878117511-bhoomi-poojan.jpg\"]', '[2]', '<p>Bhoomi Puja is&nbsp;performed&nbsp;for <strong>Goddess Bhoomi and Vastu Purush</strong>, lord and deity of directions, five elements of nature&nbsp;to remove negative influences or Vastu Doshas of the place.</p>\n\n<h5 data-fontsize=\"15\" data-lineheight=\"18\"><strong>No of Panditji(s) : 1&nbsp; | Duration : 1 hrs | Pujan Samagri Included</strong></h5>\n', '<h4>Key Insights:</h4>\n\n<ul>\n	<li>To remove the existing ill-effects carried by the land.</li>\n	<li>Positive energy is restored in the land.</li>\n	<li>Done before starting construction work on any piece of land.</li>\n	<li>Gurukul certified and experienced priests.</li>\n	<li>All rituals follow Vedic Standards and Procedures.</li>\n	<li>High quality samagri to ensure a pleasant puja experience.</li>\n	<li>Guaranteed Punctuality and Authenticity.</li>\n	<li>Professional Guidance &amp; Support.</li>\n</ul>\n', 3100, NULL, '[0,0]', 1, '[]', '[]', '[2]', '[2]', '', '2021-02-08 07:22:51'),
(4, 3, 'Aditya Hridya Stotra', 1, 'Aditya-Hridya-Stotra', '[\"1613272794378-aditya-hirdya-stotra - Copy.jpg\",\"1613272794380-aditya-hirdya-stotra.jpg\"]', '[6,4]', '', '', 5100, NULL, '[0,0]', 0, '[]', '[]', '[]', '[]', '', '2021-02-13 11:33:24'),
(5, 3, 'Akshaya Tritiya Parshuram Puja', 1, 'Akshaya-Tritiya-Parshuram-puja', '[\"1613272866328-akshya-tritiya-parshuram-puja - Copy.jpg\",\"1613272866328-akshya-tritiya-parshuram-puja.jpg\"]', '[6,1]', '', '', 5100, NULL, '[0,0]', 0, '[]', '[]', '[]', '[]', '', '2021-02-13 11:33:24'),
(6, 3, 'Annaprashan Sanskaar Puja', 1, 'Annaprashan-Sanskaar-Puja', '[\"1613272930832-annaprashan-sanskar-pooja - Copy.jpg\",\"1613272930835-annaprashan-sanskar-pooja.jpg\"]', '[5,2]', '', '', 5100, NULL, '[0,0]', 0, '[]', '[]', '[]', '[]', '', '2021-02-13 11:33:24'),
(7, 3, 'Antim Sanskaar Shanti Paath', 1, 'Antim-Sanskaar-Shanti-Paath', '[\"1613272998892-antyesgti-_antim-sanskar-_... - Copy.jpg\",\"1613272998892-antyesgti-_antim-sanskar-_....jpg\"]', '[5,4]', '', '', 5100, NULL, '[0,0]', 0, '[]', '[]', '[]', '[]', '', '2021-02-13 11:33:24'),
(8, 3, 'Baglamukhi Jaap and Havan', 1, 'Baglamukhi-Jaap-and-Havan', '[\"1613273095667-baglamukhi - Copy.jpg\",\"1613273095667-baglamukhi.jpg\"]', '[6,4]', '', '', 51000, NULL, '[0,0]', 0, '[]', '[]', '[]', '[]', '', '2021-02-13 11:33:24'),
(9, 3, 'Bhakut Dosh Nivaran Puja', 1, 'Bhakut-Dosh-Nivaran-Puja', '[\"1613273174231-bhakut-dosh-navaran-puja - Copy.jpg\",\"1613273174231-bhakut-dosh-navaran-puja.jpg\"]', '[2]', '', '', 5100, NULL, '[0,0]', 1, '[]', '[]', '[]', '[]', '', '2021-02-16 10:20:24'),
(10, 3, 'Budh Grah Shanti ', 1, 'Budh-Grah-Shanti', '[\"1613273257993-buddh-shanti-jaap - Copy.jpg\",\"1613273257993-buddh-shanti-jaap.jpg\"]', '[4]', '', '', 11000, NULL, '[0,0]', 1, '[]', '[]', '[]', '[]', '', '2021-02-16 10:20:24'),
(11, 3, 'Chandra Grah Shanti', 1, 'Chandra-Grah-Shanti', '[\"1613273367028-chandra-shanti-jaap - Copy.jpg\",\"1613273367029-chandra-shanti-jaap.jpg\"]', '[4,7]', '', '', 11000, NULL, '[0,0]', 1, '[]', '[]', '[2]', '[10]', '', '2021-02-16 10:20:24'),
(12, 3, 'Dhanteras Puja', 1, 'Dhanteras-Puja', '[\"1613273469221-dhan-teras-pooja - Copy.jpg\",\"1613273469221-dhan-teras-pooja.jpg\"]', '[1,6]', '', '', 5100, NULL, '[0,0]', 0, '[]', '[]', '[2]', '[]', '', '2021-02-13 11:33:24'),
(13, 3, 'Durga Puja and Paath', 1, 'Durga-Puja-and-Paath', '[\"1613273579056-durga-puja-with-paath - Copy.jpg\",\"1613273579056-durga-puja-with-paath.jpg\"]', '[1,6,4]', '', '', 51000, NULL, '[0,0]', 0, '[]', '[]', '[2,8]', '[8]', '', '2021-02-13 11:33:24'),
(14, 3, 'Guru Grah Shanti', 1, 'Guru-Grah-Shanti', '[\"1613273724468-guru-shanti-jaap - Copy.jpg\",\"1613273724468-guru-shanti-jaap.jpg\"]', '[4]', '', '', 11000, NULL, '[0,0]', 1, '[]', '[]', '[]', '[10,11]', '', '2021-02-16 10:20:24'),
(15, 3, 'Hanuman Chalisa Paath', 1, 'Hanuman-Chalisa-Paath', '[\"1613273875557-hanuman-chalisa - Copy.jpg\",\"1613273875557-hanuman-chalisa.jpg\"]', '[7,4,2]', '', '', 5100, NULL, '[0,0]', 0, '[]', '[]', '[2,4,13]', '[8]', '', '2021-02-13 11:33:24'),
(16, 3, 'Harivansh Puran Katha', 1, 'Harivansh-Puran-Katha', '[\"1613274009571-harivansh-puran-katha - Copy.jpg\",\"1613274009571-harivansh-puran-katha.jpg\"]', '[4,1,6]', '', '', 11000, NULL, '[0,0]', 0, '[]', '[]', '[2,4]', '[4]', '', '2021-02-13 11:33:24'),
(17, 3, 'Karan Vedh Sanskaar Puja', 1, 'Karan-Vedh-Sanskaar-Puja', '[\"1613274139125-karan-vedh-sanskar-pooja - Copy.jpg\",\"1613274139125-karan-vedh-sanskar-pooja.jpg\"]', '[5,2]', '', '', 5100, NULL, '[0,0]', 1, '[]', '[]', '[6,1]', '[6,7,1]', '', '2021-02-16 10:20:24'),
(18, 3, 'Ketu Grah Shanti', 1, 'Ketu-Grah-Shanti', '[\"1613274216743-ketu-shanti-jaap - Copy.jpg\",\"1613274216743-ketu-shanti-jaap.jpg\"]', '[4,8]', '', '', 11000, NULL, '[0,0]', 1, '[]', '[]', '[]', '[14,11,10]', '', '2021-02-16 10:20:24'),
(19, 3, 'Kumbh Vivah Sanskaar Puja', 1, 'Kumbh-Vivah-Sanskaar-Puja', '[\"1613274361003-kumbh-vivah - Copy.jpg\",\"1613274361003-kumbh-vivah.jpg\"]', '[5,2]', '', '', 5100, NULL, '[0,0]', 1, '[]', '[]', '[9,8]', '[9,6,17]', '', '2021-02-16 10:20:24'),
(20, 3, 'Mangal Grah Shanti', 1, 'Mangal-Grah-Shanti', '[\"1613274458917-mangal-shanti-jaap - Copy.jpg\",\"1613274458917-mangal-shanti-jaap.jpg\"]', '[8,4]', '', '', 11000, NULL, '[0,0]', 1, '[]', '[]', '[15,2]', '[10,14,18]', '', '2021-02-16 10:20:24'),
(21, 3, 'Manglik Dosh Nivaran Puja', 1, 'Manglik-Dosh-Nivaran-Puja', '[\"1613274636864-manglik-dosh-nivaran-puja - Copy.jpg\",\"1613274636864-manglik-dosh-nivaran-puja.jpg\"]', '[8,2,4]', '', '', 5100, NULL, '[0,0]', 1, '[]', '[]', '[20]', '[9,19]', '', '2021-02-16 10:20:24'),
(22, 3, 'Mata Ka Jagran', 1, 'Mata-Ka-Jagran', '[\"1613274779150-mata-ka-jagran - Copy.jpg\",\"1613274779150-mata-ka-jagran.jpg\"]', '[2,4]', '', '', 21000, NULL, '[0,0]', 1, '[]', '[]', '[13,8]', '[15]', '', '2021-02-13 11:33:24'),
(23, 3, 'Mool Shanti Puja', 1, 'Mool-Shanti-Puja', '[\"1613274895507-mool-shanti-pooja - Copy.jpg\",\"1613274895510-mool-shanti-pooja.jpg\"]', '[2,8]', '', '', 5100, NULL, '[0,0]', 0, '[]', '[]', '[21]', '[20,2]', '', '2021-02-13 11:33:24'),
(24, 3, 'Nari Dosh Nivaran Puja', 1, 'Nari-Dosh-Nivaran-Puja', '[\"1613275922866-nari-dosh-nivaran-puja - Copy.jpg\",\"1613275922866-nari-dosh-nivaran-puja.jpg\"]', '[2,8]', '', '', 5100, NULL, '[0,0]', 0, '[]', '[]', '[9,19]', '[21,20,2]', '', '2021-02-13 11:33:24'),
(25, 3, 'Office Opening Puja', 1, 'Office-Opening-Puja', '[\"1613276253958-new-office-shop - Copy.jpg\",\"1613276253958-new-office-shop.jpg\"]', '[2,6]', '<p>When someone is shifting to a new office, pooja is performed to reduce the ill-effects and doshas by increasing the flow of positive vibes in the office.&nbsp;</p>\n\n<h5 data-fontsize=\"15\" data-lineheight=\"18\"><strong>No of Panditji(s) : 1&nbsp; | Duration : 1-2 hrs | Pujan Samagri Included</strong></h5>\n', '<h4>Key Insights:</h4>\n\n<ul>\n	<li>To retain&nbsp;wealth and prosperity.</li>\n	<li>Ganesh is worshiped before doing any auspicious activity.</li>\n	<li>Gurukul&nbsp;certified and specialized&nbsp;priests.</li>\n	<li>All rituals follow Vedic Standards and Procedures.</li>\n	<li>High quality Samagri to ensure a pleasant puja experience.</li>\n	<li>Guaranteed Punctuality and Authenticity.</li>\n	<li>Professional Guidance &amp; Support.</li>\n</ul>\n', 3100, 2900, '[0,0]', 1, '[]', '[]', '[2]', '[2,3,1]', 'Introductory Offer - Rs.200 off ', '2021-02-13 11:33:24'),
(26, 3, 'Rahu Grah Shanti', 1, 'Rahu-Grah-Shanti', '[\"1613276449173-rahu-shanti-jaap - Copy.jpg\",\"1613276449174-rahu-shanti-jaap.jpg\"]', '[8,4,6]', '', '', 11000, NULL, '[0,0]', 1, '[]', '[]', '[18]', '[11,14,20]', '', '2021-02-16 10:20:24'),
(27, 3, 'Astro Consultation over Phone', 2, 'Astrology-Consultation-over-Phone', '[\"1613277961946-astro on call - Copy.jpg\",\"1613277961946-astro on call.jpg\"]', '[9]', '', '', 500, 450, '[0,0]', 1, '[]', '[]', '[]', '[14,26,11]', 'Introductory Offer - 10% off ', '2021-02-13 11:33:24'),
(28, 3, 'Vastu Consultation over Phone', 2, 'Vastu-Consultation-over-Phone', '[\"1613278749737-vastu on call - Copy.jpg\",\"1613278749738-vastu on call.jpg\"]', '[10]', '', '', 500, 450, '[0,0]', 1, '[]', '[]', '[]', '[]', 'Introductory Offer - 10% off ', '2021-02-13 11:33:24'),
(29, 3, 'Vastu Consultation at Location', 2, 'Vastu-Consultation-at-Location', '[\"1613279542784-vastu consultation - Copy.jpg\",\"1613279542784-vastu consultation.jpg\"]', '[10]', '', '', 3100, NULL, '[0,0]', 1, '[]', '[]', '[]', '[]', '', '2021-02-13 11:33:24'),
(30, 3, 'Bodysoul Meditation Incense Sticks', 4, 'Bodysoul-Meditation-Incense-Sticks', '[\"1613281617834-Picture18 - Copy.jpg\",\"1613281617835-Picture18.jpg\"]', '[]', '', '', 140, NULL, '[0,0]', 1, '[]', '[]', '[]', '[]', '', '2021-02-13 11:33:24'),
(31, 3, 'Rudrabhishek saada paath', 1, 'rudrabhishek-sada-paath', '[\"1615443011254-rudrabhishek - Copy.jpg\",\"1615443011254-rudrabhishek.jpg\"]', '[4]', '', '', 2100, NULL, '[0,0]', 1, '[]', '[]', '[]', '[]', '', '2021-03-10 11:30:49');

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
  `image` mediumtext,
  `provider` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `password`, `token`, `image`, `provider`, `created_at`, `updated_at`) VALUES
(1, 'Ankit Agarwal', 'mits.ankit@live.in', 'User', '$2a$10$aMDT6HDb.SNQj2VY57KQmOEOULHS9w38LPRE0b1b6dtbgruhNupGm', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiQW5raXQgQWdhcndhbCIsImVtYWlsIjoibWl0cy5hbmtpdEBsaXZlLmluIiwicm9sZSI6IlVzZXIifSwiaWF0IjoxNjEyODc5Mjc1fQ.8wS79a0vhGQEPJucnoIUxjmx7CytkxqCjIC7-iO1Zyw', NULL, NULL, '2021-02-08 07:22:51', '2021-02-08 07:22:51'),
(2, 'Amit', 'amit.khare588@gmail.com', 'Admin', '$2a$10$cTnEoF3yp3.BEXk5YkoDLer4yizhNqssitbMLRUynXu4GrLjbBouC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJuYW1lIjoiQW1pdCIsImVtYWlsIjoiYW1pdC5raGFyZTU4OEBnbWFpbC5jb20iLCJyb2xlIjoiQWRtaW4ifSwiaWF0IjoxNjE1NTUzMzIxfQ.c8dLTCgF1YBJ3h7ckU1m7rQdhGMHwfmsyDTCLIisn4Q', NULL, NULL, '2021-02-12 14:25:12', '2021-03-12 12:47:04'),
(3, 'pujarambh support', 'pujarambh.com@gmail.com', 'Admin', '$2a$10$QR.lXesE8gQO1Wc.SB5jq.4g8lr1oVQ1ubqrZii4Noz.u3w7d0Pfa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJuYW1lIjoicHVqYXJhbWJoIHN1cHBvcnQiLCJlbWFpbCI6InB1amFyYW1iaC5jb21AZ21haWwuY29tIiwicm9sZSI6IkFkbWluIn0sImlhdCI6MTYxNDAwNjQwMX0.Xk5rf9U_RMpH30rOpJTv0d1ykU-QNZdYzV8y6gIzfpI', 'https://lh3.googleusercontent.com/-W2pDhMcjiiM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuck-kNHVFdym0OuGr0kE-bvBHgN_QA/s96-c/photo.jpg', 'Google', '2021-02-13 11:31:16', '2021-02-16 10:20:24'),
(4, 'Amit Jain', 'amitjain.rn@gmail.com', 'User', '$2a$10$pRv7XGCEdKg.zABPpCQ7mOUvMrEIJYg/L9mHmfcJekDuOBShTvSt2', NULL, 'https://lh3.googleusercontent.com/a-/AOh14GgVVBsYqMWiNSbBBhdDXku8tgOUTBFUOVex_jeyMcM=s96-c', 'Google', '2021-02-13 11:32:15', '2021-02-16 06:54:11'),
(5, 'Amit', 'test@test.com', 'User', '$2a$10$cTnEoF3yp3.BEXk5YkoDLer4yizhNqssitbMLRUynXu4GrLjbBouC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1LCJuYW1lIjoiQW1pdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInJvbGUiOiJVc2VyIn0sImlhdCI6MTYxNTU1NTI0Nn0.PlO8BcMs42jZcaYzhZlTBVKf_fOjINL-phN62Y1oIvY', NULL, 'Email', '2021-02-13 11:33:24', '2021-03-12 13:19:57'),
(6, 'Parveen Kumar', 'seoleader.p@gmail.com', 'Admin', '$2a$10$sPRCAE4iaBv/mLXdBN9rN..7tLKfbvjdFXlu128tKgtcYJEMpP0cS', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJuYW1lIjoiUGFydmVlbiBLdW1hciIsImVtYWlsIjoic2VvbGVhZGVyLnBAZ21haWwuY29tIiwicm9sZSI6IkFkbWluIn0sImlhdCI6MTYxNTI5MDMxM30.Q7q_EVuEeiNp0k5_G2B7UnkqEH0YO0xKlHz-84T4tw0', NULL, 'Email', '2021-02-16 10:20:24', '2021-02-16 10:20:24'),
(7, 'mohit singh', 'mohiit77u@gmail.com', 'Admin', '$2a$10$QlXR/q.BuuN0tcnGWdZyXuM58WsDQ/uOoyDwwbM1bqIf8UTlfXv5y', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3LCJuYW1lIjoibW9oaXQgc2luZ2giLCJlbWFpbCI6Im1vaGlpdDc3dUBnbWFpbC5jb20iLCJyb2xlIjoiQWRtaW4ifSwiaWF0IjoxNjE1NDQyNDU3fQ.IUszwd1IWXIE6qyUyyXkFTbKhvAOVGADlw0zrL5iA2U', NULL, 'Email', '2021-03-10 11:30:49', '2021-03-10 11:30:49');

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
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `couponapllied`
--
ALTER TABLE `couponapllied`
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
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `blog_metas`
--
ALTER TABLE `blog_metas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contact_forms`
--
ALTER TABLE `contact_forms`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `coupon`
--
ALTER TABLE `coupon`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `couponapllied`
--
ALTER TABLE `couponapllied`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `gofb`
--
ALTER TABLE `gofb`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `metas`
--
ALTER TABLE `metas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shippings`
--
ALTER TABLE `shippings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
