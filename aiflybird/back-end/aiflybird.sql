/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 10.4.21-MariaDB : Database - china_lin
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`china_lin` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `china_lin`;

/*Table structure for table `tb_gpu` */

DROP TABLE IF EXISTS `tb_gpu`;

CREATE TABLE `tb_gpu` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `gpu_address` varchar(255) NOT NULL,
  `status` varchar(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `gpu_location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `camera_setting` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `media_type` varchar(10) DEFAULT NULL,
  `event_type` varchar(10) DEFAULT NULL,
  `frame_frequency` varchar(10) DEFAULT NULL,
  `frame_width` varchar(10) DEFAULT NULL,
  `frame_height` varchar(10) DEFAULT NULL,
  `frame_gap` varchar(10) DEFAULT NULL,
  `max_record_frame` varchar(10) DEFAULT NULL,
  `updated_status` int(11) DEFAULT 0,
  `code` varchar(255) DEFAULT NULL,
  `os` varchar(100) DEFAULT NULL,
  `ip_address` varchar(100) DEFAULT NULL,
  `port` varchar(100) DEFAULT NULL,
  `login_account` varchar(100) DEFAULT NULL,
  `login_password` varchar(100) DEFAULT NULL,
  `remote_access_account` varchar(100) DEFAULT NULL,
  `remote_access_password` varchar(100) DEFAULT NULL,
  `db_password` varchar(100) DEFAULT NULL,
  `db_account` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

/*Data for the table `tb_gpu` */

insert  into `tb_gpu`(`id`,`gpu_address`,`status`,`created_at`,`updated_at`,`user_id`,`gpu_location`,`description`,`camera_setting`,`image_url`,`video_url`,`media_type`,`event_type`,`frame_frequency`,`frame_width`,`frame_height`,`frame_gap`,`max_record_frame`,`updated_status`,`code`,`os`,`ip_address`,`port`,`login_account`,`login_password`,`remote_access_account`,`remote_access_password`,`db_password`,`db_account`) values 
(1,'GPU01','1','2020-05-25 16:14:57','2021-07-06 17:50:25','1','dalian','111','2,3,7','/home/zkgy/Downloads/camera_data','/home/zkgy/Downloads/camera_data','1','1','15','1920','1080',NULL,'30',2,'V9ONWHE5G14YA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(2,'GPU02','1','2020-12-03 09:28:57','2021-03-22 03:47:15','1','test','Id 653454562','6,5,4,1','/home/zkgy/camera_data/','/home/zkgy/camera_data','1','1','15','1920','1080',NULL,'30',2,'GPU02',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(34,'gpu_server','0','2021-09-28 06:56:30','2021-09-28 07:08:24','1','china','this is gpu',NULL,'/user/gpu','/user/image','1','1','10','122','144',NULL,'122',0,'GPU3','windows','192.168.10.4','3000','gpu_user','','gpu','11111111','11111111','qqq'),
(35,'GPU3','0','2021-09-28 07:07:55',NULL,'1','here','this is',NULL,'/USER/NAME','user/imge','1','1','122','111','111',NULL,'11',0,'Server','windows','10.10.10.1','3030','gpu','11111111','qqq','11111111','11111111','qqqq');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
