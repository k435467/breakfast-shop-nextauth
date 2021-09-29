-- put it in home/user/db/mysql/init to setup db
create database apiserver;
create user 'springuser'@'%' identified by 'ThePassword';
grant all on apiserver.* to 'springuser'@'%';
