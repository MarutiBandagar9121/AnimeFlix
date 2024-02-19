create table user_data(firstname varchar(50) not null,lastname varchar(50),username varchar(50) primary key,email varchar(100) unique not null,password_hash varchar(100) not null);

create table anime_data(animeid integer primary key,title varchar(50) not null,year integer,numberofepisodes integer ,description varchar(500),writer varchar(50),rating integer,imgsource varchar(100),genere varchar(50),thumbnailsource varchar(100) );

CREATE TABLE video_data (vid INTEGER PRIMARY KEY,animeid INTEGER,episodenumber INTEGER NOT NULL,videodescription VARCHAR(500),vname VARCHAR(100),CONSTRAINT fk_anime FOREIGN KEY (animeid) REFERENCES anime_data(animeid)
);

create table user_history(uhid integer primary key,vid integer,username varchar(50),constraint fk_video foreign key (vid) references video_data(vid),constraint fk_user foreign key (username) references user_data(username));

ALTER TABLE user_data
ADD COLUMN salt varchar(100);

create table user_data_temp(firstname varchar(50) not null,lastname varchar(50),username varchar(50) primary key,email varchar(100) unique not null,password_hash varchar(100) not null,salt varchar(100),otp integer);




insert into anime_data values(101,'Naruto',2002,720,'Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the villages leader and strongest ninja.','Masashi Kishimoto',4.5,'http://localhost:8000/animeimages/naruto.webp','Action','http://localhost:8000/thumbnails/naruto_thumbnail.jpg');

insert into anime_data values(102,'One Piece',1999,720,'Monkey D. Luffy sets off on an adventure with his pirate crew in hopes of finding the greatest treasure ever, known as the "One Piece.','Eiichiro Oda',4,'http://localhost:8000/animeimages/onepiece.webp','Adventure','http://localhost:8000/thumbnails/onepiece_thumbnail.jpg');


insert into anime_data values(103,'Tokyo Revengers',2021,51,'Hanagaki Takemichi lives an unsatisfying life right up until his death. Waking up 12 years in the past, he reckons with the eventual fate of his friends and tries to prevent an unfortunate future.','Ken Wakui',4,'http://localhost:8000/animeimages/tokyorevengers.jpg','Adventure','http://localhost:8000/thumbnails/tokyorevengers_thumbnail.jpg');


insert into anime_data values(104,'Death Note',2006,37,'An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it.','Mamoro Miyano',5,'http://localhost:8000/animeimages/deathnote.jpg','Adventure','http://localhost:8000/thumbnails/deathnote_thumbnail.jpg');



insert into anime_data values(105,'Dragon Ball',1986,153,'Son Gokû, a fighter with a monkey tail, goes on a quest with an assortment of odd characters in search of the Dragon Balls, a set of crystals that can give its bearer anything they desire.','Masaka Nozawa',3,'http://localhost:8000/animeimages/dragonball.jpg','Adventure','http://localhost:8000/thumbnails/dragonball.jpg');


insert into anime_data values(106,'Bleach',2004,386,'High school student Ichigo Kurosaki, who has the ability to see ghosts, gains soul reaper powers from Rukia Kuchiki and sets out to save the world from "Hollows".','Tite Kobu',4,'http://localhost:8000/animeimages/bleach.jpg','Action','http://localhost:8000/thumbnails/bleach.png');





alter table video_data add column video_url varchar(200);


insert into video_data values(1011,101,1,'Naruto Episode One','Naruto Homecoming','http://localhost:8000/video/naruto_episode1.mp4');



insert into video_data values(1012,101,2,'Naruto Episode two','The Akatsuki Makes a Move','http://localhost:8000/video/naruto_episode2.mkv');

insert into video_data values(1013,101,3,'Naruto Episode three','The Result of the Training','http://localhost:8000/video/naruto_episode3.mkv');

insert into video_data values(1014,101,4,'Gaara is quick to detect Deidaras presence, and an aerial battle ensues with Deidara on his giant paper bird and Gaara atop sand. ','The Jinchuriki of the Sand','http://localhost:8000/video/naruto_episode4.mkv');

insert into video_data values(1015,101,5,'Naruto and Sakura defeat Kakashi in the survival challenge and Tsunade assigns them to a new three-man squad led by Kakashi, who tells them they are now his equals. ','The Kazekage Stands Tall','http://localhost:8000/video/naruto_episode5.mkv');

