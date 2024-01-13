CREATE TABLE Watches (
    watches_id INTEGER PRIMARY KEY,
    watches_name TEXT,
    boitier_id INTEGER,  
    pierres_id INTEGER,
    bracelet_id INTEGER,
    utilisateur_id INTEGER,
    FOREIGN KEY (boitier_id) REFERENCES Boitiers(boitier_id),
    FOREIGN KEY (pierres_id) REFERENCES Pierres(pierres_id),
    FOREIGN KEY (bracelet_id) REFERENCES Bracelet(bracelet_id),
    FOREIGN KEY (utilisateur_id) REFERENCES Utilisateur(utilisateur_id)
);

CREATE TABLE Boitiers (
    boitier_id INTEGER PRIMARY KEY,
    boitier_name TEXT,    
    boitier_prix FLOAT,
    boitier_image_url TEXT
);


CREATE TABLE Pierres (
    pierres_id INTEGER PRIMARY KEY,
    pierres_name TEXT,
    pierre_prix FLOAT
);

CREATE TABLE Bracelet (
    bracelet_id INTEGER PRIMARY KEY,
    bracelet_name TEXT,    
    bracelet_prix FLOAT,
    bracelet_image_url TEXT
);

CREATE TABLE Utilisateur (
    utilisateur_id INTEGER PRIMARY KEY,
    utilisateur_email TEXT,
    utilisateur_name TEXT,
    utilisateur_mdp TEXT
);

CREATE TABLE Panier (
    panier_id INTEGER PRIMARY KEY,
    utilisateur_id INTEGER,
    watches_id INTEGER,
    total_price FLOAT,
    FOREIGN KEY (watches_id) REFERENCES Watches(watches_id),
    FOREIGN KEY (utilisateur_id) REFERENCES Utilisateur(utilisateur_id)
);

CREATE VIEW WatchDetails AS
SELECT 
    w.watches_id,
    b.boitier_prix + p.pierre_prix + br.bracelet_prix AS total_price
FROM 
    Watches w
JOIN 
    Boitiers b ON w.boitier_id = b.boitier_id
JOIN 
    Pierres p ON w.pierres_id = p.pierres_id
JOIN 
    Bracelet br ON w.bracelet_id = br.bracelet_id;

ALTER TABLE Panier
ADD COLUMN total_price FLOAT;

CREATE TRIGGER UpdateTotalPrice
AFTER INSERT ON Panier
FOR EACH ROW
BEGIN
    UPDATE Panier SET total_price = (
        SELECT b.boitier_prix + p.pierre_prix + br.bracelet_prix
        FROM Watches w
        JOIN Boitiers b ON w.boitier_id = b.boitier_id
        JOIN Pierres p ON w.pierres_id = p.pierres_id
        JOIN Bracelet br ON w.bracelet_id = br.bracelet_id
        WHERE w.watches_id = NEW.watches_id
    )
    WHERE panier_id = NEW.panier_id;
END;

ALTER TABLE Watches
ADD COLUMN total_price FLOAT;

CREATE TRIGGER UpdateWatchTotalPriceAfterInsert
AFTER INSERT ON Watches
FOR EACH ROW
BEGIN
    UPDATE Watches SET total_price = (
        SELECT b.boitier_prix + p.pierre_prix + br.bracelet_prix
        FROM Boitiers b, Pierres p, Bracelet br
        WHERE b.boitier_id = NEW.boitier_id AND
              p.pierres_id = NEW.pierres_id AND
              br.bracelet_id = NEW.bracelet_id
    )
    WHERE watches_id = NEW.watches_id;
END;

CREATE TRIGGER UpdateWatchTotalPriceAfterUpdate
AFTER UPDATE ON Watches
FOR EACH ROW
BEGIN
    UPDATE Watches SET total_price = (
        SELECT b.boitier_prix + p.pierre_prix + br.bracelet_prix
        FROM Boitiers b, Pierres p, Bracelet br
        WHERE b.boitier_id = NEW.boitier_id AND
              p.pierres_id = NEW.pierres_id AND
              br.bracelet_id = NEW.bracelet_id
    )
    WHERE watches_id = NEW.watches_id;
END;

--Jointure--
SELECT
    w.watches_id,
    w.watches_name,
    b.boitier_id,
    b.boitier_name,
    b.boitier_prix,
    b.boitier_image_url,
    p.pierres_id,
    p.pierres_name,
    p.pierre_prix,
    br.bracelet_id,
    br.bracelet_name,
    br.bracelet_prix,
    br.bracelet_image_url
FROM
    Watches w
JOIN
    Boitiers b ON w.boitier_id = b.boitier_id
JOIN
    Pierres p ON w.pierres_id = p.pierres_id
JOIN
    Bracelet br ON w.bracelet_id = br.bracelet_id;