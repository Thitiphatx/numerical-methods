-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 06, 2023 at 04:49 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `numer_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `inputs`
--

CREATE TABLE `inputs` (
  `input_id` int(11) NOT NULL,
  `input_method` varchar(50) NOT NULL,
  `input_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`input_json`)),
  `input_type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `inputs`
--

INSERT INTO `inputs` (`input_id`, `input_method`, `input_json`, `input_type`) VALUES
(112, 'Cramer', '{\"size\":3,\"A\":[[2,3,2],[1,2,1],[2,3,5]],\"B\":[2,3,4]}', 'Matrix'),
(113, 'Cramer', '{\"size\":\"4\",\"A\":[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],\"B\":[0,0,0,0]}', 'Matrix'),
(114, 'Cramer', '{\"size\":3,\"A\":[[2,3,2],[1,2,\"32132\"],[2,3,5]],\"B\":[2,3,4]}', 'Matrix'),
(119, 'GaussJordan', '{\"size\":3,\"A\":[[2,3,2],[1,2,1],[2,3,5]],\"B\":[2,3,4]}', 'Matrix'),
(120, 'GaussJordan', '{\"size\":\"4\",\"A\":[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],\"B\":[0,0,0,0]}', 'Matrix'),
(121, 'Conjugate', '{\"size\":3,\"A\":[[\"1\",\"1\",\"5\"],[\"1\",\"23\",\"2\"],[\"3\",0,\"66\"]],\"B\":[\"1\",\"2\",\"3\"]}', 'Matrix'),
(124, 'Conjugate', '{\"size\":3,\"A\":[[\"11\",0,\"3\"],[\"20\",\"2\",\"5\"],[\"23\",\"10\",\"30\"]],\"B\":[0,0,0]}', 'Matrix'),
(125, 'GaussElim', '{\"size\":3,\"A\":[[\"1\",0,\"1\"],[\"3\",\"2\",\"5\"],[0,\"1\",\"3\"]],\"B\":[\"2\",\"3\",\"2\"]}', 'Matrix'),
(126, 'GaussElim', '{\"size\":3,\"A\":[[0,0,0],[0,0,0],[0,0,0]],\"B\":[0,0,0]}', 'Matrix'),
(127, 'LUDecomp', '{\"size\":3,\"A\":[[0,0,0],[0,0,0],[0,0,0]],\"B\":[0,0,0]}', 'Matrix'),
(128, 'MatrixInvert', '{\"size\":3,\"A\":[[0,0,0],[0,0,0],[0,0,0]],\"B\":[0,0,0]}', 'Matrix'),
(132, 'Graphical', '{\"equation\":\"5-x\",\"start\":\"0\"}', 'XY'),
(133, 'Falseposition', '{\"equation\":\"5-x\",\"start\":\"0\",\"end\":\"10\"}', 'XY'),
(134, 'Newtonraph', '{\"equation\":\"5-x\",\"start\":0}', 'XY'),
(136, 'Onepoint', '{\"equation\":\"5-x\",\"start\":0}', 'XY'),
(140, 'Bisection', '{\"equation\":\"5-x\",\"start\":0,\"end\":\"10\"}', 'XY'),
(151, 'Spline', '{\"size\":\"5\",\"points\":[{\"x\":\"2\",\"fx\":\"9.5\"},{\"x\":\"4\",\"fx\":\"8\"},{\"x\":\"6\",\"fx\":\"10.5\"},{\"x\":\"8\",\"fx\":\"39.5\"},{\"x\":\"10\",\"fx\":\"72.5\"}],\"xTarget\":4.5}', 'Points'),
(152, 'LAGRANGE', '{\"size\":3,\"points\":[{\"x\":\"1\",\"y\":\"2\"},{\"x\":\"3\",\"y\":\"4\"},{\"x\":\"5\",\"y\":\"6\"}],\"xTarget\":\"7\"}', 'Points'),
(154, 'LAGRANGE', '{\"size\":\"3\",\"points\":[{\"x\":\"1\",\"y\":\"2\"},{\"x\":\"3\",\"y\":\"4\"},{\"x\":\"5\",\"y\":\"6\"}],\"xTarget\":\"7\"}', 'Points'),
(156, 'LinearLeastSquare', '{\"size\":\"9\",\"points\":[{\"x\":\"10\",\"y\":\"5\"},{\"x\":\"15\",\"y\":\"9\"},{\"x\":\"20\",\"y\":\"15\"},{\"x\":\"30\",\"y\":\"18\"},{\"x\":\"40\",\"y\":\"22\"},{\"x\":\"50\",\"y\":\"30\"},{\"x\":\"60\",\"y\":\"35\"},{\"x\":\"70\",\"y\":\"38\"},{\"x\":\"80\",\"y\":\"43\"}],\"xTarget\":\"65\",\"orderM\":\"5\"}', 'Points'),
(157, 'LinearLeastSquare', '{\"size\":\"9\",\"points\":[{\"x\":\"10\",\"y\":\"5\"},{\"x\":\"15\",\"y\":\"9\"},{\"x\":\"20\",\"y\":\"15\"},{\"x\":\"30\",\"y\":\"18\"},{\"x\":\"40\",\"y\":\"22\"},{\"x\":\"50\",\"y\":\"30\"},{\"x\":\"60\",\"y\":\"35\"},{\"x\":\"70\",\"y\":\"38\"},{\"x\":\"80\",\"y\":\"43\"}],\"xTarget\":\"65\",\"orderM\":\"1\"}', 'Points'),
(160, 'MultiLeastSquare', '{\"x\":[[0,1,2]],\"y\":[0,1,2],\"xTarget\":0}', 'Table'),
(161, 'MultiLeastSquare', '{\"x\":[[0,1,2],[0,0,0],[0,0,0],[0,0,0]],\"y\":[0,1,2],\"xTarget\":0}', 'Table'),
(163, 'Simpson', '{\"equation\":\"4(x^5)-3(x^4)+(x^3)-6x+2\",\"start\":\"2\",\"end\":\"8\",\"n\":2}', 'XY'),
(164, 'Trapezoidal', '{\"equation\":\"4(x^5)-3(x^4)+(x^3)-6x+2\",\"start\":\"2\",\"end\":\"8\",\"n\":2}', 'XY'),
(166, 'Differential', '{\"equation\":\"5-x\",\"level\":4,\"type\":\"Backward\",\"oh\":1,\"h\":\"022\",\"xTarget\":\"3\"}', 'XY');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `inputs`
--
ALTER TABLE `inputs`
  ADD PRIMARY KEY (`input_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `inputs`
--
ALTER TABLE `inputs`
  MODIFY `input_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=167;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
