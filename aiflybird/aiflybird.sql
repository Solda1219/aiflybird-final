/*
SQLyog Community v13.1.7 (64 bit)
MySQL - 10.4.17-MariaDB : Database - aiflybird
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`aiflybird` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `aiflybird`;

/*Table structure for table `plans` */

DROP TABLE IF EXISTS `plans`;

CREATE TABLE `plans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `plans` */

insert  into `plans`(`id`,`type`) values 
(1,'free');

/*Table structure for table `table_meeting` */

DROP TABLE IF EXISTS `table_meeting`;

CREATE TABLE `table_meeting` (
  `meetingId` varchar(50) NOT NULL,
  `coordinatorId` int(11) NOT NULL,
  `recordingId` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `meetingType` int(11) DEFAULT NULL,
  `max_guest` int(11) DEFAULT 10,
  `duration` int(11) DEFAULT 0,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `auto_extension` int(11) DEFAULT 1,
  `auto_recording` int(11) DEFAULT 1,
  `preparation_mode` int(11) DEFAULT 1,
  `recovery_mode` int(11) DEFAULT 2,
  `password` varchar(255) DEFAULT NULL,
  `jointBrowsingURL` mediumtext DEFAULT NULL,
  `all_questioner` int(11) DEFAULT 1,
  `agenda` text DEFAULT NULL,
  `meetingURL` text DEFAULT NULL,
  `shareURL` tinytext DEFAULT NULL,
  `jnjURL` text DEFAULT NULL,
  `resume` int(11) DEFAULT 0,
  `ended` int(11) DEFAULT 0,
  `ended_at` timestamp NULL DEFAULT NULL,
  `end_reason` text DEFAULT NULL,
  `started_at` timestamp NULL DEFAULT NULL,
  `is_read` int(5) DEFAULT 0,
  `is_cloud` int(5) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`meetingId`),
  KEY `MeetingCoordinatorId` (`coordinatorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `table_meeting` */

