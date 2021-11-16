DROP TABLE IF EXISTS `streetParkingSpots`;

CREATE TABLE `streetParkingSpots` (
 `id` int NOT NULL AUTO_INCREMENT,
 `userName` VARCHAR(255) NOT NULL,
 `lat` VARCHAR(255) NOT NULL,
 `lon` VARCHAR(255) NOT NULL,
 `img` VARCHAR(255) NOT NULL,
 `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
 PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO `streetParkingSpots` (userName, lat, lon, img)
VALUES ( 'Selena', 45.761629,4.833033,'https://ucarecdn.com/f9ba07c4-b7f2-4077-8840-c51623434a7e/sajadnorixIjpx2dWbu8unsplash.jpg'),( 'Kalil', 45.76951, 4.867913,'https://ucarecdn.com/d43eae4d-3722-44bb-9a74-c3d9eb658e7c/rafaljedrzejek5LROvubqo4unsplash.jpg'), ('Florence', 45.725213, 4.884782, 'https://ucarecdn.com/3c74ecb5-4829-4b3f-a5cb-38db425f22c5/dngphchitriuhfDv8pW_uvsunsplash.jpg'), ('Bastien', 45.775715, 4.882494, 'https://ucarecdn.com/6f125b16-cfdf-40ff-b495-f59eb5393cf6/fernandogagonfGQr5ogRPsunsplash.jpg');
