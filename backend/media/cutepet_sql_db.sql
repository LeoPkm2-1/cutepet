-- MySQL dump 10.19  Distrib 10.3.38-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: cutepet_sql
-- ------------------------------------------------------
-- Server version	10.3.38-MariaDB-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Anh`
--

DROP TABLE IF EXISTS `Anh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Anh` (
  `ma_anh` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `ngay_cap_nhat` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`ma_anh`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Anh`
--

LOCK TABLES `Anh` WRITE;
/*!40000 ALTER TABLE `Anh` DISABLE KEYS */;
INSERT INTO `Anh` VALUES (34,'www.xinchao.com.vn','2023-09-01 09:27:21'),(35,'www.xinchao.com.vn','2023-09-01 09:28:29'),(36,'www.ahihi.com.vn','2023-09-01 09:51:27'),(37,'www.leo.com.vn','2023-09-01 09:51:53'),(38,'www.aws.com.vn','2023-09-01 09:52:24'),(39,'www.facebook.com.vn','2023-09-01 09:52:48'),(47,'ahihi.com.vn','2023-09-02 04:42:47'),(48,'xinchao.com.vn','2023-09-02 04:43:03'),(49,'10diem.com.vn','2023-09-02 04:43:12');
/*!40000 ALTER TABLE `Anh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AnhDaiDien_NguoiDung`
--

DROP TABLE IF EXISTS `AnhDaiDien_NguoiDung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AnhDaiDien_NguoiDung` (
  `ma_anh` int(11) NOT NULL,
  `ma_nguoi_dung` int(11) NOT NULL,
  `is_active` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`ma_anh`,`ma_nguoi_dung`),
  KEY `fk_AnhNguoiDung_NguoiDung` (`ma_nguoi_dung`),
  CONSTRAINT `fk_AnhNguoiDung_Anh` FOREIGN KEY (`ma_anh`) REFERENCES `Anh` (`ma_anh`),
  CONSTRAINT `fk_AnhNguoiDung_NguoiDung` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `NguoiDung` (`ma_nguoi_dung`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AnhDaiDien_NguoiDung`
--

LOCK TABLES `AnhDaiDien_NguoiDung` WRITE;
/*!40000 ALTER TABLE `AnhDaiDien_NguoiDung` DISABLE KEYS */;
INSERT INTO `AnhDaiDien_NguoiDung` VALUES (34,1,0),(35,1,0),(36,1,0),(37,1,1),(38,2,0),(39,2,1);
/*!40000 ALTER TABLE `AnhDaiDien_NguoiDung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AnhDaiDien_ThuCung`
--

DROP TABLE IF EXISTS `AnhDaiDien_ThuCung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AnhDaiDien_ThuCung` (
  `ma_anh` int(11) NOT NULL,
  `ma_thu_cung` int(11) NOT NULL,
  `is_active` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`ma_anh`,`ma_thu_cung`),
  KEY `fk_AnhThuCung_ThuCung` (`ma_thu_cung`),
  CONSTRAINT `fk_AnhThuCung_Anh` FOREIGN KEY (`ma_anh`) REFERENCES `Anh` (`ma_anh`),
  CONSTRAINT `fk_AnhThuCung_ThuCung` FOREIGN KEY (`ma_thu_cung`) REFERENCES `ThuCung` (`ma_thu_cung`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AnhDaiDien_ThuCung`
--

LOCK TABLES `AnhDaiDien_ThuCung` WRITE;
/*!40000 ALTER TABLE `AnhDaiDien_ThuCung` DISABLE KEYS */;
INSERT INTO `AnhDaiDien_ThuCung` VALUES (47,1,0),(48,1,0),(49,1,1);
/*!40000 ALTER TABLE `AnhDaiDien_ThuCung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Giong`
--

DROP TABLE IF EXISTS `Giong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Giong` (
  `ma_giong` int(11) NOT NULL AUTO_INCREMENT,
  `ten_giong` varchar(100) NOT NULL DEFAULT '',
  `ma_loai` int(11) NOT NULL,
  PRIMARY KEY (`ma_giong`),
  KEY `fk_Giong2Loai` (`ma_loai`),
  CONSTRAINT `fk_Giong2Loai` FOREIGN KEY (`ma_loai`) REFERENCES `Loai` (`ma_loai`)
) ENGINE=InnoDB AUTO_INCREMENT=417 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Giong`
--

LOCK TABLES `Giong` WRITE;
/*!40000 ALTER TABLE `Giong` DISABLE KEYS */;
INSERT INTO `Giong` VALUES (100,'giống chó khác',1),(101,'Labrador Retriever',1),(102,'German Shepherd',1),(103,'Golden Retriever',1),(104,'French Bulldog',1),(105,'Bulldog',1),(106,'Poodle',1),(107,'Beagle',1),(108,'Rottweiler',1),(109,'Yorkshire Terrier',1),(110,'Dachshund',1),(111,'Shih Tzu',1),(112,'Pomeranian',1),(113,'Chihuahua',1),(114,'Japanese Spitz',1),(115,'Maltese',1),(116,'Siberian Husky',1),(117,'Shiba Inu',1),(118,'Chow Chow',1),(119,'Akita',1),(120,'Miniature Schnauzer',1),(200,'giống mèo khác',2),(201,'Persian',2),(202,'Maine Coon',2),(203,'Siamese',2),(204,'Ragdoll',2),(205,'British Shorthair',2),(206,'Sphynx',2),(207,'Bengal',2),(208,'Scottish Fold',2),(209,'Abyssinian',2),(210,'Birman',2),(211,'Exotic Shorthair',2),(212,'Siberian',2),(213,'Turkish Van',2),(214,'Balinese',2),(300,'giống cá khác',3),(301,'Betta Fish',3),(302,'Goldfish ',3),(303,'Neon Tetra',3),(304,'Guppy',3),(305,'Angelfish',3),(306,'Discus Fish',3),(307,'Molly Fish',3),(308,'Swordtail Fish',3),(309,'Platies',3),(310,'Koi Carp',3),(311,'Betta Fish ',3),(312,'Goldfish',3),(313,'Guppy ',3),(314,'Siamese Algae Eater',3),(315,'Cherry Barb',3),(316,'Pearl Gourami',3),(317,'Asian Arowana',3),(318,'Moonlight Gourami',3),(319,'Paradise Fish',3),(400,'giống chim khác',4),(401,'Budgerigar',4),(402,'Cockatiel',4),(403,'African Grey Parrot',4),(404,'Lovebird',4),(405,'Canary',4),(406,'Eclectus Parrot',4),(407,'Sun Conure',4),(408,'Quaker Parrot ',4),(409,'Cockatoo ',4),(410,'Macaw ',4),(411,'Indian Ringneck Parakeet',4),(412,'Plum-headed Parakeet',4),(413,'Java Sparrow',4),(414,'Zebra Finch',4),(415,'Peach-faced Lovebird',4),(416,'Fischer\'s Lovebird',4);
/*!40000 ALTER TABLE `Giong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Hagtag`
--

DROP TABLE IF EXISTS `Hagtag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Hagtag` (
  `ma_hagtag` varchar(100) NOT NULL,
  `so_luong_bai_viet` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ma_hagtag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Hagtag`
--

LOCK TABLES `Hagtag` WRITE;
/*!40000 ALTER TABLE `Hagtag` DISABLE KEYS */;
/*!40000 ALTER TABLE `Hagtag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LaBanBe`
--

DROP TABLE IF EXISTS `LaBanBe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LaBanBe` (
  `ma_nguoi_dung_1` int(11) NOT NULL,
  `ma_nguoi_dung_2` int(11) NOT NULL,
  `ngay_bat_dau` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`ma_nguoi_dung_1`,`ma_nguoi_dung_2`),
  KEY `fk_BanBe2` (`ma_nguoi_dung_2`),
  CONSTRAINT `fk_BanBe1` FOREIGN KEY (`ma_nguoi_dung_1`) REFERENCES `NguoiDung` (`ma_nguoi_dung`),
  CONSTRAINT `fk_BanBe2` FOREIGN KEY (`ma_nguoi_dung_2`) REFERENCES `NguoiDung` (`ma_nguoi_dung`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LaBanBe`
--

LOCK TABLES `LaBanBe` WRITE;
/*!40000 ALTER TABLE `LaBanBe` DISABLE KEYS */;
INSERT INTO `LaBanBe` VALUES (1,2,'2023-09-01 06:27:26'),(1,3,'2023-09-02 07:27:26'),(1,4,'2023-09-03 08:27:26'),(1,5,'2023-09-04 09:27:26'),(1,6,'2023-09-05 10:27:26'),(2,1,'2023-09-06 11:27:26'),(2,3,'2023-09-11 06:03:26'),(2,4,'2023-09-12 06:04:26'),(2,5,'2023-09-13 06:05:26'),(2,6,'2023-09-14 06:06:26'),(2,7,'2023-09-15 06:07:26'),(2,8,'2023-09-16 06:08:02'),(2,9,'2023-09-17 06:08:06'),(2,10,'2023-09-18 06:08:16'),(3,1,'2023-09-07 12:27:26'),(3,2,'2023-09-19 06:08:36'),(4,1,'2023-09-08 06:01:26'),(4,2,'2023-09-20 06:08:46'),(5,1,'2023-09-09 06:02:26'),(5,2,'2023-09-21 06:08:56'),(6,1,'2023-09-10 06:07:26'),(6,2,'2023-09-22 06:08:15'),(7,2,'2023-09-23 06:08:21'),(8,2,'2023-09-24 06:08:23'),(9,2,'2023-09-25 06:08:24'),(10,2,'2023-09-26 06:08:20');
/*!40000 ALTER TABLE `LaBanBe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Lich`
--

DROP TABLE IF EXISTS `Lich`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Lich` (
  `ma_lich` int(11) NOT NULL AUTO_INCREMENT,
  `ten_lich` varchar(100) NOT NULL DEFAULT '',
  `mo_ta` varchar(100) NOT NULL DEFAULT '',
  `gio_nhac` time NOT NULL,
  `ngay_dien_ra` date DEFAULT NULL,
  `ngay_ket_thuc` date DEFAULT NULL,
  `tan_suat` varchar(32) DEFAULT NULL,
  `ma_the_loai_lich` int(11) NOT NULL,
  `ma_thu_cung` int(11) NOT NULL,
  PRIMARY KEY (`ma_lich`),
  KEY `fk_lich_theloailich` (`ma_the_loai_lich`),
  KEY `fk_lich_thucung` (`ma_thu_cung`),
  CONSTRAINT `fk_lich_theloailich` FOREIGN KEY (`ma_the_loai_lich`) REFERENCES `TheLoaiLich` (`ma_the_loai_lich`),
  CONSTRAINT `fk_lich_thucung` FOREIGN KEY (`ma_thu_cung`) REFERENCES `ThuCung` (`ma_thu_cung`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Lich`
--

LOCK TABLES `Lich` WRITE;
/*!40000 ALTER TABLE `Lich` DISABLE KEYS */;
/*!40000 ALTER TABLE `Lich` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Loai`
--

DROP TABLE IF EXISTS `Loai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Loai` (
  `ma_loai` int(11) NOT NULL AUTO_INCREMENT,
  `ten_loai` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`ma_loai`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Loai`
--

LOCK TABLES `Loai` WRITE;
/*!40000 ALTER TABLE `Loai` DISABLE KEYS */;
INSERT INTO `Loai` VALUES (1,'chó'),(2,'mèo'),(3,'cá'),(4,'chim');
/*!40000 ALTER TABLE `Loai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LoiMoiKetBan`
--

DROP TABLE IF EXISTS `LoiMoiKetBan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LoiMoiKetBan` (
  `ma_nguoi_gui` int(11) NOT NULL,
  `ma_nguoi_nhan` int(11) NOT NULL,
  `ngay_gui` timestamp NOT NULL DEFAULT current_timestamp(),
  `trang_thai` varchar(20) NOT NULL DEFAULT 'PENDING',
  PRIMARY KEY (`ma_nguoi_gui`,`ma_nguoi_nhan`,`ngay_gui`),
  KEY `fk_moiketbanngnhan` (`ma_nguoi_nhan`),
  CONSTRAINT `fk_moiketbannggui` FOREIGN KEY (`ma_nguoi_gui`) REFERENCES `NguoiDung` (`ma_nguoi_dung`),
  CONSTRAINT `fk_moiketbanngnhan` FOREIGN KEY (`ma_nguoi_nhan`) REFERENCES `NguoiDung` (`ma_nguoi_dung`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LoiMoiKetBan`
--

LOCK TABLES `LoiMoiKetBan` WRITE;
/*!40000 ALTER TABLE `LoiMoiKetBan` DISABLE KEYS */;
INSERT INTO `LoiMoiKetBan` VALUES (4,1,'2023-10-05 08:31:56','REJECT'),(6,1,'2023-10-05 08:31:56','PENDING'),(7,1,'2023-10-05 08:31:56','PENDING');
/*!40000 ALTER TABLE `LoiMoiKetBan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NguoiDung`
--

DROP TABLE IF EXISTS `NguoiDung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `NguoiDung` (
  `ma_nguoi_dung` int(11) NOT NULL AUTO_INCREMENT,
  `ten` varchar(100) NOT NULL DEFAULT '',
  `ngay_sinh` date DEFAULT NULL,
  `tai_khoan` varchar(100) NOT NULL DEFAULT '',
  `mat_khau` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(100) DEFAULT NULL,
  `so_dien_thoai` varchar(100) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT 0,
  `gioi_tinh` tinyint(1) DEFAULT NULL,
  `token` text DEFAULT '',
  PRIMARY KEY (`ma_nguoi_dung`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NguoiDung`
--

LOCK TABLES `NguoiDung` WRITE;
/*!40000 ALTER TABLE `NguoiDung` DISABLE KEYS */;
INSERT INTO `NguoiDung` VALUES (1,'Nam','1991-09-29','nam','$2b$10$SJCUVhgTtYGYEfPYQWHKmeCMSUhM/vXKGSSEnEFf/0Cp.KI0Z9CR6','nam@gmail.com','0912345678',0,1,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJtYV9uZ3VvaV9kdW5nIjoxLCJ0ZW4iOiJOYW0iLCJuZ2F5X3NpbmgiOiIxOTkxLTA5LTI4VDE3OjAwOjAwLjAwMFoiLCJ0YWlfa2hvYW4iOiJuYW0iLCJlbWFpbCI6Im5hbUBnbWFpbC5jb20iLCJzb19kaWVuX3Rob2FpIjoiMDkxMjM0NTY3OCIsImdpb2lfdGluaCI6MSwiaWF0IjoxNjk3MTgxMzE2LCJleHAiOjE2OTcyMTEzMTZ9.9z8yS-rrLGT7uzTntZn2jvj4v2Y_bhxLpYvPEHq1oMBhHtPUQqJO-2gJI06n2-9Dybvtuv7eW7mMUS8ENC3oKw'),(2,'Dung','1991-09-30','dung','$2b$10$SJCUVhgTtYGYEfPYQWHKmeCMSUhM/vXKGSSEnEFf/0Cp.KI0Z9CR6','dung@gmail.com','0912345679',0,1,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJtYV9uZ3VvaV9kdW5nIjoyLCJ0ZW4iOiJEdW5nIiwibmdheV9zaW5oIjoiMTk5MS0wOS0yOVQxNzowMDowMC4wMDBaIiwidGFpX2tob2FuIjoiZHVuZyIsImVtYWlsIjoiZHVuZ0BnbWFpbC5jb20iLCJzb19kaWVuX3Rob2FpIjoiMDkxMjM0NTY3OSIsImdpb2lfdGluaCI6MSwiaWF0IjoxNjk3NjM3NTUxLCJleHAiOjE2OTc5Mzc1NTF9.9n3DHiJIEiTRBzcezNFD3FNS-Xd5cHG0b-mbAJ1zHXtqbA3d3XmP8AuT-0e3M53AjfRKpWXwZgYd0y2cw8XbIA'),(3,'Teo','1991-10-01','teo','$2b$10$SJCUVhgTtYGYEfPYQWHKmeCMSUhM/vXKGSSEnEFf/0Cp.KI0Z9CR6','teo@gmail.com','0912345680',0,1,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJtYV9uZ3VvaV9kdW5nIjozLCJ0ZW4iOiJUZW8iLCJuZ2F5X3NpbmgiOiIxOTkxLTA5LTMwVDE3OjAwOjAwLjAwMFoiLCJ0YWlfa2hvYW4iOiJ0ZW8iLCJlbWFpbCI6InRlb0BnbWFpbC5jb20iLCJzb19kaWVuX3Rob2FpIjoiMDkxMjM0NTY4MCIsImdpb2lfdGluaCI6MSwiaWF0IjoxNjk3NjM3NjU2LCJleHAiOjE2OTc5Mzc2NTZ9.P3nvyiARhPlYo-Tq7-cZQFhkxBhysUvJozQGmMFOrQEXic4A7Wbxx3Gp3GyRI90RDRvIQvG0QIiYBhNsw25N1g'),(4,'Ty','1991-10-02','ty','$2b$10$SJCUVhgTtYGYEfPYQWHKmeCMSUhM/vXKGSSEnEFf/0Cp.KI0Z9CR6','ty@gmail.com','0912345681',0,1,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJtYV9uZ3VvaV9kdW5nIjo0LCJ0ZW4iOiJUeSIsIm5nYXlfc2luaCI6IjE5OTEtMTAtMDFUMTc6MDA6MDAuMDAwWiIsInRhaV9raG9hbiI6InR5IiwiZW1haWwiOiJ0eUBnbWFpbC5jb20iLCJzb19kaWVuX3Rob2FpIjoiMDkxMjM0NTY4MSIsImdpb2lfdGluaCI6MSwiaWF0IjoxNjk3NjM3NzAzLCJleHAiOjE2OTc5Mzc3MDN9.mH4H9RpyAZf5RLXy2cglAYWyhjnLAVME7BNP9r82CC0CY8cPfS1zKpZAyOFCCWb09p2dxqI-cLsyaTrZqzlVnQ'),(5,'Leo','1991-10-03','leo','$2b$10$SJCUVhgTtYGYEfPYQWHKmeCMSUhM/vXKGSSEnEFf/0Cp.KI0Z9CR6','leo@gmail.com','0912345682',0,1,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJtYV9uZ3VvaV9kdW5nIjo1LCJ0ZW4iOiJMZW8iLCJuZ2F5X3NpbmgiOiIxOTkxLTEwLTAyVDE3OjAwOjAwLjAwMFoiLCJ0YWlfa2hvYW4iOiJsZW8iLCJlbWFpbCI6Imxlb0BnbWFpbC5jb20iLCJzb19kaWVuX3Rob2FpIjoiMDkxMjM0NTY4MiIsImdpb2lfdGluaCI6MSwiaWF0IjoxNjk3MjY1OTg0LCJleHAiOjE2OTcyOTU5ODR9.u7oObn6M9nb-pvg1vJcgI7nyeoabqSNr4rZbPPhvBYB_xFK4ruKxgn5ZeLGVuMelS81KuT0NFpv1PmfsCtdo_Q'),(6,'John','1991-10-04','john','$2b$10$SJCUVhgTtYGYEfPYQWHKmeCMSUhM/vXKGSSEnEFf/0Cp.KI0Z9CR6','john@gmail.com','0912345683',0,1,''),(7,'Peter','1991-10-05','peter','$2b$10$SJCUVhgTtYGYEfPYQWHKmeCMSUhM/vXKGSSEnEFf/0Cp.KI0Z9CR6','peter@gmail.com','0912345684',0,1,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJtYV9uZ3VvaV9kdW5nIjo3LCJ0ZW4iOiJQZXRlciIsIm5nYXlfc2luaCI6IjE5OTEtMTAtMDRUMTc6MDA6MDAuMDAwWiIsInRhaV9raG9hbiI6InBldGVyIiwiZW1haWwiOiJwZXRlckBnbWFpbC5jb20iLCJzb19kaWVuX3Rob2FpIjoiMDkxMjM0NTY4NCIsImdpb2lfdGluaCI6MSwiaWF0IjoxNjk0NjczNDk5LCJleHAiOjE2OTQ2NzY0OTl9.1gZ3pkFFzB8pDvTahjcbblhAddJvITFBcLrT5LsVXrYrLWCYL_1EKcFIA2ombngWdaHENltpleA_o_lTx8eitw'),(8,'Susan','1991-10-06','susan','$2b$10$SJCUVhgTtYGYEfPYQWHKmeCMSUhM/vXKGSSEnEFf/0Cp.KI0Z9CR6','susan@gmail.com','0912345685',0,0,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJtYV9uZ3VvaV9kdW5nIjo4LCJ0ZW4iOiJTdXNhbiIsIm5nYXlfc2luaCI6IjE5OTEtMTAtMDVUMTc6MDA6MDAuMDAwWiIsInRhaV9raG9hbiI6InN1c2FuIiwiZW1haWwiOiJzdXNhbkBnbWFpbC5jb20iLCJzb19kaWVuX3Rob2FpIjoiMDkxMjM0NTY4NSIsImdpb2lfdGluaCI6MCwiaWF0IjoxNjk3NjM3NzU4LCJleHAiOjE2OTc5Mzc3NTh9.ZVFlzeAGRkwqijMJmoG0_YVKeurpNre0xLRbuPKPOc2K-dWDPGe81QCSQcuzuMMzB0AdxEQqYTfv21MmIY6aYA'),(9,'Hoang','1991-10-07','hoang','$2b$10$SJCUVhgTtYGYEfPYQWHKmeCMSUhM/vXKGSSEnEFf/0Cp.KI0Z9CR6','hoang@gmail.com','0912345686',0,1,''),(10,'Thanh','1991-10-08','thanh','$2b$10$SJCUVhgTtYGYEfPYQWHKmeCMSUhM/vXKGSSEnEFf/0Cp.KI0Z9CR6','thanh@gmail.com','0912345687',0,0,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJtYV9uZ3VvaV9kdW5nIjoxMCwidGVuIjoiVGhhbmgiLCJuZ2F5X3NpbmgiOiIxOTkxLTEwLTA3VDE3OjAwOjAwLjAwMFoiLCJ0YWlfa2hvYW4iOiJ0aGFuaCIsImVtYWlsIjoidGhhbmhAZ21haWwuY29tIiwic29fZGllbl90aG9haSI6IjA5MTIzNDU2ODciLCJnaW9pX3RpbmgiOjAsImlhdCI6MTY5NzYzNzc5MiwiZXhwIjoxNjk3OTM3NzkyfQ.Pc8Ven5Pmk3B7EASdr8FV6-IYEUS8b31318-LDBwbGSTZsR3_osSpqotdCioQ87a3c1b_wqd0PFlqPk3Yp-nBw'),(11,'Phuc','1991-10-09','phuc','$2b$10$SJCUVhgTtYGYEfPYQWHKmeCMSUhM/vXKGSSEnEFf/0Cp.KI0Z9CR6','phuc@gmail.com','0912345688',0,1,''),(12,'Viet','1991-10-10','viet','$2b$10$SJCUVhgTtYGYEfPYQWHKmeCMSUhM/vXKGSSEnEFf/0Cp.KI0Z9CR6','viet@gmail.com','0912345689',0,1,'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJtYV9uZ3VvaV9kdW5nIjoxMiwidGVuIjoiVmlldCIsIm5nYXlfc2luaCI6IjE5OTEtMTAtMDlUMTc6MDA6MDAuMDAwWiIsInRhaV9raG9hbiI6InZpZXQiLCJlbWFpbCI6InZpZXRAZ21haWwuY29tIiwic29fZGllbl90aG9haSI6IjA5MTIzNDU2ODkiLCJnaW9pX3RpbmgiOjEsImlhdCI6MTY5NTg5MTcwOCwiZXhwIjoxNjk1ODk0NzA4fQ.1p60JgWOEeQcQSt8DtpSvaseF_CcJXiKJDY4gmtFAsNZgitBigBk8OXKQBQWoL2xKqccC4GqjlG7jauF_DjaQQ'),(13,'Tuan','1991-10-11','tuan','$2b$10$SJCUVhgTtYGYEfPYQWHKmeCMSUhM/vXKGSSEnEFf/0Cp.KI0Z9CR6','tuan@gmail.com','0912345690',0,1,''),(14,'Hung','1991-10-12','hung','$2b$10$SJCUVhgTtYGYEfPYQWHKmeCMSUhM/vXKGSSEnEFf/0Cp.KI0Z9CR6','hung@gmail.com','0912345691',0,1,''),(25,'phatmai',NULL,'phatmai','$2b$10$zUTNe/DWqETeF2042wSbduZKn.td8sg2CfxuLXO/LLhl/cj57l3Yq','thinhphatmai@gmail.com',NULL,0,NULL,'');
/*!40000 ALTER TABLE `NguoiDung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TheLoaiLich`
--

DROP TABLE IF EXISTS `TheLoaiLich`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TheLoaiLich` (
  `ma_the_loai_lich` int(11) NOT NULL AUTO_INCREMENT,
  `ten_the_loai_lich` varchar(100) NOT NULL,
  PRIMARY KEY (`ma_the_loai_lich`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TheLoaiLich`
--

LOCK TABLES `TheLoaiLich` WRITE;
/*!40000 ALTER TABLE `TheLoaiLich` DISABLE KEYS */;
/*!40000 ALTER TABLE `TheLoaiLich` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ThongTinSucKhoe`
--

DROP TABLE IF EXISTS `ThongTinSucKhoe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ThongTinSucKhoe` (
  `ma_suc_khoe` int(11) NOT NULL AUTO_INCREMENT,
  `ma_thu_cung` int(11) NOT NULL,
  `thoi_gian` timestamp NOT NULL DEFAULT current_timestamp(),
  `can_nang` float DEFAULT NULL,
  `chieu_cao` float DEFAULT NULL,
  PRIMARY KEY (`ma_suc_khoe`),
  KEY `fk_suckhoe_thucung` (`ma_thu_cung`),
  CONSTRAINT `fk_suckhoe_thucung` FOREIGN KEY (`ma_thu_cung`) REFERENCES `ThuCung` (`ma_thu_cung`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ThongTinSucKhoe`
--

LOCK TABLES `ThongTinSucKhoe` WRITE;
/*!40000 ALTER TABLE `ThongTinSucKhoe` DISABLE KEYS */;
INSERT INTO `ThongTinSucKhoe` VALUES (4,8,'2023-09-04 04:25:06',10,NULL),(5,8,'2023-09-04 04:25:06',18,60),(6,8,'2023-09-04 04:25:06',NULL,90),(7,3,'2023-09-04 04:26:54',20,NULL),(8,3,'2023-09-04 04:26:54',15,90),(9,3,'2023-09-04 04:26:54',NULL,100),(13,1,'2023-09-04 04:28:40',20,NULL),(14,1,'2023-09-04 04:29:06',NULL,100),(16,32,'2023-09-04 06:53:16',NULL,100),(17,33,'2023-09-04 06:53:40',12,NULL);
/*!40000 ALTER TABLE `ThongTinSucKhoe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ThuCung`
--

DROP TABLE IF EXISTS `ThuCung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ThuCung` (
  `ma_thu_cung` int(11) NOT NULL AUTO_INCREMENT,
  `ten_thu_cung` varchar(100) NOT NULL DEFAULT '',
  `ngay_sinh` date DEFAULT NULL,
  `gioi_tinh` tinyint(1) DEFAULT NULL,
  `ghi_chu` text DEFAULT NULL,
  `ma_giong` int(11) DEFAULT NULL,
  `ma_nguoi_chu` int(11) NOT NULL,
  PRIMARY KEY (`ma_thu_cung`),
  KEY `fk_thucung_giong` (`ma_giong`),
  KEY `fk_thucung_ngdung` (`ma_nguoi_chu`),
  CONSTRAINT `fk_thucung_giong` FOREIGN KEY (`ma_giong`) REFERENCES `Giong` (`ma_giong`),
  CONSTRAINT `fk_thucung_ngdung` FOREIGN KEY (`ma_nguoi_chu`) REFERENCES `NguoiDung` (`ma_nguoi_dung`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ThuCung`
--

LOCK TABLES `ThuCung` WRITE;
/*!40000 ALTER TABLE `ThuCung` DISABLE KEYS */;
INSERT INTO `ThuCung` VALUES (1,'tom','2019-10-10',1,'chú mèo béo lười',205,1),(2,'Charlie','2019-10-11',1,'mèo ú',205,2),(3,'Max','2019-10-12',1,'mèo mập',205,1),(4,'Luna','2019-10-13',0,'mèo lười',205,2),(5,'Bella','2019-10-14',0,'chú mèo béo lười',205,1),(6,'Lucy','2019-10-15',1,'mèo ú',205,2),(8,'Josh','2019-10-01',1,'con chó hay ngủ lười',103,1),(18,'Josh2434','2019-10-01',1,'con chó hay ngủ lười',103,1),(28,'testpet','2019-10-01',1,'con chó hay ngủ lười',104,1),(32,'testpet1','2019-10-01',1,'con chó hay ngủ lười',104,1),(33,'testpet_2','2019-10-01',1,'con chó hay ngủ lười',104,1);
/*!40000 ALTER TABLE `ThuCung` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-19 14:10:04
