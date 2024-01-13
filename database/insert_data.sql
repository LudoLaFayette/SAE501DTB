INSERT INTO Watches (watches_name) VALUES ('Montre1');
INSERT INTO Watches (watches_name) VALUES ('Montre2');
INSERT INTO Watches (watches_name) VALUES ('Montre3');
INSERT INTO Watches (watches_name,boitier_id , pierres_id, bracelet_id,utilisateur_id ) VALUES ('Montre4', 1, 1, 1, 2);

INSERT INTO Boitiers (boitier_name, boitier_prix, boitier_image_url) VALUES ('Boitier1', 4.50, 'background_fluo01.png');
INSERT INTO Boitiers (boitier_name, boitier_prix, boitier_image_url) VALUES ('Boitier2', 8.50, 'background_black01.png');
INSERT INTO Boitiers (boitier_name, boitier_prix, boitier_image_url) VALUES ('Boitier3', 11.50, 'background_black02.png');
INSERT INTO Boitiers (boitier_name, boitier_prix, boitier_image_url) VALUES ('Boitier4', 9.50, 'background_mickey.png');
INSERT INTO Boitiers (boitier_name, boitier_prix, boitier_image_url) VALUES ('Boitier5', 9.50, 'background_white01.png');
INSERT INTO Boitiers (boitier_name, boitier_prix, boitier_image_url) VALUES ('Boitier6', 9.50, 'background_white02.png');
INSERT INTO Boitiers (boitier_name, boitier_prix, boitier_image_url) VALUES ('Boitier7', 9.50, 'background_white03.png');
INSERT INTO Boitiers (boitier_name, boitier_prix, boitier_image_url) VALUES ('Boitier8', 9.50, 'background_white04.png');
INSERT INTO Boitiers (boitier_name, boitier_prix, boitier_image_url) VALUES ('Boitier9', 9.50, 'background_white05.png');

INSERT INTO Cadran (cadran_name, cadran_prix) VALUES ('Cadran1', 6.50);
INSERT INTO Cadran (cadran_name, cadran_prix) VALUES ('Cadran2', 11.50);
INSERT INTO Cadran (cadran_name, cadran_prix) VALUES ('Cadran3', 13.50);

INSERT INTO Pierres (pierres_name, pierre_prix) VALUES ('Rubis', 275.50);
INSERT INTO Pierres (pierres_name, pierre_prix) VALUES ('Diamant', 355.50);
INSERT INTO Pierres (pierres_name, pierre_prix) VALUES ('Emeraude', 175.50);

INSERT INTO Bracelet (bracelet_name, bracelet_prix, bracelet_image_url) VALUES ('Métal', 115.50, 'texture-tissus-or.jpg');
INSERT INTO Bracelet (bracelet_name, bracelet_prix, bracelet_image_url) VALUES ('Tissu', 55.50, 'texture-tissus-marron.jpg');
INSERT INTO Bracelet (bracelet_name, bracelet_prix, bracelet_image_url) VALUES ('Cuir', 35.50, 'texture-cuir-blanc.jpg');

INSERT INTO Utilisateur (utilisateur_email, utilisateur_name, utilisateur_mdp) VALUES ('admin@gmail.com', 'Admin', 'admin01');

INSERT INTO Panier ( utilisateur_id,  watches_id ) VALUES (2, 4);
 






