-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 29, 2024 at 06:25 AM
-- Server version: 10.4.27-MariaDB-log
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gpmbs`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'MyReactApp', 'daf3644bcda8b4f455cfd9603465fa9734a7695991a7cc8c284cb8cb27095013', '[\"*\"]', '2024-07-27 06:50:18', NULL, '2024-07-27 04:22:16', '2024-07-27 06:50:18'),
(2, 'App\\Models\\User', 1, 'MyReactApp', '06159c493e2824378fb5cb738d6b79edde3e77e34ffcce5a58e89c72267408dc', '[\"*\"]', '2024-07-27 07:31:04', NULL, '2024-07-27 07:30:40', '2024-07-27 07:31:04'),
(3, 'App\\Models\\User', 1, 'MyReactApp', '21690d727e0f825f6da146de7949add1ada4ba7746f58d4a365fefd287c76a6f', '[\"*\"]', '2024-07-27 07:48:49', NULL, '2024-07-27 07:31:33', '2024-07-27 07:48:49'),
(4, 'App\\Models\\User', 1, 'MyReactApp', '0c48ddcd9f080fc1af754046896d14d56fb3fc141f29c933bf3d3d2161982ead', '[\"*\"]', '2024-07-27 07:54:35', NULL, '2024-07-27 07:54:30', '2024-07-27 07:54:35'),
(5, 'App\\Models\\User', 1, 'MyReactApp', 'a8dcd01a45a7d24ae32d46c06e5ffd917e159aa0dd5206a9a695b83def0e0e7c', '[\"*\"]', '2024-07-27 08:42:10', NULL, '2024-07-27 08:42:08', '2024-07-27 08:42:10'),
(6, 'App\\Models\\User', 1, 'MyReactApp', '0dd729835ac68b2be6248baad7f5c0ba33aa35207091158fb28f4503dfedff50', '[\"*\"]', '2024-07-27 09:06:46', NULL, '2024-07-27 09:06:45', '2024-07-27 09:06:46'),
(7, 'App\\Models\\User', 1, 'MyReactApp', '41c07bf13fa2766caa3a5c346ab87c471e595c9a7f169775a17677a78d6afef0', '[\"*\"]', '2024-07-27 09:20:01', NULL, '2024-07-27 09:07:33', '2024-07-27 09:20:01'),
(8, 'App\\Models\\User', 1, 'MyReactApp', '4476d80fd6a7d1d25490e4f592a94b36defafb1fe2019c32a1c9de3ec1f3dc3e', '[\"*\"]', '2024-07-27 09:21:07', NULL, '2024-07-27 09:21:05', '2024-07-27 09:21:07'),
(9, 'App\\Models\\User', 1, 'MyReactApp', 'c9ba5a01e6041be3ac8a9e526232d5e5e443f707b98804e0a8dd9429a2cc1569', '[\"*\"]', '2024-07-28 05:48:23', NULL, '2024-07-28 05:48:22', '2024-07-28 05:48:23'),
(10, 'App\\Models\\User', 1, 'MyReactApp', '847308cfe161842621b34647310a70cf8ccaa87dccad935cab3827c3510d98f0', '[\"*\"]', '2024-07-28 05:53:02', NULL, '2024-07-28 05:53:00', '2024-07-28 05:53:02'),
(11, 'App\\Models\\User', 1, 'MyReactApp', 'a415f76d78463dec639fb93e5dce330f7adb169d319c732c4abf4070b8457ab8', '[\"*\"]', '2024-07-29 00:30:34', NULL, '2024-07-29 00:30:33', '2024-07-29 00:30:34');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `profession` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `username`, `password`, `dob`, `profession`, `address`, `created_at`, `updated_at`) VALUES
(1, 'ASMIN KUMAR NANDA', 'Asmin660@', '$2y$12$bU2VRgMeHrklvAu77WZuiuoair4SU1.KotuHUyuBCtBAZGiRTvm3e', '2024-07-20', 'clerk', 'Gadakana', '2024-07-28 05:48:14', '2024-07-28 05:48:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