insert  into `table_meeting`(`meetingId`,`coordinatorId`,`recordingId`,`title`,`meetingType`,`max_guest`,`duration`,`start_time`,`end_time`,`auto_extension`,`auto_recording`,`preparation_mode`,`recovery_mode`,`password`,`jointBrowsingURL`,`all_questioner`,`agenda`,`meetingURL`,`shareURL`,`jnjURL`,`resume`,`ended`,`ended_at`,`end_reason`,`started_at`,`is_read`,`is_cloud`,`created_at`) values 
('1624860480087999',133,NULL,'111',0,10,5,'2021-06-28 09:08:00','2021-06-28 09:13:00',1,1,1,2,NULL,'',1,'','https://www.flybirdim.com/webjoinnet/?jnj=IyBpZiB5b3Ugc2VlIHRoaXMgZmlsZSwgcGxlYXNlIGRvd25sb2FkIGFuZCByZWluc3RhbGwgSm9pbk5ldCBzb2Z0d2FyZSBmcm9tIGh0dHA6Ly93d3cuaG9tZW1lZXRpbmcuY29tCltnZW5lcmFsXQpjb2RldHlwZT0xMwppcD13d3cuYWlmbHliaXJkLmNvbQpkb21haW49SG9tZU1lZXRpbmcKcG9ydG09MjMzMwpndWlfcmVjX3Zlcj0KZ3VpX21pbl92ZXI9CnVzZXJpbmZvPWtleV93ZWJfbG9jYWxob3N0fGZXbzJPcTh4dXFrY3VkTjdFRXNCR21TcjhzZnFPaUwrWS9IdFcyNUpNVWs9fDZyV0NueUhidFdPZllCZVFkTFZYUTBaalYzaFdKcDYrSGtObmxrQ2hiMDQxSTF3cmd2MWp1ODlPYS9oZlJvM0JhcGhndlNSQnNlVXk3UFBIeFVXYkd1K09TMENDM2c2Q1FWQ0IrMUI2cndyc0JYdmJoZ0JsckJ3VVBwY25acU9TamRwSHlIY3pxN3FrQjBiV1hDUTJoUWpCdzVzM1VpeENIcUZpUlRxUkhLMDM3alh0OXZLaW9OdHJiUmtSQjl4TGNPckduR1RHeDVubm50WHhsNDFhMjRPRjUzdTc4cmkya2RtVHNmN3BsNFZyZ0FNTlhIM0U1bkQyODNLNERMQU1ZRVIxbFFZM1dFS21lZTVOOWhJQ2xDUkZiMmlQMHhMRUtnbi9XSlJCZ0ZxNm51akVpSjZlYkE4MFA1cGJlOUpRTStXTGtxWWo2ZkVEUFE9PXw1WDMvYTdZSm0waExEMEExOTkrVEgxYitGVTA9Cg==','https://www.flybirdim.com/webjoinnet/?jnj=IyBpZiB5b3Ugc2VlIHRoaXMgZmlsZSwgcGxlYXNlIGRvd25sb2FkIGFuZCByZWluc3RhbGwgSm9pbk5ldCBzb2Z0d2FyZSBmcm9tIGh0dHA6Ly93d3cuaG9tZW1lZXRpbmcuY29tCltnZW5lcmFsXQpjb2RldHlwZT0xMwppcD13d3cuYWlmbHliaXJkLmNvbQpkb21haW49SG9tZU1lZ',NULL,0,0,'2021-07-09 16:03:29','Meeting terminated because timer is over.','2021-07-06 17:42:27',2,1,'2021-06-28 09:08:00'),
('1624861067160',133,NULL,'222',1,10,5,'2021-06-28 09:17:47','2021-06-28 09:22:47',1,1,1,2,NULL,'',1,'','https://www.flybirdim.com/webjoinnet/?jnj=IyBpZiB5b3Ugc2VlIHRoaXMgZmlsZSwgcGxlYXNlIGRvd25sb2FkIGFuZCByZWluc3RhbGwgSm9pbk5ldCBzb2Z0d2FyZSBmcm9tIGh0dHA6Ly93d3cuaG9tZW1lZXRpbmcuY29tCltnZW5lcmFsXQpjb2RldHlwZT0xMwppcD13d3cuYWlmbHliaXJkLmNvbQpkb21haW49SG9tZU1lZXRpbmcKcG9ydG09MjMzMwpndWlfcmVjX3Zlcj0KZ3VpX21pbl92ZXI9CnVzZXJpbmZvPWtleV93ZWJfbG9jYWxob3N0fFFNRE5kM0ZrQkQ2WlJkT1A3NEpQNktDUFU3Umc2d0ZJb1R3dElzNGZDRUk9fDZzdVd3UWxBK21vT1Z4d1RzbnU5TldXSGYyKy96NjltRk9OaWNudm15VmVySTdCRkk2ek14ZDBkclJpc3FrZytGT0FvekJmNUlzTUN0NkJRdzIzUVZNK1Q4clVEeTZvUHNZSlQxYTBjYURud09iQVhRSHlrVlpNSVlKbTRNUWtSdkxvdUR4YWQyNUV6aTVzY1Jjd3VzV2duVlFrWTI2dkhLdUhPVStGd0ozWkNiV1h0bkRvMTZnV0k2L0RqK1hVV2JEcHFwS1NKOWhBVVhKUEZGR1NWK2ZUYVVNN1BpbURxcnZHd1hZbHBhYTJvUjJzZW1US3NIcEJHSEF3bE9zcEczYitQUlQzV3ZyZ1lMSVVNNno1QTZtcFdRL3MxbkdPQjRvcXcrTlRIbFBUQ2I5cWxzSTg5QXhhNmhXVHI4MWFXZmV6dDU2M28wNnJuNGc9PXxWRWEzd1hyMHVDejQ1YVVzZFZRUS9ESTFRQlU9Cg==','https://www.flybirdim.com/webjoinnet/?jnj=IyBpZiB5b3Ugc2VlIHRoaXMgZmlsZSwgcGxlYXNlIGRvd25sb2FkIGFuZCByZWluc3RhbGwgSm9pbk5ldCBzb2Z0d2FyZSBmcm9tIGh0dHA6Ly93d3cuaG9tZW1lZXRpbmcuY29tCltnZW5lcmFsXQpjb2RldHlwZT0xMwppcD13d3cuYWlmbHliaXJkLmNvbQpkb21haW49SG9tZU1lZ',NULL,0,1,'2021-06-29 01:46:35',NULL,NULL,0,0,'2021-06-28 09:17:47'),
('1624883611498',109,NULL,'123',1,10,15,'2021-06-28 20:45:00','2021-06-28 21:00:00',1,1,1,2,NULL,'qwe',1,'fsdfsdfds','https://www.flybirdim.com/webjoinnet/?jnj=IyBpZiB5b3Ugc2VlIHRoaXMgZmlsZSwgcGxlYXNlIGRvd25sb2FkIGFuZCByZWluc3RhbGwgSm9pbk5ldCBzb2Z0d2FyZSBmcm9tIGh0dHA6Ly93d3cuaG9tZW1lZXRpbmcuY29tCltnZW5lcmFsXQpjb2RldHlwZT0xMwppcD13d3cuYWlmbHliaXJkLmNvbQpkb21haW49SG9tZU1lZXRpbmcKcG9ydG09MjMzMwpndWlfcmVjX3Zlcj0KZ3VpX21pbl92ZXI9CnVzZXJpbmZvPWtleV93ZWJfbG9jYWxob3N0fGZQbTZkSWlYYytSb2xidWxUK042VEsvL2EzOWx2YkpOcGR4MUV4c0lLRE09fHpIL0ZqK2tHL0JicHFuR282UTNMbzNnR0lUSW5vSGNnMW9ma3FPekZaQ2Ewc3ZhdkFHNlk2ZU5WREQ4SDdHZXRraHJPL0l6UURNTGVEMDg5ZUY0MGs4bUpEQ08raUhqNXVQRFNSWXRCek5YWVdaOGQwcmtxSmk1bnF2WTBQN3JKQ29WQUhSa2FQQWw1SXo2L3RZWjVURWdDdGdCTXBhWk1DcSswOUV6dTBMakdNMjFQcFBKTEdrck1FYlRERGRNRm10TXR4K01aQjVzY3A0YkgrTWtMSVFwdExpcC8xNDlNVGZuaFdVN1pRWGVPZytrTVpIZnI4dU4zaHBBem5LYzlQbjlYZ2xyZWh0QXhlckFOK2dobXltOE01dTUzUkN1MVI0NHBRbWJ4MjlreWxmQ0t4ZktMVnNhU3pyblY0cFVZUDArOFBPT0VpU041eHRnSFFPM3VKN2JFVk5QdXhLZGFqUlVrS0YwVlBnblIvODdrbVV0djJ5eDA3dTRUYmYyNE5JVVhhNENuNTVaclB3PT18bGZRN3cxcEJEVHVza1JyL29yZmV0T1BXdlh3PQo=','https://www.flybirdim.com/webjoinnet/?jnj=IyBpZiB5b3Ugc2VlIHRoaXMgZmlsZSwgcGxlYXNlIGRvd25sb2FkIGFuZCByZWluc3RhbGwgSm9pbk5ldCBzb2Z0d2FyZSBmcm9tIGh0dHA6Ly93d3cuaG9tZW1lZXRpbmcuY29tCltnZW5lcmFsXQpjb2RldHlwZT0xMwppcD13d3cuYWlmbHliaXJkLmNvbQpkb21haW49SG9tZU1lZ',NULL,0,1,'2021-06-29 01:46:37',NULL,NULL,0,0,'2021-06-28 15:33:32'),
('1624944977749',109,NULL,'11',0,10,5,'2021-06-29 08:36:17','2021-06-29 08:41:17',1,1,1,2,NULL,'',1,'','https://www.flybirdim.com/webjoinnet/?jnj=IyBpZiB5b3Ugc2VlIHRoaXMgZmlsZSwgcGxlYXNlIGRvd25sb2FkIGFuZCByZWluc3RhbGwgSm9pbk5ldCBzb2Z0d2FyZSBmcm9tIGh0dHA6Ly93d3cuaG9tZW1lZXRpbmcuY29tCltnZW5lcmFsXQpjb2RldHlwZT0xMwppcD13d3cuYWlmbHliaXJkLmNvbQpkb21haW49SG9tZU1lZXRpbmcKcG9ydG09MjMzMwpndWlfcmVjX3Zlcj0KZ3VpX21pbl92ZXI9CnVzZXJpbmZvPWtleV93ZWJfbG9jYWxob3N0fE9Gc0ZpWVpmWlZCbWxidk5yd1NpOTZtUDQ0MW9EUTlnM2U1akdacTJwZzQ9fE5NT1R4YkxFOElWR0pHR0xXTTRVdFgrM0Y1aXhVREV6UmRlSW5jODg3K3EyQjNEaU8yNUNYek5UbmRDMjVkYzlRS1RiSVR1N0ZWR2RoZXB5RmtMV2JRSnN3QUpwTlB1Z09VODVsTFRCa2x0TlRnWFdPenB5TG5iTFpyc2xiU3VUSkd0bExoaUZianFZeXN1a01wRWxRdHBacDdjeE0zS2tUZG9UUENHQU9FLzN1cHc4cERvZVlLbXg0NUc4eGFxbzdwQlRwcDhmYlBvOHJ2NnlteE1xZE9XaEUrSy96S0ZkMTF5QzdReEpldGJCajBHT0dTYXlsL3FyU3NtT2lWY3czQ01xUXJUQ21WZEdCSGtWMDhFdnRxeGlHUUtMUGJ5THNvU1R6bXFlcndjWVJVc3g5b0R0RCtGcUxNQlFQOGxNMUUrVzM2aURaMXk5fGVoMHlmRlBCSWNWRy9yVVJ3T01QUEJqeG0xST0K','https://www.flybirdim.com/webjoinnet/?jnj=IyBpZiB5b3Ugc2VlIHRoaXMgZmlsZSwgcGxlYXNlIGRvd25sb2FkIGFuZCByZWluc3RhbGwgSm9pbk5ldCBzb2Z0d2FyZSBmcm9tIGh0dHA6Ly93d3cuaG9tZW1lZXRpbmcuY29tCltnZW5lcmFsXQpjb2RldHlwZT0xMwppcD13d3cuYWlmbHliaXJkLmNvbQpkb21haW49SG9tZU1lZ',NULL,0,1,'2021-06-29 08:36:28','',NULL,0,0,'2021-06-29 08:36:18'),
('1625044992650',109,NULL,'5656',0,10,5,'2021-06-30 12:23:14','2021-06-30 12:28:14',1,1,1,2,NULL,NULL,1,'','https://www.flybirdim.com/webjoinnet/?jnj=IyBpZiB5b3Ugc2VlIHRoaXMgZmlsZSwgcGxlYXNlIGRvd25sb2FkIGFuZCByZWluc3RhbGwgSm9pbk5ldCBzb2Z0d2FyZSBmcm9tIGh0dHA6Ly93d3cuaG9tZW1lZXRpbmcuY29tCltnZW5lcmFsXQpjb2RldHlwZT0xMwppcD13d3cuYWlmbHliaXJkLmNvbQpkb21haW49SG9tZU1lZXRpbmcKcG9ydG09MjMzMwpndWlfcmVjX3Zlcj0KZ3VpX21pbl92ZXI9CnVzZXJpbmZvPWtleV93ZWJfbG9jYWxob3N0fEFLbmxwcTRLMFljT2lXSmdCa2lRTzNzSXUyemdKL3F0Z0pHOUxjcnZuOXM9fFNnQjZob2tEMFJxNWxDWE05czlEeVB5a0ZOS21JMmZPM2svZHI5Wm81WnZtNFpKS1RqcEVWUkxWakRyZkFrRXNKR0RzY2J3cnFqM1lvTHhScTZuU0pvMmJIbU80WnVkdU5tZTZZSDBEbnh1eUhrMk1KaG1zUUFFaGhMY2JLcjdxVjM4dHJpYTg0SnFaTXRENXZ1VUdjNFh5OUtHRGVFaXRDWk5PQ0Y5NU55N1lQQ054YWZsUlBkaUFUbDlDNEg4SmZqODZ2MEZhOWh1QmdUU21sdXVCOGxQc1k3SFJMTkdDdU9sV3ZzMHhkTWRHUXZtcmlEU3puc2tyVUhiQTRZNy9ySEpFSDdHWVJGbG1LcUhJdEljTUgvMHliTHlwVm5Uek1UNTFPVTJuNjVUbEJVekptUlcvcWJSQk9GbUlES1h6cnNpMTkzdDFYYlZqNnB1UzJMMTRRenJUYUNLaXMyT3NvVk8vcElrb0tKaklCMS91TGFEQWtmY0Nwdk83SWYrQU5nOEsvcXZLNFZ4L0c3OVY0NG1NYkcrRllxQmhNS3VmRlNvZG5JSnVLRXVLbS9ocjdQOG04RUxBczNJNmxOdHRlUHF4Qm5rPXxFb2F2aTVKWDFMSGZGZmY2bFdCb0c3eFZ5Vzg9Cg==',NULL,NULL,0,0,NULL,NULL,'2021-06-30 12:23:40',0,0,'2021-06-30 12:23:14'),
('1625045174985',109,NULL,'1122',0,10,5,'2021-06-30 12:26:15','2021-06-30 12:31:15',1,1,1,2,NULL,NULL,1,'','https://www.flybirdim.com/webjoinnet/?jnj=IyBpZiB5b3Ugc2VlIHRoaXMgZmlsZSwgcGxlYXNlIGRvd25sb2FkIGFuZCByZWluc3RhbGwgSm9pbk5ldCBzb2Z0d2FyZSBmcm9tIGh0dHA6Ly93d3cuaG9tZW1lZXRpbmcuY29tCltnZW5lcmFsXQpjb2RldHlwZT0xMwppcD13d3cuYWlmbHliaXJkLmNvbQpkb21haW49SG9tZU1lZXRpbmcKcG9ydG09MjMzMwpndWlfcmVjX3Zlcj0KZ3VpX21pbl92ZXI9CnVzZXJpbmZvPWtleV93ZWJfbG9jYWxob3N0fEVDQWE2YTRyeWJhT3I4bk5wVlRXUG1hdlRSU1NWYVdsWVFtVHlENnh4aEU9fE5ZZGhTSm54dkRmV3ZpNmw2ZUwzcHh5a0RvdmFrTzRqcy9hcWoxMXducXhZRWxpQURqem0xT0pGTUt2N0F6bU5HTUNUUXFlRE9JTUw0eTR1citZYXVpa2pKaEF1amRtWEMvdGZNeVArT21ZWnNiQnNDWjRrZkZyNTl6SFFqdjBUcnFBNXFyTXV2WE9uWFdVM1c5bFpCNVlYOU9Ua2FUWVRZeEkyTmdGTXBJd01iSno3YXl5SS9KWk1XZlNtVzIrTGF6UnI4ZXh5MmZMRE5sdGxzTzAxSThXanQxTTBEczVMd3hhYnIzbFlITGpna0Uwdml5aVQwUUYyRGZkQlovMkRacFZLemdTVWpOSklvV1JTSlQ5UkN1dUNBS1QySWNtTzBRUCtzS0ptejZ4OFFrWUV2YS96bGJZSDFhak8yQ0lnYnJaUEI2VkluMU82TVptUTlKNkFaNjNhL2I5VFRhbVV1Ty9HQ3ZvMEpmaFdjbHdvN3dSd3cwQi82Z0o3Q1RhVVJ1RnNhbGdIU0YyOU5ka0NuUGdRS3NMN3lWdTVlV1pPcHR3NjdnZlN3NkFJZWZrTGY3bFVCZFpnOUQwQXZEVXYrRlpXdFVVPXxwU0FDYUpFbWMxbUlUajVHaEc0ZFBuMnNDeXc9Cg==',NULL,NULL,0,0,NULL,NULL,'2021-06-30 13:54:56',0,0,'2021-06-30 12:26:15'),
('1625049670103',109,NULL,'qwer',1,10,15,'2021-07-08 00:00:00','2021-07-08 00:15:00',1,1,1,2,NULL,'',1,'','https://www.flybirdim.com/webjoinnet/?jnj=IyBpZiB5b3Ugc2VlIHRoaXMgZmlsZSwgcGxlYXNlIGRvd25sb2FkIGFuZCByZWluc3RhbGwgSm9pbk5ldCBzb2Z0d2FyZSBmcm9tIGh0dHA6Ly93d3cuaG9tZW1lZXRpbmcuY29tCltnZW5lcmFsXQpjb2RldHlwZT0xMwppcD13d3cuYWlmbHliaXJkLmNvbQpkb21haW49SG9tZU1lZXRpbmcKcG9ydG09MjMzMwpndWlfcmVjX3Zlcj0KZ3VpX21pbl92ZXI9CnVzZXJpbmZvPWtleV93ZWJfbG9jYWxob3N0fERCbVZPU3VZUy9Rd1h5WTRjUElwaG1sd3BIWlQxNFMvNlFOMjc0RFdtTmc9fFlYbk10Q3BTaS93ZUc5dEFTSTJDS1RiWU92NjZWYjRqTisyU2pFZEhwUVBmbkxBWjRrR2g5cXFBZmd2amNWaXladkNMMHFCeWMwczZPd1h0VmJpREM0Z2wyZ1JISGR5MkwxOHd1K05OZ1hybGZmSmFGZVBrei9JcUQwQjB0VGg5TXRmSmRSUmdiU0JrU1hlbUpsd2RWTXNhcUp0S1FONUlRaHIyTjh0QWE0M2ZqL1c4UXVnSWNHUzNpSEtuQU92RmVYaTdlektuZkt6RXpIcUg4U0dSa2NPTUNHeEtOWXRqdDNOVXdNSEkwT0JtVVJHTmp6eHFhNnpmcXdBUUxIYUNOSzZGVHRlemxZNlJFR3NPdjkzSFNORXRNb1EzTWZGdkY1dGptVnRIN3p6aFpGcU0zWnQ0Tno1cnRxK3VMc1ByQzdtRWR5aTRxdkhCNjJyZ0ZabjM2akdndzNDMDVTNlV0Zz09fHdjVlJhVHpTWlIwWG0yZWZpQnZ6VkpnUm11az0K',NULL,NULL,0,0,NULL,NULL,'2021-06-30 13:54:52',0,0,'2021-06-30 13:41:10');