insert into video_data values(1016,101,6,'In order to protect his village from Deidara’s explosive clay, Gaara uses his chakra to create a giant sand shield. However, this provides Deidara with the opportunity to capture Gaara. ','Mission Cleared','http://localhost:8000/video/naruto_episode6.mkv');

insert into video_data values(1017,101,7,'Gaara, his strength completely exhausted, is whisked away by Deidara. Kankuro ignores Baki’s efforts to stop him and immediately sets out in pursuit with a platoon to rescue Gaara.','Run Kankuro','http://localhost:8000/video/naruto_episode7.mkv');

insert into video_data values(1018,101,8,'The Hidden Leaf receives the emergency letter from the Sand village. An expert deciphers the letter and reports that Gaara, the Kazekage of the Sand has been attacked and kidnapped by a bandit. Tsunade, immediately understanding the emergency, assigns Naruto, Sakura and Kakashi to rescue Gaara. ','The Team Kakashi Deployed"','http://localhost:8000/video/naruto_episode8.mkv');

insert into video_data values(1019,101,9,'The Sand Village repairs the damages around the mountain area and remove the explosives set on the walls. Temari gets the bad news and joins Team Kakshi to search for Gaara. Naruto, Sakura, Kakashi and Temari move through the forest and recall their past about Gaara and how he countered his beast, about the chunin exams and Sasuke. ','The Jinchurikis Tears"','http://localhost:8000/video/naruto_episode9.mkv');


insert into video_data values(1031,103,1,'Tokyo Revengers Episode one','Reborn','http://localhost:8000/video/tokyorevengers_episode1.mp4');

insert into video_data values(1032,103,2,'Tokyo Revengers Episode Two','Resist','http://localhost:8000/video/tokyorevengers_episode2.mp4');

insert into video_data values(1033,103,3,'Tokyo Revengers Episode Three','Resolve','http://localhost:8000/video/tokyorevengers_episode3.mp4');


insert into video_data values(1021,102,1,'One Piece Episode one','I am Luffy! The Man Whos Gonna Be..','http://localhost:8000/video/onepiece_episode1.mkv');


insert into video_data values(1022,102,2,'One Piece Episode Two','Enter the Great Swordsman!','http://localhost:8000/video/onepiece_episode2.mkv');

insert into video_data values(1023,102,3,'One Piece Episode Three','Morgan versus Luffy!','http://localhost:8000/video/onepiece_episode3.mkv'); 



insert into video_data values(1041,104,1,'Death Note Episode One','Rebirth','http://localhost:8000/video/deathnote_episode1.mkv');

insert into video_data values(1042,104,2,'Death Note Episode Two','Confrontataion','http://localhost:8000/video/deathnote_episode2.mkv');

insert into video_data values(1043,104,3,'Death Note Episode Three','Dealings','http://localhost:8000/video/deathnote_episode3.mkv');



insert into video_data values(1051,105,1,'Dragon Ball Episode One','The Secret Of The Dragon Balls','http://localhost:8000/video/dragonball_episode1.mkv');

insert into video_data values(1052,105,2,'Dragon Ball Episode Two','The Emperors Quest','http://localhost:8000/video/dragonball_episode2.mkv');

insert into video_data values(1053,105,3,'Dragon Ball Episode Three','The Nimbus Cloud Of Roshi','http://localhost:8000/video/dragonball_episode3.mkv');



insert into video_data values(1061,106,1,'Bleach Episode One','The Day I Became a Shinigami','http://localhost:8000/video/bleach_episode1.mkv');

insert into video_data values(1062,106,2,'Bleach Episode Two','The Shinigamis Work','http://localhost:8000/video/bleach_episode2.mkv');


insert into video_data values(1063,106,3,'Bleach Episode Three','The Older BrothersWish','http://localhost:8000/video/bleach_episode3.mkv');

update video_data set videodescription='A figure passes through the gates of the village hidden in the leaves. It’s an older Naruto, who has returned from a two and a half year training journey with Jiraiya. ' where vid='1011';

update video_data set videodescription='Learning that all of his friends now outrank him, Naruto gives a copy of Jiraiyas new book Make-Out Tactics to Kakashi Hatake, who challenges Naruto and Sakura to the bell retrieval test to evaluate their new skills. ' where vid='1012';

update video_data set videodescription='The combination of Naruto and Sakuras new powerful techniques forces Kakashi to use his Sharingan right off the bat. ' where vid='1013';


