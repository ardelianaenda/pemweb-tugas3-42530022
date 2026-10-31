CREATE DATABASE IF NOT EXISTS flora_cafe
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE flora_cafe;

DROP TABLE IF EXISTS menu;

CREATE TABLE menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_menu VARCHAR(100) NOT NULL,
    kategori VARCHAR(50) NOT NULL,
    deskripsi TEXT,
    harga DECIMAL(10,2) NOT NULL,
    gambar VARCHAR(255)
);

INSERT INTO menu (nama_menu, kategori, deskripsi, harga, gambar) VALUES
('Midnight Americano', 'kopi', 'Espresso dan air dengan rasa kopi yang pekat.', 15000, 'Midnight-Americano.webp'),
('Velvet Cappuccino', 'kopi', 'Espresso, steamed milk, dan foam yang lembut.', 16000, 'Velvet-Cappuccino.webp'),
('Caramel Cloud Latte', 'kopi', 'Espresso, susu, caramel, dan es batu.', 19000, 'Caramel-Cloud-Latte.webp'),
('Hazelnut Hug', 'kopi', 'Espresso, susu, dan sirup hazelnut.', 20000, 'Hazelnut-Hug.webp'),
('Vanilla Daydream', 'kopi', 'Espresso, susu, dan vanilla.', 19000, 'Vanilla-Daydream.webp'),
('Matcha Garden', 'nonkopi', 'Matcha premium dengan susu yang creamy.', 18000, 'Matcha-Garden.webp'),
('Choco O''Clock', 'nonkopi', 'Dark cokelat, susu, dan whipped cream.', 17000, 'Choco-OClock.webp'),
('Sunny Orange', 'nonkopi', 'Jus jeruk segar dengan es.', 15000, 'Sunny-Orange.webp'),
('Berry Blush', 'nonkopi', 'Jus strawberry dengan susu yang manis.', 17000, 'Berry-Blush.webp'),
('Purple Haze', 'nonkopi', 'Taro dengan susu yang creamy.', 17000, 'Purple-Haze.webp'),
('Cozy Chicken Bowl', 'makanan', 'Nasi, ayam panggang, sayuran, dan saus spesial.', 50000, 'Cozy-Chicken-Bowl.webp'),
('Creamy Moon Pasta', 'makanan', 'Pasta dengan krim saus dan keju.', 55000, 'Creamy-Moon-Pasta.webp'),
('Firecracker Ramen', 'makanan', 'Mie kuah pedas dengan telur dan daun bawang.', 45000, 'Firecracker-Ramen.webp'),
('Golden Katsu Plate', 'makanan', 'Ayam katsu yang krispi dengan nasi dan fresh salad.', 37000, 'Golden-Katsu-Plate.webp'),
('Tokyo Beef Bowl', 'makanan', 'Daging sapi teriyaki dengan nasi dan sayuran.', 122000, 'Tokyo-Beef-Bowl.webp'),
('Butter Hug Croissant', 'dessert', 'Pastry renyah dengan aroma mentega yang enak.', 20000, 'Butter-Hug-Croissant.webp'),
('Sweet Cloud Waffle', 'dessert', 'Waffle yang hangat dipadukan dengan eskrim yang meleleh dan saus coklat.', 45000, 'Sweet-Cloud-Waffle.webp'),
('Matcha Dream Cake', 'dessert', 'Cheesecake lembut dengan bubuk matcha.', 40000, 'Matcha-Dream-Cake.webp'),
('Banana Cozy Loaf', 'dessert', 'Roti pisang lembut dengan taburan kacang.', 35000, 'Banana-Cozy-Loaf.webp'),
('Midnight Brownie', 'dessert', 'Brownie coklat dengan tekstur yang fudgy.', 35000, 'Midnight-Brownie.webp');
