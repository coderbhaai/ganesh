-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Apr 07, 2021 at 02:22 PM
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
-- Table structure for table `astrology`
--

CREATE TABLE `astrology` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `tob` varchar(255) NOT NULL,
  `place` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `astrology`
--

INSERT INTO `astrology` (`id`, `name`, `email`, `phone`, `gender`, `dob`, `tob`, `place`, `created_at`, `updated_at`) VALUES
(1, 'Amit', 'amit.khare588@gmail.com', '8424003840', 'Male', '2021-03-26', '03:44', 'Ballia', '2021-03-15 02:43:33', '2021-03-15 02:43:33'),
(2, 'Amit', 'amit.khare588@gmail.com', '8424003840', 'Male', '2021-03-26', '15:44', 'Ballia', '2021-03-15 02:43:33', '2021-03-15 02:43:33'),
(3, 'Amit 2', 'amit.khare588@gmail.com', '8424003840', 'Male', '2021-03-18', '12:59', 'BUI', '2021-03-15 02:45:53', '2021-03-15 02:45:53'),
(4, 'Amit3', 'amit.khare588@gmail.com3', '8424003840', 'Male', '2021-03-20', '13:00', 'BUIIIII', '2021-03-15 08:24:21', '2021-03-15 08:24:21'),
(5, 'amit jain', 'amitjain.rn@gmail.com', '9898989898', 'Male', '2021-03-11', '08:08', 'gwalior', '2021-03-15 08:24:21', '2021-03-15 08:24:21');

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
(1, 'Importance of Kanak Dhara Stotra', 'importance-of-kanak-dhara-stotra', 'importance-of-kanak-dhara-stotra.jpg', '[2]', '[5,6]', 'कनकधारा स्तोत्र माता लक्ष्मी की बड़ी सुन्दर हृदयस्पर्शी स्तुति है', '<h2>माता लक्ष्मी धन सम्पदा और सम्पन्नता की देवी होती हैं |</h2>\n\n<p>कनकधारा स्तोत्र माता लक्ष्मी की बड़ी सुन्दर हृदयस्पर्शी स्तुति है|</p>\n\n<p>एक प्रसंग के अनुसार भगवान शंकराचार्य जी ने एक वृद्ध महिला की दरिद्रता दूर करने के लिए इसी शक्तिशाली स्तोत्र के <a href=\"https://www.pujarambh.com/tag/paath\">पाठ</a> प्रभाव से स्वर्ण वर्षा कराई थी| श्रद्धा विश्वास पूर्वक किये गए इस स्तोत्र के पाठ प्रभाव से कार्य व्यापर में बरकत होती है, साधक का विवेक आर्थिक उन्नति के विचारों को ग्रहण करके समृद्धि के मार्ग को प्राप्त करता है और जल्द ही आर्थिक हानि या ऋण से उबरने लगता है| अत्यंत परिश्रम के बाद भी अगर घर से दरिद्रता और आर्थिक अवनति दूर न हो रही हो तो कनकधारा का मासिक पाठ श्रद्धापूर्वक शुक्रवार की शाम से प्रारम्भ करना चाहिए|</p>\n\n<p>ऐसा अनुभूत किया गया है <a href=\"https://www.pujarambh.com/tag/Grah-Shanti\">ग्रहणकाल</a> में इस स्तोत्र को सिद्ध कर नित्य पाठ करने से पीढ़ी दर पीढ़ी से चली आ रही दरिद्रता तक नष्ट हो जाती है|</p>\n', '2021-02-01 07:12:00', '2021-03-19 09:53:13'),
(2, 'What is the significance of Bell in a Temple?', 'significance-of-bell-in-a-temple', 'significance-of-bell-in-a-temple.jpg', '[4]', '[]', 'घंटी बजाने से पूजा परिवेश में दैवीय चेतना का प्रसार होता है', '<p>दरअसल मान्यता है कि <a href=\"https://www.pujarambh.com/category/hindu-puja\">पूजा पाठ</a> या मंदिर में प्रवेश के दौरान घंटी बजाने से पूजा परिवेश में दैवीय चेतना का प्रसार होता है और घंटी से उत्पन्न नाद की तरंगें <a href=\"https://www.pujarambh.com/category/Puja-for-wealth\">पूजा</a> स्थल की नकारात्मक ऊर्जा का नाश करती है। हालांकि इसके पिछे वैज्ञानिक कारण भी है, जिसकी चर्चा आज हम करने जा रहे हैं।</p>\n\n<p>वैज्ञानिकों के अनुसार कहा जाता है कि जब घंटी बजाई जाती है तो वातावरण में विशेष प्रकार का कंपन होता है, यह कंपन वायुमंडल के कारण काफी दूर तक जाता है, जिसका फायदा यह है कि इसके क्षेत्र में आने वाले सभी जीवाणु, विषाणु और सूक्ष्म जीव आदि नष्ट हो जाते हैं, जिससे आसपास का वातावरण शुद्ध हो जाता है। यही कारण है कि लोग अपने घरों के दरवाजों और खिड़कियों पर भी विंड चाइम्स का प्रयोग करते हैं,</p>\n', '2021-02-01 07:12:00', '2021-03-19 09:53:13'),
(3, 'The story behind Holika Dahan – Holi Festival Special', 'the-story-behind-holika-dahan', 'change-image.jpg', '[9]', '[8]', 'Once upon a time, there was a demon king called Hiranyakashyap. He believed himself to be the real god', '<p>In the month of March, Veer a 10-year-old boy, came to visit his Grand Maa and planned for a stay there. One day in the early morning hours, Veer saw some ladies and kids gather around a heap of wood logs. As he saw them Veer asked&nbsp;his granny,</p>\n\n<p>Veer: Granny, where are these people going and what are they doing?</p>\n\n<p>Granny: Veer, they are preparing for Holika Dahan Pooja.</p>\n\n<p>Veer: What is Holika Dahan Granny; Can you please explain it to me?</p>\n\n<p>Granny: (smile) Ok Son! It has religious values and I will explain it with the famous&nbsp;story behind Holika Dahan.</p>\n\n<p>&nbsp;</p>\n\n<p><strong>Story Begins-</strong></p>\n\n<p>Once upon a time, there was a demon king called Hiranyakashyap. He believed himself to be the real god. He wanted everyone in his kingdom to worship him. Rest all the other gods and goddess should be destroyed. In front of the king&rsquo;s power all the people obeyed him and all the temples and the idols of gods were demolished.</p>\n\n<p>However, there was someone in Hiranyakashapya home, who dare to differ from his thoughts. It was his own son Prahalad, who did not worship him. He used to pray and bow down to the all mighty Lord Vishnu.</p>\n\n<p>This act of his own son made Hiranyakashyap very angry. The level of anger reaches to this extent that he decided to kill him. As disobedience of Prahalad revokes the people of his kingdom.</p>\n\n<p>To get his son killed he called his demon sister Holika. Sister Holika has a vardaan(boon)&nbsp;that she cannot be burnt alive in the fire. Therefore she decided to use this magical power of her to kill Prahalad. One evening she loved Prahalad and artfully she brought him to her lap. Then she sat over the huge bonfire, thinking that Prahalad will die soon and she will come back safely.</p>\n\n<p>Veer: Then what happened Granny? What happened to Prahalad?</p>\n\n<p>Granny: (Smile) But, something unexpected happens, God took favour of Prahalad, as he was worshipping lord Vishnu, always with his pure heart. On the other hand, Holika died as she had the ill intension of killing a small child, just because he was worshipping the real power &ldquo;God&rdquo;!</p>\n\n<p>In the end, his father was shocked as Holika&rsquo;s powers did not work. And Prahalad came out safely while he was chanting &ldquo;Lord Vishnu&rdquo;, who saved him while wicked Holika has burned away.</p>\n\n<p>So what did you learned from this story Veer?</p>\n\n<p>Veer: ( Excited) That we should always worship god</p>\n\n<p>Granny: Of course and also&nbsp;&ldquo;<strong>Good always beats evil</strong>&rdquo;. So you should always help others and never use your strength to harm others.</p>\n\n<p>Importance of the story : We do the bonfire in the evening a day before the <a href=\"https://www.pujarambh.com/tag/holi\">Holi festival</a>, to embark the presence of Goodness and humanity while remembering Prahalad and Lord Vishnu.</p>\n\n<p>Veer: (Politely) Granny can I&nbsp;also go and see the bonfire in the evening?</p>\n\n<p>Granny hugged Veer and nod her head in confirmation.</p>\n', '2021-02-04 15:56:27', '2021-03-19 09:53:13'),
(4, 'Benefits of online Pandit Ji', 'benefits-of-online-pandit-ji', 'for-blog.jpg', '[2,3,4]', '[5,7,8,6]', 'Text ', '<p>Puja is a big part of all Hindu families. In Hindu dharma, it is the most sacred thing in our culture. We conduct puja on every occasion whether it is welcoming a new member of the family or someone getting married, even we do puja on a person&rsquo;s demise. This is the way of seeking blessings from the almighty. But we can&rsquo;t do this without a priest or pandit who is a Brahmin. The person who is knowledgeable knows all the rituals and expert in Mantra Ucharan. Sometimes we don&rsquo;t have enough time to take all the responsibility on our own and find it difficult to arrange everything for a ritual in a festival.</p>\n\n<p>Online booking medium gives us a unique opportunity and makes this just a few clicks away. You can easily find a Pandit Ji for any kind of ritual that is dedicated to your service. Along with puja this online pandit Ji also does Jaap and path&nbsp;for you and not only that, but they will also arrange all items required for the puja. All you just need to reach out to the right platform that is ready to take the responsibility for you and leaves you stress-free.</p>\n\n<p>Why should you hire a pandit ji online?</p>\n\n<p>This might sound weird when we say online pandit ji services. But in this digital era when everything goes digital then why not this?</p>\n\n<p>Yes! It is now possible to book pandit Ji online as per your requirement.</p>\n\n<p>&nbsp;At times it seems very difficult to find a well-known pandit for different rituals. Therefore, this portal makes it easier for you to find a knowledgeable pandit of your choice. Whether it is a wedding or any other spiritual ritual at home, you don&rsquo;t need to go here and there to find a suitable pandit for puja when there is a platform at your service. This platform allows you to explore end numbers of high qualified pandits whose aim is to serve you the best. You have the full liberty to select a pandit as per your custom, tradition, and belief.</p>\n\n<h2>Benefits of booking pandit ji online</h2>\n\n<p>In Hindu dharma, there are thousands of Gods with thousands of festivals. Puja is a traditional ritual, being carried forward from our grand parent&rsquo;s time. In this modern time, things have changed drastically but still we are connected with our roots. But earlier it was very difficult to get a good pandit for puja in different occasions. Now, in this digitalized world everything has become easy, even getting a pandit for puja. One can book pandit Ji online from wherever you are. It not only gives you a hassle-free experience to find a Pandit Ji for your services but also there are several benefits you can get if you go for online pandit Ji booking.</p>\n\n<h3>First-class services</h3>\n\n<p>Online portals for pandit services allow you to choose pandit ji as per your choices from multiple A-class options. The platform always hires the Brahmins who are knowledgeable and know all the rituals which ensures first-class services to its customers. Online Pandit Ji not only does pujas but also provide different services like Kundali matching, <a href=\"https://www.pujarambh.com/product/vastu-consultation-at-location\">Vastu consultation</a>, etc. They help you to get a hassle-free experience for any kind of pujas.</p>\n\n<h3>Perfectionists</h3>\n\n<p>The best thing about online pandit Ji<strong> </strong>is that they are perfectionists at their work. They never bargain the nature of administrations they give. They can even arrange the <a href=\"https://www.pujarambh.com/shop\">puja items</a> for the rituals but do everything on their own, just to make sure no mistakes happen. So, you don&rsquo;t need to take any tension for the puja and relax when you book<strong> </strong>pandit Ji online<strong>.</strong></p>\n\n<h3>Easily Accessible</h3>\n\n<p>If you relocate to a new place and planning for housewarming puja at your new house but struggling to get a Pandit Ji. No need to worry! You just have to go online and search for Pandit Ji for<strong> </strong>puja near me and we&rsquo;ll be at your service.</p>\n\n<h3>Hassle free and satisfying</h3>\n\n<p>In today&rsquo;s busy life no one has that much time to spend in searching for good panditji for an occasion like wedding, pujas, griha pravesh etc. Most importantly there is a high chance of cancellation at last moment without any prior intimation. This never happens when you <a href=\"https://g.page/pujarambh---book-pandit-online?we\">hire online pandit ji</a>. Once you pay online to book your pandit the responsibility is on the team to make it hassle free and satisfying for you.</p>\n\n<p>In Hindu dharma, we have multiple festivals and we do different pujas like <a href=\"https://www.pujarambh.com/product/ganesh-puja\">Ganesh Chaturthi</a>, Narayan Puja etc. This play an important role in our lives as we seek the blessings and pray to God in this way. But we can&rsquo;t do puja without a pandit. In this digital world, conducting puja for any occasion has become very easy. It is just a few clicks away. There are such platforms that provide this end to end services. They do everything needed for pujas on your behalf. From getting a suitable <a href=\"https://g.page/r/CQXRCgLGypQKEBA\">pandit near you</a> to arrange puja samagri for the event. They take all responsibility to conduct the puja correctly and ensure a hassle-free experience for you.</p>\n\n<p>So, now book pandit ji online and stay tension free for any kind of puja at your house.</p>\n', '2021-03-15 08:24:21', '2021-03-19 09:53:13'),
(5, 'What is Puja and Why is it Important?', 'online-pooja-booking', 'pujarambh-banner.jpg', '[1,3,9,2]', '[7,5,6,8]', 'Text', '<p>Every religion can be termed as a complex system of beliefs that binds both faith and values together. Not only is it unique in its way, but also acts as a source of confidence and peace for many of us. Puja is one of the most integral parts of this belief system and is a procedure that has been followed for ages.</p>\n\n<p>We perform pujas every day and special pujas on festivals and important occasions of our life. Performing puja on such days not only makes it memorable but is also auspicious at the same. While the elders understand the significance, the younger generation might find it hard to understand why we need to perform puja.</p>\n\n<p>Understanding the roots of our faith, the bond between the devotee and the deity becomes stronger, and one gets to learn the importance of puja. However, we tried to answer the most common question asked &ndash; &ldquo;what is puja and what is it important.&rdquo;</p>\n\n<p>Read on to learn and discover how puja can be beneficial for yourself and your family.</p>\n\n<h3>What is Puja?</h3>\n\n<p>Puja or also written as &quot;pooja&quot; is derived from Sanskrit, which means &quot;adoration&quot;, &quot;reverence&quot;, and &quot;worship.&quot; The word is also defined in various ways by the pundits and the acharyas. As per one interpretation, the word &quot;puja&quot; comprises the two letters &quot;pa&quot; and &quot;ja.&quot;&nbsp; The letter &quot;pa&quot; stands for repetition of the <a href=\"/what-is-puja-and-why-is-it-important\">Hindu sacred</a> texts ceremonially, and &quot;ja&rdquo; refers to the recitation.</p>\n\n<p>In simple terms, puja is a ritual that is followed every day in most Hindu households. Offerings are made to the deity, to receive blessings in return. During the puja, the devotee repeats or japs the sacred chants which connect him/her to God and helps attain peace.</p>\n\n<h3>Puja in the morning</h3>\n\n<p>Daily puja is mostly performed in the morning as these hours are known to be sacred, auspicious, and fruitful. As puja involves the recitation of <a href=\"/significance-of-bell-in-a-temple\">slokas or mantras</a>, performing the same during the calm and peaceful morning hours is considered apt. Pundits also believe that the Godly bodies are very receptive to the prayers performed during the mornings.</p>\n\n<h3>How to prepare yourself for daily puja?</h3>\n\n<p>Most of the homes have a special place for performing puja. If there is none, you can pick a place that is free from distractions and is peaceful.</p>\n\n<ul>\n	<li>Use a fresh piece of cloth or a mat. Sit facing East or North.</li>\n	<li>Clean the space as well as the idols by sprinkling just a few water drops. You need to use a separate cloth to clean the idols and apply kumkum.</li>\n	<li>You need to place two dreams (oil lamp) on both sides of the mandapam. One deepam should face the sun i.e. the east and the other should face north. Once done, light the lamps using cow ghee, or oil.</li>\n	<li>After you light the lamps, you can recite stotras or slokas as per your convenience or tradition.</li>\n	<li>While reciting the slokas, you can decorate the idols of the god with flowers, offer naivedyam and incense sticks.</li>\n	<li>You can then end the puja with aarti. While performing aarti, you need to ring the bell as it is believed that it &ldquo;wakens&rdquo; the gods.</li>\n</ul>\n\n<h3>Why is it important to perform puja?</h3>\n\n<p>Performing pooja every day not only renews your faith but can also help bring your family together for an auspicious start of the day. There are many benefits of doing puja every day and a few of them are listed below.</p>\n\n<h3>Helps start your day on a very positive note</h3>\n\n<p>Performing puja every day brings contentment and peace to your soul. As you start your day with slokas or mantras and puja, you are filling your mind with positivity. Such a routine helps you stay calm the whole day, enabling you to take care of various chores and challenges with confidence.</p>\n\n<h3>Brings your family together</h3>\n\n<p>When you perform puja with all the members of your family together, it becomes a ritual over time. This way, your family comes together every morning, where no one is distracted and is very happy and thankful for being united.</p>\n\n<h3>Generates positive vibrations</h3>\n\n<p>The chants and the mantras fill the house with very positive vibrations. As you ensure to clean the house and take bath before performing puja, the house is clean. When you light the camphor or incense sticks, their magical aroma fills the house with harmony. <a href=\"/importance-of-kanak-dhara-stotra\">The positive vibrations</a> created flow through the house for the rest of the day as well. You can increase the same by playing audios of slokas during the morning and evening every day.</p>\n\n<h3>Helps you face problems and handle challenges</h3>\n\n<p>Puja improves our focus and reaffirms our faith in god. It helps us stay balanced and calm, and gets rid of negative thoughts, fear, temper, etc, preparing us for challenges. It increases your faith to remain strong and brings inner peace. The reaffirmation you get by performing puja and talking to god act as your pillars of strength.</p>\n\n<h3>Conclusion</h3>\n\n<p>Performing puja every day helps you lead a balanced, peaceful, and worry-free life. You can also perform special pujas at home for various occasions. These special pujas or homams are done as per the Vedic rituals and are performed by purohits, and are performed for one deity in particular by invoking Agni. If you have a special occasion or wish to perform a special puja/Homam at home, ensure to approach a <a href=\"/the-story-behind-holika-dahan\">Vedic pundit</a> for the same.</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n', '2021-03-19 09:53:13', '2021-04-03 10:10:56'),
(6, 'Best Time To Perform Puja', 'pandit-ji-for-puja-near-me', 'puja.jpg', '[1,3,2,9,4]', '[8,6,5,7]', 'Text', '<p>Our religion and culture is a diverse system of belief that ties together our spirituality and our values. It is special and is a source of peace and prosperity. Puja is an important part of Hinduism that&rsquo;s been present for a long time. Therefore, Puja is indicative of our beliefs and what they represent in our life.</p>\n\n<p>Puja refers to offering prayers or worship, notably of the sacred image. According to <a href=\"\">Ādi purāṇa</a>, there are six parts of worship - association with sacred, invitation, installation, worship and immersion. Each ritual has its specific rules and can differ accordingly. Usually, devotees can do Puja alone. However, some rituals require priests since the rituals and hymns can vary. A Puja can be performed for a particular announced intention or simply as an act of devotion. The Puja done in temples are often more detailed especially during festivals like Mahashivratri, Durga Puja, etc. There are variations with different locations.</p>\n\n<h3>Importance of Puja</h3>\n\n<p>As you practice Puja, you purify your body, mind, and intellect and start a new beginning. So, if you find you need to repair your inner self and start anew, a Puja alone will help you get there. By praying for 15-20 minutes daily, a person starts connecting with his inner peace and gradually troubles come to an end. Prayer develops positive energy in the mind and the body becomes healthy.</p>\n\n<p>When doing a Puja your body, mind, and consciousness are all united and centered on one thing. We recite the deity&#39;s name with complete admiration and respect. It&rsquo;s a perfect way to discipline yourself and make your mind focused. If one is filled by stressful emotions, burdened with pressure or difficulties, or actually cannot understand which direction to transform, then a Puja will aid in calming the mind and finding a path that was previously blocked. Your negativity will have a serious effect on your house and your loved ones too. So not only does a Puja benefit you but also your surroundings.</p>\n\n<h3>Daily Puja Time</h3>\n\n<p>Veda recommends doing puja five times a day. The first one is the early morning at 4:30 AM in the Brahmi muhurtham, followed by puja at 9 AM and then a Mid-day puja at 12:00 PM. After which you have to let the deity relax. Later, perform Sandhya puja again in the evening between 4:30 PM and 6:00 PM. At last, we have Shayana puja at 9:00 PM to bring God to sleep. Since the current lifestyle does not encourage one to do the same, it is advisable to do pooja at least twice a day, one in the morning and then again in the evening.</p>\n\n<p>Brahma Muhurta is ideal for Sandhya Vandan, Meditation, Prayer, and Study. According to Vedas, the Brahma Muhutahm is dawn right before sunrise. Therefore, this time can differ from different locations and seasons. Similarly, <a href=\"/benefits-of-online-pandit-ji\">Sandhya Puja</a> is before sunset. Prayer, Meditation, Kirtan, Yajna and Aarti are five parts of this Puja. A devotee follows it by themselves or at the temple.</p>\n\n<h3>How to Perform Daily Puja</h3>\n\n<p>As per the Vedic scriptures, performing the regular pooja in the morning hours benefits the individual. The morning&#39;s quiet hours help maintain concentration and build a clear mind, increasing the person&#39;s aura. The next query in line is, how can one complete the morning puja?</p>\n\n<p>First, take a bath. Wear clean cotton clothes before you do your pooja. To gain concentration, with your preferred god in mind, sit facing east or north to meditate. Wash the puja room and light lamps(Diya). Start with the reciting hymns for Lord Ganesa. Say shlokas that refer to your house deity. Make sure you clean the deity.</p>\n\n<p>You can recite the mantra while offering flowers. Light the dhoops sticks and spread the vapors throughout the house. Based on how much time you have, you can continue reading the shlokas. Give <a href=\"/the-story-behind-holika-dahan\">naivedyam</a>(नैवेद्यम) to God - it may be fruit, honey, or something you feel like offering to God. Perform aarti when reciting similar verses.</p>\n\n<p>For Evening Puja, it should be done after the sunsets and before dark. Light lamps( Diya) in the evening. You can use either ghee or oil. One should never play conch or bells in the evening worship. In this time the Gods and Goddesses go to sleep. Flowers etc. need not be broken in the evening. For worshipping, either collect them first or it would be best not to include them in this time of worship. The place of worship should be veiled in the night so that there is no disturbance while God is sleeping. Once you shut the Puja place, open it at dawn.</p>\n\n<h3>Some of the common items used in Puja are:</h3>\n\n<ul>\n	<li>Lamp oil</li>\n	<li>Cotton wicks for the lamps</li>\n	<li>Japa mala</li>\n	<li>Mat to sit on while performing puja</li>\n	<li>Puja utensils</li>\n	<li>Flowers and a flower bowl to hold them</li>\n	<li>Dhoop sticks and a stand to put them.</li>\n	<li>Aarti puja Diya or spoons to perform aarti</li>\n	<li>Camphor</li>\n</ul>\n\n<h3>Things not to do while performing Puja</h3>\n\n<p>Negative thoughts, debate, conversation, sleep, food, travel, any kind of noise etc.</p>\n\n<p>should be avoided. The Puja is made to lighten our mood and create a positive outlook towards our lives. The same goes for one&rsquo;s physical appearance. Sitting for Puja in dirty attire with unhygienic is not allowed. Make sure you take a bath before every Puja and clean the place of worship. You should be wary of the direction you sit or perform the Puja/ Aarti. Directions like South is not appropriate for worship. The puja and aarti should end before 12 noon. The puja or aarti is not performed between 12 PM and 4 PM. It is considered prohibited by the Vedas. Bathrooms and Toilets should be away from Puja place. You can ask priests to know more about the prohibition during pujas. For example, an incensed stick is not used in havans. It is replaced with <a href=\"/significance-of-bell-in-a-temple\">dhoop or Diya</a>.</p>\n\n<p>Now you have all the information you need to know before doing a Puja. While everything takes time, so does prayers. Regardless of your busy lifestyle, always be regular and consistent with your prayer. Slowly but surely, you will see definite results.</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n', '2021-03-19 09:53:13', '2021-04-03 10:10:56');

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
(1, 'Single', 'AMITT', 10, 0, '2021-03-04', '2021-03-31', 0, '[2]', '2021-03-12 12:47:04', '2021-03-12 13:30:11'),
(2, 'Single', 'WELCOME20', 20, 1, '2021-03-15', '2021-03-30', 1, '[1,2,3,9,10,11,14,17,18,19,20,21,22,25,26,27,28,29,30,31]', '2021-03-12 13:30:11', '2021-04-02 06:39:13');

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
(1, 'default', 'Online Pandit Booking | Online Pandit near me | Pooja Online', 'Pujarambh is an end to your search for qualified pundit/purohits for any puja/havan and authentic puja samagri for all rituals along with Pandit\'s consultation.', 'Online booking, puja, havan, astrology, puja samagri, puja kits', NULL, '2021-01-09 00:42:38', '2021-04-03 10:10:56'),
(2, '/shop', 'Online Astrologer Consultation | Pooja Samagri online\n\n', 'Online booking of panditji for all type of puja in hindi, english, tamil, telugu, bengali. We help in organizing puja at home, temple or over video call.', 'Grah Pravesh, Bhoomi pujan, satyanarayan katha, sunderkand, grah shanti, pitr dosh, shaadi, vastu', NULL, '2021-01-16 06:37:54', '2021-03-12 13:30:11'),
(3, '/privacy-policy', 'Pujarambh.com | Privacy Policy of Online Pooja Consultation', 'Pujarambh is end to your search for qualified pundit/purohits for any puja/havan and authentic puja samagri for all rituals.', 'puja, online pandit, policy', NULL, '2021-02-04 15:56:27', '2021-03-19 09:53:13'),
(4, '/terms-and-condition', 'Terms and Conditions - Pujarambh - Online Pooja Booking', 'Terms and Conditions - Pujarambh is an end to your search for qualified pundit/purohits for any puja/havan and authentic puja samagri for all rituals.', 'puja, online booking, tnc', NULL, '2021-02-04 15:56:27', '2021-03-12 13:30:11'),
(5, '/benefits-of-online-pandit-ji', 'Benefits of Online Pandit Ji | Book Pandit Ji Online', 'Benefits of Online Pandit Ji allows you to choose Pandit Ji as per your choices from multiple options like kundali matching, Vastu consultation, etc.', 'Benefits of Online Pandit Ji , Book Pandit Ji Online', NULL, '2021-03-15 08:24:21', '2021-03-17 11:05:25'),
(6, '/significance-of-bell-in-a-temple', 'Significance of Bell in a Temple | Benefits of Bell Ringing', 'Significance of Bell in a Temple - The sound created by ringing the temple bell balance the right and left parts of our mind. Contact now for more details.', 'Significance of Bell in a Temple, Benefits of Bell Ringing', NULL, '2021-03-15 08:24:21', '2021-03-17 11:05:25'),
(7, '/the-story-behind-holika-dahan', 'The Story Behind Holika Dahan | Why is Holi Celebrated\n', 'The Story Behind Holika Dahan - Holi is celebrated as a festival of good over evil in the honor of Hindu God Vishnu and his devotee Prahlada', 'The Story Behind Holika Dahan, Why is Holi Celebrated', NULL, '2021-03-17 11:05:25', '2021-03-17 11:05:25'),
(8, '/importance-of-kanak-dhara-stotra', 'Importance of Kanakadhara Stotram | Kanakadhara Stotram', 'Importance of Kanakadhara Stotram - The Kanakadhara Stotram describes the beauty, grace, wisdom, and power of the Goddess of wealth and prosperity', 'Importance of Kanakadhara Stotram, Kanakadhara Stotram Benefits', NULL, '2021-03-17 11:05:25', '2021-03-17 11:05:25'),
(9, '/product/rudrabhishek-sada-paath', 'Get Rudrabhishek Saada Paath Pooja & Mantra Services\n', 'Rudrabhishek gratifies Lord Shiva and is considered most sacred during Shravan or Shivratri. Rudrabhishek Saada Paath reciprocates our well-being & prosperity.\n', 'Rudrabhishek saada paath\n', NULL, '2021-03-19 09:53:13', '2021-03-19 09:53:13'),
(10, '/product/bodysoul-meditation-incense-sticks', 'Buy Bodysoul Meditation Incense Sticks at the Best Price', 'Ayurvedic Aromatherapy is an effective alternative in natural healing. The aroma spread by Bodysoul Meditation Incense Sticks heals the mind, body, and soul.\n', 'Buy Bodysoul Meditation Incense Sticks', NULL, '2021-03-19 09:53:13', '2021-03-19 09:53:13'),
(11, '/product/vastu-consultation-at-location', 'Online Vastu Consultation at Location | Vastu Check', 'Pujarambh offers online Vastu Consultation at Location, right from the comfort of your home, no matter where you are in the world. Authentic Vastu Consultancy\n', 'Online Vastu Consultation', NULL, '2021-03-19 09:53:13', '2021-03-19 09:53:13'),
(12, '/product/vastu-consultation-over-phone', 'Talk to the Best Vastu Consultant over the Phone in India', 'Book professional Vastu Consultation over the Phone to integrate peace, harmony, symphony, and positive growth in your living settings in daily life.\n', 'Vastu Consultant', NULL, '2021-03-19 09:53:13', '2021-04-05 14:27:46'),
(13, '/product/astrology-consultation-over-phone', 'Astro Consultation over Phone | Astrologer Consultation', 'Consult India\'s top astrologers and Tarot Card Readers in your preferred language. Discuss over the phone your horoscope reading, solutions, and remedies.\n', 'Astro Consultation', NULL, '2021-03-19 09:53:13', '2021-04-05 14:27:46'),
(14, '/product/rahu-grah-shanti', 'Find Rahu Grah Shanti Consultant at Your Doorstep', 'Worried about unexpected losses & failures in career? Easy remedy of Rahu Dosha at your doorstep. Remove the negative effects, book a Rahu Graha Shanti Puja.', 'Rahu Grah Shanti Consultant ', NULL, '2021-03-19 09:53:13', '2021-03-19 09:53:13'),
(15, '/product/office-ppening-puja', 'Book Pandit For Office Opening Puja For Success', 'Booking services for experienced Vedic pandit online for Office, Shop, Store, Factory, New Business Puja for the pious and perfect start of your business.\n', 'Pandit For Office Opening Puja', NULL, '2021-03-19 09:53:13', '2021-03-19 09:53:13'),
(16, '/product/mata-ka-jagran', 'Book your pandit online for Mata Ka Jagran at your place', 'Mata Ka Jagran, Mata Ki Chowki Party, Musical Sundar Kand Event, Shiv Jagran Bhakti Events & devotional services like Jagran, Chowki & Sai bhajan sandhya.\n', 'Mata Ka Jagran', NULL, '2021-03-19 09:53:13', '2021-04-05 14:27:46'),
(17, '/product/manglik-dosh-nivaran-puja', 'Complete Mangal Dosh Nivaran Puja to pacify the Planet Mars', 'Mangal Dosh Nivaran Puja is the most effective remedy to nullify the malefic effects of Mars and to bring emotional strength & harmony in relationships.\n', 'Mangal Dosh Nivaran Puja ', NULL, '2021-03-19 09:53:13', '2021-03-19 09:53:13'),
(18, '/product/kumbh-vivah-sanskaar-puja', 'Book your pandit online for Kumbh Vivah Sanskaar Puja', 'Kumbh Vivah Sanskaar Puja is beneficial for strong relationships & marriage obstacles when a human has a Manglik or Double Manglik Dosh in their horoscope. \n', 'Kumbh Vivah Sanskaar Puja', NULL, '2021-03-19 09:53:13', '2021-03-19 09:53:13'),
(19, '/product/ketu-grah-shanti', 'Book your purohit online for Ketu Grah Shanti Puja', 'Perform your Ketu Grah Shanti puja with our Pandits at the best price. Book professional Vedic Priest to get rid of inauspicious results of a planet today.\n', 'Ketu Grah Shanti Puja', NULL, '2021-03-19 09:53:13', '2021-03-19 09:53:13'),
(20, '/product/karan-vedh-sanskaar-puja', 'Book your pandit online for Karan Vedh Sanskaar Puja', 'Offering Karan Vedh Sanskaar Puja & online pandit booking facility for Shubh Muhurat in cognizance with your Panchang, Tithi, Yoga, Vaar, Nakshatra, and Karan\n', 'Karan Vedh Sanskaar Puja', NULL, '2021-03-19 09:53:13', '2021-03-19 09:53:13'),
(21, '/product/guru-grah-shanti', 'Guru Grah Shanti Puja Online | Guru Dosh Nivaran Puja', 'Guru Grah Shanti Puja Online - Book your pandit for Guru Grah Shanti Puja. Guru must be powerful to have the knowledge, education, kids, and wealth.\n', 'Guru Grah Shanti', NULL, '2021-03-19 09:53:13', '2021-04-05 14:27:46'),
(22, '/product/chandra-grah-shanti', 'Perform Chandra Grah Shanti to Reduce the Malefic effects.', 'Book your pandit online today for Chandra Graha Shanti Puja to nullify the malefic effects of Chandra Graha dosha such as Childhood, Pleasures, Fertility, etc\n', 'Chandra Grah Shanti', NULL, '2021-03-19 09:53:13', '2021-03-19 09:53:13'),
(23, '/product/budh-grah-shanti', 'Book your pandit online for Budh Grah Shanti Puja', 'Monthly Budh Grah Shanti Puja for individuals having Budh Dosha in their Kundli or having a weakly placed Budh or undergoing Mahadasa/Antardasha of Budh Grah\n', 'Budh Grah Shanti Puja', NULL, '2021-03-19 09:53:13', '2021-03-19 09:53:13'),
(24, '/product/bhakut-dosh-nivaran-puja', 'Pandit Booking for Bhakut Dosh Puja & Astrology Services', 'Bhakut Dosh Nivaran Puja to nullify Bhakut Dosh defects resulting in diverse, lack of wealth, hurdle in family or death of one or both husband and wife\n', 'Bhakut Dosh Puja', NULL, '2021-03-19 09:53:13', '2021-03-19 09:53:13'),
(25, '/product/bhoomi-pujan', 'Book Pandit Online for Bhoomi Pujan for new beginnings\n', 'Bhoomi Pujan to start new construction or use the land for cultivation, to chant Veda Sutras, and perform rituals in honor of goddess Bhumi & Vastu Purusha \n', 'Bhoomi Pujan', NULL, '2021-03-19 09:53:13', '2021-03-19 09:53:13'),
(26, '/product/ganesh-puja', 'Ganesh Puja Pandit for Health, Wealth & Prosperity', 'Book your pandit for Ganesha Pooja before starting any new work & invoke the energy of Ganesha, the deity of luck, to remove obstacles and be blessed.\n', 'Ganesh Puja', NULL, '2021-03-19 09:53:13', '2021-03-19 09:53:13'),
(27, '/product/saraswati-puja', 'Saraswati Puja Pandit for Knowledge, Truth & Purity', 'Book your Pandit Ji for Saraswati Puja for an embodiment of knowledge, truth & purity. Worship the divine consort of Lord Brahma, the Creator of the universe.\n', 'Saraswati Puja', NULL, '2021-03-19 09:53:13', '2021-03-19 09:53:13'),
(28, '/tag/holi', 'Book your Pandit online for Holi Puja and the Celebration', 'Pujarambh offers an online platform for booking Pandit ji for Holika Puja and Holi Puja. Book Pandit Ji today for all types of Puja at your home or office.\n', 'Holi Puja', NULL, '2021-03-19 09:53:13', '2021-03-19 09:53:13'),
(29, '/tag/diwali', 'Book Pandit for Dhanteras and Diwali Lakshmi Puja\n', 'Pandit Ji for Diwali Puja. Book for all Type Puja, marriage, & ceremonies at your home or office. Professional Vedic Priest. Hassle-Free Experience. \n', 'Diwali Lakshmi Puja\n', NULL, '2021-03-19 09:53:13', '2021-03-19 09:53:13'),
(30, '/tag/path', 'Book Purohit Online - For all types of Path, Puja & Homam\n', 'Pujarambh offers Pandit Ji at your doorstep for Vedic & Hindu Puja Services like Path Vedic Rituals, Religious Ceremonies, Vastu Yagya, and many more. \n', 'Path, Book Purohit Online', NULL, '2021-03-19 09:53:13', '2021-03-19 09:53:13'),
(31, '/tag/grah-shanti', 'Book Pandit Ji Online for Grah Shanti Puja at Your Place', 'Best experienced & well-known purohits and pandits at your place for Grah Shanti puja at your home for removing all the grah dosh of the person and family.\n', 'Grah Shanti Puja', NULL, '2021-03-19 09:53:13', '2021-03-19 09:53:13'),
(32, '/about-us', 'About us - Talk to Pandit Ji Online - Free Pandit Seva', 'About us -  Talk to pandit ji online and get resolved all online pooja related queries. Book your online consultation now. For more visit our website.', 'Talk to Pandit Ji Online', NULL, '2021-03-19 09:53:13', '2021-03-19 09:53:13'),
(33, '/category/Puja-for-wealth', 'Puja for Wealth - Which Pooja is Good for the Money?', 'Book Puja for Wealth Online - Performing Lakshmi Puja, one can attain financial prosperity and surplus wealth. Book pandit online now.', 'Puja for Wealth', NULL, '2021-03-19 09:53:13', '2021-04-05 14:27:46'),
(34, '/category/Puja-for-health', 'Puja for Health - Which Pooja is Good for Health?', 'Book Puja for Health - Performing pooja every day not only renews your faith but can also help bring your family together for an auspicious start of the day.', 'Puja for Health', NULL, '2021-03-19 09:53:13', '2021-04-05 14:27:46'),
(35, '/category/16-sanskaar', '16 Sanskaar - What are the 16 Sanskar in Hinduism?', '16 Sanskaar - the Sanskar is a series of sacraments, sacrifices and rituals that serve as rites of passage and mark the various stages of the human life.', '16 Sanskaar', NULL, '2021-03-19 09:53:13', '2021-04-05 14:27:46'),
(36, '/category/hindu-festivals', 'Hindu Festivals - What are the main Hindu festivals?\n', 'The most important Hindu festivals are Makar Sankranti, Shivratri, Holi, Onam, Ganesh Chaturthi, Dussehra, and Diwali. Book online puja for all festivals', 'Hindu Festivals', NULL, '2021-03-19 09:53:13', '2021-04-05 14:27:46'),
(37, '/category/hindu-puja', 'Hindu Puja - Why is Puja Important for a Hindu', 'Hindu Puja is for the fulfillment of human desires, freedom from sufferings, for off-springs, for marriage, rise in status and position, for health and wealth.', 'Hindu Puja', NULL, '2021-03-19 09:53:13', '2021-04-05 14:27:46'),
(38, '/online-pooja-booking', 'Online Pooja Booking - What is Pooja & Its Importance', 'Online Pooja Booking - puja is a ritual that is followed every day in most Hindu households. Offerings are made to the deity, to receive blessings in return. ', 'Online Pooja Booking', NULL, '2021-04-03 10:10:56', '2021-04-03 10:10:56'),
(39, '/pandit-ji-for-puja-near-me', 'Pandit Ji for Puja Near Me - Best Time to Perform Puja', 'Pandit Ji for Puja Near Me - Veda recommends doing puja five times a day. For more information for puja, timing visits our blog best time to perform puja', 'Pandit Ji for Puja Near Me', NULL, '2021-04-03 10:10:56', '2021-04-03 10:10:56'),
(40, '/', 'Online Pandit Booking | Online Pandit near me | Pooja Online', 'Pujarambh is an end to your search for qualified pundit/purohits for any puja/havan and authentic puja samagri for all rituals along with Pandit\'s consultation', 'Online Pandit Booking | Online Pandit near me | Pooja Online', NULL, '2021-04-03 10:10:56', '2021-04-03 10:10:56'),
(41, '/tag/paath', 'Pooja Path Karne Ki Vidhi- Pooja ke Niyam in Hindi', 'Paath puja means recitation and is perfect way to respect god, helps in reducing all the obstacles in your life. It removes all the evil spirits. ', 'paath', NULL, '2021-04-05 14:27:46', '2021-04-05 14:27:46'),
(42, '/product/aditya-hridya-stotra', 'Aditya Hridaya Stotra  - Aditya Hridaya Stotra Path Benefits', 'Aditya Hridaya Stotra - The prayer was sung when Lord Ram was to defeat Ravana. The dazzling flames of the sun, Aditya are the holiest, symbol to awareness.', 'aditya-hridya-stotra', NULL, '2021-04-05 14:27:46', '2021-04-05 14:27:46'),
(43, '/product/akshaya-tritiya-parshuram-puja', 'Akshaya Tritiya Parshuram Puja - Akshaya Tritiya Puja Vidhi', 'Akshaya Tritiya Parshuram Puja - Its celebrated by Hindus and Jains as on this day Lord Vishnu. The people offer grains, wheat, cloth, to Brahmins & others', 'akshaya-tritiya-parshuram-puja', NULL, '2021-04-05 14:27:46', '2021-04-05 14:27:46'),
(44, '/product/annaprashan-sanskaar-puja', 'Annaprashan Sanskar Puja - Annaprashan Sanskar Kaise Karen', 'Annaprashan Sanskar Puja is done for the bright future and success of the newborn baby. The transformation of a baby from a mother\'s milk to other food items. ', 'annaprashan-sanskaar-puja', NULL, '2021-04-05 14:27:46', '2021-04-05 14:27:46'),
(45, '/product/antim-sanskaar-shanti-paath', 'Antim Sanskar Shanti Path - Antim Sanskar Kaise Kare', 'Antim Sanskar Shanti Path done so that the dead souls of our ancestors can attain peace and liberation. The soul feels detached from living & start new journey.', 'antim-sanskaar-shanti-paath', NULL, '2021-04-05 14:27:46', '2021-04-05 14:27:46'),
(46, '/product/baglamukhi-jaap-and-havan', 'Baglamukhi Jaap and Havan - What is Baglamukhi Pooja?', 'Baglamukhi Jaap and Havan  - The problem of court cases, accidents, and family enemies can be solved with the puja of Banglamukhi. Its worshipped for victory.', 'baglamukhi-jaap-and-havan', NULL, '2021-04-05 14:27:46', '2021-04-05 14:27:46'),
(47, '/product/dhanteras-puja', 'Dhanteras Puja Vidhi - Dhanteras Puja Muhurat 2021', 'On the auspicious day of Dhanteras, the Hindus buy new utensils, gold, silver. Kuber, God of wealth, & Goddes Laxmi, goddess of wealth are worshipped this day.', 'dhanteras-puja', NULL, '2021-04-05 14:27:46', '2021-04-05 14:27:46'),
(48, '/product/durga-puja-and-paath', 'Durga Puja and Path Vidhi -How to do Durga Puja at home', 'Durga puja is celebrated by Hindus for the victory of Goddess Durga over the demon Mahishasur. The Durga path symbolizes that evil forces are bound to end.', 'durga-puja-and-paath', NULL, '2021-04-05 14:27:46', '2021-04-05 14:27:46'),
(49, '/product/hanuman-chalisa-paath', 'Hanuman Chalisa Path - Hanuman Chalisa Path in Hindi PDF', 'Reading Hanuman Chalisa can keep you far away from the dangerous evil spirits. Hanuman Chalisa has the magical powers of protecting you from evil spirits.', 'hanuman-chalisa-paath', NULL, '2021-04-05 14:27:46', '2021-04-05 14:27:46'),
(50, '/product/harivansh-puran-katha', 'Harivansh Puran Katha - Harivansh Puran Benefits in Hindi', 'The holy book that contains the future. The holy book contains the verses of Mahabharat and also the teachings given by Lord Krishna for leading a good life.', 'harivansh-puran-katha', NULL, '2021-04-05 14:27:46', '2021-04-05 14:27:46');

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

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`email`, `token`, `created_at`) VALUES
('seoleader.p@gmail.com', 'fj8e12s70o96f9df1yxir2', '2021-03-15 08:24:21');

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
(1, 3, 'Saraswati Puja', 1, 'saraswati-puja', '[\"1612875312552-saraswati-puja - Copy.jpg\",\"1612875312555-saraswati-puja.jpg\"]', '[1]', '<p>Vasant Panchami, also known as Basant Panchami in India is celebrated because the festival of deity Saraswati.&nbsp;<strong>Ma Saraswati Puja</strong>&nbsp;is done on the day of Vasant Panchami.</p>\n\n<p>No of Pandit(s) : 1&nbsp; | Duration : 1 hrs | Puja Samagri Included in the package</p>\n', '<p>Goddess Saraswati is known &nbsp;as the sign of education, art, culture and music. She is known to be the archive of information. Human beings are conferred with speech, wisdom and learning by her.&nbsp;Knowledge seekers across the country believe that worshipping the deity of wisdom can facilitate them gain a lots of abilities and eternal understanding.</p>\n\n<p>What we will do?</p>\n\n<ul>\n	<li>&nbsp;Once you have booked the Puja, you will receive a booking confirmation message</li>\n	<li>&nbsp;Our team will call you to validate your booking and get additional details, if required</li>\n	<li>&nbsp;After validation, our team will assign the best Guruji(s)/Pandit(s) as per your requirement</li>\n</ul>\n', 3100, NULL, '[0,0]', 1, '[]', '[]', '[]', '[]', 'Introductory Offer - Rs.200 off ', '2021-03-19 08:55:12'),
(2, 3, 'Ganesh Puja', 1, 'ganesh-puja', '[\"1612877810189-ganesh-puja - Copy.jpg\",\"1612877810189-ganesh-puja.jpg\"]', '[1,6]', '<p>Ganesh Puja is performed for <strong>Lord Ganapathi</strong> who removes all the obstacles and negative energies. This puja bestows one with victory, brings harmony in family and helps one succeed in life.</p>\n\n<p><strong>No of Panditji(s) : 1&nbsp; | Duration : 1-2 hrs | Pujan Samagri Included</strong></p>\n', '<p>Key Insights:</p>\n\n<ul>\n	<li>To retain health, wealth and prosperity.</li>\n	<li>Ganesh is worshiped before doing any auspicious activity.</li>\n	<li>Gurukul&nbsp;certified and specialized&nbsp;priests.</li>\n	<li>All rituals follow Vedic Standards and Procedures.</li>\n	<li>High quality Samagri to ensure a pleasant puja experience.</li>\n	<li>Guaranteed Punctuality and Authenticity.</li>\n	<li>Professional Guidance &amp; Support.</li>\n</ul>\n', 3100, NULL, '[0,0]', 1, '[]', '[]', '[]', '[1,13,25,27]', 'Introductory Offer - Rs.200 off ', '2021-03-19 08:55:12'),
(3, 3, 'Bhoomi Pujan', 1, 'bhoomi-pujan', '[\"1612878117511-bhoomi-poojan - Copy.jpg\",\"1612878117511-bhoomi-poojan.jpg\"]', '[2]', '<p>Bhoomi Puja is&nbsp;performed&nbsp;for <strong>Goddess Bhoomi and Vastu Purush</strong>, lord and deity of directions, five elements of nature&nbsp;to remove negative influences or Vastu Doshas of the place.</p>\n\n<h5 data-fontsize=\"15\" data-lineheight=\"18\"><strong>No of Panditji(s) : 1&nbsp; | Duration : 1 hrs | Pujan Samagri Included</strong></h5>\n', '<h4>Key Insights:</h4>\n\n<ul>\n	<li>To remove the existing ill-effects carried by the land.</li>\n	<li>Positive energy is restored in the land.</li>\n	<li>Done before starting construction work on any piece of land.</li>\n	<li>Gurukul certified and experienced priests.</li>\n	<li>All rituals follow Vedic Standards and Procedures.</li>\n	<li>High quality samagri to ensure a pleasant puja experience.</li>\n	<li>Guaranteed Punctuality and Authenticity.</li>\n	<li>Professional Guidance &amp; Support.</li>\n</ul>\n', 3100, NULL, '[0,0]', 1, '[]', '[]', '[2]', '[2]', '', '2021-02-08 07:22:51'),
(4, 3, 'Aditya Hridya Stotra', 1, 'aditya-hridya-stotra', '[\"1613272794378-aditya-hirdya-stotra - Copy.jpg\",\"1613272794380-aditya-hirdya-stotra.jpg\"]', '[6,4]', '', '', 5100, NULL, '[0,0]', 0, '[]', '[]', '[]', '[]', '', '2021-03-19 10:21:25'),
(5, 3, 'Akshaya Tritiya Parshuram Puja', 1, 'akshaya-tritiya-parshuram-puja', '[\"1613272866328-akshya-tritiya-parshuram-puja - Copy.jpg\",\"1613272866328-akshya-tritiya-parshuram-puja.jpg\"]', '[6,1]', '', '', 5100, NULL, '[0,0]', 0, '[]', '[]', '[]', '[]', '', '2021-03-19 10:21:40'),
(6, 3, 'Annaprashan Sanskaar Puja', 1, 'annaprashan-sanskaar-puja', '[\"1613272930832-annaprashan-sanskar-pooja - Copy.jpg\",\"1613272930835-annaprashan-sanskar-pooja.jpg\"]', '[5,2]', '', '', 5100, NULL, '[0,0]', 0, '[]', '[]', '[]', '[]', '', '2021-03-19 10:22:00'),
(7, 3, 'Antim Sanskaar Shanti Paath', 1, 'antim-sanskaar-shanti-paath', '[\"1613272998892-antyesgti-_antim-sanskar-_... - Copy.jpg\",\"1613272998892-antyesgti-_antim-sanskar-_....jpg\"]', '[5,4]', '', '', 5100, NULL, '[0,0]', 0, '[]', '[]', '[]', '[]', '', '2021-03-19 10:22:09'),
(8, 3, 'Baglamukhi Jaap and Havan', 1, 'baglamukhi-jaap-and-havan', '[\"1613273095667-baglamukhi - Copy.jpg\",\"1613273095667-baglamukhi.jpg\"]', '[6,4]', '', '', 51000, NULL, '[0,0]', 0, '[]', '[]', '[]', '[]', '', '2021-03-19 10:22:25'),
(9, 3, 'Bhakut Dosh Nivaran Puja', 1, 'bhakut-dosh-nivaran-puja', '[\"1613273174231-bhakut-dosh-navaran-puja - Copy.jpg\",\"1613273174231-bhakut-dosh-navaran-puja.jpg\"]', '[2]', '', '', 5100, NULL, '[0,0]', 1, '[]', '[]', '[]', '[]', '', '2021-03-19 10:22:35'),
(10, 3, 'Budh Grah Shanti ', 1, 'budh-grah-shanti', '[\"1613273257993-buddh-shanti-jaap - Copy.jpg\",\"1613273257993-buddh-shanti-jaap.jpg\"]', '[4]', '', '', 11000, NULL, '[0,0]', 1, '[]', '[]', '[]', '[]', '', '2021-03-19 10:22:45'),
(11, 3, 'Chandra Grah Shanti', 1, 'chandra-grah-shanti', '[\"1613273367028-chandra-shanti-jaap - Copy.jpg\",\"1613273367029-chandra-shanti-jaap.jpg\"]', '[4,7]', '', '', 11000, NULL, '[0,0]', 1, '[]', '[]', '[2]', '[10]', '', '2021-03-19 10:22:55'),
(12, 3, 'Dhanteras Puja', 1, 'dhanteras-puja', '[\"1613273469221-dhan-teras-pooja - Copy.jpg\",\"1613273469221-dhan-teras-pooja.jpg\"]', '[1,6]', '', '', 5100, NULL, '[0,0]', 0, '[]', '[]', '[2]', '[]', '', '2021-03-19 10:23:04'),
(13, 3, 'Durga Puja and Paath', 1, 'durga-puja-and-paath', '[\"1613273579056-durga-puja-with-paath - Copy.jpg\",\"1613273579056-durga-puja-with-paath.jpg\"]', '[1,6,4]', '', '', 51000, NULL, '[0,0]', 0, '[]', '[]', '[2,8]', '[8]', '', '2021-03-19 10:23:15'),
(14, 3, 'Guru Grah Shanti', 1, 'guru-grah-shanti', '[\"1613273724468-guru-shanti-jaap - Copy.jpg\",\"1613273724468-guru-shanti-jaap.jpg\"]', '[4]', '', '', 11000, NULL, '[0,0]', 1, '[]', '[]', '[]', '[10,11]', '', '2021-03-19 10:23:24'),
(15, 3, 'Hanuman Chalisa Paath', 1, 'hanuman-chalisa-paath', '[\"1613273875557-hanuman-chalisa - Copy.jpg\",\"1613273875557-hanuman-chalisa.jpg\"]', '[7,4,2]', '', '', 5100, NULL, '[0,0]', 0, '[]', '[]', '[2,4,13]', '[8]', '', '2021-03-19 10:23:32'),
(16, 3, 'Harivansh Puran Katha', 1, 'harivansh-puran-katha', '[\"1613274009571-harivansh-puran-katha - Copy.jpg\",\"1613274009571-harivansh-puran-katha.jpg\"]', '[4,1,6]', '', '', 11000, NULL, '[0,0]', 0, '[]', '[]', '[2,4]', '[4]', '', '2021-03-19 10:23:41'),
(17, 3, 'Karan Vedh Sanskaar Puja', 1, 'karan-vedh-sanskaar-puja', '[\"1613274139125-karan-vedh-sanskar-pooja - Copy.jpg\",\"1613274139125-karan-vedh-sanskar-pooja.jpg\"]', '[5,2]', '', '', 5100, NULL, '[0,0]', 1, '[]', '[]', '[6,1]', '[6,7,1]', '', '2021-03-19 10:23:55'),
(18, 3, 'Ketu Grah Shanti', 1, 'ketu-grah-shanti', '[\"1613274216743-ketu-shanti-jaap - Copy.jpg\",\"1613274216743-ketu-shanti-jaap.jpg\"]', '[4,8]', '', '', 11000, NULL, '[0,0]', 1, '[]', '[]', '[]', '[14,11,10]', '', '2021-03-19 10:24:05'),
(19, 3, 'Kumbh Vivah Sanskaar Puja', 1, 'kumbh-vivah-sanskaar-puja', '[\"1613274361003-kumbh-vivah - Copy.jpg\",\"1613274361003-kumbh-vivah.jpg\"]', '[5,2]', '', '', 5100, NULL, '[0,0]', 1, '[]', '[]', '[9,8]', '[9,6,17]', '', '2021-03-19 10:24:15'),
(20, 3, 'Mangal Grah Shanti', 1, 'mangal-grah-shanti', '[\"1613274458917-mangal-shanti-jaap - Copy.jpg\",\"1613274458917-mangal-shanti-jaap.jpg\"]', '[8,4]', '', '', 11000, NULL, '[0,0]', 1, '[]', '[]', '[15,2]', '[10,14,18]', '', '2021-03-19 10:24:24'),
(21, 3, 'Manglik Dosh Nivaran Puja', 1, 'manglik-dosh-nivaran-puja', '[\"1613274636864-manglik-dosh-nivaran-puja - Copy.jpg\",\"1613274636864-manglik-dosh-nivaran-puja.jpg\"]', '[8,2,4]', '', '', 5100, NULL, '[0,0]', 1, '[]', '[]', '[20]', '[9,19]', '', '2021-03-19 10:24:32'),
(22, 3, 'Mata Ka Jagran', 1, 'mata-ka-jagran', '[\"1613274779150-mata-ka-jagran - Copy.jpg\",\"1613274779150-mata-ka-jagran.jpg\"]', '[2,4]', '', '', 21000, NULL, '[0,0]', 1, '[]', '[]', '[13,8]', '[15]', '', '2021-03-19 10:24:42'),
(23, 3, 'Mool Shanti Puja', 1, 'mool-shanti-puja', '[\"1613274895507-mool-shanti-pooja - Copy.jpg\",\"1613274895510-mool-shanti-pooja.jpg\"]', '[2,8]', '', '', 5100, NULL, '[0,0]', 0, '[]', '[]', '[21]', '[20,2]', '', '2021-03-19 10:24:54'),
(24, 3, 'Nari Dosh Nivaran Puja', 1, 'nari-dosh-nivaran-puja', '[\"1613275922866-nari-dosh-nivaran-puja - Copy.jpg\",\"1613275922866-nari-dosh-nivaran-puja.jpg\"]', '[2,8]', '', '', 5100, NULL, '[0,0]', 0, '[]', '[]', '[9,19]', '[21,20,2]', '', '2021-03-19 10:25:06'),
(25, 3, 'Office Opening Puja', 1, 'office-opening-puja', '[\"1613276253958-new-office-shop - Copy.jpg\",\"1613276253958-new-office-shop.jpg\"]', '[2,6]', '<p>When someone is shifting to a new office, pooja is performed to reduce the ill-effects and doshas by increasing the flow of positive vibes in the office.&nbsp;</p>\n\n<p><strong>No of Panditji(s) : 1&nbsp; | Duration : 1-2 hrs | Pujan Samagri Included</strong></p>\n', '<p>Key Insights:</p>\n\n<ul>\n	<li>To retain&nbsp;wealth and prosperity.</li>\n	<li>Ganesh is worshiped before doing any auspicious activity.</li>\n	<li>Gurukul&nbsp;certified and specialized&nbsp;priests.</li>\n	<li>All rituals follow Vedic Standards and Procedures.</li>\n	<li>High quality Samagri to ensure a pleasant puja experience.</li>\n	<li>Guaranteed Punctuality and Authenticity.</li>\n	<li>Professional Guidance &amp; Support.</li>\n</ul>\n', 3100, NULL, '[0,0]', 1, '[]', '[]', '[2]', '[2,3,1]', 'Introductory Offer - Rs.200 off ', '2021-04-03 10:07:09'),
(26, 3, 'Rahu Grah Shanti', 1, 'rahu-grah-shanti', '[\"1613276449173-rahu-shanti-jaap - Copy.jpg\",\"1613276449174-rahu-shanti-jaap.jpg\"]', '[8,4,6]', '', '', 11000, NULL, '[0,0]', 1, '[]', '[]', '[18]', '[11,14,20]', '', '2021-03-17 11:05:25'),
(27, 3, 'Astro Consultation over Phone', 2, 'astrology-consultation-over-phone', '[\"1613277961946-astro on call - Copy.jpg\",\"1613277961946-astro on call.jpg\"]', '[9]', '', '', 500, NULL, '[0,0]', 1, '[]', '[]', '[]', '[14,26,11]', 'Introductory Offer - 10% off ', '2021-03-19 08:55:12'),
(28, 3, 'Vastu Consultation over Phone', 2, 'vastu-consultation-over-phone', '[\"1613278749737-vastu on call - Copy.jpg\",\"1613278749738-vastu on call.jpg\"]', '[10]', '', '', 500, NULL, '[0,0]', 1, '[]', '[]', '[]', '[]', 'Introductory Offer - 10% off ', '2021-03-19 10:25:33'),
(29, 3, 'Vastu Consultation at Location', 2, 'vastu-consultation-at-location', '[\"1613279542784-vastu consultation - Copy.jpg\",\"1613279542784-vastu consultation.jpg\"]', '[10]', '', '', 3100, NULL, '[0,0]', 1, '[]', '[]', '[]', '[]', '', '2021-03-17 11:05:25'),
(30, 3, 'Bodysoul Meditation Incense Sticks', 4, 'bodysoul-meditation-incense-sticks', '[\"1613281617834-Picture18 - Copy.jpg\",\"1613281617835-Picture18.jpg\"]', '[]', '', '', 140, NULL, '[0,0]', 1, '[]', '[]', '[]', '[]', '', '2021-03-17 11:05:25'),
(31, 3, 'Rudrabhishek saada paath', 1, 'rudrabhishek-sada-paath', '[\"1615443011254-rudrabhishek - Copy.jpg\",\"1615443011254-rudrabhishek.jpg\"]', '[4]', '', '', 2100, NULL, '[0,0]', 1, '[]', '[]', '[]', '[]', '', '2021-03-10 11:30:49'),
(32, 3, 'Navgraha shanti puja', 1, 'navgraha-shanti-puja', '[\"1617710379162-Navgraha-shanti-puja - Copy.jpg\",\"1617710379164-Navgraha-shanti-puja.jpg\"]', '[]', '', '', 3100, NULL, '[0,0]', 1, '[]', '[]', '[]', '[]', '', '2021-04-05 14:27:46'),
(33, 3, 'Sundarkand paath sangeetmaya', 1, 'sundarkand-paath-sangeetmaya', '[\"1617619523773-Sundarkand-paath-sangeetmaya - Copy.jpg\",\"1617619523773-Sundarkand-paath-sangeetmaya.jpg\"]', '[5,4,2,1,10,11]', '<p>Sundarkand paath sangeetmaya</p>\n', '<p>Sundarkand paath sangeetmaya</p>\n', 11000, NULL, '[0,0]', 1, '[]', '[]', '[2,1,5,7,8,6]', '[1,3,5,7,8,6,10,4]', 'Sundarkand paath sangeetmaya', '2021-04-03 10:10:56'),
(34, 3, 'Tulsi vivaah', 1, 'tulsi-vivaah', '[\"1617619873592-Tulsi-vivaah - Copy.jpg\",\"1617619873592-Tulsi-vivaah.jpg\"]', '[4,6,8,7,5,9,11]', '<p>Tulsi vivaah</p>\n', '<p>Tulsi vivaah</p>\n', 3100, NULL, '[0,0]', 1, '[]', '[]', '[2,4,6,8]', '[1,3,5,7,8]', 'Tulsi vivaah', '2021-04-03 10:10:56'),
(35, 3, 'Deepawali Laxmi puja', 1, 'deepawali-laxmi-puja', '[\"1617620801465-Deepawali-laxmi-puja - Copy.jpg\",\"1617620801465-Deepawali-laxmi-puja.jpg\"]', '[1,5,7,9,11,6]', '<p>Deepawali Laxmi puja</p>\n', '<p>Deepawali Laxmi puja</p>\n', 5500, NULL, '[0,0]', 1, '[]', '[]', '[3,5,4,8,6]', '[1,3,5,7,8]', 'Deepawali Laxmi puja', '2021-04-03 10:10:56'),
(36, 3, 'Satyanarayan vrat udhyapan sangeetmaya', 1, 'satyanarayan-vrat-udhyapan-sangeetmaya', '[\"1617620966971-Satyanarayan-vrat-udhyapan-sangeetmaya - Copy.jpg\",\"1617620966971-Satyanarayan-vrat-udhyapan-sangeetmaya.jpg\"]', '[1,4,6,8,10,9]', '<p>Satyanarayan vrat udhyapan sangeetmaya</p>\n', '<p>Satyanarayan vrat udhyapan sangeetmaya</p>\n', 11000, NULL, '[0,0]', 1, '[]', '[]', '[2,4,6,8,10]', '[1,4,6,8,9,10]', 'Satyanarayan vrat udhyapan sangeetmaya', '2021-04-03 10:10:56'),
(37, 3, 'Mahamritunjay jaap', 1, 'mahamritunjay-jaap', '[\"1617621099396-Mahamritunjay-jaap - Copy.jpg\",\"1617621099396-Mahamritunjay-jaap.jpg\"]', '[1,5,4,8,10,9]', '<p>Mahamritunjay jaap</p>\n', '<p>Mahamritunjay jaap</p>\n', 31000, NULL, '[0,0]', 1, '[]', '[]', '[1,3,5,4,8]', '[1,4,3,6,5]', 'Mahamritunjay jaap', '2021-04-03 10:10:56'),
(38, 3, 'Mangala Gauri puja', 1, 'mangala-gauri-puja', '[\"1617710407169-Mangala-gauri-puja - Copy.jpg\",\"1617710407170-Mangala-gauri-puja.jpg\"]', '[1,4,6,8,5,10]', '<p>Mangala gauri puja</p>\n', '<p>Mangala gauri puja</p>\n', 3100, NULL, '[0,0]', 1, '[]', '[]', '[8,1,4,6,5]', '[10,2,4,6,5,8]', 'Mangala gauri puja', '2021-04-05 14:27:46'),
(39, 3, 'Durga puja with paath', 1, 'durga-puja-with-paath', '[\"1617621692036-Durga-puja-and-paath - Copy.jpg\",\"1617621692037-Durga-puja-and-paath.jpg\"]', '[1,4,6,8,7,11,9]', '<p>Durga puja with paath</p>\n', '<p>Durga puja with paath</p>\n', 3100, NULL, '[0,0]', 1, '[]', '[]', '[1,4,7,5,8,9,11,3,2]', '[2,4,5,7,6,9]', 'Durga puja with paath', '2021-04-03 10:10:56'),
(40, 3, 'Griha pravesh', 1, 'griha-pravesh', '[\"1617621835491-Griha-pravesh - Copy.jpg\",\"1617621835491-Griha-pravesh.jpg\"]', '[2,6,7,9,8]', '<p>Griha pravesh</p>\n', '<p>Griha pravesh</p>\n', 3100, NULL, '[0,0]', 1, '[]', '[]', '[3,5,7,6,9,11]', '[2,4,6,8,9]', '', '2021-04-03 10:10:56'),
(41, 3, 'Vivaah sanskar', 1, 'vivaah-sanskar', '[\"1617621963447-Vivaah - Copy.jpg\",\"1617621963448-Vivaah.jpg\"]', '[2,6,5,9,8,11]', '<p>Vivaah sanskar</p>\n', '<p>Vivaah sanskar</p>\n', 5100, NULL, '[0,0]', 1, '[]', '[]', '[1,4,3,7,16,17]', '[5,4,3,2,1,8,10,12]', 'Vivaah sanskar', '2021-04-03 10:10:56'),
(42, 3, 'Kanak dhara stotra', 1, 'kanak-dhara-stotra', '[\"1617622114843-Kanak-dhara-stotra - Copy.jpg\",\"1617622114844-Kanak-dhara-stotra.jpg\"]', '[4,6,5,9,8,11]', '<p>Kanak dhara stotra</p>\n', '<p>Kanak dhara stotra</p>\n', 5100, NULL, '[0,0]', 1, '[]', '[]', '[3,5,4,8,6,9,11]', '[1,4,3,7,6,9,11]', 'Kanak dhara stotra', '2021-04-03 10:10:56'),
(43, 3, 'Shree suktam paath', 1, 'shree-suktam-paath', '[\"1617622281518-Shree-suktam-paath - Copy.jpg\",\"1617622281518-Shree-suktam-paath.jpg\"]', '[7,6,5,4,1,8,2]', '<p>Shree suktam paath</p>\n', '<p>Shree suktam paath</p>\n', 5100, NULL, '[0,0]', 1, '[]', '[]', '[1,5,4,7,2,8,6,10]', '[5,4,3,9,7,10,8,2]', 'Shree suktam paath', '2021-04-03 10:10:56'),
(44, 3, 'Vastu puja', 1, 'vastu-puja', '[\"1617622379704-Vastu-puja - Copy.jpg\",\"1617622379704-Vastu-puja.jpg\"]', '[2,1,6,5,9,8]', '<p>Vastu puja</p>\n', '<p>Vastu puja</p>\n', 3100, NULL, '[0,0]', 1, '[]', '[]', '[1,4,2,7,9,6,12]', '[1,3,2,6,5,8,7,11,9]', 'Vastu puja', '2021-04-03 10:10:56'),
(45, 3, 'Pitra dosh puja', 1, 'pitra-dosh-puja', '[\"1617622483828-Pitra-dosh-puja - Copy.jpg\",\"1617622483828-Pitra-dosh-puja.jpg\"]', '[4,2,7,6,9,8,11,5]', '<p>Pitra dosh puja</p>\n', '<p>Pitra dosh puja</p>\n', 3100, NULL, '[0,0]', 1, '[]', '[]', '[4,6,5,3,1,8,11,13,10]', '[3,5,4,9,6,2,1]', 'Pitra dosh puja', '2021-04-03 10:10:56'),
(46, 3, 'Akhand ramayan paath', 1, 'akhand-ramayan-paath', '[\"1617622611763-Akhand-ramayan-paath - Copy.jpg\",\"1617622611764-Akhand-ramayan-paath.jpg\"]', '[1,4,2,7,6,9]', '<p>Akhand Ramayan paath</p>\n', '<p>Akhand ramayan paath</p>\n', 5100, NULL, '[0,0]', 1, '[]', '[]', '[2,4,3,7,6,9,8]', '[3,5,4,2,8,6,1,11,12,9]', 'Akhand ramayan paath', '2021-04-03 10:10:56'),
(47, 3, 'Kaal sarp dosh nivaran puja', 1, 'kaal-sarp-dosh-nivaran-puja', '[\"1617622713548-Kaal-sarp-dosh-nivaran-puja - Copy.jpg\",\"1617622713548-Kaal-sarp-dosh-nivaran-puja.jpg\"]', '[4,6,5,9,8,2,1,11]', '<p>Kaal sarp dosh nivaran puja</p>\n', '<p>Kaal sarp dosh nivaran puja</p>\n', 3100, NULL, '[0,0]', 1, '[]', '[]', '[1,4,3,7,6,9,11]', '[3,5,4,8,6,10,12,9]', 'Kaal sarp dosh nivaran puja', '2021-04-03 10:10:56'),
(48, 3, 'Gajendra moksh paath', 1, 'gajendra-moksh-paath', '[\"1617622834228-Gajendra-moksh-paath - Copy.jpg\",\"1617622834228-Gajendra-moksh-paath.jpg\"]', '[4,7,6,9,5,10,11]', '<p>Gajendra moksh paath</p>\n', '<p>Gajendra moksh paath</p>\n', 5100, NULL, '[0,0]', 1, '[]', '[]', '[1,3,5,4,8,6,9,11]', '[4,6,5,8,2,9,7]', 'Gajendra moksh paath', '2021-04-03 10:10:56'),
(49, 3, 'Shiv rudrabhishek vishesh', 1, 'shiv-rudrabhishek-vishesh', '[\"1617711269818-Shiv-rudrabhishek-vishesh - Copy.jpg\",\"1617711269818-Shiv-rudrabhishek-vishesh.jpg\"]', '[2,5,4,8,7,11,10]', '<p>Shiv Rudrabhishek vishesh</p>\n', '<p>Shiv Rudrabhishek vishesh</p>\n', 15000, NULL, '[0,0]', 1, '[]', '[]', '[2,5,4,3,8,6,9,11]', '[2,5,3,7,8,4,11,9]', '', '2021-04-05 14:27:46'),
(50, 3, 'Namkaran sanskar', 1, 'namkaran-sanskar', '[\"1617711361421-Namkaran-sanskar - Copy.jpg\",\"1617711361421-Namkaran-sanskar.jpg\"]', '[2,6,5,4,9,8,11]', '<p>Namkaran sanskar</p>\n', '<p>Namkaran sanskar</p>\n', 2100, NULL, '[0,0]', 1, '[]', '[]', '[1,3,5,7,4,9]', '[1,4,3,6,5,9,7,10]', 'Namkaran sanskar', '2021-04-05 14:27:46'),
(51, 3, 'Mata ki chouki', 1, 'mata-ki-chouki', '[\"1617714284124-Mata-ki-chouki - Copy.jpg\",\"1617714284125-Mata-ki-chouki.jpg\"]', '[4,2,8,7,10,9]', '<p>Mata ki chouki</p>\n', '<p>Mata ki chouki</p>\n', 11000, NULL, '[0,0]', 1, '[]', '[]', '[2,4,3,7,6,8,10]', '[2,4,6,5,8,7,11,9]', 'Mata ki chouki', '2021-04-05 14:27:46'),
(52, 3, 'Mangalwar vrat udhyapan sangeetmaya sunderkand', 1, 'mangalwar-vrat-udhyapan-sangeetmaya-sunderkand', '[\"1617715674654-Mangalwar-vrat-udhyapan-sangeetmaya-sunderkand - Copy.jpg\",\"1617715674654-Mangalwar-vrat-udhyapan-sangeetmaya-sunderkand.jpg\"]', '[2,5,6,9,8]', '<table style=\"border-collapse:collapse; width:356px\" width=\"356\">\n	<colgroup>\n		<col style=\"width:267pt\" width=\"356\" />\n	</colgroup>\n	<tbody>\n		<tr>\n			<td style=\"border-bottom:none; height:20px; width:356px; padding-top:1px; padding-right:1px; padding-left:1px; vertical-align:bottom; white-space:nowrap; border-top:none; border-right:none; border-left:none\"><span style=\"font-size:15px\"><span style=\"color:black\"><span style=\"font-weight:400\"><span style=\"font-style:normal\"><span style=\"text-decoration:none\"><span style=\"font-family:Calibri,sans-serif\">Mangalwar vrat udhyapan sangeetmaya sunderkand</span></span></span></span></span></span></td>\n		</tr>\n		<tr>\n			<td style=\"border-bottom:none; height:20px; width:356px; padding-top:1px; padding-right:1px; padding-left:1px; vertical-align:bottom; white-space:nowrap; border-top:none; border-right:none; border-left:none\">&nbsp;</td>\n		</tr>\n	</tbody>\n</table>\n', '<table style=\"border-collapse:collapse; width:356px\" width=\"356\">\n	<tbody>\n		<tr>\n			<td style=\"border-bottom:none; height:20px; width:356px; padding-top:1px; padding-right:1px; padding-left:1px; vertical-align:bottom; white-space:nowrap; border-top:none; border-right:none; border-left:none\"><span style=\"font-size:15px\"><span style=\"color:black\"><span style=\"font-weight:400\"><span style=\"font-style:normal\"><span style=\"text-decoration:none\"><span style=\"font-family:Calibri,sans-serif\">Mangalwar vrat udhyapan sangeetmaya sunderkand</span></span></span></span></span></span></td>\n		</tr>\n	</tbody>\n</table>\n', 11000, NULL, '[0,0]', 1, '[]', '[]', '[4,6,5,3,1,9,11]', '[4,6,3,8,5,9,7,1]', 'Mangalwar vrat udhyapan sangeetmaya sunderkand', '2021-04-05 14:27:46'),
(53, 3, 'Satyanarayan katha', 1, 'satyanarayan-katha', '[\"1617715764737-Satyanarayan-katha - Copy.jpg\",\"1617715764737-Satyanarayan-katha.jpg\"]', '[4,6,5,2,1,10,9]', '<p>Satyanarayan katha</p>\n', '<p>Satyanarayan katha</p>\n', 2100, NULL, '[0,0]', 1, '[]', '[]', '[1,4,3,6,5]', '[2,4,3,1]', 'Satyanarayan katha', '2021-04-05 14:27:46'),
(54, 3, 'Yagyopavitra sanskar', 1, 'yagyopavitra-sanskar', '[\"1617715909880-Yagyopavitra-sanskar - Copy.jpg\",\"1617715909880-Yagyopavitra-sanskar.jpg\"]', '[2,6,4,8,7,11,10]', '<p>Yagyopavitra sanskar</p>\n', '<p>Yagyopavitra sanskar</p>\n', 2100, NULL, '[0,0]', 1, '[]', '[]', '[1,3,2,6,4,7,5,9]', '[3,1,5,4,7,2,8]', 'Yagyopavitra sanskar', '2021-04-05 14:27:46'),
(55, 3, 'Sampudrya vivah karya', 1, 'sampudrya-vivah-karya', '[\"1617716200977-Sampudrya-vivah-karya - Copy.jpg\",\"1617716200977-Sampudrya-vivah-karya.jpg\"]', '[5,4,7,9,11,8,6,2,1]', '<p>Sampudrya vivah karya</p>\n', '<p>Sampudrya vivah karya</p>\n', 21000, NULL, '[0,0]', 1, '[]', '[]', '[5,6,4,8,2,7,10,3,12]', '[4,5,6,9,2,8,1]', '', '2021-04-05 14:27:46'),
(56, 3, 'Namak chamak rudrabhishek', 1, 'namak-chamak-rudrabhishek', '[\"1617716400836-Namak-chamak-rudrabhishek - Copy.jpg\",\"1617716400836-Namak-chamak-rudrabhishek.jpg\"]', '[2,5,7,4,6,10]', '<p>Namak chamak rudrabhishek</p>\n', '<p>Namak chamak rudrabhishek</p>\n', 15000, NULL, '[0,0]', 1, '[]', '[]', '[3,7,5,8,4,9,6,1]', '[2,5,4,8,3,9,7,11]', 'Namak chamak rudrabhishek', '2021-04-05 14:27:46'),
(57, 3, 'Navgraha shanti puja with jaap', 1, 'navgraha-shanti-puja-with-jaap', '[\"1617716614287-Navgraha-shanti-puja-with-jaap - Copy.jpg\",\"1617716614287-Navgraha-shanti-puja-with-jaap.jpg\"]', '[7,4,8,2]', '<p>Navgraha shanti puja with jaap</p>\n', '<p>Navgraha shanti puja with jaap</p>\n', 5100, NULL, '[0,0]', 1, '[]', '[]', '[4,8,2]', '[2,4,5]', 'Navgraha shanti puja with jaap', '2021-04-05 14:27:46'),
(58, 3, 'Satyanarayan katha sangeetmaya', 1, 'satyanarayan-katha-sangeetmaya', '[\"1617717081740-Satyanarayan-katha-sangeetmaya - Copy.jpg\",\"1617717081740-Satyanarayan-katha-sangeetmaya.jpg\"]', '[6,4,2]', '<p>Satyanarayan katha sangeetmaya</p>\n', '<p>Satyanarayan katha sangeetmaya</p>\n', 11000, NULL, '[0,0]', 1, '[]', '[]', '[3,8,2,10,5]', '[5,8,3,2]', 'Satyanarayan katha sangeetmaya', '2021-04-05 14:27:46');

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
(2, 'Amit', 'amit.khare588@gmail.com', 'Admin', '$2a$10$K2Sb/PAzwGoZlZ92tFRID.2ntwbzVROLtE/HnN9MA4qvD2IJNpcjq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJuYW1lIjoiQW1pdCIsImVtYWlsIjoiYW1pdC5raGFyZTU4OEBnbWFpbC5jb20iLCJyb2xlIjoiQWRtaW4ifSwiaWF0IjoxNjE3ODA0NDI0fQ.CndB02NJuTD6To9_q2GsHLP0vMDex3U6t8CEVtm2hJM', NULL, NULL, '2021-02-12 14:25:12', '2021-04-05 14:27:46'),
(3, 'pujarambh support', 'pujarambh.com@gmail.com', 'Admin', '$2a$10$QR.lXesE8gQO1Wc.SB5jq.4g8lr1oVQ1ubqrZii4Noz.u3w7d0Pfa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJuYW1lIjoicHVqYXJhbWJoIHN1cHBvcnQiLCJlbWFpbCI6InB1amFyYW1iaC5jb21AZ21haWwuY29tIiwicm9sZSI6IkFkbWluIn0sImlhdCI6MTYxNzgwMjU5Nn0.9mpc8HinYDxiHVg9-ilsZ4kPpfTEVyCwwlpP_SdGjbw', 'https://lh3.googleusercontent.com/-W2pDhMcjiiM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuck-kNHVFdym0OuGr0kE-bvBHgN_QA/s96-c/photo.jpg', 'Google', '2021-02-13 11:31:16', '2021-04-05 14:27:46'),
(4, 'Amit Jain', 'amitjain.rn@gmail.com', 'User', '$2a$10$pRv7XGCEdKg.zABPpCQ7mOUvMrEIJYg/L9mHmfcJekDuOBShTvSt2', NULL, 'https://lh3.googleusercontent.com/a-/AOh14GgVVBsYqMWiNSbBBhdDXku8tgOUTBFUOVex_jeyMcM=s96-c', 'Google', '2021-02-13 11:32:15', '2021-03-17 11:05:25'),
(5, 'Amit', 'test@test.com', 'User', '$2a$10$cTnEoF3yp3.BEXk5YkoDLer4yizhNqssitbMLRUynXu4GrLjbBouC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1LCJuYW1lIjoiQW1pdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInJvbGUiOiJVc2VyIn0sImlhdCI6MTYxNTU1NTI0Nn0.PlO8BcMs42jZcaYzhZlTBVKf_fOjINL-phN62Y1oIvY', NULL, 'Email', '2021-02-13 11:33:24', '2021-03-12 13:19:57'),
(6, 'Parveen Kumar', 'seoleader.p@gmail.com', 'Admin', '$2a$10$sPRCAE4iaBv/mLXdBN9rN..7tLKfbvjdFXlu128tKgtcYJEMpP0cS', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJuYW1lIjoiUGFydmVlbiBLdW1hciIsImVtYWlsIjoic2VvbGVhZGVyLnBAZ21haWwuY29tIiwicm9sZSI6IkFkbWluIn0sImlhdCI6MTYxNzcwMzMwNn0.oNhImo3H6JZx1cqywExCdfX1-5_ih1bZtSOpv7os5mY', NULL, 'Email', '2021-02-16 10:20:24', '2021-04-05 14:27:46'),
(7, 'mohit singh', 'mohiit77u@gmail.com', 'Admin', '$2a$10$K2Sb/PAzwGoZlZ92tFRID.2ntwbzVROLtE/HnN9MA4qvD2IJNpcjq', NULL, NULL, 'Email', '2021-03-10 11:30:49', '2021-03-15 08:24:21'),
(8, 'Amit Khare', 'amit.khare588@gmail.com2', 'User', '$2a$10$KZU.HGS/dc.pHmKN6HnpRe1f6A4Ga.xFTupKNXpqTpyZs983TMXQe', NULL, 'https://lh3.googleusercontent.com/a-/AOh14Gidy3APTpo6njmklmaw0CKA5wdrRVn2iRWVTnlOZQ=s96-c', 'Google', '2021-03-12 13:30:11', '2021-03-12 13:30:11'),
(9, 'Amit Kumar Khare', 'amit.khare588@gmail.com3', 'User', '$2a$10$2Xr0zGgUXwp6Pvh8FXsr5O4HlIVKER4RZtXW.BweBhlfU4YayydSy', NULL, 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3831581723531407&height=50&width=50&ext=1618377823&hash=AeT1rJV4KJ2XpIctjBk', 'FB', '2021-03-12 13:30:11', '2021-03-12 13:30:11'),
(10, 'Anchal sondhiya', 'aanchalsondhiya84@gmail.com', 'Admin', '$2a$10$4YcClWeelZ88VnaDLMFjC.COAaXyirh5Vd1S.wJdVY0omYI.X5Z6e', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMCwibmFtZSI6IkFuY2hhbCBzb25kaGl5YSIsImVtYWlsIjoiYWFuY2hhbHNvbmRoaXlhODRAZ21haWwuY29tIiwicm9sZSI6IkFkbWluIn0sImlhdCI6MTYxNzcxMDMyOH0.Y4EraALdv7dEKwfaqvBmUdbJeCM4jQjUr1vdIYFK0Og', NULL, 'Email', '2021-03-15 08:24:21', '2021-04-05 14:27:46'),
(11, 'Navneet Khare', 'arsnnavneet@gmail.com', 'Admin', '$2a$10$5yo9d3aek5l.eLv016miG.e3e6t4G7yxH8CrKDmiW45lkMtNzJ/Xm', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwibmFtZSI6Ik5hdm5lZXQgS2hhcmUiLCJlbWFpbCI6ImFyc25uYXZuZWV0QGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiJ9LCJpYXQiOjE2MTY1MTUyODJ9.upuZZvPR41IWYS1trnieuzkhwKijyLB4RyOzPjH9DyA', NULL, 'Email', '2021-03-15 08:24:21', '2021-03-19 09:53:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `astrology`
--
ALTER TABLE `astrology`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `astrology`
--
ALTER TABLE `astrology`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `basic`
--
ALTER TABLE `basic`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

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
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