/*Table structure for table `table_recurrence` */

DROP TABLE IF EXISTS `table_recurrence`;

CREATE TABLE `table_recurrence` (
  `meetingId` varchar(50) NOT NULL,
  `recure_mode` int(12) DEFAULT NULL,
  `day_mode` int(12) DEFAULT NULL,
  `day_dur` int(12) DEFAULT NULL,
  `week_dur` int(12) DEFAULT NULL,
  `week_dates` varchar(255) DEFAULT NULL,
  `month_method` int(12) DEFAULT NULL,
  `m_date` int(12) DEFAULT NULL,
  `m_month` int(12) DEFAULT NULL,
  `m_week` int(12) DEFAULT NULL,
  `m_day` int(12) DEFAULT NULL,
  `m_week_month` int(12) DEFAULT NULL,
  `start_recur` datetime DEFAULT NULL,
  `end_method` int(12) DEFAULT NULL,
  `end_recur` datetime DEFAULT NULL,
  `end_round` int(12) DEFAULT NULL,
  PRIMARY KEY (`meetingId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `table_recurrence` */

insert  into `table_recurrence`(`meetingId`,`recure_mode`,`day_mode`,`day_dur`,`week_dur`,`week_dates`,`month_method`,`m_date`,`m_month`,`m_week`,`m_day`,`m_week_month`,`start_recur`,`end_method`,`end_recur`,`end_round`) values 
('1624883611498',1,0,2,2,'2,3',0,1,1,0,5,1,'2021-06-30 10:03:40',0,'2021-06-28 23:59:59',10);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(120) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `business_name` varchar(200) DEFAULT NULL,
  `company_size` varchar(100) DEFAULT NULL,
  `plans_id` int(11) NOT NULL,
  `activated` tinyint(1) NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `users` */

insert  into `users`(`id`,`email`,`display_name`,`password`,`business_name`,`company_size`,`plans_id`,`activated`) values 
(1,'vlad@mail.ru','vlad','1111',NULL,NULL,1,0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
