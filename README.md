# breakfast-shop-nextauth

Port occupied
install net-tools for netstat:
sudo apt-get update -y
sudo apt-get install -y net-tools
sudo netstat -lpn |grep 3000
sudo kill PID

Create a database in a mysql container
after publish a port from mysql container
mysql -P 3306 --protocol=tcp -u root -p

start mysql server
sudo /etc/init.d/mysql start
sudo /etc/init.d/mysql restart

How can I initialize a MySQL database with schema in a Docker container?
volumes:
     - /home/user/db/mysql/data:/var/lib/mysql
     - /home/user/db/mysql/init:/docker-entrypoint-initdb.d/:ro
And in the /home/user/db/mysql/init folder .. just drop one sql file, with any name, for example init.sql containing :
CREATE DATABASE mydb;
